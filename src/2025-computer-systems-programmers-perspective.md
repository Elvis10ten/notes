# Computer systems: A programmer’s perspective


## Chapter 1

### Information is bits + context

1. Computer stores the bits, we decide how to interpret it.
   For example, in different contexts, the same sequence of bytes might represent an integer, floating-point number, character string, or machine instruction.
   [https://en.wikipedia.org/wiki/Information](https://en.wikipedia.org/wiki/Information)
   [https://www.quora.com/What-does-information-means-bits-in-context-mean](https://www.quora.com/What-does-information-means-bits-in-context-mean)
2. 1 byte = 8 bits
   [https://en.wikipedia.org/wiki/Byte](https://en.wikipedia.org/wiki/Byte)
3. Binary file vs Text file:
   [https://dev.to/sharkdp/what-is-a-binary-file-2cf5](https://dev.to/sharkdp/what-is-a-binary-file-2cf5)
   [https://fileinfo.com/help/binary_vs_text_files](https://fileinfo.com/help/binary_vs_text_files)
   [https://en.wikipedia.org/wiki/Binary_file](https://en.wikipedia.org/wiki/Binary_file)
4. ASCII is a **7-bit character** set containing **128 characters**. It contains the numbers from 0-9, the upper and lower case English letters from A to Z, and some special characters. The character sets used in modern computers, in HTML, and on the Internet, are all based on ASCII.
   [https://en.wikipedia.org/wiki/ASCII](https://en.wikipedia.org/wiki/ASCII)

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled.png)

### Programs Are Translated by Other Programs into Different Forms

```c
1 #include &lt;stdio.h&gt;
2
3 int main()
4 {
5 printf("hello, world\n");
6 return 0;
7 }
// code/intro/hello.c
```

1. ![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%201.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%201.png)

2. `gcc -o hello hello.c` The GCC compiler driver reads the source file **hello.c** and translates it into
   an executable object file **hello**. The translation is performed in the sequence
   of four phases shown in Figure 1.3. The programs that perform the four phases
   (preprocessor, compiler, assembler, and linker) are known collectively as the
   **compilation system**.
3. **Preprocessing phase**: The preprocessor (**cpp**) modifies the original C program
   according to directives that begin with the **‘#’** character. For example, the
   **#include &lt;stdio.h&gt;** command in line 1 of **hello.c** tells the preprocessor
   to read the contents of the system header file **stdio.h** and insert it directly
   into the program text. The result is another C program, typically with the .i
   suffix.
4. **Compilation phase:** The compiler (**cc1**) translates the text file **hello.i** into
   the text file **hello.s**, which contains an assembly-language program. This
   program includes the following definition of function **main**:

```c
1 main:
2 subq $8, %rsp
3 movl $.LC0, %edi
4 call puts
5 movl $0, %eax
6 addq $8, %rsp
7 ret
// Each of lines, 2–7 in this definition describes one low-level machine language instruction in a textual form.
```

5. **Assembly phase:** Next, the assembler (**as**) translates **hello.s** into machine language
   instructions, packages them in a form known as a **relocatable object
   program**, and stores the result in the object file **hello.o**. This file is a **binary
   file** containing 17 bytes to encode the instructions for function main.

6. **Linking phase:** Notice that our hello program calls the **printf** function, which
   is part of the standard C library provided by every C compiler.

The **printf** function resides in a separate precompiled object file called **printf.o**, which
must somehow be merged with our **hello.o** program. The linker (**ld**) handles
this merging. The result is the hello file, which is an **executable object file** (or
simply executable) that is ready to be loaded into memory and executed by
the system.

### Hardware Organization

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%202.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%202.png)

1. **Buses**: Running throughout the system is a collection of **electrical conduits** called buses
   that carry bytes of information back and forth between the components.

Buses are typically designed to transfer fixed-size chunks of bytes known as **words**. The
number of bytes in a word (the word size) is a fundamental system parameter that varies across systems. Most machines today have word sizes of either 4 bytes (32 bits) or 8 bytes (64 bits).
2. **IO Devices**: IO devices are the system’s connection to the external world.

Our example system has four I/O devices: a keyboard and mouse for user input, a
display for user output, and a disk drive (or simply disk) for long-term storage of
data and programs.

Initially, the executable *hello* program resides on the disk.

Each I/O device is connected to the I/O bus by either a **controller** or an **adapter**. The distinction between the two is mainly one of packaging.

**Controllers** are chipsets in the device itself or on the system’s main printed circuit board (often called the motherboard).

An **adapter** is a card that plugs into a slot on the motherboard.

Regardless, the purpose of each is to transfer information back and forth between the I/O bus and an I/O device.
3. **Main Memory**: The main memory is a temporary storage device that holds both a **program** and the **data** it manipulates while the processor is executing the program.

Physically, the main memory consists of a collection of **dynamic random access memory(DRAM)** chips.

Logically, memory is organized as a linear array of bytes, each with its own
**unique address** (array index) starting at zero.

In general, each of the machine instructions that constitute a program can consist of a variable number of bytes. The sizes of data items that correspond to C program variables vary according to type. For example, on an x86-64 machine running Linux, data of type short
require 2 bytes, types int and float 4 bytes, and types long and double 8 bytes.
4. **Processor**: The **central processing unit (CPU)**, or simply processor, is the engine that interprets (or executes) instructions stored in main memory.

At its core is a word-size storage **device (or register)** called the **program counter (PC)**. At any point in time, the PC points at (contains the address of) some machine-language instruction in main memory.

From the time that power is applied to the system until the time that the power is shut off, a processor repeatedly executes the instruction pointed at by the program counter and updates the program counter to point to the next instruction.

A processor appears to operate according to a very simple instruction execution
model, defined by its **instruction set architecture**. In this model, instructions execute in strict sequence, and executing a single instruction involves performing a series
of steps.

The processor reads the instruction from memory pointed at by the program counter (PC), interprets the bits in the instruction, performs some simple operation dictated by the instruction, and then updates the PC to point to the next instruction, which may or may not be contiguous in memory to the instruction that was just executed.

There are only a few of these simple operations, and they revolve around the main memory, the **register file**, and the **arithmetic/logic unit (ALU)**.

The **register file** is a small storage device that consists of a collection of word-size registers, each with its own unique name.

The **ALU** computes new data and address values.

Here are some examples of the simple operations that the CPU might carry out at the request of an instruction:

* **Load**: Copy a byte or a word from main memory into a register, overwriting
  the previous contents of the register.

* **Store**: Copy a byte or a word from a register to a location in main memory,
  overwriting the previous contents of that location.

* **Operate**: Copy the contents of two registers to the ALU, perform an arithmetic
  operation on the two words, and store the result in a register, overwriting the
  previous contents of that register.

* **Jump**: Extract a word from the instruction itself and copy that word into the
  the program counter (PC), overwriting the previous value of the PC.

We can distinguish the processor’s **instruction set architecture**, describing the effect of each machine-code instruction, from its **microarchitecture**, describing how the processor is actually implemented.

### Running the hello Program

Initially, the shell program is executing its instructions, waiting for us to type a command. As we type the characters ./hello at the keyboard, the shell program reads each one into a register and then stores it in memory, as shown in Figure 1.5.

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%203.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%203.png)

When we hit the enter key on the keyboard, the shell knows that we have finished typing the command. The shell then loads the executable hello file by executing a sequence of instructions that copies the code and data in the hello object file from disk to main memory. The data includes the string of characters **hello, world\n** that will eventually be printed out.

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%204.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%204.png)

Once the code and data in the hello object file are loaded into memory, the processor begins executing the machine-language instructions in the hello program’s main routine. These instructions copy the bytes in the hello, world\n string from memory to the register file, and from there to the display device, where they are displayed on the screen.

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%205.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%205.png)

### Caches Matter

An important lesson from this simple example is that a system spends a lot of time moving information from one place to another.

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%206.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%206.png)

Because of physical laws, larger storage devices are slower than smaller storage devices.

The idea behind caching is that a system can get the effect of both a very large memory and a very fast one by exploiting locality, the tendency for programs to access data and code in localized regions.

SRAM are used for CPU caches.

[SRAM vs DRAM](https://www.google.com/search?q=sram+vs+dram&oq=SRAM+&aqs=chrome.3.69i57j0l7.5489j0j1&sourceid=chrome&ie=UTF-8)

[https://en.wikipedia.org/wiki/Computer_data_storage](https://en.wikipedia.org/wiki/Computer_data_storage)

### Storage Devices Form a Hierarchy

[https://en.wikipedia.org/wiki/Memory_hierarchy](https://en.wikipedia.org/wiki/Memory_hierarchy)

The main idea of a memory hierarchy is that storage at one level serves as a cache for storage at the next lower level.

Thus, the register file is a cache for the **L1 cache**.

Caches L1 and L2 are caches for L2 and L3, respectively.

The L3 cache is a cache for the main memory, which is a cache for the disk.

On some networked systems with distributed file systems, the local disk serves as a cache for data stored on the disks of other systems.

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%207.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%207.png)

### The Operating System Manages the Hardware

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%208.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%208.png)

The operating system has two primary purposes:

1. to protect the hardware from misuse by runaway applications and

2. to provide applications with simple and uniform mechanisms for manipulating complicated and often wildly different low-level hardware devices.

The operating system achieves both goals via the fundamental abstractions shown in Figure 1.11: processes, virtual memory, and files.

As this figure suggests, files are abstractions for I/O devices, virtual memory is an abstraction for both the main memory and disk I/O devices, and processes are abstractions for the processor, main memory, and I/O devices.

![Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%209.png](Computer%20Systems%20A%20Programmer's%20Perspective%204e0ac7c5eac445bea26649d27f558f96/Untitled%209.png)

### Processes

fa

## Representing and Manipulating Information

1. In isolation, a single bit is not very useful. When we group bits together and
   apply some **interpretation** that gives meaning to the different possible **bit patterns**,
   however, we can represent the elements of any **finite set**.


## Chapter 2
1. Modern computers store and process information stored as two-valued signals — called bits or binary digits.
2. Two-value signals were chosen because they can readily be represented, stored, and transmitted. For example, as:
    * The presence or absence of a hole in a punched card
    * High or low voltage on a wire
    * A magnetic domain oriented clockwise or counterclockwise.
3. In isolation, a single bit is not very useful.
4. We can represent the elements of any finite set by grouping bits together. This is achieved by applying some interpretation that gives meaning to the different possible bit patterns. For example:
    * Nonnegative numbers can be represented using a binary number system.
    * Letters and symbols can be represented using a standard character code.
5. A single **byte** consists of `8-bits`.
6. Most computers use a byte as the smallest addressable unit of memory (instead of accessing individual bits).
7. A machine-level program views memory as a very large array of bytes, referred to as **virtual memory**.
8. Every byte of memory is identified by a unique number, known as its **address**.
9. The set of all possible addresses is known as the **virtual address space**.
10. The range of values for a single byte in common notations:
    * Binary: 00000000₂ - 11111111₂
    * Decimal: 0₁₀ - 255₁₀
    * Hexadecimal: 00₁₆ - FF₁₆
11. Binary notation is too verbose; decimal notation is tedious to convert to/from bit patterns; this is why hexadecimals are preferred.
12. **Hexadecimal** (or simply hex) uses digits 0-9 and characters A-F to represent 16 possible values.
13. This book prefixes hexadecimal numbers with an `0x` — which is the C notation for representing hexadecimals.
14. Converting between binary and hexadecimal is straightforward because it can be performed one hexadecimal digit at a time. Digits can be converted using a chart like this:

|Hexadecimal (base 16)|Decimal (base 10)|Binary (base 2)|
  |---------------------|-----------------|---------------|
|0                    |0                |0              |
|1                    |1                |1              |
|2                    |2                |10             |
|3                    |3                |11             |
|4                    |4                |100            |
|5                    |5                |101            |
|6                    |6                |110            |
|7                    |7                |111            |
|8                    |8                |1000           |
|9                    |9                |1001           |
|A                    |10               |1010           |
|B                    |11               |1011           |
|C                    |12               |1100           |
|D                    |13               |1101           |
|E                    |14               |1110           |
|F                    |15               |1111           |

15. Rule to convert a binary number to hexadecimal:
    * A single hexadecimal digit represents 4-bits.
    * Hence, split the binary number into groups of 4-bits and convert each group to a single hexadecimal digit.
    * If the total number of bits is not a multiple of 4, pad the left side of the number until it is.
16. Rule to convert a hexadecimal number to binary:
    * Convert one hexadecimal digit at a time into binary.
17. C pointers provide the mechanism for referencing elements of data structures.
18. C pointers have two aspects:
    ```c
    data_type *variable_name
    ```
    * Its value (the location of some object)
    * Its type (what kind of object is stored at that location)
19. Every computer has a **word size**, indicating the nominal size of pointer data.
20. For simplicity and efficiency, the size of a pointer’s value is equal to the word size.
21. On a 32-bit program (32-bit or 4-byte word) the pointer size is 32-bit; On a 64-bit program (64-bit or 8-byte word) the pointer size is 64-bit.
22. The distinction lies in how the program was compiled instead of what machine it is run on. For instance, if a 64-bit computer runs a 32-bit program, the program is limited to 32-bit pointer size.
23. A 64-bit machine is usually backward compatible with a 32-bit program; however, the reverse is not the case.
24. Since the virtual address (a pointer’s value) is encoded by such a word, the most important system parameter determined by the word did is the maximum size of the virtual address space.
25. For a machine with w-bit word size, the virtual address can range from `0` to `2ʷ - 1` [a], giving the program access to at most `2ʷ` bytes [b].
    * [a]: Power of 2 because each bit can hold 2 possible values; Subtracting 1 because the range is zero indexed.
    * [b]: See point (8).
26. The size of the C type `long` is equal to the word size, whereas the size of the `int` type is sometimes less than that of the word size.
27. For multi-byte program objects (i.e objects that span multiple bytes), two conventions must be established:
    * **The address of the multi-byte object**: In virtually all machines, a multi-byte object is stored as a contiguous sequence of bytes, with the address of the object given by the smallest address of the bytes used.
    * **The order of the object’s multi-bytes**: There are two conventions here:
        * **Big endian**: The object is stored in memory from most significant byte to least significant byte.
        * **Little endian**: The object is stored in memory from least significant byte to most significant byte.
          [image]
28. Different byte ordering on machines is seldom an issue for application programmers. Some examples of when it is an issue are:
    * When binary data is communicated over a network between machines with different byte ordering. This can be remedied by creating a network standard byte ordering that the sender converts to, and the receiver coverts from.
    * When looking at the byte sequences representing integer data. E.g. an integer appears in reverse order when reading machine-level program representations generated for little-endian machines.
29. The `typedef` declaration in C provides a way of giving a name to a data type — often with the goal of improving readability. E.g:
    ```c
    typedef int *int_pointer // Defines type int_pointer to be a pointer to an int 
    int_pointer variable_name // Declares a variable of int_pointer type
     
    ```
30. The C “address of” operator `&` creates a pointer. E.g:
    ```c
    &x // this creates a pointer to the location holding the object indicated by variable x. The type of this pointer depends on the type of x.
    
    ```
31. The C cast operator converts from one data type to another. E.g:
    ```c
    (new_type) x // this direct the compiler to refer to the data being pointed to according to the new data type
    
    ```
32. A string in C is encoded by an array of characters terminated by the null (having value 0) character.
33. Each character is represented by some standard encoding. E.g: `"12345"` is encoded as `31 ee2 33 34 35 00` in ASCII.
34. Binary code is seldom portable acrosss different combinations of machine and operating system.
35. The basic operations on bits were discussed extensively by George Boole and the rules governing them are eponymously named “Boolean algebra.”. Boole observed that by encoding logic values `TRUE` and `FALSE` as binary values `1` and `0`, he could formulate an algebra that captures the basic principles of logical reasoning.
36. These are the common Boolean algebra operations defined on the variables x and y:

| Logical operation          | Symbol | C notation | Definition                                                   |
|----------------------------|--------|------------|--------------------------------------------------------------|
| Conjunction (AND)          | ∧      | &          | `x ∧ y = 1` if `x = y = 1`, `x ∧ y = 0` otherwise            |
| Disjunction (Inclusive OR) | ∨      | \|         | `x ∨ y = 0` if `x = y = 0`, `x ∨ y = 1` otherwise            |
| Negation (NOT)             | ¬      | ~          | `¬x = 0` if `x = 1`, `¬x = 1` if `x = 0`                     |
| Exclusive OR (XOR)         | ⊕      | ^          | `x ⊕ y = 0` if `x = y = 1` OR `x = y = 0`, `x ⊕ y = 1` otherwise |

37. These are the common Boolean algebra operations defined in a truth table:

| x | y | x ∧ y | x ∨ y | ¬ x | x ⊕ y |
|---|---|-------|-------|-----|-------|
| 0 | 0 | 0     | 0     | 1   | 0     |
| 1 | 0 | 0     | 1     | 0   | 1     |
| 0 | 1 | 0     | 1     | 1   | 1     |
| 1 | 1 | 1     | 1     | 0   | 0     |

38. A bit vector (or bit array) is a string of zeros and ones of some fixed length `w`.
39. The four common Boolean operations can be extended to operate on bit vectors by defining them to apply to the matching elements of the bit vectors. E.g:
    $$
    A = { a_{w}, a_{w-1}, …, a_{1}, a_{0} }
    B = { b_{w}, b_{w-1}, …, b_{1}, b_{0} }
    A ⊕ B= { a_{w} ⊕ b_{w}, a_{w-1} ⊕ b_{w-1}, …, a_{1} ⊕ b_{1}, a_{0} ⊕ b_{0} }
    $$
40. Boolean operation OR (∨) distributes over AND (∧):
    $$
    a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)
    $$
41. Boolean operation AND (∧) distributes over OR (∨):
    $$
    a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)
    $$
42. XOR is self-inverse — i.e any number or bit vector XOR’ed with itself evaluates to 0. E.g:
    $$
    a ⊕ a = 0
    (a ⊕ b) ⊕ a = 0 (XOR is also associative)
    $$
43. One useful application of bit vectors is to represent/encode finite sets. This is done by encoding the set $A = { 0, 1, …, w-1 }$ with a bit vector $B = { b_{w-1}, …, b_{1}, b_{0} }$, where $b_{i} = 1$ if and only if $i \in A$. E.g:
    > `A = { 0, 3, 5, 6 }` is encoded as `{ 01101001 }`
44. With this way of encoding sets, boolean operations ∨, ∧, ¬ corresponds to set union, set intersection and set complement respectively.
45. A common use of bit-level operations is to implement masking operations, where a mask is a bit patterned that indicates a selected set of bits within a word. E.g:
    > 0x89ABCDEF & 0x000000FF = 0x000000EF
>
46. C supports a variety of integral data types. Each type can specify a size with keyword char, short, long as well as an indication of whether the numbers are all non-negative (declared as unsigned) or possibly negative (the default).
47. Non-negative integers can be encoded as an unsigned bit vector:
    $$
    \overrightarrow{x} = \{x_{w-1}, x_{w-2}, …, x_{0}\}\\
    x_i = 0 or 1\\
    w = Cardinality of \overrightarrow{x}\\
    B2U_w(\overrightarrow{x}) := \sum_{i=0}^{w-1} x_i2^i
    $$
48. $B2U_w$ is a function that converts a number written in **binary** notation (the bit vector) of length **w** to an **unsigned** number.
49. Using unsigned encoding, the range of values that can be represented using a w-bit vector goes from $0$ to $$2^{w} - 1$$.
    $$
    B2U_w : {0, 1}^w → {0, 2^{w} - 1}
    $$
50. The notation ${0, 1}^w$ is a compact way of representing the set of all possible w-bit binary strings. This exponentiation symbol indicates that we are raising the set ${0, 1}$ to the power of $w$. In other words, we are creating a set that contains all possible combinations of the elements of ${0, 1}$, where the order of the elements matters.
51. Function $B2U_w$ is a bijection: The unsigned binary representation has the important property that every number between $0$ and $2^{w} - 1$ has a unique encoding as a w-bit value.
52. Two-complement is the most common computer representation of signed numbers. It’s defined by interpreting the most significant bit (called the `sign bit`) of the word to have negative weight. This interpretation can be expressed as a function $B2T_w$ (Binary to two’s complement, length w):
    $$
    \overrightarrow{x} = \{x_{w-1}, x_{w-2}, …, x_{0}\}\\
    x_i = 0 or 1\\
    w = Cardinality of \overrightarrow{x}\\
    B2T_w(\overrightarrow{x}) := -x_{w-1} * 2^{w-1} + \sum_{i=0}^{w-2} x_i2^i
    $$
53. Using two’s complement encoding, the range of values that can be represented using a w-bit vector goes from $-2^{w-1}$ to $2^{w-1} - 1$.
    $$
    B2T_w : {0, 1}^w → {-2^{w-1}, 2^{w-1} - 1}
    $$
54. The two’s-complement range is asymmetric because half the bit patterns (those with the sign bit set to 1) represent negative numbers while half (those with the sign bit set to 0) represents nonnegative numbers. Since $0$ is nonnegative, this means that it can represent one less positive number than negative.
55. Function $B2T_w$ is a bijection: The signed binary two-complement representation has the important property that every number between $-2^{w-1}$ and $2^{w-1} - 1$  has a unique encoding as a w-bit value.
56. Some important numbers:

| Word size w | Value | UMax | TMin | TMax |
  |---|---|---|---|---|
| 64 | 8 | 18,446,744,073,709,551,615 | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 |
| 32 | 4 | 4,294,967,295 | -2,147,483,648 | 2,147,483,647 |
| 16 | 2 | 65,535 | -32,768 | 32,767 |
| 8 | 1 | 255 | -128 | 127 |
57. Sign magnitude is an alternative representation of signed numbers. This form uses the most significant bit (sign bit) to determine whether the remaining bits should be given negative or positive weight:
    $$
    B2S_w(\overrightarrow{x}) := (-1)^{x_{w-1}} \cdot \sum_{i=0}^{w-2} x_i2^i
    $$

## Chapter 2
1. Modern computers store and process information stored as two-valued signals — called bits or binary digits.
2. Two-value signals were chosen because they can readily be represented, stored, and transmitted. For example, as:
   * The presence or absence of a hole in a punched card
   * High or low voltage on a wire
   * A magnetic domain oriented clockwise or counterclockwise.
3. In isolation, a single bit is not very useful.
4. We can represent the elements of any finite set by grouping bits together. This is achieved by applying some interpretation that gives meaning to the different possible bit patterns. For example:
   * Nonnegative numbers can be represented using a binary number system.
   * Letters and symbols can be represented using a standard character code.
5. ￼A single **byte** consists of `8-bits`.
6. Most computers use a byte as the smallest addressable unit of memory (instead of accessing individual bits).
7. A machine-level program views memory as a very large array of bytes, referred to as **virtual memory**.
8. Every byte of memory is identified by a unique number, known as its **address**.
9. The set of all possible addresses is known as the **virtual address space**.
10. The range of values for a single byte in common notations:
    * Binary: 00000000₂ - 11111111₂
    * Decimal: 0₁₀ - 255₁₀
    * Hexadecimal: 00₁₆ - FF₁₆
11. Binary notation is too verbose; decimal notation is tedious to convert to/from bit patterns; this is why hexadecimals are preferred.
12. **Hexadecimal** (or simply hex) uses digits 0-9 and characters A-F to represent 16 possible values.
13. This book prefixes hexadecimal numbers with an `0x` — which is the C notation for representing hexadecimals.
14. Converting between binary and hexadecimal is straightforward because it can be performed one hexadecimal digit at a time. Digits can be converted using a chart like this:
    ![](Computer%20systems%20A%20programmer%E2%80%99s%20perspective/IMG_3688.jpeg)
15. Rule to convert a binary number to hexadecimal:
    * A single hexadecimal digit represents 4-bits.
    * Hence, split the binary number into groups of 4-bits and convert each group to a single hexadecimal digit.
    * If the total number of bits is not a multiple of 4, pad the left side of the number until it is.
16. Rule to convert a hexadecimal number to binary:
    * Convert one hexadecimal digit at a time into binary.
17. C pointers provide the mechanism for referencing elements of data structures.
18. C pointers have two aspects:
    ```c
    data_type *variable_name
    ```
    * Its value (the location of some object)
    * Its type (what kind of object is stored at that location)
19. Every computer has a **word size**, indicating the nominal size of pointer data.
20. For simplicity and efficiency, the size of a pointer’s value is equal to the word size.
21. On a 32-bit program (32-bit or 4-byte word) the pointer size is 32-bit; On a 64-bit program (64-bit or 8-byte word) the pointer size is 64-bit.
22. The distinction lies in how the program was compiled instead of what machine it is run on. For instance, if a 64-bit computer runs a 32-bit program, the program is limited to 32-bit pointer size.
23. A 64-bit machine is usually backward compatible with a 32-bit program; however, the reverse is not the case.
24. Since the virtual address (a pointer’s value) is encoded by such a word, the most important system parameter determined by the word did is the maximum size of the virtual address space.
25. For a machine with w-bit word size, the virtual address can range from `0` to `2ʷ - 1` [a], giving the program access to at most `2ʷ` bytes [b].
    * [a]: Power of 2 because each bit can hold 2 possible values; Subtracting 1 because the range is zero indexed.
    * [b]: See point (8).
26. The size of the C type `long` is equal to the word size, whereas the size of the `int` type is sometimes less than that of the word size.
27. For multi-byte program objects (i.e objects that span multiple bytes), two conventions must be established:
    * **The address of the multi-byte object**: In virtually all machines, a multi-byte object is stored as a contiguous sequence of bytes, with the address of the object given by the smallest address of the bytes used.
    * **The order of the object’s multi-bytes**: There are two conventions here:
      * **Big endian**: The object is stored in memory from most significant byte to least significant byte.
      * **Little endian**: The object is stored in memory from least significant byte to most significant byte.
      [image]
28. Different byte ordering on machines is seldom an issue for application programmers. Some examples of when it is an issue are:
    * When binary data is communicated over a network between machines with different byte ordering. This can be remedied by creating a network standard byte ordering that the sender converts to, and the receiver coverts from.
    * When looking at the byte sequences representing integer data. E.g. an integer appears in reverse order when reading machine-level program representations generated for little-endian machines.
29. The `typedef` declaration in C provides a way of giving a name to a data type — often with the goal of improving readability. E.g:
    ```c
    typedef int *int_pointer // Defines type int_pointer to be a pointer to an int 
    int_pointer variable_name // Declares a variable of int_pointer type
     
    ```
30. The C “address of” operator `&` creates a pointer. E.g:
    ```c
    &x // this creates a pointer to the location holding the object indicated by variable x. The type of this pointer depends on the type of x.
    
    ```
31. The C cast operator converts from one data type to another. E.g:
    ```c
    (new_type) x // this direct the compiler to refer to the data being pointed to according to the new data type
    
    ```
32. A string in C is encoded by an array of characters terminated by the null (having value 0) character.
33. Each character is represented by some standard encoding. E.g: `"12345"` is encoded as `31 ee2 33 34 35 00` in ASCII.
34. Binary code is seldom portable acrosss different combinations of machine and operating system.
35. The basic operations on bits were discussed extensively by George Boole and the rules governing them are eponymously named “Boolean algebra.”. Boole observed that by encoding logic values `TRUE` and `FALSE` as binary values `1` and `0`, he could formulate an algebra that captures the basic principles of logical reasoning.
36. These are the common Boolean algebra operations defined on the variables x and y:

| Logical operation          | Symbol | C notation | Definition                                                   |
|----------------------------|--------|------------|--------------------------------------------------------------|
| Conjunction (AND)          | ∧      | &          | `x ∧ y = 1` if `x = y = 1`, `x ∧ y = 0` otherwise            |
| Disjunction (Inclusive OR) | ∨      | \|         | `x ∨ y = 0` if `x = y = 0`, `x ∨ y = 1` otherwise            |
| Negation (NOT)             | ¬      | ~          | `¬x = 0` if `x = 1`, `¬x = 1` if `x = 0`                     |
| Exclusive OR (XOR)         | ⊕      | ^          | `x ⊕ y = 0` if `x = y = 1` OR `x = y = 0`, `x ⊕ y = 1` otherwise |

37. These are the common Boolean algebra operations defined in a truth table:

| x | y | x ∧ y | x ∨ y | ¬ x | x ⊕ y |
|---|---|-------|-------|-----|-------|
| 0 | 0 | 0     | 0     | 1   | 0     |
| 1 | 0 | 0     | 1     | 0   | 1     |
| 0 | 1 | 0     | 1     | 1   | 1     |
| 1 | 1 | 1     | 1     | 0   | 0     |

38. A bit vector (or bit array) is a string of zeros and ones of some fixed length `w`.
39. The four common Boolean operations can be extended to operate on bit vectors by defining them to apply to the matching elements of the bit vectors. E.g:
    $$$
    A = { a_{w}, a_{w-1}, …, a_{1}, a_{0} }
    B = { b_{w}, b_{w-1}, …, b_{1}, b_{0} }
    A ⊕ B= { a_{w} ⊕ b_{w}, a_{w-1} ⊕ b_{w-1}, …, a_{1} ⊕ b_{1}, a_{0} ⊕ b_{0} }
    $$$
40. Boolean operation OR (∨) distributes over AND (∧):
    $$$
    a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)
    $$$
