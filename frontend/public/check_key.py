from pyodide.http import pyfetch

async def fetch_key_validation(uuid):
    response = await pyfetch(f"https://api.axelverga.com/check_key/{uuid}")
    return await response.json()

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

# Variables importées depuis le javascript:
text_file: str = text_file  # Cette variable représente la clé RSA sous forme str
result = main(text_file)

result # Cette variable est laissée à la fin car cette valeur est retournée au javascript.
