# [WIP] Operating Systems: Three Easy Pieces

## Piece 1: Virtualization

### Chapter 4 — The abstraction: The process
A **process** is one of the most fundamental abstraction that an OS provides. A **process** is informally defined as a **running program**. A program is a lifeless suite of instructions and static data, residing on disk (or flash-based SSD). The OS is responsible for running a program.

At any point in time, the process can be described by its state:
* The contents of memory in its **address space**,
* The contents of CPU registers (including the **program counter** and **stack pointer**, among others),
* and information about I/O (such as open files which can be read or written).

The OS **virtualizes** the physical CPU, creating the illusion of many CPUs and allowing multiple processes to be run concurrently. It does this by **time sharing** the CPU: running one process, then stopping it, running another, and so forth.

To implement virtualization of the CPU, the OS needs:
1. Low-level machinery (aka **Mechanisms**): Mechanisms are low-level methods or protocol that implement a needed piece of functionality. e.g. A **context switch** gives the OS the ability to stop and start different processes on a given CPU.
2. High-level intelligence: These resides in the OS as **policies**. Policies are algorithms for making decisions within the OS. e.g. A **scheduling policy** makes the decision of which process to run typically using historical information.

#### Process API
Modern operating systems provide p rocess interfaces to do the following:
1. **Create**: Create a new process.
2. **Destroy**: Forcefully, stop a process.
3. **Wait**: Wait for a process to stop running.
4. **Miscellaneous control**: Additional control over a process like suspending/resuming a process.
5. **Status**: Status info about a process like how long it has run, current state, etc.

#### Process creation: A little more detail
Here is roughly how programs are transformed into processes by the OS:
1. Load the program’s code and any static data into memory. In early (or simple) OSes, the loading process is done eagerly, i.e., all at once before running the program; modern OSes perform the process lazily, i.e., by loading pieces of code or data only as they are needed during program execution.
2. Allocate memory for the program’s run-time stack.
3. May allocate memory for the program’s heap. In C programs, the heap is used for explicitly requested dynamically-allocated data; programs requests such space by calling `malloc()` and free it by calling `free()`. The heap grows as the program requests more space.
4. Some other initialization tasks, particularly as related to input/output (I/O). e.g. In UNIX systems, each process by default has three open file descriptors, for standard input, output and error; these descriptors let programs easily read input from the terminal and print output to the screen.
5. The OS starts the program running at the entry point, namely `main()`. The OS transfers control of the CPU to the newly created process.

#### Process states
In a simplified view, a process can be in one of three states:
1. **Running**: A process is running on a processor, i.e., it's executing instructions.
2. **Ready**: A process is ready to run but the OS has chosen not to run it at this given moment.
3. **Blocked**: A process has performed some operation that makes it not ready to run until some other event takes place. e.g. A process is blocked pending an I/O request.

A process can be moved between the ready and running state at the discretion of the OS. Being moved from ready to running means the process has been **scheduled**. Being moved from running to ready means the process has been **descheduled**.

Sometimes an OS will have an initial state that the process is in when it is being created.

Also, a process could be placed in a final state where it has exited but has not yet been cleaned up (in UNIX-based systems, this is called the **zombie** state).

#### Process list: Data structure
A **process list** (also called a **task list**) contains information about all processes in the system. Each entry in the list is called a **process control block** (**PCB**), which is just a structure that contains information about each process (also called a **process descriptor**)

The snippet below shows what type of information an OS needs to track about each process in the `xv6` kernel.
```c

// the information xv6 tracks about each process
// including its register context and state
struct proc {
    char *mem; // Start of process memory
    uint sz; // Size of process memory
    char *kstack; // Bottom of kernel stack
    // for this process
    enum proc_state state; // Process state
    int pid; // Process ID
    struct proc *parent; // Parent process
    void *chan; // If !zero, sleeping on chan
    int killed; // If !zero, has been killed
    struct file *ofile[NOFILE]; // Open files
    struct inode *cwd; // Current directory
    struct context context; // Switch here to run process
    struct trapframe *tf; // Trap frame for the
    // current interrupt
};

// the different states a process can be in
enum proc_state {
    UNUSED, EMBRYO, SLEEPING, RUNNABLE, RUNNING, ZOMBIE
};

// the registers xv6 will save and restore
// to stop and subsequently restart a process.
struct context {
    int eip;
    int esp;
    int ebx;
    int ecx;
    int edx;
    int esi;
    int edi;
    int ebp;
};
```

<small>The xv6 proc structure</small>
Add

