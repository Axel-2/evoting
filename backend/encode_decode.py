from keys import generate_keys

def chiffrement(message, e, n):
   
    return pow(message, e, n)

def dechiffrement(message_chiffré, d, n):

    return pow(message_chiffré, d, n)
