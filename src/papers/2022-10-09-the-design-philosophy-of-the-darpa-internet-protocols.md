#The Design Philosophy of the DARPA Internet Protocols — Paper Summary


Author: David D. Clark

Date: 1988

Link: [PDF](http://education.sigcomm.org/papers/c88.pdf)

-----

1. This paper attempts to capture some of the early reasoning which shaped the Internet protocols.
2. The top level goal for the DARPA Internet Architecture was to develop an effective technique for multiplexed utilization of existing interconnected networks.
3. Incorporating existing network architecture instead of creating a new unified system was done for pragmatic reasons.
4. The components of the Internet were networks, which were to be interconnected to provide some larger service.
5. Packet switching was chosen for multiplexing instead of circuit switching because of the nature of the apps being supported (like remote login) and the networks to be integrated were packet switching networks.
6. Store and forward packet switching was chosen as the technique for interconnecting these networks because it was well understood and demonstrated in the previous DARPA project, the ARPANET. The top level assumption was that networks would be interconnected by a layer of Internet packet switches called gateways.
7. > From these assumptions comes the fundamental structure of the Internet: a packet switched communica- tions facility in which a number of distinguishable networks are connected together using packet communi- cations processors called gateways which implement a store and forward packet forwarding algorithm.
8. A set of priorities (in order of importance) which strongly colored the design decisions within the Internet architecture:
    * Internet communication must continue despite loss of networks or gateways:
        * At the service interface of the transport layer, this architecture provides no facility to communicate to the client of the transport service that the synchronization between the sender and the receiver may have been lost.
        * Instead of replicating state information across intermediate packet switching nodes, the architecture chosen stores transport level information in the host which is attached to the net and uses its communication service.
    * The Internet must support multiple types of communications service.
    * The Internet architecture must accommodate a variety of networks.
    * The Internet architecture must permit distributed management of its resources.
    * The Internet architecture must be cost effective.
    * The Internet architecture must permit host attachment with a low level of effort.
    * The resources used in the internet architecture must be accountable.
9. The most serious source of delay in networks is the mechanism to provide reliable delivery.
10. The fundamental architectural feature of the Internet is the use of datagrams as the entity which is transported across the underlying networks:
    * They eliminate the need for connection state within the intermediate switching nodes, which means that the Internet can be reconstituted after a failure without concern about state.
    * Provides a basic building block out of which a variety of types of service can be implemented.
    * Represents the minimum network service assumption, which has permitted a wide variety of networks to be incorporated into various internet realizations.