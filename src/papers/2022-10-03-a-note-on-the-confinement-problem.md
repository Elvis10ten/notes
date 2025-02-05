#A Note on the Confinement Problem — Paper Summary


Authors: Butler W. Lampson

Date: 1972

Link: [PDF](https://dl.acm.org/doi/pdf/10.1145/362375.362389)

-----

1. This note explores the problem of confining an arbitrary program during its execution so that it cannot transmit information to any other program except its caller.
2. A list of possible leaks:
    * Via memory or disk (including temporary files).
    * Via interprocess communication.
    * If the system has interlocks that prevent files from being open for writing and reading at the same time, a program can leak data if it is merely allowed to read files that can be written by its owner. The interlocks allow a file to simulate a shared Boolean variable which one program can set and the other can test.
    * By varying its ratio of computing to input/output or its paging rate, the service can transmit information that a concurrently running process can receive by observing the performance of the system. The communication channel thus established is a noisy one, but the techniques of information theory can be used to devise an encoding that will allow the information to get through reliably no matter how small the effects of the service on system performance are, provided they are not zero. 
4. Confinement Rules:
    * Memoryless — it must not be able to preserve information within itself from one call to another.
    * Total isolation — A confined program shall make no calls on any other program.
    * Transitivity — If a confined program calls another program that is not trusted, the called program must also be confined.