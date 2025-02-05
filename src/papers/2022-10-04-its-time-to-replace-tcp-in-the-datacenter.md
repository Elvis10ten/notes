#It’s Time to Replace TCP in the Datacenter — Paper Summary


Authors: John Ousterhout

Date: 2022

Link: [PDF](https://arxiv.org/pdf/2210.00714.pdf)

-----

1. Requirements for transport protocol used in data centers:
    * Reliable delivery
    * Low latency
    * High throughput: Data throughput and message throughput.
    * Congestion control: This aids in low latency.
    * Efficient load balancing across server cores.
    * NIC offload: In the future, transport protocols will need to move to special-purpose NIC hardware. The best software protocol implementations have end-to-end latency more than 3x as high as implementations where applications communicate directly with the NIC via kernel bypass.
2. The following properties which represent most of the TCP design are the wrong decisions for a data center transport:
    * **Stream orientation**:
        * When messages are serialized in a TCP stream, TCP does not know about message boundaries.
        * The fundamental problem with streaming is that the units in which data is received (ranges of bytes) do not correspond to dispatchable units of work (messages).
        * Messages have one disadvantage relative to streams: it is difficult to pipeline the implementation of a single large message.
        * Memcached load balances by dividing a collection of streams statically among threads. This approach is prone to hot spots, where one thread receives a disproportionate share of incoming requests.
        * RAMCloud load balances by dedicating one thread to read all incoming messages from all streams and then dispatch messages to other threads for service. This allows better load balancing across worker threads, but the dispatcher thread becomes a throughput bottleneck and the need for each request to pass through two separate threads adds significant software overhead.
    * **Connection orientation**: 
        * Connections result in overheads in space and/or time. For example, the Linux kernel keeps about 2000 bytes of state for each TCP socket, excluding packet buffers.
        * Another problem with connections is that they require a setup phase before any data can be transmitted.
        * To reduce these overheads, application threads communicate through a collection of proxy threads that manage single connections to each server. This adds overhead in complexity and performance.
    * **Bandwidth sharing**:
        * In TCP, when a host’s link is overloaded (either for incoming or outgoing traffic), TCP attempts to share the available bandwidth equally among the active connections.
        * When receiving several large messages, bandwidth sharing causes all of them to finish slowly.
        * Run-to-completion approaches provide better overall response time, but can’t be used since TCP doesn’t know message boundaries.
    * **Sender-driven congestion control**:
        * TCP drives congestion control from senders, which voluntarily slow their rate of packet transmission when they detect congestion.
        * TCP congestion control is reactionary — it takes about 1 RTT for a sender to find out about traffic changes.
    * **In-order packet delivery**:
        * TCP assumes that packets will arrive at a receiver in the same order they were transmitted by the sender, and it assumes that out-of-order arrivals indicate packet drops.
        * In data center networks, the most effective way to perform load balancing is to perform packet spraying, where each packet is independently routed through the switching fabric to balance loads on links.
4. **TCP is beyond repair** — there are simply too many problems, and they are too deeply embedded in the design of TCP.
5. **Homa** is a clean-slate redesign of network transport for the data center that provides proof that all of TCP’s problems are solvable:
    * **Homa is message-based**: This enables run-to-completion scheduling; more efficient load balancing because multiple threads can safely read from a single socket and; a more powerful congestion signal.
    * **Homa is connectionless**: Despite its lack of connections, Homa ensures end-to-end reliability for RPCs.
    * **Bandwidth sharing**: Homa implements an SRPT scheduling policy to favor shorter messages.
    > Homa’s use of priority queues eliminates the “pick your poison” tradeoff between latency and bandwidth. Homa intentionally allows some buffers from longer messages to accumulate in low-priority queues (over-commitment); these ensure high link utilization. Short messages still achieve low latency since they use higher priority queues.
    * **Receiver-driven congestion control**.
    * **Out-of-order packets**.
6. Besides Homa, one of the best-known alternatives to TCP is Infiniband. However, it has some similar problems to TCP.
7. The best way to bring Homa into widespread usage is to integrate it with the RPC frameworks that underly most large-scale data center applications.