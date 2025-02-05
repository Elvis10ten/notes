#End-to-end arguments in system design — Paper Summary


Authors: J.H. Saltzer, D.P. Reed and D.D. Clark

Date: 1984

Link:   [PDF](https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf)

-----

1. This paper presents a design principle that helps guide the placement of functions among the modules of a distributed computer system.
2. The principle, called the end-to-end argument, suggests that functions placed at low levels of a system may be redundant or of little value when compared with the cost of providing them at that low level.
3. In communicating systems, functions can be implemented:
    * By the communication subsystem
    * By a client
    * As a joint venture
    * Redundantly in all clients.
5. End-to-end argument:
    > The function in question can completely and correctly be implemented only with the knowledge and help of the application standing at the end points of the communication system. Therefore, providing that questioned function as a feature of the communication system itself is not possible. (Sometimes an incomplete version of the function provided by the communication system may be useful as a performance enhancement.)
7. Case study: Reliable file transfer
    * End-to-end reliability: After the sender sends the file, the recipient recalculates the checksum of the received file, and sends this value back to the sender, where it is compared with the checksum of the original file. Only if the two checksums agree does the file transfer application declare the transaction committed.
    * Communication system reliability: Internally, a guarantee of reliable data transmission.
    * Reliability at the communication system level guards against only lost or mangled packets; End-to-end reliability provides more protections:
        * Incorrect data read on the sender due to a hardware fault.
        * Software or hardware faults while buffering or copying the file on the sender or recipient.
    * The amount of effort to put into reliability measures within the data communication system is seen to be an engineering tradeoff based on performance, rather than a requirement for correctness.
9. Pros of end-to-end functions:
    * Simplifies the communication system
10. Cons of end-to-end functions:
    * May increase overall cost, since the communication system is shared by other applications and each application must now provide its implementation of a function.
12. Pros of placing functions in the communication system:
    * Placing a function like a retry protocol in the communication system may be more efficient, since it may be performed inside the network on a hop-by-hop basis, reducing the delay involved in correcting a failure.
13.  Cons of placing functions in the communication system:
    * Since the lower-level subsystem is common to many applications, those that do not need the function will pay for it anyway.
    * The low-level subsystem may not have as much information as the higher levels, so it cannot do the job as efficiently.
14. Performing a function at a low level may be more efficient if the operation can be performed with a minimum perturbation of the machinery already included in the low-level subsystem.
15. Case study: Delivery Guarantees
    * What an application wants to know is that a message was acted upon. This acknowledgment can only be done at the application level, not the lower communication system level (which can only tell that a packet was received by the target host).
17. Case study: Secure transmission of data
    * If the data transmission system performs encryption and decryption:
        * It must be trusted to manage securely the required encryption keys.
        * The data will be in the clear and thus vulnerable as it passes into the target node and is fanned out to the target application.
        * The authenticity of the message must still be checked by the application.
18. Case study: Duplicate message suppression
    > Even if the network suppresses duplicates, the application itself may accidentally originate duplicate requests, in its own failure/retry procedures. These application-level duplications look like different messages to the communication system, so it cannot suppress them; suppression must be accomplished by the application itself with knowledge of how to detect its duplicates.
20. The end-to-end argument is not an absolute rule, but rather a guideline that helps in application and protocol design analysis; one must use some care to identify the endpoints to which the argument should be applied.