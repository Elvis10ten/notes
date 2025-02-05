#Don’t Thrash: How to Cache your Hash on Flash — Paper Summary


Authors:  Michael A. Bender, Martin Farach-Colton, Rob Johnson, Russell Kraner, Bradley C. Kuszmaul, Dzejla Medjedovic, Pablo Montes, Pradeep Shetty, Richard P. Spillane, Erez Zadok

Date: 2012

Link: [PDF](http://supertech.csail.mit.edu/papers/BenderFaJo12.pdf)

-----

1. This paper describes the **Cascade Filter**, an **approximate-membership-query** (AMQ) data structure that scales beyond main memory, supporting over half a million insertions/deletions per second and over 500 lookups per second on a commodity flash-based SSD.
2. An AMQ data structure is a dictionary that trades off space for a false positive rate on membership queries.
3. The Bloom filter is a well-known example of an AMQ; but it doesn’t scale beyond main memory.
4. An AMQ data structure supports the following dictionary operations on a set of keys:
    * Insert
    * Lookup
    * Optionally delete.
5. For a key in the set, lookup returns `present`.
6. For a key not in the set, lookup returns `absent` with probability at least `1 − ε`, where `ε` is a tunable false-positive rate. There is a tradeoff between `ε` and space consumption.
7. Bloom filters require about one byte per stored data item.
8. A **quotient Filter** (QF) is an in-memory AMQ data structure that is functionally similar to a Bloom filter, but lookups incur a single cache miss, as opposed to at least two in expectation for a Bloom filter.
9. The **Cascade Filter** (CF) comprises a collection of QFs organized into a data structure inspired by the Cache-Oblivious Lookahead Array (COLA).
10.  A rotational disk performs only `100–200` (random) I/Os per second.
11. The Cascade Filter supports insertions at rates 40 times faster than a Bloom filter with buffering and 3,200 times faster than a traditional Bloom filter. Lookup throughput is 3 times slower than that of a Bloom filter or about the cost of 6 times random reads on flash.