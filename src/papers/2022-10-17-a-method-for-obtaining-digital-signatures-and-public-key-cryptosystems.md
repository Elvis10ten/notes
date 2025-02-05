#A Method for Obtaining Digital Signatures and Public-Key Cryptosystems — Paper Summary


Authors: R.L. Rivest, A. Shamir, and L. Adleman

Date: 1978

Link: [PDF](https://people.csail.mit.edu/rivest/Rsapaper.pdf)

-----

1. The authors present an encryption method with the novel property that publicly revealing an encryption key does not thereby reveal the corresponding decryption key. This has two important consequences:
    * Alice can publicly reveal her encryption key, and Bob can use the key to encrypt messages that ONLY Alice can read.
    * Alice can “sign” a message using her privately held decryption key. Anyone can verify this signature using the corresponding publicly revealed encryption key.
2. A **trapdoor function** is a function that is easy to compute in one direction, yet difficult to compute in the opposite direction (finding its inverse ) without special information, called the "trapdoor".
3. A **one-way function** is a  function that is easy to compute on every input, but hard to invert given the image of a random input.
4. > An encryption (or decryption) procedure typically consists of a **general method** and an **encryption key**. The **general method**, under the control of the **key**, enciphers a message `M` to obtain the enciphered form of the message, called the ciphertext `C`. Everyone can use the same general method; the security of a given procedure will rest on the security of the key.
5. Encryption is the standard means of rendering a communication private.
6. How user **Bob** can send **Alice** a “signed” message `M`:
    * He first computes his “signature” `S` for the message `M` using his decryption key `DB`: `S = DB(M)` . (Deciphering an unenciphered message: each message is the ciphertext for some other message.)
    * He then encrypts `S` using **Alice’s** public encryption key `EA` (for privacy), and sends the result `EA(S)` to **Alice**.
    * He need not send `M` as well; it can be computed from `S`.
    * **Alice** first decrypts the ciphertext with `DA` to obtain `S`.
    * She then extracts the message with the public encryption procedure of the sender, in this case, `EB`: `M = EB(S) `.
    * Alice cannot modify `M` to a different version `M′`, since then she would have to create the corresponding signature `S′ = DB(M′)` as well.
8. Users can fetch the other users' public keys from a public directory. To prevent an attacker from injecting their keys into the directory, all message from the public directory is signed. The public key for the public directory can be given to the user when they join the network — so they don’t have to look it up again.
9. **Proposed encryption method**:
    * `M` = Message to encrypt
    * (`e`, `n`) = Pair of positive integers = the public encryption key.
    * Represent the message `M` as an integer between `0` and `n − 1`. (Break a long message into a series of blocks, and represent each block as such an integer.)
    * The ciphertext `C` = Raise the numeric representation of the message to the `eth` power modulo `n`.
    * `C ≡ E(M) ≡ Mᵉ (mod n)`, for a message `M` .
9. Encryption does not increase the size of a message; both the message and the ciphertext are integers in the range `0` to `n − 1`.
10. **Proposed decryption method**:
    * To decrypt the ciphertext `C`, raise it to another power `d`, modulo `n`.
    * * (`d`, `n`) = Pair of positive integers = the private decryption key.
    *  `D(C) ≡ Cᵈ (mod n)`, for a ciphertext `C` .
11. `n = p · q`; where:
    * `p` and `q` are private, “random” and very large primes.
    * These numbers must be large so that it is not computationally feasible for anyone to factor `n = p · q`.
    * The authors recommend that `p` and `q` have 100 digits; hence `n` will have 200 digits.
    * Longer or shorter lengths can be used depending on the relative importance of encryption speed and security in the application at hand.
    * As at the time of writing, factoring a 200-digit number using the best factoring algorithm will take about `3.8 × 10⁹` years.
12. `d` = large, random integer which is relatively prime to `(p − 1) · (q − 1)`. That is, check that `d` satisfies:
`gcd(d, (p − 1) · (q − 1)) = 1`
13. The integer `e` is finally computed from `p`, `q`, and `d` to be the “multiplicative inverse” of `d`, modulo `(p−1)·(q−1)`. That is:
    `e·d≡1 (mod(p−1)·(q−1))`.
14. The security of the system rests in part on the difficulty of factoring the published divisor, `n`.
15. The authors have this to say about breaking the system:
> Although this problem of “computing `e-th `roots modulo `n` without factoring `n`” is not a well-known difficult problem like **factoring**, we feel reasonably confident that it is computationally **intractable**.  
> It may be possible to prove that any general method of breaking our scheme yields an efficient factoring algorithm. This would establish that any way of breaking our scheme must be as difficult as factoring. We have not been able to prove this conjecture, however.  
> Our method **should be certified by having the above conjecture of intractability withstand a concerted attempt to disprove it**.