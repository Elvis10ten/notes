---
{"dg-publish":true,"permalink":"/book-notes/the-elements-of-computing-systems-building-a-modern-computer-from-first-principles/","title":"[WIP] The Elements of Computing Systems: Building a Modern Computer from First Principles","tags":["notes","gardenEntry"],"created":"2024-09-16T20:48:29.447+02:00","updated":"2024-09-18T19:38:15.345+02:00"}
---


  

## Chapter 1: Boolean logic

  

### Binary variables

Modern computers store and process information stored as two-valued signals — called `bits` (i.e. binary digits). Two-value signals were chosen because they can readily be represented, stored, and transmitted. For example, as:

* The presence or absence of a hole in a punched card

* High or low voltage on a wire

* A magnetic domain oriented clockwise or counterclockwise.

  >  hhhhh
  >  kkk
  >  m

A binary variable or a bit can represent two possible states: `0` and `1`; `off` and `on`; `false` and `true`; `no` and `yes`; etc. $n$ binary variables can be used to represent $2^n$ states. e.g.

| $b_2$ | $b_1$ | $b_0$ |
| ----- | ----- | ----- |
| 0     | 0     | 0     |
| 0     | 0     | 1     |
| 0     | 1     | 0     |
| 0     | 1     | 1     |
| 1     | 0     | 0     |
| 1     | 0     | 1     |
| 1     | 1     | 0     |
| 1     | 1     | 1     |

```kotlin
fun main(arg: String) {
// prints hello world
println("Hello world")
}
```
### Boolean functions

**Boolean algebra** is used to manipulate binary values. A boolean function (aka boolean operator) is a function that operates on binary inputs and returns binary outputs.

  

The total number of boolean functions for $n$ binary variables is $2^{2^n}$. Explanation:

* There are $2^n$ input combinations.

* Each of these input combinations can be mapped to either `0` or `1`.

* The total number of boolean functions is thus: $2^{2^n}$

* e.g. There are `16` distinct boolean functions for `2` binary variables.

  

| Function | Expression      | A=0, B=0 | A=0, B=1 | A=1, B=0 | A=1, B=1 |
| -------- | --------------- | -------- | -------- | -------- | -------- |
| F0       | 0               | 0        | 0        | 0        | 0        |
| F1       | NOT A AND NOT B | 1        | 0        | 0        | 0        |
| F2       | NOT A AND B     | 0        | 1        | 0        | 0        |
| F3       | NOT A           | 1        | 1        | 0        | 0        |
| F4       | A AND NOT B     | 0        | 0        | 1        | 0        |
| F5       | NOT B           | 1        | 0        | 1        | 0        |
| F6       | XOR(A, B)       | 0        | 1        | 1        | 0        |
| F7       | NAND(A, B)      | 1        | 1        | 1        | 0        |
| F8       | A AND B         | 0        | 0        | 0        | 1        |
| F9       | XNOR(A, B)      | 1        | 0        | 0        | 1        |
| F10      | B               | 0        | 1        | 0        | 1        |
| F11      | NOT A OR B      | 1        | 1        | 0        | 1        |
| F12      | A               | 0        | 0        | 1        | 1        |
| F13      | A OR NOT B      | 1        | 0        | 1        | 1        |
| F14      | A OR B          | 0        | 1        | 1        | 1        |
| F15      | 1               | 1        | 1        | 1        | 1        |

### Logic gates

A **gate** (also called **chip** in the book) is a physical device that implements a boolean function. Every digital device is based on a set of chips designed to store and process binary information. These chips are all made of **elementary logic gates**. Elementary logic gates can be physically realized using many different hardware technologies, but their logical behavior, or abstraction, is consistent across implementations.

  

Since all logic gates have the same input and output data type (i.e. binary), they can be combined, creating composite gates of arbitrary complexity. e.g. `Xor = Or( And(a, Not(b)), And(Not(a), b) )`.

  

Any given logic gate can be viewed from two perspective:

1. **External**: The interface of the gate, outlining its input pins, output pins, and its behavior.

2. **Internal**: The implementation of the gate. There can be multiple implementations of a gate’s interface. The goal is to find an implementation that is correct (functional requirement) and efficient (performance requirement).

  

