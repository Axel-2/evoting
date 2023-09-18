import random
import sympy
import io

# Schlüsselgenerierung durch Alice
def generate_keys():

    # Zu Beginn erzeugt Alice zwei Primzahlen n und q
    p = sympy.randprime(2**1023, (2**1024) - 1)
    q = sympy.randprime(2**1023, (2**1024) - 1)

    print(p.bit_length())
    print(q.bit_length())
    # Dann berechnet Alice N, was das Modulo sein wird
    n = p * q

    print(f"N.bit_lenghth: {n.bit_length()}")

    # Berechnung des Phi-Funktion
    phi  = (p-1) * (q-1)

    # Bob wählt einen öffentlichen Schlüssel e, so dass e eine Primzahl von phi und e < phi ist.
    # e = random.randint(2, phi - 1)
    e = 65537

    # Dieser Code sollte normalerweise nie ausgeführt werden, aber er ist eine Sicherheit.
    while sympy.gcd(e, phi) != 1:
        e = random.randint(2, phi - 1)

    # Bob berechnet den privaten Schlüssel d so, dass (d * e) % phi = 1
    # d = e^(-1) mod phi
    d = pow(e, -1, phi)

    pub_key = (e, n)
    priv_key = (d, n)

    return pub_key, priv_key

