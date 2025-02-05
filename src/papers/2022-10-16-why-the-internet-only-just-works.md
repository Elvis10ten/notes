#Why the Internet only just works — Paper Summary


Author: M Handley
Date: 2006
Link: [PDF](http://www0.cs.ucl.ac.uk/staff/m.handley/papers/only-just-works.pdf)

-----

1. Historically and currently, the Internet only just works — not every issue is a cause for concern.
2. While things on the internet change rapidly, the lower level stacks change rarely.
3. The first large-scale packet switching network was the ARPAnet, which was used to come to grips with the main architectural issues that would go on to be the basis of the Internet.
4. The general-purpose successor to the ARPAnet, had to be more flexible: Reliability was separated from addressing and packet transfer in the design of the Internet protocol suite, with IP being separated from `TCP`.
5. Changing a large network is difficult, but possible if there is a strong motivation:
    * `DNS` was rolled out to address a scaling problem and enable decentralized administration. Prior to `DNS`, host name mappings were maintained in a hosts.txt file managed centrally and manually.
6. Congestion is essentially a network-level problem rather than a transport-level problem, as both `UDP` and `TCP` flows can cause congestion.
7. `TCP’s` congestion control mechanism was introduced because it was a simple solution:
    * It’s backwards compatible,
    * Incrementally deployable, and
    * Adequately solved the immediate problem at hand.
9. `TCP’s` congestion control mechanism is insufficient as it’s not the only protocol (albeit being the most used).
10. Technologies get deployed in the core of the Internet when they solve an immediate problem or when money can be made:
    * Money-making changes to the core of the network are rare indeed — in part this is because changes to the core need to be interoperable with other providers to make money, and changes that are interoperable will not differentiate an `ISP` from its competitors.
    * Historically changes have been driven by the need to fix an immediate issue (just in time).
    > What do IP Multicast, Mobile IP, quality of service, and Explicit Congestion Notification (`ECN`) have in common? They are all core network technologies that solve real problems that are not immediately pressing [and hence were not widely deployed].
11. The primary reason for Network address translators (`NATs`) is not a shortage of `IPv4` addresses but tiered pricing — whereby ISPs charge more for additional IP addresses, even though IP addresses do not in fact cost the `ISP` in any significant way.
12. In businesses, `NATs` are frequently cited as a security solution. `NATs` are a poor firewall but have an advantage over traditional firewalls because they fail closed.
13. NATs are unlikely to go away, even if `IPv6` eventually sees widespread deployment.
14. Given ops challenges, a new transport protocol is not going to become widespread on a time-scale shorter than a decade, if ever.
15. The internet’s short-term (i.e: current-term) problems:
    * Spam
    * Security
    * Denial-of-service attacks
    * Application deployment: Things like firewalls and `NATs` impedes the deployment of certain types of apps (e.g: Skype)
16. The internet’s middle-term (i.e: near-term) problems:
    * Congestion control: `TCP’s` congestion control mechanism is quite minimal, basically probing the network repeatedly to see how much traffic can be in flight at a time, and then backing off when overload is detected via packet loss. One issue with `TCP’s` congestion control is `TCP’s` limited dynamic range.
    * Inter-domain routing: For over fifteen years `BGP` has provided inter-domain routing for the Internet. BGP is conceptually very simple — routes to subnets are advertised together with attributes of the path to that subnet. `BGP` is slow to converge; error-prone and easy to misconfigure; and difficult to debug and insecure.
    * Mobility
    * Multi-homing
    * Architectural ossification
18. The internet’s middle-term (i.e: near-term) problems:
    * Address space depletion:
        * > In the early 1990s it became clear that the Internet would run out of IP addresses. `CIDR` was an interim solution to this, and has been quite successful. The rise of `NATs`, from being considered an ugly hack to being nearly ubiquitous, has also reduced the problem somewhat.
        * The long-term solution to the problem of address space depletion is supposed to be IPv6 — but this hasn’t been widely deployed.
19. The author concludes with:
> The Internet was never designed to be optimal for any particular problem — its great strength is that it is a general-purpose network that can support a wide range of applications and a wide range of link technologies. The Internet is also a cost-effective network — it does not make great promises about the quality of service that it provides. It is good enough for a wide range of applications, but anyone considering telesurgery or remote-control of a nuclear power station might well be advised to look somewhere else.  