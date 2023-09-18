from keys import generate_keys

def encrypt(message, e, n):
   
    return pow(message, e, n)

def decrypt(message_chiffré, d, n):

    return pow(message_chiffré, d, n)
