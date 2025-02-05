#On the Relevance of IP Address in the Tracking Ecosystem — Paper Summary


Today's summary is about a  [paper](https://hal.inria.fr/hal-02435622/document) written in 2020.

-----

1. To resiliently keep track of a user across different browsing sessions and websites, trackers generate a Unique User IDentifier (UUID) that is stored on the user’s device, replicated through different storage mechanisms:
    * Browser’s storage APIs: cookies, local storage, or indexedDB.
    * Browser features that can also be used for storage: HTTP E-Tag header.
2. There are also stateless tracking techniques, such as browser fingerprinting, that do not require storing any identifiers on the user’s device.
3. Countermeasures against tracking range from simple browser extensions based on filter lists and heuristics to more complex machine learning-based approaches.
4. As of today, none of the popular browsers protect against IP address-based tracking techniques.
5.  An Internet Protocol (IP) address is a numerical label assigned to each device connected to a computer network that uses IP for communication.
6. IP serves two main functions:
    * Host or network interface identification
    * Location addressing.
8. The IP address space is managed by the Internet Assigned Numbers Authority (IANA) and by 5 regional registries for different parts of the world. These registries assign blocks of addresses to Internet Service Providers (ISP) who further assign an IP address to each device connected to its network.
9. IP addresses can be static or dynamic.
10. Static IP addresses are used to host services and are more expensive.
11. Most residential IP addresses are dynamic, allowing the ISP to optimize how the address space is used. They are assigned by the ISP using the Dynamic Host Configuration Protocol (DHCP), and each address is given a lease with an expiry period. If the lease is not renewed before the expiry period, the address is released back to the DHCP server and can then be assigned to a different device.
12. The authors conducted a study over 111 days, with 41,566 unique IP addresses from 5,443 users.
13. The authors compute the retention period of each IP address for every user in the study by finding the time between the first and the last time the IP address appeared in the study dataset for that user.
14. > Our analyses and observations show that users have both short and long-lived (retained) IP addresses. This can intuitively be explained by the fact that IP addresses are a proxy to user behavior, as users travel, they connect to new networks and obtain short-lived IP addresses. However, other networks are more prevalent in the user’s routine, for example, their home or work networks, or the WiFi hotspot of their favorite places. Moreover, whenever IP addresses do change, much of the time the changes involve the least-significant octet of the address (e.g: 89.158.242.220 -> 89.158.242.120).
15. Mobile network IP addresses are commonly shared by multiple users because of carrier-grade NAT, it is less the case for residential IP addresses.
16. A study in 2013, showed that human mobility traces are highly unique: 95 % of individuals from a dataset of 1.5 million individuals can be uniquely identified if their location is specified hourly.
17. IP address cycles are a proxy to user behavior and daily routines:
    > If we observe the same IP address multiple times for a given user over long durations, and this IP address is interleaved by other IP addresses, this likely means that the user reconnected through the same network, from the same physical location as before.
18. > The fact that IP addresses are retained and reused for a long time alone cannot be exploited to track people over time. Multiple users can share the same IP address behind a NAT router. For instance, in our dataset, 1,046 users share 1 IP with another user. However, we observed in our dataset that multiple IP addresses are reused and retained for a long duration by a user. The chances that two users connect to the same network at multiple locations and share multiple IP addresses are quite low. Thus, a set of IP addresses retained by a user over a long duration can be considered to be unique, as well as stable, for a long duration.
19. The stability of individual IP addresses combined with the uniqueness of sets of IP addresses involved in the cycles creates an important privacy threat.