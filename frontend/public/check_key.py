from pyodide.http import pyfetch

# Variablen, die aus dem Javascript importiert wurden:
# Diese Variable repräsentiert den RSA-Schlüssel in der Form str
text_file: str = text_file  

# Prüfen, ob der Schlüssel gültig ist
async def fetch_key_validation(uuid):
    response = await pyfetch(f"https://api.axelverga.me/check_key/{uuid}")
    return await response.json()

# Den Schlüssel im Browser speichern, um ihn später abzurufen
def write_key_to_file(file_content: str):
    with open("/key.txt", "w") as fh:
        fh.write(file_content)

async def process_key_file(text_file: str):
    lines = text_file.splitlines()
    uuid = lines[0]

    response = await fetch_key_validation(uuid)

    if response["key_exists"] == 1:
        write_key_to_file(text_file)
        return {"valid": True}
    else:
        return {"valid": False}

async def main(text_file: str):
    result = await process_key_file(text_file)
    return result


result = main(text_file)

result # Cette variable est laissée à la fin car cette valeur est retournée au javascript.