### Hardware description language (HDL)

Hardware description language is a formalism used by hardware designers to design chip architecture.

  

> The designer specifies the chip logic by writing a HDL program, which is then subjected to a rigorous battery of tests. The tests are carried out virtually, using computer simulation: A special software tool, called a **hardware simulator**, takes the HDL program as input and creates a software representation of the chip logic. Next, the designer can instruct the simulator to test the virtual chip on various sets of inputs. The simulator computes the chip outputs, which are then compared to the desired outputs.

  

The hardware simulator can also simulate and quantify the performance characteristics (energy consumption, computational speed, cost) of a chip.

  

### Gates specification

The specifications of the logic gates needed to build the chips of our computer system are given below.

  

#### Primitive gates

##### Nand gate

![](assets/nand_gate.svg)

  

Shorthand for **Not-And** because its equivalent to `Not(And(a, b))`.

  

Truth table:

  

| a   | b   | Nand(a, b) |
| --- | --- | ---------- |
| 0   | 0   | 1          |
| 0   | 1   | 1          |
| 1   | 0   | 1          |
| 1   | 1   | 0          |
  

API:

|           |                                                       |
| --------- | ----------------------------------------------------- |
| Chip name | `Nand`                                                |
| Input     | `a`, `b`                                              |
| Output    | `out`                                                 |
| Function  | `if ((a == 1) and (b==1)) then out = 0, else out = 1` |
  

The NAND gate is a primitive gate because it can be used to implement any boolean function. Proof:

* Various subsets of logical operators can be used for expressing any boolean function, and `{ And, Or, Not }` is one such subset. NAND can be used to implement each member of the subset as demonstrated below.

* `NOT(a) = NAND(a, a)`

* `AND(a, b) = NOT(NAND(a, b))`

* `OR(a, b) = NOT(NOT(a) AND NOT(b))` (De morgan law)

  

#### Classical logical gates

These gates implement classical logical operators.

  

##### Not (aka inverter) gate

![](assets/not_gate.svg)

  

This gate outputs the opposite value of its input’s value.

  

Truth table:

| a   | Not(a) |
| --- | ------ |
| 0   | 1      |
| 1   | 0      |

API:

|           |                                           |
| --------- | ----------------------------------------- |
| Chip name | `Not`                                     |
| Input     | `in`                                      |
| Output    | `out`                                     |
| Function  | `if (in == 0) then out = 1, else out = 0` |

  

HDL:

```hdl

CHIP Not {

IN in;

OUT out;

  

PARTS:

Nand(a= in, b= in, out= out);

}

```

  

##### And gate

![](assets/and_gate.svg)

  

Returns $1$ when both its inputs are $1$, and $0$ otherwise.

  

Truth table:

  

| a | b | And(a, b) |

|-----|-----|-----------|

| 0 | 0 | 0 |

| 0 | 1 | 0 |

| 1 | 0 | 0 |

| 1 | 1 | 1 |

  

API:

  

| | |

|-----------|-------------------------------------------------------|

| Chip name | `And` |

| Input | `a`, `b` |

| Output | `out` |

| Function | `if ((a == 1) and (b==1)) then out = 1, else out = 0` |

  

HDL:

  

```hdl

CHIP And {

IN a, b;

OUT out;

PARTS:

Nand(a= a, b= b, out= nandout);

Not(in= nandout, out= out);

}

```

  

##### Or gate

![](assets/or_gate.svg)

  

Returns $1$ when at least one of its inputs is $1$, and $0$ otherwise.

  

Truth table:

  

| a | b | Or(a, b) |

|:---:|:---:|:--------:|

| 0 | 0 | 0 |

| 0 | 1 | 1 |

| 1 | 0 | 1 |

| 1 | 1 | 1 |

  

API:

  

| | |

|-----------|---------------------------------------------------------|

| Chip name | `Or` |

| Input | `a`, `b` |

| Output | `out` |

| Function | `if ((a == 0) and (b == 0)) then out = 0, else out = 1` |

  

HDL:

  

