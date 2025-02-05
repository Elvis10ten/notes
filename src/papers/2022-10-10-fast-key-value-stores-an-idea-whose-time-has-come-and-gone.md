#Fast key-value stores An idea whose time has come and gone — Paper Summary


Authors: Atul Adya, Robert Grandl, Daniel Myers, Henry Qin

Date: 2019

Link: [PDF](https://pages.cs.wisc.edu/~rgrandl/papers/link.pdf#page7)

-----

1. Modern internet-scale services often use **remote, in-memory, key-value (RInK)** stores such as Redis and Memcached as:
    * A cache for storage
    * A short-lived data store
2. Stateless application servers bring operational simplicity.
3. A key property of RInK stores is that they provide a simple and domain-agnostic interface (e.g., PUT/GET of string keys and string values, or manipulation of simple data structures such as lists).
4. The domain-agnostic interfaces of RInK stores push cost and complexity back to the application servers:
    * **CPU cost and code complexity**: they force applications to repeatedly convert their internal data structures between native language representations and strings.
    * **Overreads**: Apps might not use the entire value retrieved from a RInK store.
    * **Latency cost**: because of the network distance.
5. The authors argue that these costs are under-appreciated and no longer necessary, given recent improvements in auto-sharding systems.
6. Rather than externalizing in-memory state in a RInK, the authors suggest developers should instead build stateful application servers.
7. If a stateful application server is not feasible, e.g., because state is shared by multiple applications or languages, developers should instead build a custom in-memory store, which is at a network distance and has a domain-specific interface for optimized operations.
8. Although they pose challenges, stateful services offer significant performance improvements. For example, ProtoCache (a component of a widely-used Google application) saw a 40% reduction of 99.9% latency when it made this architectural switch.
9. The authors conducted a test that shows the stateful approach is superior to the stateless service + RInK in terms of per request/response latency and resource utilization:
    * Latency is 29% to 57% better (at the median), with relative improvement increasing with object size.
    * Decreased overreads lead to lower latency and resource utilization.
9. The authors conclude with:
> Stateful architectures offer higher performance by avoiding unnecessary network and (un)marshalling costs, at the expense of higher demands on infrastructure software. To address these demands, we have proposed the LInK (linked in-memory key-value) store and described areas for future research.  