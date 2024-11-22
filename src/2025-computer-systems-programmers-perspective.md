# Computer systems: A programmer’s perspective

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