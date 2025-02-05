#Minimal Key Lengths for Symmetric Ciphers to Provide Adequate Commercial Security — Paper Summary


Authors: Matt Blaze, Whitfield Diffie, Ronald L Rivest, Bruce Schneier, Tsutomu Shimomura, Eric Thompson, Michael Wiener

Date: 1996

Link: [PDF](https://evervault.com/papers/key-length.pdf)

-----

1. Modern cryptography employs a combination of:
    * Conventional or **symmetric cryptographic** systems for encrypting data and
    * Public key or **asymmetric systems** for managing the keys used by the symmetric systems.
2. Encryption is accomplished by scrambling data using mathematical procedures that make it extremely difficult and time-consuming for anyone other than authorized recipients — those with the correct decryption keys — to recover the plain text.
3. A cryptographic algorithm is considered strong if:
    * No shortcut allows the opponent to recover the plain text without using brute force to test keys until the correct one is found and
    * The number of possible keys is sufficiently large to make such an attack infeasible.
4. The sizes of encryption keys are measured in bits and the difficulty of trying all possible keys grows exponentially with the number of bits used.
5. Public key or **asymmetric cryptosystems** have the property that the ability to encrypt does not imply the ability to decrypt.
6. Conventional or **symmetric cryptosystems** — those in which an entity with the ability to encrypt also can decrypt and vice versa — are the systems under consideration in this paper.
7. It’s a property of computer encryption that modest increases in computational cost can produce vast increases in security: Encrypting information very securely (e.g with 128-bit keys) typically requires little more computing than encrypting it weakly (e.g with 40-bit key keys)
8. It is the nature of brute-force attacks that they can be parallelized indefinitely.
9. FPGAs function as programmable hardware and allow faster implementations of such tasks as encryption and decryption than conventional processors.
10. There are smarter avenues of attack than brute force: There is no need to break the window of a house to get in if the front door is unlocked. Calculations regarding the strength of encryption against brute-force attacks are **worst-case scenarios**.
11. The authors' recommendation at the time the paper was written (1996):
> To provide adequate protection against the most serious threats — well-funded commercial enterprises or government intelligence agencies — keys used to protect data today should be at least `75 bits long`. To protect information adequately for the next `20 years` in  
the face of expected advances in computing, keys in newly-developed systems should be at-least `90 bits long`.