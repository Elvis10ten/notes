# [WIP] Computer Networking - A Top-Down Approach

## Chapter 3: Transport Layer

### Definition

The **transport layer** is between the **application** and **network layer**.

A **transport-layer protocol** provides for **logical communication** between application processes running on different hosts. **Logical communication** here means that from an application’s perspective, it is as if the hosts running the processes were directly connected.

### High level: How it works

1. On the sending side, the **transport layer** converts the application-layer messages it receives from a sending application process into **transport-layer packets**, known as **transport-layer segments** in Internet terminology.
2. This is done by (possibly) breaking the application messages into smaller chunks and adding a **transport-layer header** to each chunk to create the **transport-layer segment**.
3. The **transport layer** then passes the segment to the **network layer** at the sending end system, where the segment is encapsulated within a **network-layer packet (a datagram)** and sent to the destination.
4. It’s important to note that **network routers** act only on the **network-layer fields** of the
**datagram**; that is, they do not examine the fields of the **transport-layer segment** encapsulated with the **datagram**.
5. On the receiving side, the **network layer** extracts the **transport-layer segment** from the
**datagram** and passes the **segment** up to the **transport layer**. The **transport layer** then processes the received segment, making the data in the **segment** available to the receiving application.

### Relationship Between Transport and Network Layers

1. **Transport-layer protocol** provides **logical communication** between processes running on different hosts, a **network-layer protocol** provides logical-communication between hosts.
2. A critical function of the **transport layer** is to extend the **network layer** delivery service between two end systems to a delivery service between two **application-layer** processes running on the end systems.
3. **Transport-layer protocols** are implemented in the end systems but not in network routers.
4. **Transport protocols** can add certain services not provided by the **network-layer**, eg: reliable delivery, encryption, etc.
Moreover, the services offered by the **transport protocol** are constrained by the **network-layer**, eg: If the network-layer can't make bandwidth or delay guarantees, the transport-layer cannot too.

### Multiplexing & Demultiplexing

1. A process can have multiple open sockets.
2. Sockets have unique identifier on a system.
3. At the receiving end system, the transport layer examines a set of fields that identifies the receiving socket and then directs the segment to that socket.
4.  This job of delivering the data in a **transport-layer segment** to the correct socket
is called **demultiplexing**.
5. The job of gathering data chunks at the source host from different sockets,
encapsulating each data chunk with header information (that will later be used in **demultiplexing**) to create segments, and passing the segments to the network layer is called **multiplexing**.
6. **Transport-layer multiplexing** requires:
i. That sockets have unique identifiers, and
ii. That each segment have special fields that indicate the socket to which the segment is to be delivered
7. These special fields are the **source port number field** and the **destination port number field**.
    
    ![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled.png)
    
8. Each port number is a 16-bit number, ranging from 0 to 65535.
9. The port numbers ranging from **0** to **1023** are called **well-known port numbers** and are restricted.
10. Typically, the client side of the application lets the transport layer automatically (and transparently) assign the port number, whereas the server side of the application assigns a specific port number.

### Connectionless Multiplexing & Demultiplexing

A **UDP socket** is fully identified by a two-tuple consisting of a **destination IP
address** and a **destination port number**.

![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%201.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%201.png)

As shown in above, in the **A-to-B segment** the source port number serves as part of a **“return address”**—when **B** wants to send a segment back to **A**, the destination port in the **B-to-A segment** will take its value from the source port value of the **A-to-B segment**. (The complete return address is **A’s IP address** and the **source port number**).

### Connection-Oriented Multiplexing & Demultiplexing

A TCP socket is identified by a four-tuple: (source IP address, source port number, destination IP address, destination port number).

An example TCP connection flow:

