from fastapi import FastAPI, File, UploadFile
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from encode_decode import dechiffrement
from keys import generate_keys
import uuid
import redis
import json

app = FastAPI(
    title="E-Voting Backend",
    description="This app is the backend of the e-voting app"
)

redis_client = redis.Redis(host='redis', port=6379, db=0)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://evoting.oukcorp.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def increment_vote(redis_key, value):
    redis_client.incr(f"{redis_key}_{value}")

questions = [
    {
        "id": "math",
        "name": "math",
        "text": "Mögen Sie Mathematik?"
    },
    {
        "id": "crypto",
        "name": "crypto",
        "text": "Interessieren Sie sich für Kryptografie?"
    },
    {
        "id": "luzern",
        "name": "luzern",
        "text": "Unterstützen Sie den FC Luzern?"
    }
]

response_options = ["ja", "nein", "neutral"]

@app.get("/questions")
def get_questions():
    return questions

@app.get("/keys")
def create_keys():
    pub_key, priv_key = generate_keys()

    redis_key = str(uuid.uuid4())

    redis_client.rpush(f"{redis_key}", *priv_key)
    redis_client.rpush(f"{redis_key}_pub", *pub_key)

    priv_key_str = str(redis_key) + "\n" + str(priv_key[0]) + "\n" + str(priv_key[1])

    response = Response(content=priv_key_str, media_type='text/plain')
    response.headers['Content-Disposition'] = 'attachment; filename=private_key.txt'

    return response

@app.get("/check_key/{uuid}")
def check_key(uuid: uuid.UUID):
    key_exists = redis_client.exists(str(uuid))
    return {"key_exists": key_exists}

@app.get("/decrypt/{uuid}/{cypher}")
def decrypt(uuid: uuid.UUID, cypher: int):
    priv_key_parts = redis_client.lrange(f"{uuid}_pub", 0, -1)
    if not priv_key_parts:
        raise HTTPException(status_code=404, detail="Private key not found")

    try:
        n = int(priv_key_parts[0])
        d = int(priv_key_parts[1])
    except ValueError:
        raise HTTPException(status_code=500, detail="Invalid private key")

    decrypted_value = dechiffrement(message_chiffré=cypher, d=n, n=d)
    recovered_bytes = decrypted_value.to_bytes((decrypted_value.bit_length() + 7) // 8, 'little')
    
    message = recovered_bytes.decode("utf-8")

    for question in questions:
        value = json.loads(message).get(question["name"], "")
        if value in response_options:
            increment_vote(question["name"], value)

    return {"decrypted_value": message}

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
