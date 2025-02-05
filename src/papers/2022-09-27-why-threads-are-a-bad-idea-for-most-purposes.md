#Why Threads Are A Bad Idea (for most purposes) — Paper Summary


Today's summary is about a  [paper](https://web.stanford.edu/~ouster/cgi-bin/papers/threads.pdf) written by John Ousterhout in 1995. This is technically not a paper, but a presentation given by the author at a Usenix conference.

-----

1. Threads are independent execution streams that shared state (memory) and are often preemptively scheduled by the OS/runtime.
2. Threads are too hard for most programmers because:
    * **Synchronization**: access to shared data must be coordinated with locks.
    * **Deadlock**: Circular dependencies among locks.
    * **Hard to debug**: data dependencies, timing dependencies.
    * **Threads break abstraction**: can't design modules independently.
    * Callbacks don't work with locks.
    * **Locks trade-off**: Coarse-grain locking yields low concurrency; Fine-grain locking increases complexity and locking overhead.
    * **OSes limit performance**: scheduling, context switches.
4. Event-driven programming:
    * One execution stream: no CPU concurrency.
    * Register interest in events (callbacks).
    * Event loop waits for events and invokes handlers.
    * No preemption of event handlers.
    * Handlers are generally short-lived.
5. Events are used in most GUIs:
    * One handler for each event (press button, invoke menu entry, etc.).
    * Handler implements behavior (undo, delete a file, etc.).
6. Problems with events:
     * Long-running handlers make the application non-responsive.
     * Can't maintain local state across events (handler must return).
     * No CPU concurrency.
     * Event-driven I/O not always well supported (e.g. poor write buffering).
7. Events vs Threads:
     * Events avoid concurrency as much as possible, threads embrace.
     * Debugging is easier with events.
     * Events are faster than threads on a single CPU because of no context switching or locking overhead.
     * Threads provide true concurrency.
8. The conclusion is to avoid threads wherever possible:
     * Use events, not threads, for GUIs, distributed systems, low-end servers, etc.
     * Only use threads where true CPU concurrency is needed.
     * Where threads are needed, isolate usage in threaded application kernel: keep most of the code single-threaded.