import json

from pyodide.http import pyfetch

# Varibales aus dem JavaScript importiert:
form_json: str = form_json # Ce sont les choix non chiffrées de l'utilisateur

# RSA-Funktion für die Verschlüsselung
def encrypt(message, e, n):   
    return pow(message, e, n)

# den zuvor im Browser gespeicherten Schlüssel abrufen
def get_key():
    with open("/key.txt") as fh:
        key = fh.read()
        
    lines = key.splitlines()

    uuid = lines[0]
    e = int(lines[1])
    n = int(lines[2])

    return uuid, e, n

# Funktion, die einen String in int kodiert
def encode_to_int(message: str):
    message_bytes = message.encode('utf-8')
    message_int = int.from_bytes(message_bytes, 'little')

    return message_int

# Hauptfunktion
async def main():
    uuid, e, n = get_key()
    encoded_message = encode_to_int(message=form_json)
    cypher = encrypt(message=encoded_message, e=e, n=n)
    return cypher, uuid

# Hauptfunktion aufrufen
cypher, uiid = await main()

# Gibt React die Variablen zurück
cypher, uiid