The **register context** will hold, for a stopped process, the contents of its registers. When a process is stopped, its registers will be saved to this memory location; By restoring these registers (i.e., placing their values back into the actual physical registers), the OS can resume running the process.

### Chapter 5 — Interlude: Process API
This chapter explores the interfaces for process creation and control in UNIX systems.

#### The `fork()` system call
The `fork()` system call is used to create a new process. The process that is created is an almost exact copy of the calling process.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int
main(int argc, char *argv[])
{
    printf("hello world (pid:%d)\n", (int) getpid());
    int rc = fork();
    if (rc < 0) {
        // fork failed; exit
        fprintf(stderr, "fork failed\n");
        exit(1);
    } else if (rc == 0) {
        // child (new process)
        printf("hello, I am child (pid:%d)\n", (int) getpid());
    } else {
        // parent goes down this path (original process)
        printf("hello, I am parent of %d (pid:%d)\n",
	       rc, (int) getpid());
    }
    return 0;
}
```
<small>Calling fork() (p1.c)</small>

Running `p1.c` produces an output like:

```shell
prompt>./p1
hello (pid: 29146)
parent of 29147 (pid: 29146)
child (pid:29147)
prompt>
```

The output of `p1.c` is non-deterministic as the CPU scheduler can pick either the child or parent process to run first.

#### The `wait()` system call
The `wait()` system call is used by the parent ￼ process to wait for a child process to complete execution.￼

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int
main(int argc, char *argv[])
{
    printf("hello world (pid:%d)\n", (int) getpid());
    int rc = fork();
    if (rc < 0) {
        // fork failed; exit
        fprintf(stderr, "fork failed\n");
        exit(1);
    } else if (rc == 0) {
        // child (new process)
        printf("hello, I am child (pid:%d)\n", (int) getpid());
	sleep(1);
    } else {
        // parent goes down this path (original process)
        int wc = wait(NULL);
        printf("hello, I am parent of %d (wc:%d) (pid:%d)\n",
	       rc, wc, (int) getpid());
    }
    return 0;
}
```
<small>Calling fork() and wait() (p2.c)</small>

The `wait()` call makes the output of `p2.c` deterministic because the child always runs first.

```
prompt> ./p2 hello (pid:29266) child (pid:29267)
parent of 29267 (IC_wait:29267) (pid:29266)
prompt>
```

