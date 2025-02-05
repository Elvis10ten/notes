#Password Security: A Case History — Paper Summary


Authors: Robert Morris and Ken Thompson

Date: 1978

Link: [PDF](https://dl.acm.org/doi/pdf/10.1145/359168.359172)

-----

1. This paper describes the history of the design of the password security scheme on a remotely accessed time-sharing system.
2. The present design was the result of countering observed attempts to penetrate the system. The result is a compromise between extreme security and ease of use.
3. The password system must be able to:
    * Prevent any access to the system by unauthorized users
    * Prevent users who are already logged in from doing things that they are not authorized to do. 
2. Good system security involves realistic evaluation of the risks not only of deliberate attacks but also of casual authorized access and accidental disclosure.
3. The UNIX system was first implemented with a password file that contained the actual passwords of all the users, and for that reason, the password file had to be heavily protected against being either read or written. The technique is excessively vulnerable to lapses in security.
4. Encrypting passwords was the obvious first solution to the system.
5. However, given most humans are prone to use simple passwords, an attacker can use brute force (key search) to determine the actual (unencrypted) passwords.
6. Improvements to the First Approach:
    * Slower Encryption
    * Less predictable password requirement
    * Salted passwords
8. Whenever any security procedure is set up to deny access to unauthorized persons, it is wise to keep a record of both successful and unsuccessful attempts to get to the secured resource.