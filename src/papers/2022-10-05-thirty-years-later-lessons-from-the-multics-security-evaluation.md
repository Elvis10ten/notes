#Thirty Years Later: Lessons from the Multics Security Evaluation — Paper Summary


Authors: Paul Karger & Roger Schell

Date: 2002

Link: [PDF](https://www.acsac.org/2002/papers/classic-multics.pdf)

-----

1. In 1974, the US Air Force published the results of a vulnerability analysis of what was then the most secure operating system available in the industry.
2. This paper revisits those results and relates them to the widespread security problems that the computer industry is suffering from today.
3. The authors claim Multics offered considerably stronger security than most systems commercially available today.
4. One factor for Multics security was the significant reduction of buffer overflows thanks to using PL/I as the implementation language:
    > […] a PL/I programmer would have to work very hard to program a buffer overflow error, while a C programmer has to work very hard to avoid programming a buffer overflow error.
6. > […] The primary difference between an Easter egg and a piece of malicious software is the developer’s intent. […]
7. The paper highlights some of the topics in the Air Force report like installing trap doors; distributing malicious software; dealing with malicious developers; auditing and intrusion detection.
8. The report also made recommendations on enhancements: An essential enhancement was the creation of a verifiable "security kernel" around which the rest of the system could be built.
9. In 2002, very few systems built around such security kernels exist and the authors claim most modern commercial software lacks security features present in Multics.
10. The paper concludes with:
> In our opinion this is an unstable state of affairs. It is unthinkable that another thirty years will go by without one of two occurrences: either there will be horrific cyber disasters that will deprive society of much of the value computers can provide, or the available technology will be delivered, and hopefully enhanced, in products that provide effective security. We hope it will be the latter.  