41. Boolean operation AND (∧) distributes over OR (∨):
    $$$
    a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)
    $$$
42. XOR is self-inverse — i.e any number or bit vector XOR’ed with itself evaluates to 0. E.g:
    $$$
    a ⊕ a = 0
    (a ⊕ b) ⊕ a = 0 (XOR is also associative)
    $$$
43. One useful application of bit vectors is to represent/encode finite sets. This is done by encoding the set $A = { 0, 1, …, w-1 }$ with a bit vector $B = { b_{w-1}, …, b_{1}, b_{0} }$, where $b_{i} = 1$ if and only if $i \in A$. E.g:
    > `A = { 0, 3, 5, 6 }` is encoded as `{ 01101001 }`
44. With this way of encoding sets, boolean operations ∨, ∧, ¬ corresponds to set union, set intersection and set complement respectively.
45. A common use of bit-level operations is to implement masking operations, where a mask is a bit patterned that indicates a selected set of bits within a word. E.g:
    > 0x89ABCDEF & 0x000000FF = 0x000000EF
    > 
46. C supports a variety of integral data types. Each type can specify a size with keyword char, short, long as well as an indication of whether the numbers are all non-negative (declared as unsigned) or possibly negative (the default).
47. Non-negative integers can be encoded as an unsigned bit vector:
    $$$
    \overrightarrow{x} = {x_{w-1}, x_{w-2}, …, x_{0}}
    x_i = 0 or 1
    w = Cardinality of \overrightarrow{x}
    B2U_w(\overrightarrow{x}) := \sum_{i=0}^{w-1} x_i2^i
    $$$
