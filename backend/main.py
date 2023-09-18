from fastapi import FastAPI, File, UploadFile
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from encode_decode import decrypt
from keys import generate_keys
import uuid
import redis
import json

app = FastAPI(
    title="E-Voting Backend",
    description="This app is the backend of the e-voting app"
)

# Verbindung zur Redis-Datenbank
redis_client = redis.Redis(host='redis', port=6379, db=0)

# Die oben genannte Url-Liste autorisieren
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


questions = [
    {
        "id": "autobahnen",
        "name": "autobahnen",
        "text": "Sind Sie dafür, mehr Autobahnen in der Schweiz zu bauen ?"
    },
    {
        "id": "windkraft",
        "name": "windkraft",
        "text": "Sind Sie für den Bau von mehr Windkraftanlagen in der Schweiz ?"
    },
    {
        "id": "verfassung",
        "name": "verfassung",
        "text": "Sind Sie für die Einführung eines neuen Feiertags am 12. September, um die Verfassung von 1848 zu feiern ?"
    },
]

response_options = ["ja", "nein", "neutral"]

# Inkrement von einer Stimme die Abstimmung.
def increment_vote(redis_key, value):
    redis_client.incr(f"{redis_key}_{value}")

# Funktion, die die Liste der Fragen zurückgibt
@app.get("/questions")
def get_questions():
    return questions

# Funktion, die Schlüssel als Textdatei generiert und zurückgibt
@app.get("/keys")
def create_keys():
    pub_key, priv_key = generate_keys()

    redis_key = str(uuid.uuid4())

    redis_client.rpush(f"{redis_key}", *priv_key)

    priv_key_str = str(redis_key) + "\n" + str(pub_key[0]) + "\n" + str(pub_key[1])

    response = Response(content=priv_key_str, media_type='text/plain')
    response.headers['Content-Disposition'] = 'attachment; filename=public_key.txt'

    return response

# Funktion, die eine Schlüssel-ID nimmt und prüft, ob der Schlüssel gültig ist. 
@app.get("/check_key/{uuid}")
def check_key(uuid: uuid.UUID):
    key_exists = redis_client.exists(str(uuid))
    return {"key_exists": key_exists}

# Funktion, die die Stimmabgabe entschlüsselt und die Stimme zählt
@app.get("/decrypt/{uuid}/{cypher}")
def decrypt_route(uuid: uuid.UUID, cypher: int):
    priv_key_parts = redis_client.lrange(f"{uuid}", 0, -1)
    if not priv_key_parts:
        raise HTTPException(status_code=404, detail="Private key not found")

    try:
        n = int(priv_key_parts[0])
        d = int(priv_key_parts[1])
    except ValueError:
        raise HTTPException(status_code=500, detail="Invalid private key")

    decrypted_value = decrypt(message_chiffré=cypher, d=n, n=d)
    recovered_bytes = decrypted_value.to_bytes((decrypted_value.bit_length() + 7) // 8, 'little')
    
    message = recovered_bytes.decode("utf-8")

    valid_key = False

    for question in questions:
        value = json.loads(message).get(question["name"], "")
        if value in response_options:
            valid_key = True
            increment_vote(question["name"], value)

    # Delete the valid key if the vote is valid. This way the key cannot be reused.
    if valid_key:
        redis_client.delete(f"{uuid}")
        
    return {"decrypted_value": message}

# # Funktion, die das Ergebnis der Abstimmungen zurückgibt
@app.get("/vote_results")
def get_vote_results():
    results = []
    
    for question in questions:
        question_name = question["name"]
        question_text = question["text"]
        
        question_results = {}
        for option in response_options:
            count = int(redis_client.get(f"{question_name}_{option}") or 0)
            question_results[option] = count
        
        results.append({
            "question": question_text,
            "results": question_results
        })
    
    return results
