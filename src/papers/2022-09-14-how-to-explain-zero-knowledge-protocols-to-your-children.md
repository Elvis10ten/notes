#How to Explain Zero-Knowledge Protocols to Your Children — Paper Summary


Today's summary is about a [paper](https://pages.cs.wisc.edu/~mkowalcz/628.pdf) written by  [Jean-Jacques Quisquater](https://en.m.wikipedia.org/wiki/Jean-Jacques_Quisquater) and others in 1990.

I felt I should  leave my notes only instead of summarizing because:
1. The paper is short already (barely 4 pages)
2. I found the story interesting.
3. The paper is very accessible.

-----

## Notes:
These are the questions I had while reading the paper and the texts that clarified them for me.
1. What is a zero knowledge protocol?
    > A **zero-knowledge proof** or **zero-knowledge protocol** is a method by which one party (the prover) can prove to another party (the verifier) that a given statement is true while the prover avoids conveying any additional information apart from the fact that the statement is indeed true. — [Wikipedia](https://en.wikipedia.org/wiki/Zero-knowledge_proof)  
2. Why does the reporter have to flip a coin and interact with Mick, when he can watch him enter from side and leave from the other side?
    > The point of zero-knowledge is that an external observer should not be able to be verify the proof, only the parties involved.  

    > This section about the simulation of the proof might seem confusing but it is worth thinking about. This concept of simulator is often used to prove that a certain interactive proof is a zero-knowledge proof. In the simulation, the prover did not know anything about the secret. Yet the the simulated and the genuine transcript (in this case, tape) are indistinguishable to a third party. This means that absolutely no knowledge of the secret can be extracted from the original tape (because that would imply that that same knowledge could be extracted from the simulation, where the prover knew nothing about the secret). — [FermatsLibrary](https://fermatslibrary.com/s/how-to-explain-zero-knowledge-protocols-to-your-children)  

    > A protocol implementing zero-knowledge proofs of knowledge must necessarily require interactive input from the verifier. This interactive input is usually in the form of one or more challenges such that the responses from the prover will convince the verifier if and only if the statement is true, i.e., if the prover _does_ possess the claimed knowledge. If this were not the case, the verifier could record the execution of the protocol and replay it to convince someone else that they possess the secret information. — [Wikipedia](https://en.wikipedia.org/wiki/Zero-knowledge_proof)  