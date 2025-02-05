#Blockchains from a Distributed Computing Perspective — Paper Summary


Today's summary is about a draft  [paper](https://cs.brown.edu/courses/csci2952-a/papers/perspective.pdf) written by Maurice Herlihy in 2019.

> This article is a tutorial on the basic notions and mechanisms underlying blockchains, colored by the perspective that much of the blockchain world is a disguised, sometimes distorted, mirror-image of the distributed computing world.  

-----

1. The abstraction at the heart of blockchain systems is the notion of a ledger: an indelible append-only log of transactions that take place between various parties.
2. A ledger establishes which transactions happened (in order).
3. A consensus protocol involves a collection of parties, some of whom are honest, and follow the protocol, and some of whom are dishonest, and may depart from the protocol for any reason (crash or Byzantine failures).
4. In consensus, each party proposes a transaction to append to the ledger, and one of these proposed transactions is chosen. Consensus ensures:
    * Agreement: all honest parties agree on which transaction was selected
    * Termination: all honest parties eventually learn the selected transaction, and
    * Validity: the selected transaction was proposed by some party.
5. A byzan­tine fault-tolerant consensus protocol ensures that transactions cannot be distorted by a small number of faulty or corrupted parties.
6. Tamper-proofing a new ledger entry involves including a hash of the previous entry in the new entry.
7. Signing transactions establish authenticity and “eliminates” impersonation fraud.
8. Modern cryptography is based on the notions of matching public and private keys. Encrypting a message with Alice’s public key yields a message only Alice can read, and encrypting a message with Alice’s private key yields a digital signature, a message everyone can read but only Alice could have produced.
9. Knowledge of a private key confers ownership.
10. Public key enables proof of ownership.
11. The ledger conveys value: it establishes the link between the public key and X with an entry saying: “Anyone who knows the secret key matching the following public key owns n number of X”. Where X is a variable for an item/coins, etc.
12. An unspent transaction output (UTXO) represents some amount of digital currency which has been authorized by one account to be spent by another. UTXOs use public key cryptography to identify and transfer ownership between holders of public/private key pairs. UTXOs are formatted with the recipient's public key, thus restricting the ability to spend that UTXO to the account that can prove ownership of the associated private key.
13. A Sybil attack is a type of security assault where one person tries to take over the network by creating multiple nodes.
14. Solutions to a Sybil attack:
    * Identity verification — things like IP addresses are easily forged.
    * Costly signal­ing — the most common is proof of work (PoW).
14. > Essentially the same problem arises when organizing a street gang: how to ensure that someone who wants to join the gang is not a plain-clothes police officer, newspaper reporter, or just a freeloader? One approach is what sociologists call **costly signal­ing**: the candidate is required to do something expensive and hard to fake, like robbing a store or getting a gang symbol tattoo.
15. In the PoW lottery, miners compete to solve a useless puzzle, where solving the puzzle is hard, but proving one has solved the puzzle is easy.
    > Simplifying things for a moment, the first miner to solve the puzzle wins the consensus and gets to choose the next block to append to the ledger. That miner also receives a fee, but the other miners receive nothing and must start over on a new puzzle.

    > As hinted, the previous paragraph was an oversimplification. In fact, PoW consensus is not really consensus. If two miners both solve the puzzle at about the same time, they could append blocks to the blockchain in parallel, so that neither block precedes the other in the chain. When this happens, the blockchain is said to fork. Which block should subsequent miners build on? The usual answer is to build on the block whose chain is the longest.

    > As a result, there is always some uncertainty whether a transac­tion on the blockchain is permanent, although the probability that a block, once on the blockchain, will be replaced decreases exponen­tially with the number of blocks that follow it.
17. A private (or permissioned) blockchain sys­tem is where parties have reliable identities, and only vetted parties can participate.
18. A public (or permissionless) blockchain system is where parties cannot be reliably identified, and anyone can partici­pate.
19. Although PoW was invented by Dwork and Naor as a way to con­trol spam, Nakamoto’s application of PoW to large-scale consensus was a genuine innovation.
20. Most blockchain systems also provide some form of scripting lan­guage to make it easier to add functionality to ledgers (often called smart contracts).
21. Bitcoin provides a rudimentary scripting language, while Ethereum provides a Turing-complete scripting language.
22. Some examples of simple contract functionality:
    * A hashlock `h` prevents an asset from being transferred until the contract receives a matching secret `s`, where `h = H(s)`, for `H` a cryptographic hash function.
    * A timelock `t` prevents an asset from being transferred until a specified future time `t`.
23. Smart contracts are used for:
    * Off-chain trans­actions, where assets are transferred back and forth off the blockchain for efficiency, using the blockchain only to settle bal­ances at infrequent intervals.
    * Atomic cross-chain swap — allows two parties to trade tokens from two different blockchains.
24. A cryptographic hash function `H(·)` has the property that for any value `v`, it is easy to compute `H(v)`, but it is infeasible to discover a `v ≠ ′ v` such that `H(v ′ ) = H(v)`.

## Proof of work puzzles
> Here is a puzzle typical of those used in PoW implementations. Let `b` be the block the miner wants to append to the ledger, `H(·)` a cryptographic hash function, and `“·”` concatenation of binary strings. The puzzle is to find a value `c` such that `H(b · c) < D`, where `D` is a difficulty setting (the smaller `D`, the more difficult). Because `H` is difficult to invert, there is no way to find `c` substantially more efficiently than an exhaustive search.  