```hdl

CHIP Or {

IN a, b;

OUT out;

  

PARTS:

Not(in= a, out= nota);

Not(in= b, out= notb);

And(a= nota, b= notb, out= notaandnotb);

Not(in= notaandnotb, out= out);

}

```

  

##### Xor (aka exclusive or) gate

![](assets/xor_gate.svg)

  

Returns $1$ when exactly one of its input is $1$, and $0$ otherwise.

  

Truth table:

  

| a | b | Xor(a, b) |

|:---:|:---:|:---------:|

| 0 | 0 | 0 |

| 0 | 1 | 1 |

| 1 | 0 | 1 |

| 1 | 1 | 0 |

  

API:

  

| | |

|-----------|------------------------------------------|

| Chip name | `Xor` |

| Input | `a`, `b` |

| Output | `out` |

| Function | `if (a != b) then out = 1, else out = 0` |

  

HDL:

  

```hdl

CHIP Xor {

IN a, b;

OUT out;

  

PARTS:

Not(in= a, out= nota);

Not(in= b, out= notb);

And(a= a, b= notb, out= aandnotb);

And(a= b, b= nota, out= bandnota);

Or(a= aandnotb, b= bandnota, out= out);

}

```

  

#### Control flow gates

These gates provide means for controlling flows of information.

  

##### Multiplexer

A multiplexer is a three-input gate. Two input bits, named `a` and `b`, are interpreted as **data bits**, and a third bit, named `sel`, is interpreted as a **selection bit**. The multiplexer uses `sel` to select and output the value of either `a` or `b`.

  

Fig1.9

  

Truth table:

  

| a | b | sel | out |

|---|---|-----|-----|

| 0 | 0 | 0 | 0 |

| 0 | 0 | 1 | 0 |

| 0 | 1 | 0 | 0 |

| 0 | 1 | 1 | 1 |

| 1 | 0 | 0 | 1 |

| 1 | 0 | 1 | 0 |

| 1 | 1 | 0 | 1 |

| 1 | 1 | 1 | 1 |

  

API:

  

| | |

|-----------|--------------------------------------------|

| Chip name | `Mux` |

| Input | `a`, `b`, `sel` |

| Output | `out` |

| Function | `if (sel == 0) then out = a, else out = b` |

  

HDL:

  

```hdl

CHIP Mux {

IN a, b, sel;

OUT out;

  

PARTS:

Not(in= sel, out= notsel);

And(a= a, b= notsel, out= aandnotsel);

And(a= b, b= sel, out= bandsel);

Or(a= aandnotsel, b= bandsel, out= out);

}

```

  

##### Demultiplexer

A demultiplexer performs the opposite function of a multiplexer: it takes a single input value and routes it to one of two possible outputs, according a selector bit that selects the destination output.

  

Fig1.10

  

| in | sel | a | b |

|----|-----|---|---|

| 0 | 0 | 0 | 0 |

| 0 | 1 | 0 | 0 |

| 1 | 0 | 1 | 0 |

| 1 | 1 | 0 | 1 |

  

API:

| | |

|-----------|--------------------------------------------------------------|

| Chip name | `DMux` |

| Input | `in`, `sel` |

| Output | `a`, `b` |

| Function | `if (sel == 0) then {a, b} = {in, 0}, else {a, b} = {0, in} ` |

  

HDL:

  

```hdl

CHIP DMux {

IN in, sel;

OUT a, b;

  

PARTS:

Not(in= sel, out= notsel);

And(a= in, b= notsel, out= a);

And(a= in, b= sel, out= b);

}

```

  

#### Multi-bit versions of basic gates

This section describes several 16-bit logic gates that will be needed for constructing our target computer platform. HDL programs treat multi-bit values like single-bit values, except that the values can be indexed in order to access individual bits. For example, if `in` and `out` represent 16-bit values, then `out [3] = in[5]` sets the 3rd bit of `out` to the value of the 5th bit of in. The bits are indexed from right to left, the rightmost bit being the 0’th but and the leftmost bit being the 15’th bit (in a 16-bit setting).

  

##### 16-bit Not gate

Applies the Boolean operation `Not` to every one of the input bits.

  

API:

  

| | |

|-----------|-------------------------------------|

