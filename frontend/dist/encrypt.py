import json

from pyodide.http import pyfetch

# Varibales importées depuis le JavaScript:

form_json: str = form_json # Ce sont les choix non chiffrées de l'utilisateur

# Fonction RSA pour le chiffrement
def chiffrement(message, e, n):   
    return pow(message, e, n)

# Recuperer la clé stockée auparavant dans le naviguateur
def get_key():
    with open("/key.txt") as fh:
        key = fh.read()
        
    lines = key.splitlines()

    uuid = lines[0]
    e = int(lines[1])
    n = int(lines[2])

    return uuid, e, n

# Fonction qui encode une string en int
def encode_to_int(message: str):
    message_bytes = message.encode('utf-8')
    message_int = int.from_bytes(message_bytes, 'little')

    return message_int


async def main():
    uuid, e, n = get_key()
    encoded_message = encode_to_int(message=form_json)
    cypher = chiffrement(message=encoded_message, e=e, n=n)
    return cypher, uuid

cypher, uiid = await main()
cypher, uiid

