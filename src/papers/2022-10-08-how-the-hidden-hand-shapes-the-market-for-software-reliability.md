#How the Hidden Hand Shapes the Market for Software Reliability — Paper Summary


Authors: Ken Birman, Coimbatore Chandersekaran, Danny Dolev, Robbert van Renesse

Date: 2006

Link: [PDF](https://www.cs.huji.ac.il/~dolev/pubs/MarketFailure.pdf)

-----

1. This paper suggests that reliability issues endemic in modern distributed systems are as much a sign of market failures as of product deficiencies or vendor negligence:
    > Our contention is that the “hidden hand” [i.e: market forces] explains a series of market failures impacting products in the field of software reliability.  If reliability solutions are to reach mainstream developers, greater attention must be paid to market economics and drivers. 
2. Some of the solutions offered to real-world reliability problems:
    * Transactions and related atomicity mechanisms:
        * Transactions and other notions of atomicity offered a solution to developers: under the (non-trivial!) assumption that data is stored in persistent objects identifiable to the system (database records, Java beans, etc), transactions offer a way to write programs “as if” each application runs on an idle system.
        * The market rejected the casual use of transactions that access multiple servers because of its complexity/cost.
    * Reliable multicast.
    * The theory of distributed computing.
4. Based on the authors' experiences, they believe market acceptance of reliability technology has something to do with the technology, but far more to do with:
    * Impact on the total cost of building, deploying, and operating ”whole story” solutions.
    * Credibility of the long-term vision and process.
    * Compatibility with standard practice.
5. Revisiting a problem in a more realistic context, helps research establish its practical value.
6. The authors go into length about why so past reliability solutions had failed and how some failed solutions were made commercially successful by embracing market concerns (like practicality).
7. The authors also make recommendations for researchers that want to have a commercial impact.