| Chip name | `Not16` |

| Input | `in[16]` |

| Output | `out[16]` |

| Function | `for i = 0..15 out[i] = Not(in[i])` |

  

HDL:

  

```hdl

CHIP Not16 {

IN in[16];

OUT out[16];

  

PARTS:

Not(in= in[0], out= out[0]);

Not(in= in[1], out= out[1]);

Not(in= in[2], out= out[2]);

Not(in= in[3], out= out[3]);

Not(in= in[4], out= out[4]);

Not(in= in[5], out= out[5]);

Not(in= in[6], out= out[6]);

Not(in= in[7], out= out[7]);

Not(in= in[8], out= out[8]);

Not(in= in[9], out= out[9]);

Not(in= in[10], out= out[10]);

Not(in= in[11], out= out[11]);

Not(in= in[12], out= out[12]);

Not(in= in[13], out= out[13]);

Not(in= in[14], out= out[14]);

Not(in= in[15], out= out[15]);

}

```

  

##### 16-bit And gate

Applies the Boolean operation `And` to every one of the input bits.

  

API:

  

| | |

|-----------|------------------------------------------|

| Chip name | `And16` |

| Input | `a[16]`, `b[16]` |

| Output | `out[16]` |

| Function | `for i = 0..15 out[i] = And(a[i], b[i])` |

  

HDL:

  

```hdl

CHIP And16 {

IN a[16], b[16];

OUT out[16];

  

PARTS:

And(a= a[0], b= b[0], out= out[0]);

And(a= a[1], b= b[1], out= out[1]);

And(a= a[2], b= b[2], out= out[2]);

And(a= a[3], b= b[3], out= out[3]);

And(a= a[4], b= b[4], out= out[4]);

And(a= a[5], b= b[5], out= out[5]);

And(a= a[6], b= b[6], out= out[6]);

And(a= a[7], b= b[7], out= out[7]);

And(a= a[8], b= b[8], out= out[8]);

And(a= a[9], b= b[9], out= out[9]);

And(a= a[10], b= b[10], out= out[10]);

And(a= a[11], b= b[11], out= out[11]);

And(a= a[12], b= b[12], out= out[12]);

And(a= a[13], b= b[13], out= out[13]);

And(a= a[14], b= b[14], out= out[14]);

And(a= a[15], b= b[15], out= out[15]);

}

```

  

##### 16-bit Or gate

Applies the Boolean operation `Or` to every one of the input bits.

  

API:

  

| | |

|-----------|-----------------------------------------|

| Chip name | `Or16` |

| Input | `a[16]`, `b[16]` |

| Output | `out[16]` |

| Function | `for i = 0..15 out[i] = Or(a[i], b[i])` |

  

HDL:

  

```hdl

CHIP Or16 {

IN a[16], b[16];

OUT out[16];

  

PARTS:

Or(a= a[0], b= b[0], out= out[0]);

Or(a= a[1], b= b[1], out= out[1]);

Or(a= a[2], b= b[2], out= out[2]);

Or(a= a[3], b= b[3], out= out[3]);

Or(a= a[4], b= b[4], out= out[4]);

Or(a= a[5], b= b[5], out= out[5]);

Or(a= a[6], b= b[6], out= out[6]);

Or(a= a[7], b= b[7], out= out[7]);

Or(a= a[8], b= b[8], out= out[8]);

Or(a= a[9], b= b[9], out= out[9]);

Or(a= a[10], b= b[10], out= out[10]);

Or(a= a[11], b= b[11], out= out[11]);

Or(a= a[12], b= b[12], out= out[12]);

Or(a= a[13], b= b[13], out= out[13]);

Or(a= a[14], b= b[14], out= out[14]);

Or(a= a[15], b= b[15], out= out[15]);

}

```

  

##### 16-bit Multiplexer gate

Operates exactly as the basic multiplexer, except that its input and output are 16-bits wide.

  

API:

  

| | |

|-----------|--------------------------------------------------------------|

| Chip name | `Mux16` |

| Input | `a[16]`, `b[16]`, `sel` |

| Output | `out[16]` |

