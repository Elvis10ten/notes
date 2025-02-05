#Why Events Are A Bad Idea (for high-concurrency servers) — Paper Summary


Today's summary is about a  [paper](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/vonbehren/vonbehren.pdf) written in 2003 by Rob von Behren, Jeremy Condit and Eric Brewer.

-----

1. The four primary arguments for the supremacy of events:
    *  Inexpensive synchronization due to cooperative multitasking.
    * Lower overhead for managing state (no stacks).
    * Better scheduling and locality, based on application-level information.
    * More flexible control flow (not just call/return).
2. Lauer and Needham [showed](https://dl.acm.org/doi/10.1145/850657.850658) in 1978 that message-passing (i.e: event) systems and process-based systems are duals, both in terms of program structure and performance characteristics.
3. “Problems” with threads:
    * **Performance criticism** — Many attempts to use threads for high concurrency have not performed well.
        * The authors argue that this is an artifact of poor thread implementations.
        * > A major source of overhead is the presence of operations that are O(n) in the number of threads. Another common problem with thread packages is their relatively high context switch overhead when compared with events. This overhead is due to both preemption, which requires saving registers and other states during context switches, and additional kernel crossings (in the case of kernel threads).
    * **Control-flow criticism** — Threads have restrictive control flow.
        * The authors argue that complicated control-flow patterns are rare in practice. Common control-flow patterns are simple: call/return, parallel calls, and pipelines.
        * > The only patterns we considered that are less graceful with threads are dynamic fan-in and fan-out; such patterns might occur with multicast or publish/subscribe applications. In these cases, events are probably more natural.
    * **Synchronization criticism** — Thread synchronization mechanisms are too heavyweight.
        * The authors argue that cooperative thread systems can also get synchronization for “free” — i.e: cooperative multitasking instead of preemptive scheduling.
    * **State Management criticism** — Thread stacks are an ineffective way to manage live-state.
        * Threaded systems typically face a tradeoff between potential stack overflow and wasted space because of fixed-size stacks.
        * Event systems avoid this problem because they typically use a few threads and unwind the thread stack after each event handler.
        * The authors argue this problem can be solved with dynamic stack growth.
    * **Scheduling criticism** — The virtual processor model provided by threads forces the runtime system to be too generic and prevents it from making optimal scheduling decisions.
        * Event systems are capable of scheduling event deliveries at the application level. This allows for various optimizations: allowing better code locality by running several of the same kind of event in a row; performing shortest remaining completion time scheduling; etc
        * The authors argue that Lauer-Needham duality indicates that the same scheduling tricks can be applied to cooperatively scheduled threads.
4. The case for threads:
    * **Control Flow** —For high-concurrency systems, event-based programming tends to obfuscate the control flow of the application.
    * **Exception Handling and State Lifetime** — Cleaning up task state after exceptions and after normal termination is simpler in a threaded system since the thread stack naturally tracks the live state for that task.
    * **Runtime dispatch**: Event systems require various forms of runtime dispatch, since the next event handler to execute is not known statically. This problem is related to the problem of ambiguous control flow, which affects performance by reducing opportunities for compiler optimizations and by increasing CPU pipeline stalls.
    * Trying to fix these event issues effectively duplicates the syntax and run-time behavior of threads.
6. How compilers can support threads:
    * **Dynamic Stack Growth** — Determining upper bounds for dynamic stack growth.
    * **Live State Management** — Compilers can purge unnecessary states from the stack before making function calls.
    * **Synchronization** — Compile-time analysis can reduce the occurrence of bugs by warning the programmer about data races.
7. The authors ran a test to show that a well-designed thread package can achieve the same scaling behavior as a well-designed event system.