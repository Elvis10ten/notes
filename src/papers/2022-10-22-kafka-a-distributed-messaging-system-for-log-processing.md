#Kafka: a Distributed Messaging System for Log Processing — Paper Summary


Authors: Jay Kreps, Neha Narkhede, Jun Rao (LinkedIn folks)

Date: 2011

Link: [PDF](http://notes.stephenholiday.com/Kafka.pdf)

-----

1. There is a large amount of “log” data generated at any sizable internet company:
    * User activity events
    * Operational metrics and
    * System metrics such
2. Every day, China Mobile collects `5–8TB` of phone call records and Facebook gathers almost `6TB` of various user activity events.
3. Many early systems for processing this kind of data relied on physically scraping log files off production servers for analysis.
4. Issues with traditional enterprise messaging systems for log processing:
    * Those systems often focus on offering a rich set of delivery guarantees.
    * Many systems do not focus as strongly on throughput as their primary design constraint.
    * Those systems are weak in distributed support.
    * Many messaging systems assume near-immediate consumption of messages, so the queue of unconsumed messages is always fairly small.
5. Issues with specialized log aggregators like Facebook Scribe:
    * Most of these systems are built for consuming the log data offline.
    * Most of them use a “push” model in which the broker forwards data to consumers. Pulling data eliminates the problem that data is being pushed faster than the consumer can handle and allows the consumer to “rewind”.
6. Kafka is a novel messaging system for log processing called that combines the benefits of traditional log aggregators and messaging systems.
7. Kafka benefits:
    * Kafka is distributed, scalable, and offers high throughput.
    * Kafka provides an API similar to a messaging system and allows applications to consume log events in real-time. 
8. Kafka basic concepts:
    * A stream of messages of a particular type is defined by a **topic**.
    * A **producer** can publish messages to a **topic**.
    * The published messages are then stored at a set of servers called **brokers**.
    * A **consumer** can subscribe to one or more topics from the **brokers**, and consume the subscribed messages by pulling data from the **brokers**.
9. Sample production code (not the exact API):
```java
producer = new Producer(...);
message = new Message(“test message str”.getBytes());
set = new MessageSet(message);
producer.send(“topic1”, set);
```
10. Sample consumer code:
```java
streams[] = Consumer.createMessageStreams(“topic1”, 1);
for (message : streams[0]) {
    bytes = message.payload();
    // do something with the bytes
}
```
11. A Kafka cluster typically consists of multiple brokers: To balance the load, a topic is divided into multiple partitions, and each broker stores one or more of those partitions.
12. Each producer can publish a message to either a randomly selected partition or a partition semantically determined by a **partitioning key** and a **partitioning function**.
13. Design decisions:
    * **Simple storage**:
        * Each partition of a topic corresponds to a logical log. Physically, a log is implemented as a set of segment files of approximately the same size (e.g., 1GB).
        * Every time a producer publishes a message to a partition, the broker simply appends the message to the last segment file.
        * For better performance, the segment files are flushed to disk only after a configurable number of messages have been published or a certain amount of time has elapsed.
        * Unlike typical messaging systems, a message stored in Kafka doesn’t have an explicit message id. Each message is addressed by its logical offset in the log. This avoids the overhead of maintaining index structures that map the message ids to the actual message location.
        * A consumer always consumes messages from a particular partition sequentially. If the consumer acknowledges a particular message id, it implies that the consumer has received all messages before that id in the partition.
    * **Efficient transfer**:
        * Publishing messages can be batched.
        * Consuming messages are batched internally.
        * Kafka relies on the underlying file system page cache. This avoids double buffering, reduces process memory overhead, and a warm cache is retained even when a broker process is restarted.
        * A typical approach to sending bytes from a local file to a remote socket involves the following steps:
            * Read data from the storage media to the page cache in an OS
            * Copy data in the page cache to an application buffer
            * Copy the application buffer to another kernel buffer
            * Send the kernel buffer to the socket.
        This includes `4 data copying` and `2 system calls`. On Linux and other Unix OS, Kafka exploits the **sendfile API** that can directly transfer bytes from a file channel to a socket channel. This typically avoids `2 of the copies `and `1 system call` introduced in steps (2) and (3).
    * **Stateless broker**: Unlike most other messaging systems, in Kafka, the information about how much each consumer has consumed is not maintained by the broker, but by the consumer itself.
13. Kafka has the concept of **consumer groups**. Each consumer group consists of one or more consumers that jointly consume a set of subscribed topics, i.e., each message is delivered to only one of the consumers within the group. Different consumer groups each independently consume the full set of subscribed messages and no coordination is needed across consumer groups.
14. Kafka uses Zookeeper for the following tasks:
    * Detecting the addition and the removal of brokers and consumers
    * Triggering a rebalance process in each consumer when the above events happen, and
    * Maintaining the consumption relationship and keeping track of the consumed offset of each partition.
15. Kafka only guarantees at-least-once delivery.
16. Kafka guarantees that messages from a single partition are delivered to a consumer in order. However, there is no guarantee on the ordering of messages coming from different partitions.
17. To avoid log corruption, Kafka stores a **CRC** for each message in the log.
18. The authors performed a benchmark against ActiveMQ and RabbitMQ and found out that Kafka producers and consumers are faster for the use cases they were designed for — thanks to the design decisions outlined above.