| Function | `if (sel == 0) then for i = 0..15 out[i] = a[i], else for i = 0..15 out[i] = b[i]` |

  

HDL:

  

```hdl

CHIP Mux16 {

IN a[16], b[16], sel;

OUT out[16];

  

PARTS:

Mux(a= a[0], b= b[0], sel= sel, out= out[0]);

Mux(a= a[1], b= b[1], sel= sel, out= out[1]);

Mux(a= a[2], b= b[2], sel= sel, out= out[2]);

Mux(a= a[3], b= b[3], sel= sel, out= out[3]);

Mux(a= a[4], b= b[4], sel= sel, out= out[4]);

Mux(a= a[5], b= b[5], sel= sel, out= out[5]);

Mux(a= a[6], b= b[6], sel= sel, out= out[6]);

Mux(a= a[7], b= b[7], sel= sel, out= out[7]);

Mux(a= a[8], b= b[8], sel= sel, out= out[8]);

Mux(a= a[9], b= b[9], sel= sel, out= out[9]);

Mux(a= a[10], b= b[10], sel= sel, out= out[10]);

Mux(a= a[11], b= b[11], sel= sel, out= out[11]);

Mux(a= a[12], b= b[12], sel= sel, out= out[12]);

Mux(a= a[13], b= b[13], sel= sel, out= out[13]);

Mux(a= a[14], b= b[14], sel= sel, out= out[14]);

Mux(a= a[15], b= b[15], sel= sel, out= out[15]);

}

```

  

#### Multi-way versions of basic gates

Logic gates that operate on one or two inputs have natural generalization to multi-way variants that operate on more than two inputs.

  

##### Multi-way 16-bit demultiplexer gate

An m-way n-bit demultiplexer routes its single n-bit input to one of its m n-bit outputs. The other outputs are set to 0. The selection is specified by a set of k selection bits, where $k = log_2{m}$.

  

Our target computer platform requires two variants of this chip: a 4-way 1-bit demultiplexer and an 8-way 1-bit demultiplexer.

  

API:

| | |

|-----------|--------------------------------------------------------------|

| Chip name | `DMux4Way` |

| Input | `in`, `sel[2]` |

| Output | `a`, `b`, `c`, `d` |

| Function | `if (sel == 00) then {a, b, c, d} = {1, 0, 0, 0},<br><br>else if (sel == 01) then {a, b, c, d} = {0, 1, 0, 0},<br><br>else if (sel == 01) then {a, b, c, d} = {0, 0, 1, 0},<br><br>else if (sel == 11) then {a, b, c, d} = {0, 0, 0, 1}<br>` |

  

HDL:

  

```hdl

```

  
  

| | |

|-----------|--------------------------------------------------------------|

| Chip name | `DMux8Way` |

| Input | `in`, `sel[3]` |

| Output | `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h` |

| Function | `if (sel == 000) then {a, b, c, …, h} = {1, 0, 0, 0, 0, 0, 0, 0},<br><br>else if (sel == 001) then {a, b, c, …, h} = {0, 1, 0, 0, 0, 0, 0, 0},<br><br>if (sel == 010) then {a, b, c, …, h} = {0, 0, 1, 0, 0, 0, 0, 0},<br><br>…<br><br>if (sel == 111) then {a, b, c, …, h} = {0, 0, 0, 0, 0, 0, 0, 1}<br>` |

  

HDL:

  

```hdl

```

  

## Chapter 2

### Binary number

A binary number is a number expressed in base-2 (binary) numeral system. The base-2 numeral system is a positional notation with a radix of 2.

  

![Counting in base-2](/img/user/book-notes/assets/nand_to_tetris_binary_counter.gif)

  

Each binary digit (bit) represents an increasing power of $2$, with the rightmost bit representing $2^0$, the next representing $2^1$, then $2^2$, and so on. e.g.

  

$100101_2$ = $[ ( 1 ) × 2^5 ] + [ ( 0 ) × 2^4 ] + [ ( 0 ) × 2^3 ] + [ ( 1 ) × 2^2 ] + [ ( 0 ) × 2^1 ] + [ ( 1 ) × 2^0 ]$