### The `exec()` system call
This system call is useful when you want to run a program that is different from the calling program.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int
main(int argc, char *argv[])
{
    printf("hello world (pid:%d)\n", (int) getpid());
    int rc = fork();
    if (rc < 0) {
        // fork failed; exit
        fprintf(stderr, "fork failed\n");
        exit(1);
    } else if (rc == 0) {
        // child (new process)
        printf("hello, I am child (pid:%d)\n", (int) getpid());
        char *myargs[3];
        myargs[0] = strdup("wc");   // program: "wc" (word count)
        myargs[1] = strdup("p3.c"); // argument: file to count
        myargs[2] = NULL;           // marks end of array
        execvp(myargs[0], myargs);  // runs word count
        printf("this shouldn't print out");
    } else {
        // parent goes down this path (original process)
        int wc = wait(NULL);
        printf("hello, I am parent of %d (wc:%d) (pid:%d)\n",
	       rc, wc, (int) getpid());
    }
    return 0;
}
```
<small>Calling fork(), wait() and exec() (p2.c)</small>

> What it does: given the name of an executable (e.g., `wc`), and some arguments (e.g., `p3.c`), it loads code (and static data) from that executable and overwrites its current code segment (and current static data) with it; the heap and stack and other parts of the memory space of the program are re-initialized. Then the OS simply runs that program, passing in any arguments as the argv of that process. Thus, it does not create a new process; rather, it transforms the currently running program (formerly `p3`) into a different running program (`wc`).

#### Why? Motivating the API
The separation of `fork()` and `exec()` is essential in building a UNIX shell, because it lets the shell run code after the call to `fork()` but before the call to `exec()`; this code can alter the environment of the about-to-be-run program, and thus enables a variety of interesting features to be readily built.

> The shell is just a user program. It shows you a prompt and then waits for you to type something into it. You then type a command (i.e., the name of an executable program, plus any arguments) into it; in most cases, the shell then figures out where in the file system the executable resides, calls `fork()` to create a new child process to run the command, calls some variant of `exec()` to run the command, and then waits for the command to complete by calling `wait()`. When the child completes, the shell returns from `wait()` and prints out a prompt again, ready for your next command.

## Chapter 6 — Mechanism: Limited Direct Execution
The OS must virtualize the CPU in an **efficient** manner while retaining **control** over the system. **Limited direct execution** is a technique used to achieve both goals of performance and control. It does this by running programs directly on the CPU but with a few limitations from the hardware that gives the OS control on allowed operations and process switching.

### Problem #1: Restricted operations
A process must be able to perform I/O and some other restricted operations, but without giving the process complete control over the system.

This problem is addressed by introducing two processor modes:
1. **User mode**: Code that runs in user mode is restricted in what it can do. e.g. It can’t issue I/O requests.
2. **Kernel mode**: Which the OS (or kernel) runs in. There are no restrictions in this mode.

User process that wants to make a privileged operation (such as disk I/O) do so via a **system call**. System calls allow the kernel to carefully expose certain key pieces of functionality to user programs such as:
* Accessing the file system
* Creating and destroying processes
* Communicating with other processes
* Allocating more memory
* Etc

> To execute a system call, a program must execute a special **trap** instruction. This instruction simultaneously jumps into the kernel and raises the privilege level to kernel mode; once in the kernel, the system can now perform whatever privileged operations are needed (if allowed), and thus do the required work for the calling process. When finished, the OS calls a special **return-from-trap** instruction, which returns into the calling process while simultaneously reducing the privilege level back to user mode.

To specify the exact system call, a **system-call number** is usually assigned to each system call. The user code is thus responsible for placing the desired system-call number in a register or at a specified location on the stack; the OS, when handling the system call inside the trap handler, examines this number, ensures it is valid, and, if it is, executes the corresponding code.

### Problem #2: Switching between processes
Given that the OS is not running while a process is directly executing on the CPU, how can the OS switch between processes?

One approach is the cooperative approach where processes yield back control to the OS explicitly or implicitly through system calls.

A non-cooperative approach involves the OS taking control by eliciting the help of the hardware. This is done by utilizing **timer interrupts**. A timer device can be programmed to raise an interrupt every so many milliseconds; when the interrupt is raised, the currently running process is halted, and a pre-configured interrupt handler in the OS runs.

> Note that the hardware has some responsibility when an interrupt oc-curs, in particular to save enough of the state of the program that was running when the interrupt occurred such that a subsequent return-from-trap instruction will be able to resume the running program correctly. This set of actions is quite similar to the behavior of the hardware during an explicit system-call trap into the kernel, with various registers thus getting saved (e.g., onto a kernel stack) and thus easily restored by the return-from-trap instruction.

### Saving and Restoring Context
After the OS regains control, a decision has to be made: whether to continue running the currently-running process, or switch to a different one. This decision is made by a part of the operating system known as the **scheduler**.

If the decision is made to switch, the OS then executes a low-level piece of code called a **context switch**. A context switch is conceptually simple: all the OS has to do is save a few register values for the currently-executing process (onto its kernel stack, for example) and restore a few for the soon-to-be-executing process (from its kernel stack). By doing so, the OS thus ensures that when the return-from-trap instruction is finally executed, instead of returning to the process that was running, the system resumes execution of another process.

## Chapter 7 — Scheduling: Introduction
This chapter explores various scheduling policies. There are two important scheduling metrics that each policy is evaluated on:
1. **Turnaround time**: Is a performance metric that measures the time at which a job completes minus the time at which the job arrived in the system.
$$$
T_{turnaround} = T_{completion} - T_{arrival}
$$$
2. **Response time**: Is an interactivity metric that measures the time from when the job arrives in a system to the first time it’s scheduled. This is a simplified definition that assumes jobs produces a response instantaneously.

$$$
T_{response} = T_{first-run} - T_{arrival}
$$$

These are a few scheduling policies:
1. **First in, first out (FIFO)**: Is a non-preemptive scheduling policy that is conceptually simple and easy to implement. However, it susceptible to the **convoy effect**, where a number of relatively-short potential consumers of a resource get queued behind a heavyweight resource consumer.
2. **Shortest job first (SJF)**: Is a non-preemptive scheduling policy that runs the shortest job first, then the next shortest, and so on. A pure SJF scheduler can still suffer from the convoy effect if the heavyweight resource consumer arrives before the shorter jobs.
3. **Shortest time-to-completion first (STCF)**: Is a preemptive scheduling policy, that improves SJF with preemption. Any time a new job enters the system, the STCF scheduler determines which of the remaining jobs (including the new job) has the least time left, and schedules that one.
4. **Round robin**: 