48. $B2U_w$ is a function that converts a number written in **binary** notation (the bit vector) of length **w** to an **unsigned** number.
49. Using unsigned encoding, the range of values that can be represented using a w-bit vector goes from $0$ to $$2^{w} - 1$$.
    $$$
    B2U_w : {0, 1}^w → {0, 2^{w} - 1}
    $$$
50. The notation ${0, 1}^w$ is a compact way of representing the set of all possible w-bit binary strings. This exponentiation symbol indicates that we are raising the set ${0, 1}$ to the power of $w$. In other words, we are creating a set that contains all possible combinations of the elements of ${0, 1}$, where the order of the elements matters.
51. Function $B2U_w$ is a bijection: The unsigned binary representation has the important property that every number between $0$ and $2^{w} - 1$ has a unique encoding as a w-bit value.
52. Two-complement is the most common computer representation of signed numbers. It’s defined by interpreting the most significant bit (called the `sign bit`) of the word to have negative weight. This interpretation can be expressed as a function $B2T_w$ (Binary to two’s complement, length w):
    $$$
    \overrightarrow{x} = {x_{w-1}, x_{w-2}, …, x_{0}}
    x_i = 0 or 1
    w = Cardinality of \overrightarrow{x}
    B2T_w(\overrightarrow{x}) := -x_{w-1} * 2^{w-1} + \sum_{i=0}^{w-2} x_i2^i
    $$$