$100101_2$ = $[ 1 × 32 ] + [ 0 × 16 ] + [ 0 × 8 ] + [ 1 × 4 ] + [ 0 × 2 ] + [ 1 × 1 ]$

$100101_2$ = $37_10$

  

Any number can be represented by a sequence of bits, which in turn can be represented by any mechanism capable of being in two mutually exclusive states.

  

Integer numbers are unbounded: for any given number $x$, there are integers that are less than $x$ and integers greater than $x$. However, computers are finite machines that use a fixed word size for reprensenting numbers. An 8-bit register can represent $2^8 = 256$ different things. Using $n$ bits, we can represent all the nonnegative integers ranging from $0$ to $2^n - 1$.

  

#### Two's complement

A two's complement number system encodes positive and negative numbers in a binary number representation. The weight of each bit is a power of two, except for the most significant bit (aka sign bit), whose weight is the negative of the corresponding power of two. The value $w$ of an $N$-bit integer $a_{N-1} a_{N-2} ... a_0$ is given by the following formula:

$$

w = -a_{N-1} 2^{N-1} + \sum_{i=0}^{N-2} a_i 2^i

$$

  

The two's complement of an $N$-bit number is the complement of that number with respect to $2^N$. i.e. Given that $x$ is an $N$-bit number and $y$ is its two's complement, then $x + y = 2^N$. e.g.

  

$$

N = 3

2^N = 2^3 = 8_10 = 1000_2

If \space x = 011_2 \space (3_10)

Then \space y \space (x's \space two's \space complement) = 101_2 \space (5_10)

Because,

011_2 + 101_2 = 1000_2 = 2^N

$$

  

##### How to calculate

Calculation of the two's complement of a number essentially means subtracting the number from $2^N$. But as can be seen from the 3-bit example and the 4-bit $1000_2$, the number $2^N$ will not itself be representable in a system limited to $N$ bits, as it is just outside the $N$ bit space. Because of this, systems with maximally $N$-bit must break the subtraction into two operations:

1. First, subtract from the maximum number in the $N$-bit system, that is $2^N - 1$. This term in binary is actually a simple number consisting of 'all 1s', and a subtraction from it can be done by simply inverting all bits in the number. The number obtained in this step is called the **ones' complement** because summing it with the orignal number yields 'all 1s'.

2. Secondly, add one to the result.

  

| Bits | Unsigned value | Signed value (Two's complement) |

|--------|----------|--------------------------|

| 000 | 0 | 0 |

| 001 | 1 | 1 |

| 010 | 2 | 2 |

| 011 | 3 | 3 |

| 100 | 4 | -4 |

| 101 | 5 | -3 |

| 110 | 6 | -2 |

| 111 | 7 | -1 |

  

##### Why it works

Given a set of all possible $N$-bit values, we can assign the lower (by the binary value) half to be the integers from 0 to ($2^{N-1} - 1) inclusive and the upper half to be $-2^{N-1}$ to $-1$ inclusive. The upper half (again, by the binary value) can be used to represent negative integers from $-2^{N-1}$ to $-1$ because, under addition modulo $2^N$ they behave the same way as those negative integers. That is to say that, because $i + j \bmod 2^N = i + (j + 2^N) \bmod 2^N$, any value in the set ${j + k2^N | k \space is \space an \space integer}$ can be used in place of $j$. Fundamentally, the system counts negative numbers by counting backwards and wrapping around.

  

##### Benefits

The two's complement system has the following advantages over other systems for representing signed numbers:

1. The fundamental arithmetic operations of addition, subtraction, and multiplication are identical to those for unsigned binary numbers (as long as the inputs are represented in the same number of bits as the output, and any overflow beyond those bits are discarded from the result). The system therefore allows certain arithmetic operations without dedicated or sign detection circuit.

2. It has no representation for negative zero.

  

## Binary addition

A pair of binary numbers can be added bitwise from right to left, using the same decimal addition algorithm learned in elementary school.

  

```

1 1 1 1 1 (carried bits )

0 1 1 0 1

+ 1 0 1 1 1

-------------

= 1 0 0 1 0 0 = 36

```

  

### Adder

An adder or summer is a digital circuit used in the ALU to perform addition on binary numbers.