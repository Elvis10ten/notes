#Identity-based Cryptosystems and Signature Schemes — Paper Summary


Author: Adi Shamir.

Date: 1985

Link: [PDF](https://link.springer.com/content/pdf/10.1007/3-540-39568-7_5.pdf)

-----

1. The author introduces a novel type of cryptographic scheme, which enables any pair of users to communicate securely and to verify each other's signatures without exchanging private or public keys, without keeping key directories, and without using the services of a third party.
2. The scheme is based on a public key cryptosystem with an extra twist: Instead of generating a random pair of public/private keys and publishing one of these keys, the user chooses a combination of identifiers as their **public key**. Example identifier combination: name and network address.
3. The identifiers chosen must satisfy two conditions:
    * It uniquely identifies the user in a way they cannot later deny.
    * It’s readily available to the other party.
4. The scheme assumes the existence of trusted key generation centers, whose sole purpose is to give each user their **private key** when they first join the network.
5. When `user A` wants to send a message to `user B`:
    * He signs the message with his secret key.
    * Adds his `own identifier` (e.g: name and network address) to the result.
    * Encrypts the result by using `B's identifier`.
    * Sends it to `B`.
    * When `B` receives the message, he decrypts it using his secret key.
    * Then verifies the signature by using the sender's identifier as a verification key.
6. The secret keys must be computed by a key generation center rather than by the users since there is nothing special about a user's identity: If `user A` could compute the secret key that corresponds to the `public key "A"`, he could also compute the secret keys that correspond to the `public keys "B"`, `"C"`, etc.
7. The overall security of the scheme depends on the following points:
    * The security of the underlying cryptographic functions.
    * The secrecy of the privileged information stored at the key generation centers.
    * The thoroughness of the identity checks performed by the centers before they issue keys.
    * The precautions taken by users to prevent the unauthorized use of their keys.
7. In identity-based schemes, the encryption key is the user's identity, and the decryption key is derived from the user's identity and a random seed.