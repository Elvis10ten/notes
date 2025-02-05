#Untraceable Electronic Mail, Return Addresses, and Digital Pseudonyms — Paper Summary


Authors: David L. Chaum

Date: 1981

Link: [PDF](https://dl.acm.org/doi/pdf/10.1145/358549.358563)

-----

> A technique based on public key cryptography is presented that allows an electronic mail system to hide who a participant communicates with as well as the content of the communication--in spite of an unsecured underlying telecommunication system.  
>   
> The technique does not require a universally trusted authority. One correspondent can remain anonymous to a second, while allowing the second to respond via an untraceble return address.  

1. Cryptology is the science of secret communication.
2. Public key cryptography is a solution to the **key distribution problem** — the problem of providing each communicant with a secret key.
3. Another cryptographic problem is the **traffic analysis problem** — the problem of keeping confidential who converses with whom, and when they converse.
4. This paper presents a solution to the **traffic analysis problem** that is based on public key cryptography.
5. A pair of keys `K` and `K⁻¹` is created from a suitable randomly generated seed:
    * `K` = Public key.
    * `K⁻¹` = Private key.
6. `K(X)` = The encryption of `X` with key `K` — It's just the image of `X` under the mapping implemented by the cryptographic algorithm using key `K`.
7. Keys are inverses:
    > <font color="#178e34">K⁻¹(</font><font color="#fd345a">K(</font>X<font color="#fd345a">)</font><font color="#178e34">)</font> = <font color="#fd345a">K(</font><font color="#178e34">K⁻¹(</font>X<font color="#178e34">)</font><font color="#fd345a">)</font> = X
8. A message `X` is sealed with a public key `K` so that only the holder of the private key `K⁻¹` can discover its content.
9. If `X` is simply encrypted with `K`, then anyone could verify a guess that `Y = X` by checking whether `K(Y) = K(X)`:
    * This threat can be eliminated by attaching a large string of random bits `R` to `X` before encrypting.
    * The sealing of `X` with `K` is then denoted by `K(R, X)`.
10. Assumptions:
    * No one can determine anything about the correspondences between a set of sealed items and the corresponding set of unsealed items, or create forgeries without the appropriate random string `R` or private key `K⁻¹`.
    * Anyone may learn the origin, destination(s), and representation of all messages in the underlying telecommunication system and anyone may inject, remove, or modify messages.
11. Mails are sent to a **mix**, instead of directly to the recipient:
    * Let `Kₙ` represent a mix's public key; Where `ₙ` is an integer denoting the position of a mix.
    * Let `Kₐ` represent a recipient's (named `A`) public key.
    * A participant prepares a message `M` for delivery to a participant at address `A` by sealing it with the public key of `A` (`Kₐ`), appending the address `A`, and then sealing the result with the **mix's** public key (`K₁`).
12. One mix protocol:
    * `Sender` -> Packet { <font color="#178e34">K₁(R₁,</font> <font color="#01a4a5">Kₐ(R₀,</font> M<font color="#01a4a5">)</font><font color="#178e34">, A)</font> } -> `Mix₁`
    * The mix decrypts its input with its private key, throws away the random string `R₁`, and outputs the remainder:
        * `Mix₁` peels off one layer of encryption and discovers a forwarding address.
        * Even if `Mix₁` is malicious, it can't read `Kₐ(R₀, M)` because it's encrypted with `A` public key.
        * `Mix₁` -> Packet { <font color="#01a4a5">Kₐ(R₀,</font> M<font color="#01a4a5">)</font> } -> `A`
        * `A` decrypts its input with its private key and obtains the message `M`.
13. Cascade mix protocol:
    * `Sender` -> Packet { <font color="#178e34">Kₙ(Rₙ,</font> <font color="#5b1498">Kₙ₋₁(Rₙ₋₂,</font> ..., <font color="#01a4a5">K₁(R₁,</font> <font color="#fd345a">Kₐ(R₀,</font> M<font color="#fd345a">)</font><font color="#01a4a5">, A)</font> ... <font color="#5b1498">Aₙ₋₂)</font><font color="#178e34">, Aₙ₋₁)</font> } -> `Mixₙ`
    * `Mixₙ` -> Pakcet { <font color="#5b1498">Kₙ₋₁(Rₙ₋₂,</font> ..., <font color="#01a4a5">K₁(R₁,</font> <font color="#fd345a">Kₐ(R₀,</font> M<font color="#fd345a">)</font><font color="#01a4a5">, A)</font> ... <font color="#5b1498">Aₙ₋₂)</font> } -> `Mixₙ₋₁`
    * ...
    * `Mix₂` -> Packet { <font color="#01a4a5">K₁(R₁,</font> <font color="#fd345a">Kₐ(R₀,</font> M<font color="#fd345a">)</font><font color="#01a4a5">, A)</font> } -> `Mix₁`
    * `Mix₁` -> Packet { <font color="#fd345a">Kₐ(R₀,</font> M<font color="#fd345a">)</font> } -> `A`
    * At each step in the cascade, the current mix:
        * Peels off one layer of encryption.
        * Discovers a forwarding address
        * Passes message along.
    * Each mix only knows where a messae came from and where its going.
    * The use of a cascade, or series of mixes, offers the advantage that **any single constituent mix is able to provide the secrecy of the correspondence** between the inputs and the outputs of the entire cascade.
14. The purpose of a mix is to hide the correspondences between the items in its input and those in its output:
    * The order of arrival is hidden by outputting the uniformly sized items in lexicographically ordered batches.
    * Redundant copies (i.e: duplicate input) has to be removed before outputing a batch because this reveals correspondance for that item.
15. A mix can change its public key by announcing the new key in a statement signed with its old private key.
16. A solution for the `recipient` (named `x`) to respond to the `sender` (named `y`) while keeping the identity of the `x` a secret from the `y`:
    * The sender forms an untraceable return address `K₁(R₁, Aₓ), Kₓ`; where:
        * `Aₓ` is its own real address,
        * `Kₓ` is a public key chosen for the occasion, and
        * `R₁` is a key that will also act as a random string for purposes of sealing.
    * Then, `x` can send this return address to `y` as part of a message sent by the techniques already described.
    * The following indicates how `y` uses this untraceable return address to form a response to `x`, via a new kind of mix:
        * <font color="#5b1498">K₁(R₁,</font> <font color="#fd345a">Aₓ</font><font color="#5b1498">)</font>, <font color="#178e34">Kₓ(R₀,</font> M<font color="#178e34">)</font> -> <font color="#fd345a">Aₓ</font>, <font color="#5b1498">R₁(</font><font color="#178e34">Kₓ(R₀,</font> M<font color="#178e34">)</font><font color="#5b1498">)</font>
        * This mix uses the string of bits `R₁` that it finds after decrypting the address part <font color="#5b1498">K₁(R₁,</font> <font color="#fd345a">Aₓ</font><font color="#5b1498">)</font> as a key to re-encrypt the message part <font color="#178e34">Kₓ(R₀,</font> M<font color="#178e34">)</font>.
        * Only the addressee `x` can decrypt the resulting output because x created both `R₁` and `Kₓ`.
    * `x` must supply `y` with a return address for each item of mail `x` wishes to receive.
    * Untraceable return addresses provide the sender of an anonymous letter with a receipt attesting to the fact that the letter appeared intact in the final output batch.
    * Return addresses can be cascaded just like messages.
17. Digital Pseudonyms:
    > A digital pseudonym is a public key used to verify signatures made by the anonymous holder of the corresponding private key.
    A roster, or list of pseudonyms, is created by an authority that decides which applications for pseudonyms to accept, but is unable to trace the pseudonyms in the completed roster.\
    The applications may be sent to the authority anonymously, by untraceable mail, for example, or they may be provided in some other way.
18. Solutions to potential issues:
    * **Frequency-based correlation**: In order to hide the number of messages sent, each participant supplies the same number of messages to each batch (some of which might be randomly addressed dummies).
    * In order to hide the number of messages received, each participant privately searches the entire output for messages directed to it.
    * **Size-based correlation**: Send in fixed size blocks.
    * Timing-based correlation: Send messages at intervals (even if it means sending randomly addressed dummies).
19. The rest of the paper focuses on how the performance of the mailing system can be optimized/improved.