1. The TCP server application has a “welcoming socket,” that waits for connection-establishment requests from TCP clients on port number 12000.
2. The TCP client creates a socket and sends a connection establishment request **segment**.
3. A connection-establishment request is nothing more than a **TCP segment** with destination port number 12000 and a special connection-establishment bit set in the **TCP header**. The segment also includes a **source port number** that was chosen by the client.
4. When the host operating system of the computer running the server process receives the incoming connection-request segment with destination port 12000, it locates the server process that is waiting to accept a connection on port number 12000. The server process then creates a new socket (by accepting it.
5. Also, the transport layer at the server notes the following four values in the connection-request segment: **(1)** the source port number in the segment, **(2)** the IP address of the source host, **(3)** the destination port number in the segment, and **(4)** its own IP address.
The newly created connection socket is identified by these four values; all subsequently arriving segments whose source port, source IP address, destination port, and destination IP address match these four values will be demultiplexed to this socket. With the TCP connection now in place, the client and server can now send data to each other.

![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%202.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%202.png)

Note: If the client and server are using persistent HTTP, then throughout the duration of the persistent connection the client and server exchange HTTP messages via the same server socket (after initial connection).

However, if the client and server use non-persistent HTTP, then a new TCP connection is created and closed for every request/response, and hence a new socket is created and later closed for every request/response.

## Connectionless Transport: UDP

**UDP** does just about as little as a transport protocol can do. Aside from the **multiplexing/demultiplexing** function and some light error checking, it adds nothing to **IP**.

**UDP** takes messages from the application process, attaches **source** and **destination** port number fields for the **multiplexing/demultiplexing** service, adds two other small fields, and passes the resulting segment to the network layer.

The network layer encapsulates the **transport-layer segment** into an **IP datagram** and then makes a **best-effort** attempt to deliver the segment to the receiving host.

If the segment arrives at the receiving host, **UDP** uses the **destination port number** to deliver the **segment’s data** to the correct application process.

**UDP** is connectionless because there is no handshaking between sending and receiving transport-layer entities before sending a segment.

Applications can build reliability/congestion control or any other services provided by TCP on top of UDP (as needed).

**Benefits over TCP**

1. **Finer application-level control over what data is sent, and when**: UDP is suitable for real-time applications as it has no congestion control and doesn't repeatedly retry transmission until acknowledgment.
2. **No connection establishment:** Unlike TCP with its 3-way handshake before data transfer, UDP just sends its data immediately, thereby introducing no connection establishment delays.
3. **No connection state:** TCP maintains connection states in the end-systems like: receive and send buffers, congestion-control parameters, and sequence and acknowledgment number parameters.
UDP has no such connection state. Typically a UDP server devoted to a particular application can support more active clients than a TCP server because of this.
4. **Small packet header overhead:** The **TCP segment** has **20 bytes** of header overhead in every
**segment**, whereas **UDP** has only **8 bytes** of overhead.

![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%203.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%203.png)

### UDP Segment Structure

The UDP segment has 4 **headers** and a **data field** containing application layer data.

Each header field consist of only **2 bytes**.

![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%204.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%204.png)

**Destination port:** Used for demultiplexing, ie, the port numbers allow the destination host to pass the application data to the correct process running on the destination end system.

**Length:** Number of bytes in the UDP segment (data + headers).

**Checksum:** Used for error detection.

### UDP Checksum

UDP uses checksum to detect if bits within the segment has been altered (eg: By noise in the links or when stored on the routers).

UDP at the sender side performs the **1s complement** of the **sum of all the 16-bit words in the segment**, with any **overflow** encountered during the sum being **wrapped around**.

This result is put in the checksum field of the UDP segment.

**Example**

Suppose that we have the following three **16-bit words**:

![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%205.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%205.png)

Note that this last addition had overflow, which was wrapped around. The **1s complement** is obtained by converting all the **0s to 1s** and converting all the **1s to 0s**.

Thus the **1s complemen**t of the sum **0100101011000010** is **1011010100111101**, which becomes the checksum.

At the receiver, all four **16-bit words** are added, **including the checksum**. If no errors are introduced into the packet, then clearly the sum at the receiver will be **1111111111111111**.

If one of the bits is a **0**, then we know that errors have been introduced into the packet.

**Actions when error detected**

When an error is detected, UDP does nothing to recover from it. Some implementation discard the segment, while others deliver the segment to the application with a warning.

Why detect errors

IP is supposed to run over any **layer-2 protocol**, some of which do not offer error-checks. Furthermore, even if segments are correctly transferred across a link, it’s possible that bit errors could be introduced when a segment is stored in a router’s memory.

Given that neither **link-by-link reliability** nor **in-memory error detection** is guaranteed, UDP must apply the **end-to-end principle** and provide error detection on an end-to-end basis.

## Principles of Reliable Data Transfer

With a reliable channel, no transferred data bits are corrupted (flipped from 0 to 1, or vice versa) or lost, and all are delivered in the order in which they were sent.

TCP is a reliable data transfer protocol that is implemented on top of an unreliable (IP) end-to-end network layer.

![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%206.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%206.png)

![Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%207.png](Computer%20Networking%20-%20A%20Top-Down%20Approach%20f9a8b5e3d8804737bd92cc1381c718aa/Untitled%207.png)

In this section, an assumption is made that packets cannot be reordered. Also, only **unidirectional data transfer** is considered.

**Unidirectional data transfer**: data transfer from the sending to the receiving side.

**Bidirectional (that is, full-duplex) data transfer:** Both sides.

RDT = Reliable data transfer protocol

UDT = Unreliable data transfer protocol

### Incrementally building a Reliable Data Transfer Protocol

**Reliable Data Transfer over a Perfectly Reliable Channel: (RDT 1.0)**

**Reliable Data Transfer over a Channel with Bit Errors: (RDT 2.0):**