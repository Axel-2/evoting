# Implémenttion simplifiée de RSA


import random
import sympy
import io


# Génération des clés par Bob
def generate_keys():

    # Pour commencer, Bob génère deux nombres premiers n et q
    p = sympy.randprime(2**1023, (2**1024) - 1)
    q = sympy.randprime(2**1023, (2**1024) - 1)

    print(p.bit_length())
    print(q.bit_length())
    # Ensuite Bob calcule N, qui sera le modulo
    n = p * q

    print(f"N.bit_lenghth: {n.bit_length()}")

    # Calculation du totient
    phi  = (p-1) * (q-1)

    # Bob choisit une clé publique e telle que e soit premier avec phi et e < phi
    # e = random.randint(2, phi - 1)
    e = 65537

    # Ce code ne devrait normalement jamais être executé mais c'est une sécurité
    while sympy.gcd(e, phi) != 1:
        e = random.randint(2, phi - 1)

    # Bob calcule la clé privée d telle que (d * e) % phi = 1
    # d = e^(-1) mod phi
    d = pow(e, -1, phi)

    cle_pub = (e, n)
    cle_priv = (d, n)

    return cle_pub, cle_priv