53. Using two’s complement encoding, the range of values that can be represented using a w-bit vector goes from $-2^{w-1}$ to $2^{w-1} - 1$.
    $$$
    B2T_w : {0, 1}^w → {-2^{w-1}, 2^{w-1} - 1}
    $$$
54. The two’s-complement range is asymmetric because half the bit patterns (those with the sign bit set to 1) represent negative numbers while half (those with the sign bit set to 0) represents nonnegative numbers. Since $0$ is nonnegative, this means that it can represent one less positive number than negative.
55. Function $B2T_w$ is a bijection: The signed binary two-complement representation has the important property that every number between $-2^{w-1}$ and $2^{w-1} - 1$  has a unique encoding as a w-bit value.
56. Some important numbers:
| Word size w | Value | UMax | TMin | TMax |
|---|---|---|---|---|
| 64 | 8 | 18,446,744,073,709,551,615 | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 |
| 32 | 4 | 4,294,967,295 | -2,147,483,648 | 2,147,483,647 |
| 16 | 2 | 65,535 | -32,768 | 32,767 |
| 8 | 1 | 255 | -128 | 127 |
57. Sign magnitude is an alternative representation of signed numbers. This form uses the most significant bit (sign bit) to determine whether the remaining bits should be given negative or positive weight:
    $$$
    B2S_w(\overrightarrow{x}) := (-1)^{x_{w-1}} * \sum_{i=0}^{w-2} x_i2^i
    $$$
58. 