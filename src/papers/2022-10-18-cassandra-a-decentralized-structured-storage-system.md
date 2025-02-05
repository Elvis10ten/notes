#Cassandra - A Decentralized Structured Storage System — Paper Summary


Authors: Avinash Lakshman &
Prashant Malik (Facebook folks)

Date: 2011

Link: [PDF](https://www.cl.cam.ac.uk/~ey204/teaching/ACS/R212_2014_2015/papers/lakshman_ladis_2009.pdf)

-----

1. Cassandra is a distributed storage system for managing very large amounts of structured data spread out across many commodity servers, while providing highly available service with no single point of failure.
2. Data model:
    * A table in Cassandra is a distributed multi-dimensional map indexed by a key.
    * The value is an object which is highly structured.
    * The row key in a table is a string with no size restrictions, although typically 16 to 36 bytes long.
    * Every operation under a single row key is atomic per replica no matter how many columns are being read or written into.
    * Columns are grouped together into sets called column families very much similar to what happens in the Bigtable system.
    * Cassandra exposes two kinds of columns families: Simple and Super column families.
    * Super column families can be visualized as a column family within a column family.
3. Client API:
    * `insert(table, key, rowMutation)`
    * `get(table, key, columnName)`
    * `delete(table, key, columnName)`
4. Typically a read/write request for a key gets routed to any node in the Cassandra cluster:
    * The node then determines the replicas for this particular key.
    * For **writes**, the system routes the requests to the replicas and waits for a quorum of replicas to acknowledge the completion of the writes.
    * For reads, based on the consistency guarantees required by the client, the system either routes the requests to the closest replica or routes the requests to all replicas and waits for a quorum of responses.
6. Cassandra partitions data across the cluster using consistent hashing but uses an order pre- serving hash function to do so.
7. The authors describes the core distributed systems techniques used in Cassandra: partitioning, replication, membership, failure handling and scaling.