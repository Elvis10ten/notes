# [WIP] The Elements of Computing Systems – Building a Modern Computer from First Principles

> Verdict: I highly recommend this [book](https://amzn.to/3CnFJRp). It literally starts from nothing and builds a computer from first principles.
> It's a great way to understand how computers work and has changed the way I think about computers.

## Chapter 1: Boolean logic
Modern computers store and process information stored as two-valued signals — called <bmark>bits</bmark> (i.e. binary digits).
Two-value signals were chosen because they can readily be represented, stored, and transmitted.
For example, they can be represented as:
* The presence or absence of a hole in a punched card,
* High or low voltage on a wire,
* A magnetic domain oriented clockwise or counterclockwise.

A binary variable or a bit can represent two possible states: `0` and `1`; `off` and `on`; `false` and `true`; `no` and `yes`; etc. $n$ binary variables can be used to represent $2^n$ states. e.g.

| $b_2$ | $b_1$ | $b_0$ |
|-------|-------|-------|
| 0     | 0     | 0     |
| 0     | 0     | 1     |
| 0     | 1     | 0     |
| 0     | 1     | 1     |
| 1     | 0     | 0     |
| 1     | 0     | 1     |
| 1     | 1     | 0     |
| 1     | 1     | 1     |

---

<bmark>Boolean algebra</bmark> is used to manipulate binary values.
A <bmark>boolean function</bmark> (aka <pmark>boolean operator</pmark>) is a function that operates on binary inputs and returns binary outputs.

The total number of boolean functions for $n$ binary variables is $2^{2^n}$, because:

* There are $2^n$ input combinations.
* Each of these input combinations can be mapped to either `0` or `1`.
* Therefore, the total number of boolean functions is: $2^{2^n}$

e.g. There are $16$ distinct boolean functions for $2$ binary variables.

| Function | Expression      | A=0, B=0 | A=0, B=1 | A=1, B=0 | A=1, B=1 |
|----------|-----------------|----------|----------|----------|----------|
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

---

A <bmark>logic gate</bmark> (also called **chip** in the book) is a physical device that implements a boolean function.
Every digital device is based on a set of chips designed to store and process binary information.
These chips are all made of <pmark>elementary logic gates</pmark>.

<bmark>Elementary logic gates</bmark> can be physically realized using many different hardware technologies, but their logical behavior, or abstraction, is consistent across implementations.

Since all logic gates have the same input and output data type (i.e. binary), they can be combined, creating composite gates of arbitrary complexity. e.g. `Xor = Or(And(a, Not(b)), And(Not(a), b))`.

Any given logic gate can be viewed from two perspective:
1. **External**: The interface of the gate, outlining its input pins, output pins, and its behavior.
2. **Internal**: The implementation of the gate. There can be multiple implementations of a gate’s interface. The goal is to find an implementation that is correct (functional requirement) and efficient (performance requirement).

---

A <bmark>hardware description language(HDL)</bmark> is a specialized computer language used to describe the structure and behavior of chips.

> The designer specifies the chip logic by writing a HDL program, which is then subjected to a rigorous battery of tests.
> The tests are carried out virtually, using computer simulation: A special software tool, called a **hardware simulator**, takes the HDL program as input and creates a software representation of the chip logic.
> Next, the designer can instruct the simulator to test the virtual chip on various sets of inputs. The simulator computes the chip outputs, which are then compared to the desired outputs.

The hardware simulator can also simulate and quantify the performance characteristics (energy consumption, computational speed, cost) of a chip.

---

The **specifications of the logic gates** needed to build the chips of our computer system are given below.

---

First, the **primitive** <bmark>NAND</bmark> gate, which is shorthand for **Not-And** because it’s equivalent to `Not(And(a, b))`.

![](/docs/assets/nand-images/nand_gate.svg)


Truth table:

| a | b | Nand(a, b) |
|---|---|------------|
| 0 | 0 | 1          |
| 0 | 1 | 1          |
| 1 | 0 | 1          |
| 1 | 1 | 0          |

API:

|           |                                                       |
|-----------|-------------------------------------------------------|
| Chip name | `Nand`                                                |
| Input     | `a`, `b`                                              |
| Output    | `out`                                                 |
| Function  | `if ((a == 1) and (b==1)) then out = 0, else out = 1` |

The NAND gate is called a primitive gate because it can be used to implement any boolean function. Proof:

* Various subsets of logical operators can be used for expressing any boolean function, and `{ And, Or, Not }` is one such subset. NAND can be used to implement each member of the subset as demonstrated below.

* `NOT(a) = NAND(a, a)`

* `AND(a, b) = NOT(NAND(a, b))`

* `OR(a, b) = NOT(NOT(a) AND NOT(b))` (De morgan law); This is equivalent to: `OR(a, b) = NAND(NOT(a), NOT(b))`

---

Next, we look at a set of four gates that implement <pmark>classical logical operators</pmark>. Starting with the <bmark>Not (aka inverter) gate</bmark>, which outputs the opposite value of its input’s value.

![](/docs/assets/nand-images/not_gate.svg)

Truth table:

| a | Not(a) |
|---|--------|
| 0 | 1      |
| 1 | 0      |

API:

|           |                                           |
|-----------|-------------------------------------------|
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

---

The next classical gate is the <bmark>AND gate</bmark>, which returns $1$ when both its inputs are $1$, and $0$ otherwise.


![](/docs/assets/nand-images/and_gate.svg)


Truth table:  

| a | b | And(a, b) |
|---|---|-----------|
| 0 | 0 | 0         |
| 0 | 1 | 0         |
| 1 | 0 | 0         |
| 1 | 1 | 1         |

API:

|           |                                                       |
|-----------|-------------------------------------------------------|
| Chip name | `And`                                                 |
| Input     | `a`, `b`                                              |
| Output    | `out`                                                 |
| Function  | `if ((a == 1) and (b==1)) then out = 1, else out = 0` |


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
---
The <bmark>Or gate</bmark> returns $1$ when at least one of its inputs is $1$, and $0$ otherwise.

![](/docs/assets/nand-images/or_gate.svg)



Truth table:

| a | b | Or(a, b) |
|---|---|----------|
| 0 | 0 | 0        |
| 0 | 1 | 1        |
| 1 | 0 | 1        |
| 1 | 1 | 1        |

  

API:

|           |                                                         |
|-----------|---------------------------------------------------------|
| Chip name | `Or`                                                    |
| Input     | `a`, `b`                                                |
| Output    | `out`                                                   |
| Function  | `if ((a == 0) and (b == 0)) then out = 0, else out = 1` |

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

---
The last classical gate we will build is the <bmark>Xor (aka exclusive or) gate</bmark> which returns $1$ when exactly one of its input is $1$, and $0$ otherwise.

![](/docs/assets/nand-images/xor_gate.svg)

  
Truth table:

| a | b | Xor(a, b) |
|---|---|-----------|
| 0 | 0 | 0         |
| 0 | 1 | 1         |
| 1 | 0 | 1         |
| 1 | 1 | 0         |

API:

|           |                                          |
|-----------|------------------------------------------|
| Chip name | `Xor`                                    |
| Input     | `a`, `b`                                 |
| Output    | `out`                                    |
| Function  | `if (a != b) then out = 1, else out = 0` |

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

---

Next, we look at a set of <pmark>control flow gates</pmark>. These gates provide means for controlling flows of information. The first of such gate is the <bmark>multiplexer</bmark> which is a three-input gate. Two input bits, named `a` and `b`, are interpreted as **data bits**, and a third bit, named `sel`, is interpreted as a **selection bit**. The multiplexer uses `sel` to select and output the value of either `a` or `b`.

![](/docs/assets/nand-images/multiplexer_gate.png)

Truth table:

| a | b | sel | out |
|---|---|-----|-----|
| 0 | 0 | 0   | 0   |
| 0 | 0 | 1   | 0   |
| 0 | 1 | 0   | 0   |
| 0 | 1 | 1   | 1   |
| 1 | 0 | 0   | 1   |
| 1 | 0 | 1   | 0   |
| 1 | 1 | 0   | 1   |
| 1 | 1 | 1   | 1   |

API:

|           |                                            |
|-----------|--------------------------------------------|
| Chip name | `Mux`                                      |
| Input     | `a`, `b`, `sel`                            |
| Output    | `out`                                      |
| Function  | `if (sel == 0) then out = a, else out = b` |

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
---

Next is the <bmark>demultiplexer gate</bmark> which performs the opposite function of a multiplexer: it takes a single input value and routes it to one of two possible outputs, according to a selector bit that selects the destination output.

![](/docs/assets/nand-images/demultiplexer_gate.png)

| in | sel | a | b |
|----|-----|---|---|
| 0  | 0   | 0 | 0 |
| 0  | 1   | 0 | 0 |
| 1  | 0   | 1 | 0 |
| 1  | 1   | 0 | 1 |

API:

|           |                                                               |
|-----------|---------------------------------------------------------------|
| Chip name | `DMux`                                                        |
| Input     | `in`, `sel`                                                   |
| Output    | `a`, `b`                                                      |
| Function  | `if (sel == 0) then {a, b} = {in, 0}, else {a, b} = {0, in} ` |

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
---
Now, we explore <bmark>multi-bit versions of some of the basic gates</bmark> above. This section describes several 16-bit logic gates that will be needed for constructing our target computer platform. HDL programs treat multi-bit values like single-bit values, except that the values can be indexed in order to access individual bits. For example, if `in` and `out` represent 16-bit values, then `out [3] = in[5]` sets the 3rd bit of `out` to the value of the 5th bit of `in`. The bits are indexed from right to left, the rightmost bit being the 0’th bit and the leftmost bit being the 15’th bit (in a 16-bit setting).

---
The first multi-bit gate we will build is the <bmark>16-bit Not gate</bmark>, which applies the Boolean operation `Not` to every one of the input bits.

API:

|           |                                     |
|-----------|-------------------------------------|
| Chip name | `Not16`                             |
| Input     | `in[16]`                            |
| Output    | `out[16]`                           |
| Function  | `for i = 0..15 out[i] = Not(in[i])` |

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
---
Next is the <bmark>16-bit And gate</bmark>, which applies the Boolean operation `And` to every one of the input bits.

API:

|           |                                          |
|-----------|------------------------------------------|
| Chip name | `And16`                                  |
| Input     | `a[16]`, `b[16]`                         |
| Output    | `out[16]`                                |
| Function  | `for i = 0..15 out[i] = And(a[i], b[i])` |

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

---
Followed by the <bmark>16-bit Or gate</bmark>, which applies the Boolean operation `Or` to every one of the input bits.

API:

|           |                                         |
|-----------|-----------------------------------------|
| Chip name | `Or16`                                  |
| Input     | `a[16]`, `b[16]`                        |
| Output    | `out[16]`                               |
| Function  | `for i = 0..15 out[i] = Or(a[i], b[i])` |

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

---
Finally, the <bmark>16-bit Multiplexer gate</bmark>, which operates exactly as the basic multiplexer, except that its input and output are 16-bits wide.

API:

|           |                                                                                    |
|-----------|------------------------------------------------------------------------------------|
| Chip name | `Mux16`                                                                            |
| Input     | `a[16]`, `b[16]`, `sel`                                                            |
| Output    | `out[16]`                                                                          |
| Function  | `if (sel == 0) then for i = 0..15 out[i] = a[i], else for i = 0..15 out[i] = b[i]` |

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
---
The last set of gates we will build are the <bmark>multi-way versions of basic gates</bmark>. Logic gates that operate on one or two inputs have natural generalization to multi-way variants that operate on more than two inputs.

---
The first gate in this set is the <bmark>multi-way Or gate</bmark>. An m-way `Or` gate outputs `1` when at least one of its `m` input bits is `1`, and `0` otherwise. Our target computer will need an 8-way variant of this gate:

|           |                                      |
|-----------|--------------------------------------|
| Chip name | `Or8Way`                             |
| Input     | `in[8]`                              |
| Output    | `out`                                |
| Function  | `out = Or(in[0], in[1], ..., in[7])` |

```hdl
CHIP Or8Way {

IN in[8];

OUT out;

  

PARTS:

Or(a= in[0], b= in[1], out= in01);

Or(a= in01, b= in[2], out= in012);

Or(a= in012, b= in[3], out= in0123);

Or(a= in0123, b= in[4], out= in01234);

Or(a= in01234, b= in[5], out= in012345);

Or(a= in012345, b= in[6], out= in0123456);

Or(a= in0123456, b= in[7], out= out);

}
```
---
Next, we build a <bmark>multi-way multi-bit multiplexer gate</bmark>. An m-way n-bit multiplexer selects one of its $m$ n-bit inputs, and outputs it to its n-bit output. The selection is specified by a set of $k$ selection bits, where $k = log_2{m}$.

Our target computer platform requires two variants of this chip: a 4-way 16-bit multiplexer and an 8-way 16-bit multiplexer.

API:

|           |                                                                                                                                                                |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chip name | `Mux4Way16`                                                                                                                                                    |
| Input     | `a[16]`, `b[16]`, `c[16]`, `d[16]`, `sel[2]`                                                                                                                   |
| Output    | `out[16]`                                                                                                                                                      |
| Function  | `if (sel == 00) then out = a,`<br><br>`else if (sel == 01) then out = b,`<br><br>`else if (sel == 10) then out = c,`<br><br>`else if (sel == 11) then out = d` |


|           |                                                                                                                                                                                                                                                                                                                                                   |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chip name | `Mux8Way16`                                                                                                                                                                                                                                                                                                                                       |
| Input     | `a[16]`, `b[16]`, `c[16]`, `d[16]`, `e[16]`, `f[16]`, `g[16]`, `h[16]`, `sel[3]`                                                                                                                                                                                                                                                                  |
| Output    | `out[16]`                                                                                                                                                                                                                                                                                                                                         |
| Function  | `if (sel == 000) then out = a,`<br><br>`else if (sel == 001) then out = b,`<br><br>`else if (sel == 010) then out = c,`<br><br>`else if (sel == 011) then out = d`<br><br>`else if (sel == 100) then out = e,`<br><br>`else if (sel == 101) then out = f,`<br><br>`else if (sel == 110) then out = g,`<br><br>`else if (sel == 111) then out = h` |

HDL:

```hdl
CHIP Mux4Way16 {

IN a[16], b[16], c[16], d[16], sel[2];

OUT out[16];

PARTS:

// First level: Select between a/b and c/d using sel[0]

Mux16(a=a, b=b, sel=sel[0], out=ab); // ab is the output of first Mux16

Mux16(a=c, b=d, sel=sel[0], out=cd); // cd is the output of second Mux16

  

// Second level: Select between ab and cd using sel[1]

Mux16(a=ab, b=cd, sel=sel[1], out=out);

}
```

```hdl
CHIP Mux8Way16 {

IN a[16], b[16], c[16], d[16],

e[16], f[16], g[16], h[16],

sel[3];

OUT out[16];

  

PARTS:

Mux4Way16(a= a, b= b, c= c, d= d, sel= sel[0..1], out= abcd);

Mux4Way16(a= e, b= f, c= g, d= h, sel= sel[0..1], out= efgh);

Mux16(a= abcd, b= efgh, sel= sel[2], out= out);

}
```

------

Finally, we build a <bmark>multi-way 16-bit demultiplexer gate</bmark>. An m-way n-bit demultiplexer routes its single n-bit input to one of its $m$ n-bit outputs. The other outputs are set to `0`. The selection is specified by a set of $k$ selection bits, where $k = log_2{m}$.

Our target computer platform requires two variants of this chip: a 4-way 1-bit demultiplexer and an 8-way 1-bit demultiplexer.

API:

|           |                                                                                                                                                                                                                                                    |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chip name | `DMux4Way`                                                                                                                                                                                                                                         |
| Input     | `in`, `sel[2]`                                                                                                                                                                                                                                     |
| Output    | `a`, `b`, `c`, `d`                                                                                                                                                                                                                                 |
| Function  | `if (sel == 00) then {a, b, c, d} = {in, 0, 0, 0},`<br><br>`else if (sel == 01) then {a, b, c, d} = {0, in, 0, 0},`<br><br>`else if (sel == 10) then {a, b, c, d} = {0, 0, in, 0},`<br><br>`else if (sel == 11) then {a, b, c, d} = {0, 0, 0, in}` |

HDL:

```hdl
CHIP DMux4Way {

IN in, sel[2];

OUT a, b, c, d;

  

PARTS:

DMux(in= in, sel= sel[1], a= first, b= second);

DMux(in= first, sel= sel[0], a= a, b= b);

DMux(in= second, sel= sel[0], a= c, b= d);

}
```


|           |                                                                                                                                                                                                                                                                                                               |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chip name | `DMux8Way`                                                                                                                                                                                                                                                                                                    |
| Input     | `in`, `sel[3]`                                                                                                                                                                                                                                                                                                |
| Output    | `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`                                                                                                                                                                                                                                                                        |
| Function  | `if (sel == 000) then {a, b, c, …, h} = {1, 0, 0, 0, 0, 0, 0, 0},`<br><br>`else if (sel == 001) then {a, b, c, …, h} = {0, 1, 0, 0, 0, 0, 0, 0},`<br><br>`if (sel == 010) then {a, b, c, …, h} = {0, 0, 1, 0, 0, 0, 0, 0},`<br><br>…<br><br>`if (sel == 111) then {a, b, c, …, h} = {0, 0, 0, 0, 0, 0, 0, 1}` |

HDL:

```hdl
CHIP DMux8Way {

IN in, sel[3];

OUT a, b, c, d, e, f, g, h;

  

PARTS:

DMux(in= in, sel= sel[2], a= first, b= second);

DMux4Way(in= first, sel= sel[0..1], a= a, b= b, c= c, d= d);

DMux4Way(in= second, sel= sel[0..1], a= e, b= f, c= g, d= h);

}
```

## Chapter 2: Boolean arithmetic

🎯 Objective: Use the gates from chapter 1 to build an ALU (Arithmetic logic unit).

The <bmark>ALU</bmark> is the centerpiece chip that executes all the arithmetic and logical operations performed by the computer.

---

A <bmark>binary number</bmark> is a number expressed in the **base-2 positional numeral system**.
Let $x = x_{n}x_{n − 1}x_{n − 2} ... x_{0}$ be a string of binary digits, the value of $x$ in the base-2 positional numeral system is defined as: $x = \sum_{i=0}^{n} x_i \cdot b^i$

e.g.    

$100101_2$ = $[ ( 1 ) × 2^5 ] + [ ( 0 ) × 2^4 ] + [ ( 0 ) × 2^3 ] + [ ( 1 ) × 2^2 ] + [ ( 0 ) × 2^1 ] + [ ( 1 ) × 2^0 ]$

$100101_2$ = $[ 1 × 32 ] + [ 0 × 16 ] + [ 0 × 8 ] + [ 1 × 4 ] + [ 0 × 2 ] + [ 1 × 1 ]$

$100101_2$ = $37_{10}$

A <pmark>numeral system</pmark> is a mathematical notation for representing numbers of a given set using digits or other symbols in a consistent manner.

In a <bmark>positional numeral system</bmark>, the <pmark>radix</pmark> or <ymark>base</ymark> is the number of unique digits, including the digit zero, used to represent numbers.

Computers represent numbers in binary. Any number can be represented by a sequence of bits (binary digits), which in turn may be represented by any mechanism capable of being in two mutually exclusive states.

Integer numbers are unbounded: for any given number $x$, there are integers that are less than $x$ and integers greater than $x$. However, computers are finite machines that use a fixed word size for representing numbers. An 8-bit register can represent $2^8 = 256$ different things. Using $n$ bits, we can represent all the nonnegative integers ranging from $0$ to $2^n - 1$.

---
The three common methods of extending the binary numeral system to represent <bmark>signed numbers</bmark> (i.e. positive, negative, and zero) numbers are:
* Sign–magnitude,
* Ones' complement, and
* Two's complement.

Of the three, two’s complement is the most commonly used today.

---
A <bmark>two's complement number system</bmark> encodes positive and negative numbers in a binary number representation. The weight of each bit is a power of two, except for the <pmark>most significant bit</pmark> (aka <ymark>sign bit</ymark>), whose weight is the negative of the corresponding power of two. The value $w$ of an N-bit integer $a_{N-1} a_{N-2} ... a_0$ is given by the following formula:

$$
w = -(a_{N-1} 2^{N-1}) + \sum_{i=0}^{N-2} a_i 2^i
$$

  

The two's complement of an N-bit number is the complement of that number with respect to $2^N$ (this is the property that gives this system its name). i.e. Given that $x$ is an N-bit number and $y$ is its two's complement, then $x + y = 2^N$. e.g.

$N = 3$

$2^N = 2^3 = 8_{10} = 1000_2$

If, $\space x = 011_2 \space (3_{10})$

Then, $y$ (x's two's complement) $= 101_2$ $(5_{10})$ because:

$011_2 + 101_2 = 1000_2 = 2^N$

---
<bmark>Calculation of the two's complement of a number</bmark> essentially means subtracting the number from $2^N$. But as can be seen from the 3-bit example above with the 4-bit $1000_2$, the number $2^N$ will not itself be representable in a system limited to $N$ bits, as it is just outside the $N$ bit space. Because of this, systems with maximally N-bit must break the subtraction into two operations:

1. First, subtract from the maximum number in the N-bit system, that is $2^N - 1$. This term in binary is actually a simple number consisting of 'all 1s', and a subtraction from it can be done by simply inverting all bits in the number. The number obtained in this step is called the **ones' complement** because summing it with the original number yields 'all 1s'.
2. Secondly, add one to the result.

| Bits | Unsigned value | Signed value (Two's complement) |
|------|----------------|---------------------------------|
| 000  | 0              | 0                               |
| 001  | 1              | 1                               |
| 010  | 2              | 2                               |
| 011  | 3              | 3                               |
| 100  | 4              | -4                              |
| 101  | 5              | -3                              |
| 110  | 6              | -2                              |
| 111  | 7              | -1                              |

---
Here is <bmark>why the two's complement system works</bmark>. Given a set of all possible N-bit values, we can assign the lower (by the binary value) half to be the integers from $0$ to $(2^{N-1} - 1)$ inclusive and the upper half to be $-2^{N-1}$ to $-1$ inclusive. The upper half (again, by the binary value) can be used to represent negative integers from $-2^{N-1}$ to $-1$ because, under addition modulo $2^N$ they behave the same way as those negative integers. That is to say that, because $i + j \bmod 2^N = i + (j + 2^N) \bmod 2^N$, any value in the set $\{j + k2^N \space | \space k \space is \space an \space integer\}$ can be used in place of $j$. Fundamentally, the system counts negative numbers by counting backwards and wrapping around.

Given $2^N = 2^3$, these are some examples:

| Addition in the two's complement system      | Addition modulo $2^3$                                             |
|----------------------------------------------|-------------------------------------------------------------------|
| $-4 + 3 = -1$ (represented as $7$ in binary) | $4 + 3 \bmod 8 = 7$ (the two's complement representation of $-1$) |
| $-3 + 3 = 0$ (represented as $0$ in binary)  | $5 + 3 \bmod 8 = 8$ (the two's complement representation of $0$)  |
| $-2 + 3 = 1$ (represented as $1$ in binary)  | $6 + 3 \bmod 8 = 1$ (the two's complement representation of $1$)  |

---
The <bmark>two's complement system has the following advantages</bmark> over other systems for representing signed numbers:


1. The fundamental arithmetic operations of addition, subtraction, and multiplication are identical to those for unsigned binary numbers (as long as the inputs are represented in the same number of bits as the output, and any overflow beyond those bits are discarded from the result).
2. It has no representation for negative zero (unlike the ones' complement and sign-magnitude representations).

The material implications of these theoretical results are significant:
* Dedicated hardware is not needed to handle arithmetic with signed numbers.
* Subtraction can be treated as adding the complement of the subtrahend. Again, no dedicated hardware required.

---
A <bmark>pair of binary numbers can be added</bmark> bitwise from right to left, using the same decimal addition algorithm learned in elementary school.

```

1 1 1 1 1 (carried bits )

  0 1 1 0 1 (13_10)

+ 1 0 1 1 1 (23_10)

-------------

1 0 0 1 0 0 (36_10)

```

When adding in the two's complement system, any extra carry bit is discarded, such that the result and the addends always have the same number of bits. This is effectively the same as applying the modulo operator. For any number $x$, computing $x \bmod 2^N$ essentially results in keeping the lowest $N$ bits of the number $x$. As explained in the two's complement section, this modulo operation is what makes the two's complement system work.

---

An <bmark>adder</bmark> or summer is a digital circuit used in the ALU to perform addition on binary numbers. We saw (from the elementary school style addition) that computer hardware for binary addition of two n-bit numbers can be built from logic gates designed to calculate the sum of three bits (pair of bits plus carry bit). These are the following hierarchy of adders that will be built:

---
A <bmark>half adder</bmark> is designed to add two bits.

|           |                                                    |
|-----------|----------------------------------------------------|
| Chip name | `HalfAdder`                                        |
| Input     | `a`, `b`                                           |
| Output    | `sum`, `carry`                                     |
| Function  | `sum = LSB of a + b`<br><br>`carry = MSB of a + b` |

An inspection of the truth table reveals that the outputs `sum(a, b)` and `carry(a, b)` are identical to those of two simple Boolean functions `Xor` and `And` respectively.

| a | b | carry | sum |
|---|---|-------|-----|
| 0 | 0 | 0     | 0   |
| 0 | 1 | 0     | 1   |
| 1 | 0 | 0     | 1   |
| 1 | 1 | 1     | 0   |

```hdl
/**
* Computes the sum of two bits.
*/
CHIP HalfAdder {

IN a, b; // 1-bit inputs

OUT sum, // Right bit of a + b

carry; // Left bit of a + b

PARTS:

And(a= a, b= b, out= carry);

Xor(a = a, b = b, out = sum);
}
```
---
A <bmark>full adder</bmark> is designed to add three bits. Like the half-adder, the full-adder chip outputs two bits that, taken together, represents the addition of the three input bits.

|           |                                                            |
|-----------|------------------------------------------------------------|
| Chip name | FullAdder`                                                 |
| Input     | `a`, `b`, `c`                                              |
| Output    | `sum`, `carry`                                             |
| Function  | `sum = LSB of a + b + c`<br><br>`carry = MSB of a + b + c` |


| a | b | c | carry | sum |
|---|---|---|-------|-----|
| 0 | 0 | 0 | 0     | 0   |
| 0 | 0 | 1 | 0     | 1   |
| 0 | 1 | 0 | 0     | 1   |
| 0 | 1 | 1 | 1     | 0   |
| 1 | 0 | 0 | 0     | 1   |
| 1 | 0 | 1 | 1     | 0   |
| 1 | 1 | 0 | 1     | 0   |
| 1 | 1 | 1 | 1     | 1   |

The names `Half-adder` and `Full-adder` derive from the implementation detail that a full-adder chip can be realized from two half-adders (and one other basic chip).

```hdl
/**
* Computes the sum of three bits.
*/

CHIP FullAdder {

IN a, b, c; // 1-bit inputs

OUT sum, // Right bit of a + b + c

carry; // Left bit of a + b + c

PARTS:

HalfAdder(a= a, b= b, sum= partialSum, carry= partialCarry);

HalfAdder(a= partialSum, b= c, sum= sum, carry= partialCarry2);

Or(a= partialCarry, b= partialCarry2, out= carry);
}
```
---
An <bmark>adder</bmark> is designed to add two n-bit numbers.

|           |                              |
|-----------|------------------------------|
| Chip name | `Add16`                      |
| Input     | `a[16]`, `b[16]`             |
| Output    | `out[16]`                    |
| Function  | Adds two 16-bit numbers.     |
| Comment   | The overflow bit is ignored. |

The addition of two n-bit numbers can be done bitwise, from right to left (from LSB pairs to MSB pairs). In each step, the resulting carry bit from the previous step is fed into the addition.
```hdl
/**
* 16-bit adder: Adds two 16-bit two's complement values.
* The most significant carry bit is ignored.
*/

CHIP Add16 {

IN a[16], b[16];

OUT out[16];

  

PARTS:

FullAdder(a= a[0], b= b[0], c= false, sum= out[0], carry= carry0);

FullAdder(a= a[1], b= b[1], c= carry0, sum= out[1], carry= carry1);

FullAdder(a= a[2], b= b[2], c= carry1, sum= out[2], carry= carry2);

FullAdder(a= a[3], b= b[3], c= carry2, sum= out[3], carry= carry3);

FullAdder(a= a[4], b= b[4], c= carry3, sum= out[4], carry= carry4);

FullAdder(a= a[5], b= b[5], c= carry4, sum= out[5], carry= carry5);

FullAdder(a= a[6], b= b[6], c= carry5, sum= out[6], carry= carry6);

FullAdder(a= a[7], b= b[7], c= carry6, sum= out[7], carry= carry7);

FullAdder(a= a[8], b= b[8], c= carry7, sum= out[8], carry= carry8);

FullAdder(a= a[9], b= b[9], c= carry8, sum= out[9], carry= carry9);

FullAdder(a= a[10], b= b[10], c= carry9, sum= out[10], carry= carry10);

FullAdder(a= a[11], b= b[11], c= carry10, sum= out[11], carry= carry11);

FullAdder(a= a[12], b= b[12], c= carry11, sum= out[12], carry= carry12);

FullAdder(a= a[13], b= b[13], c= carry12, sum= out[13], carry= carry13);

FullAdder(a= a[14], b= b[14], c= carry13, sum= out[14], carry= carry14);

FullAdder(a= a[15], b= b[15], c= carry14, sum= out[15], carry= carry15);
}
```
---
An <bmark>Incrementer</bmark> is designed to add `1` to a given number. Although, the `x + 1` operation can be realized with the general-purpose `Adder` chip, a dedicated `Incrementer` chip can do it more efficiently.
 
|           |                              |
|-----------|------------------------------|
| Chip name | `Inc16`                      |
| Input     | `in[16]`                     |
| Output    | `out[16]`                    |
| Function  | `out = in + 1`               |
| Comment   | The overflow bit is ignored. |

```hdl
/**
* 16-bit incrementer:
* out = in + 1
*/

CHIP Inc16 {

IN in[16];

OUT out[16];

PARTS:

Add16(a = in, b[0] = true, b[1..15] = false, out = out);

}
```
---
The <bmark>Arithmetic logic unit (ALU)</bmark> is a chip designed to compute a set of arithmetic and logic operations. Unlike the generic chips discussed so far, the ALU described below is specific to the Hack computer:
* It only performs integer arithmetic (and not, for example, floating point arithmetic)
* It computes only a set of 18 arithmetic-logical functions.

| x  | y | zx | nx | zy | ny | f | no | out  | Description             |
|----|---|----|----|----|----|---|----|------|-------------------------|
| 0  | y | 1  | 0  | 1  | 0  | 1 | 0  | 0    | 0 (constant zero)       |
| 1  | y | 1  | 1  | 1  | 1  | 1 | 1  | 1    | 1 (constant one)        |
| -1 | y | 1  | 1  | 1  | 0  | 1 | 0  | -1   | -1 (constant minus one) |
| x  | y | 0  | 0  | 1  | 1  | 0 | 0  | x    | x                       |
| x  | y | 1  | 1  | 0  | 0  | 0 | 0  | y    | y                       |
| x  | y | 0  | 0  | 1  | 1  | 0 | 1  | ¬x   | NOT x                   |
| x  | y | 1  | 1  | 0  | 0  | 0 | 1  | ¬y   | NOT y                   |
| x  | y | 0  | 0  | 1  | 1  | 1 | 1  | -x   | -x                      |
| x  | y | 1  | 1  | 0  | 0  | 1 | 1  | -y   | -y                      |
| x  | y | 0  | 1  | 1  | 1  | 1 | 1  | x+1  | x + 1                   |
| x  | y | 1  | 1  | 0  | 1  | 1 | 1  | y+1  | y + 1                   |
| x  | y | 0  | 0  | 1  | 1  | 1 | 0  | x-1  | x - 1                   |
| x  | y | 1  | 1  | 0  | 0  | 1 | 0  | y-1  | y - 1                   |
| x  | y | 0  | 0  | 0  | 0  | 1 | 0  | x+y  | x + y                   |
| x  | y | 0  | 1  | 0  | 0  | 1 | 1  | x-y  | x - y                   |
| x  | y | 0  | 0  | 0  | 1  | 1 | 1  | y-x  | y - x                   |
| x  | y | 0  | 0  | 0  | 0  | 0 | 0  | x&y  | x AND y                 |
| x  | y | 0  | 1  | 0  | 1  | 0 | 1  | x\|y | x OR y                  |

The Hack ALU operates on two 16-bit two's complement integers denoted `x` and `y`, an on six 1-bit inputs, called **control bits**. The control bits "tell" the ALU which function to compute. Each control bit effects a standalone conditional micro-action:

```
1. if (zx) then x = 0 else x = x

2. if (nx) then x = !x else x = x

3. if (zy) then y = 0 else y = y

4. if (ny) then y = !y else y = y

5. if (f) then out = x + y else out = x and y

6. if (no) then out = !out else out = out
```

> It may be instructive to describe the thought process that led to the design of this particular ALU. First, we made a list of all the primitive operations that we wanted our computer to be able to perform. Next, we used backward reasoning to figure out how x, y, and out can be manipulated in binary fashion in order to carry out the desired operations. These processing requirements, along with our objective to keep the ALU logic as simple as possible, have led to the design decision to use six control bits, each associated with a straightforward binary operation.

```hdl
/**

* ALU (Arithmetic Logic Unit):

* Computes out = one of the following functions:

* 0, 1, -1,

* x, y, !x, !y, -x, -y,

* x + 1, y + 1, x - 1, y - 1,

* x + y, x - y, y - x,

* x & y, x | y

* on the 16-bit inputs x, y,

* according to the input bits zx, nx, zy, ny, f, no.

* In addition, computes the two output bits:

* if (out == 0) zr = 1, else zr = 0

* if (out < 0) ng = 1, else ng = 0

*/

// Implementation: Manipulates the x and y inputs

// and operates on the resulting values, as follows:

// if (zx == 1) sets x = 0 // 16-bit constant

// if (nx == 1) sets x = !x // bitwise not

// if (zy == 1) sets y = 0 // 16-bit constant

// if (ny == 1) sets y = !y // bitwise not

// if (f == 1) sets out = x + y // integer 2's complement addition

// if (f == 0) sets out = x & y // bitwise and

// if (no == 1) sets out = !out // bitwise not


CHIP ALU {

IN

x[16], y[16], // 16-bit inputs

zx, // zero the x input?

nx, // negate the x input?

zy, // zero the y input?

ny, // negate the y input?

f, // compute (out = x + y) or (out = x & y)?

no; // negate the out output?

OUT

out[16], // 16-bit output

zr, // if (out == 0) equals 1, else 0

ng; // if (out < 0) equals 1, else 0

  

PARTS:

// x's pre-processing

Mux16(a= x, sel= zx, out= x1);

Not16(in= x1, out= x1Negated);

Mux16(a= x1, b= x1Negated, sel= nx, out= x2);

  

// y's pre-processing

Mux16(a= y, sel= zy, out= y1);

Not16(in= y1, out= y1Negated);

Mux16(a= y1, b= y1Negated, sel= ny, out= y2);

  

// function

Add16(a = x2, b = y2, out = summed);

And16(a = x2, b = y2, out = andded);

Mux16(a= andded, b= summed, sel= f, out= out1);

  

// output post-processing

Not16(in= out1, out= out1Negated);

Mux16(a= out1, b= out1Negated, sel= no, out= out, out[15]= outFirst, out[0..7]= outLeft, out[8..15]= outRight);

  

// ng status bit

And(a= true, b= outFirst, out=ng);

  

// zr status bit

Or8Way(in= outLeft, out= zrLeft);

Or8Way(in= outRight, out= zrRight);

Or(a= zrLeft, b= zrRight, out= zrLeftOrZrRight);

Not(in= zrLeftOrZrRight, out= zr);

}
```

## Chapter 3: Memory
There are two types of chips:
1. <bmark>Combinational chips</bmark> compute functions that depend solely on combinations of their input values. They cannot maintain state. All the chips built thus far are combinational chips.
2. <bmark>Sequential chips</bmark> compute functions that depend on both their input values and their previous state. They have "memory" and can preserve data over time.

---

A <bmark>flip-flop</bmark> is a basic building block of sequential chips. It has two stable states and can be used to store state information.

A flip-flop encapsulates the intricate art of synchronization, clocking, and feedback loops that are essential for building sequential chips.

Using these flip-flops as elementary building blocks, we will specify and build all the memory devices employed by a typical modern computer: registers, RAMs, and counters.

This effort will complete the construction of the chip set needed to build an entire computer.

---

The act of "remembering something" is inherently time-dependent: You remember now what has been committed to memory before.
Thus, in order to build chips that "remember" information, we must first develop some standard means for representing the progression of time.

In most computers, the progression of time is regulated by a <bmark>clock signal</bmark>. This signal oscillates between two values, `0` (called low/tick) and `1` (called high/tock), at a regular pace.

The clock hardware implementation is usually an oscillator that generates a square wave. The frequency of the clock signal is measured in **Hertz** (Hz), which is the number of oscillations per second.

![Clock signal](/docs/assets/nand-images/hertz.webp)
<em><a href="https://www.xtronical.com/6502computerep3/">Image source</a></em>

The elapsed time between the beginning of a "tick" and the end of a subsequent "tock" is called a **clock cycle**.

The clock is used to synchronize the sequential chips. Using the hardware’s circuitry, this signal is simultaneously broadcast to every sequential chip throughout the computer platform.

---
There are several variants of a flip-flop. We use a variant called the <bmark>data flip-flop (DFF)</bmark>.

A DFF is a simple memory element that stores a single bit. It has a data input `in`, a clock input `load`, and an output `out`. When the clock input is `1`, the flip-flop copies the value of the data input to its output. When the clock input is `0`, the flip-flop holds its previous value.

Taken together, both inputs enables the DFF to implement the behavior `out(t) = in(t-1)`, where `t` is the current clock cycle. In other words, the DFF outputs the input value from the previous clock cycle.

![DFF](/docs/assets/nand-images/dff.png)

|           |                                                                                            |
|-----------|--------------------------------------------------------------------------------------------|
| Chip name | `DFF`                                                                                      |
| Input     | `in`, `load`                                                                               |
| Output    | `out`                                                                                      |
| Function  | `out(t) = in(t-1)`                                                                         |
| Comment   | This clocked gate has a built-in implementation and thus there is no need to implement it. |

---

> [...] When the clock input is `1`, the flip-flop copies the value of the data input to its output. When the clock input is `0`, the flip-flop holds its previous value.

Actually, what we described previously is a latch: which is level-triggered.

A DFF is edge-triggered. Our DFF will be rising edge-triggered, meaning it only copies the `in` data input when the clock signal transitions from `0` to `1`.

All DFFs in a computer are connected to the same clock signal.

---

This reliable and predictable behavior of DFFs is crucial for data synchronization across the computer platform. There are physical delays in the propagation of signals through the computer’s hardware, e.g. It takes some time for the input into the ALU to stabilize and for the ALU to compute its output.

We solve this problem by using <bmark>discrete time</bmark>:
* First, the `cycle length` must be set to a value slightly greater than the `maximum propagation delay` in the computer
* Secondly, we can ONLY use the chip's output at end of cycles, and ignore all the fluctuations that can occur within cycles. This is achieved by simply using a DFF (because it's edge-triggered) to store the output of the chip. In our ALU example, the output of the ALU is stored in a register, which ignores the unstable output of the ALU due to propagation delays.

![Discrete time](/docs/assets/nand-images/dff_sync.png)


---

A <bmark>register</bmark> is a storage device that can "store" or "remember" a value over time, implementing the classical storage behavior `out = out(t-1)`.

A DFF, on the other hand, can only output its previous input, namely, `out = in(t-1)`. We can build a register from a DFF, however, we must consider the following:
1. The rules of chip design dictate that internal pins must have a fan-in of 1, meaning that they can be fed from a single source only.
2. We need to be able to specify when to read from the DFF and when to write to it.

A natural way to build our register is to use a multiplexor: the "select bit" of the multiplexor becomes the "load bit" of the overall register chip:

> If we want the register to start storing a new value, we can put this value in the `in` input and set the load bit to `1`; if we want the register to keep storing its internal value until further notice, we can set the load bit to `0`.

![Register](/docs/assets/nand-images/register.png)

|           |                                                               |
|-----------|---------------------------------------------------------------|
| Chip name | `Bit` or `Binary cell` (Single bit register)                  |
| Input     | `in`, `load`                                                  |
| Output    | `out`                                                         |
| Function  | `if (load(t-1) == 1) out(t) = in(t-1) else out(t) = out(t-1)` |

```hdl
CHIP Bit {
    IN in, load;
    OUT out;

    PARTS:
    DFF(in= dffIn, out= dffOut, out= out);
    Mux(a= dffOut, b= in, sel= load, out= dffIn);
}
```

A multi-bit register of **width** `w` can be constructed from an array of `w` 1-bit registers. The basic design parameter of such a register is its width — the number of bits that it holds — e.g., `16`, `32`, or `64`.
The multi-bit contents of such registers are typically referred to as **words**.

|           |                                                               |
|-----------|---------------------------------------------------------------|
| Chip name | `Register`                                                    |
| Input     | `in[16]`, `load`                                              |
| Output    | `out[16]`                                                     |
| Function  | `if (load(t-1) == 1) out(t) = in(t-1) else out(t) = out(t-1)` |

```hdl
CHIP Register {
    IN in[16], load;
    OUT out[16];

    PARTS:
    Bit(in= in[0], load= load, out= out[0]);
    Bit(in= in[1], load= load, out= out[1]);
    Bit(in= in[2], load= load, out= out[2]);
    Bit(in= in[3], load= load, out= out[3]);
    Bit(in= in[4], load= load, out= out[4]);
    Bit(in= in[5], load= load, out= out[5]);
    Bit(in= in[6], load= load, out= out[6]);
    Bit(in= in[7], load= load, out= out[7]);
    Bit(in= in[8], load= load, out= out[8]);
    Bit(in= in[9], load= load, out= out[9]);
    Bit(in= in[10], load= load, out= out[10]);
    Bit(in= in[11], load= load, out= out[11]);
    Bit(in= in[12], load= load, out= out[12]);
    Bit(in= in[13], load= load, out= out[13]);
    Bit(in= in[14], load= load, out= out[14]);
    Bit(in= in[15], load= load, out= out[15]);
}
```

---

A <bmark>RAM chip</bmark> (aka direct access memory unit) is a sequential chip that can store multiple data words. Each word is stored in a register, and the registers are indexed by an address.

![RAM](/docs/assets/nand-images/ram.png)

The term random access memory derives from the requirement that any randomly chosen word in the memory — irrespective of its physical location — be accessed directly, in equal speed.

This requirement can be satisfied as follows:
* First, we assign each word in the `n`-register RAM a unique address (an integer between `0` to `n-1`), according to which it will be accessed.
* Second, in addition to building an array of `n` registers, we build a gate logic design that, given an address `j`, is capable of selecting the individual register whose address is `j`.

> In sum, a classical RAM device accepts three inputs: a data input, an address input, and a load bit.
> The address specifies which RAM register should be accessed in the current time unit.
>
> In the case of a read operation (`load=0`), the RAM’s output immediately emits the value of the selected register.
>
> In the case of a write operation (`load=1`), the selected memory register commits to the input value in the next time unit, at which point the RAM’s output will start emitting it.

The basic design parameters of a RAM device are:
1. Its data `width` — the width of each one of its words, and
2. Its size — the number of words in the RAM.

|           |                                                                                                                                   |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| Chip name | `RAMn`                                                                                                                            |
| Input     | `in[16]`, `address[k]`, `load`                                                                                                    |
| Output    | `out[16]`                                                                                                                         |
| Function  | `out(t) = RAM[address(t)](t)`<br/> `if (load(t-1) == 1) then RAM[address(t-1)](t) = in(t-1)`                                      |
| Comment   | $k = log_2{n}$ and we will build `RAM8`( $n=8$ ),`RAM64`( $n=64$ ),`RAM512`( $n=512$ ),`RAM4K`( $n=4096$ ),`RAM16K`( $n=16384$ ), |

```hdl
CHIP RAM8 {
    IN in[16], load, address[3];
    OUT out[16];

    PARTS:
    CHIP RAM8 {
    IN in[16], load, address[3];
    OUT out[16];

    PARTS:
    DMux8Way(in= load, sel= address, a= loadA, b= loadB, c= loadC, d= loadD, e= loadE, f= loadF, g= loadG, h= loadH);
    Register(in= in, load= loadA, out= out1);
    Register(in= in, load= loadB, out= out2);
    Register(in= in, load= loadC, out= out3);
    Register(in= in, load= loadD, out= out4);
    Register(in= in, load= loadE, out= out5);
    Register(in= in, load= loadF, out= out6);
    Register(in= in, load= loadG, out= out7);
    Register(in= in, load= loadH, out= out8);
    Mux8Way16(a= out1, b= out2, c= out3, d= out4, e= out5, f= out6, g= out7, h= out8, sel= address, out= out);
}
}
```

```hdl
CHIP RAM64 {
    IN in[16], load, address[6];
    OUT out[16];

    PARTS:
    DMux8Way(in= load, sel= address[3..5], a= load1, b= load2, c= load3, d= load4, e= load5, f= load6, g= load7, h= load8);
    RAM8(in= in, load= load1, address= address[0..2], out= out1);
    RAM8(in= in, load= load2, address= address[0..2], out= out2);
    RAM8(in= in, load= load3, address= address[0..2], out= out3);
    RAM8(in= in, load= load4, address= address[0..2], out= out4);
    RAM8(in= in, load= load5, address= address[0..2], out= out5);
    RAM8(in= in, load= load6, address= address[0..2], out= out6);
    RAM8(in= in, load= load7, address= address[0..2], out= out7);
    RAM8(in= in, load= load8, address= address[0..2], out= out8);
    Mux8Way16(a= out1, b= out2, c= out3, d= out4, e= out5, f= out6, g= out7, h= out8, sel= address[3..5], out= out);
}
```

```hdl
CHIP RAM512 {
    IN in[16], load, address[9];
    OUT out[16];

    PARTS:
    DMux8Way(in= load, sel= address[6..8], a= load1, b= load2, c= load3, d= load4, e= load5, f= load6, g= load7, h= load8);
    RAM64(in= in, load= load1, address= address[0..5], out= out1);
    RAM64(in= in, load= load2, address= address[0..5], out= out2);
    RAM64(in= in, load= load3, address= address[0..5], out= out3);
    RAM64(in= in, load= load4, address= address[0..5], out= out4);
    RAM64(in= in, load= load5, address= address[0..5], out= out5);
    RAM64(in= in, load= load6, address= address[0..5], out= out6);
    RAM64(in= in, load= load7, address= address[0..5], out= out7);
    RAM64(in= in, load= load8, address= address[0..5], out= out8);
    Mux8Way16(a= out1, b= out2, c= out3, d= out4, e= out5, f= out6, g= out7, h= out8, sel= address[6..8], out= out);

}
```

```hdl
CHIP RAM4K {
    IN in[16], load, address[12];
    OUT out[16];

    PARTS:
    DMux8Way(in= load, sel= address[9..11], a= load1, b= load2, c= load3, d= load4, e= load5, f= load6, g= load7, h= load8);
    RAM512(in= in, load= load1, address= address[0..8], out= out1);
    RAM512(in= in, load= load2, address= address[0..8], out= out2);
    RAM512(in= in, load= load3, address= address[0..8], out= out3);
    RAM512(in= in, load= load4, address= address[0..8], out= out4);
    RAM512(in= in, load= load5, address= address[0..8], out= out5);
    RAM512(in= in, load= load6, address= address[0..8], out= out6);
    RAM512(in= in, load= load7, address= address[0..8], out= out7);
    RAM512(in= in, load= load8, address= address[0..8], out= out8);
    Mux8Way16(a= out1, b= out2, c= out3, d= out4, e= out5, f= out6, g= out7, h= out8, sel= address[9..11], out= out);

}
```

```hdl
CHIP RAM16K {
    IN in[16], load, address[14];
    OUT out[16];

    PARTS:
    DMux8Way(in= load, sel= address[11..13], a= load1, b= load2, c= load3, d= load4, e= load5, f= load6, g= load7, h= load8);
    RAM4K(in= in, load= load1, address= address[0..11], out= out1);
    RAM4K(in= in, load= load2, address= address[0..11], out= out2);
    RAM4K(in= in, load= load3, address= address[0..11], out= out3);
    RAM4K(in= in, load= load4, address= address[0..11], out= out4);
    RAM4K(in= in, load= load5, address= address[0..11], out= out5);
    RAM4K(in= in, load= load6, address= address[0..11], out= out6);
    RAM4K(in= in, load= load7, address= address[0..11], out= out7);
    RAM4K(in= in, load= load8, address= address[0..11], out= out8);
    Mux8Way16(a= out1, b= out2, c= out3, d= out4, e= out5, f= out6, g= out7, h= out8, sel= address[11..13], out= out);
    
}
```

---

A <bmark>counter</bmark> is a sequential chip whose state is an integer number that increments every time unit, effecting the function `out = out(t - 1) + c`, where `c` is typically `1`.

A counter chip can be implemented by combining the input/output logic of a standard register with the combinatorial logic for adding a constant.

Typically, the counter will have to be equipped with some additional functionality, such as possibilities for resetting the count to zero, loading a new counting base, or decrementing instead of incrementing.

|           |                                                                                                                                                                                      |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chip name | `Counter`                                                                                                                                                                            |
| Input     | `in[16]`, `load`, `inc`, `reset`                                                                                                                                                     |
| Output    | `out[16]`                                                                                                                                                                            |
| Function  | `if (reset(t-1) == 1) then out(t) = 0`<br/> `else if (load(t-1) == 1) then out(t) = in(t-1)`<br/> `else if (inc(t-1) == 1) then out(t) = out(t-1) + 1`<br/> `else out(t) = out(t-1)` |

```hdl
CHIP PC {
    IN in[16], reset, load, inc;
    OUT out[16];
    
    PARTS:
    Register(in= inRegister, load= true, out= outRegister, out= out);
    Inc16(in= outRegister, out= outInc);
    Mux16(a= outRegister, b= outInc, sel= inc, out= out1);
    Mux16(a= out1, b= in, sel= load, out= out2);
    Mux16(a= out2, b= false, sel= reset, out= inRegister);
}
```

---

Simply stated, a sequential chip is a chip that embeds one or more DFF gates, either directly or indirectly.

![Sequential chip](/docs/assets/nand-images/combinational_vs_sequential.png)

## Chapter 4: Machine Language
A <bmark>machine language</bmark> is an agreed-upon formalism, designed to code low-level programs as series of machine instructions. The primary goals of a machine language's design are:
1. Direct execution in, and
2. Total control of, a given hardware platform.

A machine language is the fine line where hardware and software meet: it can be considered as both a programming tool and an integral part of the hardware platform.


---

This chapter only focuses on the machine language and leaves the hardware details to the next chapter. To give a general description of machine languages, it's sufficient to only use three main hardware abstractions:
1. **Processor**: The processor, normally called the CPU (Central Processing Unit), is a device capable of performing a fixed set of elementary operations. These typically include:
    * Arithmetic operations (`addition`, `subtraction`, `multiplication`, `division`)
    * Logical operations (`AND`, `OR`, `NOT`)
    * Memory access operations (`load`, `store`)
    * Control/Branching operations (`jump`, `branch`). Branching is used to conditional or unconditional jump to selected locations in a program. Branching serves several purposes like: looping, conditional execution, and subroutine calls.
   
    The operands of these operations and their results/output are binary values that are read and stored in registers or selected memory locations.
2. **Memory**: The term memory refers loosely to the collection of hardware devices that store data and instructions in a computer.
3. **Set of registers**: Memory access is a relatively slow operation, requiring long instruction formats. For this reason, most processors are equipped with
    several registers, each capable of holding a single value, allowing the processor to manipulate data and instructions quickly.

---

A machine language is a series of coded instructions. For example, an instruction in a 16-bit computer may be `1010001100011001`.
In order to figure out what this instruction means, we must know the instruction set of the underlying hardware platform.
For example, the language, may be such that each instruction consists of four 4-bit fields: The left-most field codes a CPU operation, and the remaining
three fields code the operation's operands.

Since binary codes are rather cryptic, machine languages are normally specified using both binary codes and symbolic mnemonics.
A mnemonic is a short, easy-to-remember name for a binary code.
For example, the binary code `1010001100011001` may be associated with the mnemonic `ADD R1, R2, R3`.

Hence, a machine language instruction can be specified either directly using binary codes or indirectly using symbolic mnemonics.

---

We can take the symbolic abstraction one step further, and create a programming language that allows the creation of programs using symbolic commands rather than binary instructions.
This programming language is called an <bmark>assembly language</bmark>. And the symbolic mnemonics are just a component of the assembly language, specifically the symbols that
represent machine instructions.

---

The Hack computer is a von Neumann platform. It's a simple computer with a 16-bit architecture which has:
1. A CPU
2. A **read-only memory (ROM)** that stores the computer instructions. It is 16-bit wide and have a 15-bit address space (i.e. it can hold $32K (2^{15})$ 16-bit instructions).
3. A **random access memory (RAM)** that stores the computer data. It is also 16-bit wide and have a 15-bit address space.
4. Two memory-mapped I/O devices: a screen and a keyboard.
5. A 16-bit instruction set.
6. Two 16-bit registers called `A` and `D`. These registers can be manipulated explicitly by arithmetic and logical instructions (e.g. `D=A+1`, `A=D&A`).
The `D` register is used solely to store data values; while the `A` register is used to both store data values and memory addresses.
So, depending on the context, the contents of `A` can be interpreted as:
   * A data value
   * A memory address in the data memory
   * A memory address in the instruction memory

> Why do we overload the `A` register with so many roles?
> Since Hack instructions are 16-bit wide, and since addresses are specified using 15-bits, it's impossible to pack both an operation code and an address in one instruction.
> Thus, the syntax of the Hack language mandates that memory access instructions operate on an implicit memory location labeled `M`, for example `D=M+1`.
> In order to resolve this address, the convention is that `M` always refers to the memory word whose address is the current value of the `A` register.
> **That is `M` is a synonym for `RAM[A]`**. This implies, we must first load the address into the `A` register before we can access the memory word at that address.
>
> This also applies to instruction memory access. To jump to a specific instruction, we must first load the address of that instruction into the `A` register.
> 
> In a nutshell, the `A` register's value is interpreted based on how it is used in subsequent instructions.
> 
> An alternative solution would be to have more registers, but this would have increased the complexity of the hardware.

---

The Hack language consists of two generic instructions:
1. An address instruction (A-instruction) and
2. A compute instruction (C-instruction).

---

The <bmark>A-instruction</bmark> is used to set the `A` register to a 15-bit value:

A-instruction's symbolic representation: `@value` (where `value` is a non-negative decimal number or a symbol referring to such a number).
A-instruction's binary representation: `0value` (where `value` is a 15-bit binary number).

The leftmost bit is the A-instruction marker bit (aka opcode), which is always set to `0`.

The A-instruction is used for three different purposes:
1. It provides the only way to enter a constant into the computer under program control.
2. It sets the stage for a subsequent C-instruction designed to access a specific location in the data memory.
3. It sets the stage for a subsequent C-instruction designed to jump to a specific location in the instruction memory.

---

The <bmark>C-instruction</bmark> is used to perform a computation. The instruction code is a specification that answers three questions:
1. What to compute?
2. Where to store the computed value?
3. What to do next?

C-instruction's symbolic representation: `dest=comp;jump` (where `dest` is the destination register, `comp` is the computation, and `jump` is the jump condition). Both `dest=` and `;jump` are optional.
C-instruction's binary representation: `1 1 1 a c_1 c_2 c_3 c_4 c_5 c_6 d_1 d_2 d_3 j_1 j_2 j_3` (where `a_n` & `c_n` specify the comp component; `d_n` specifies the dest component, and `j_n` specifies the jump component).

The leftmost bit is the C-instruction marker bit (aka opcode), which is always set to `1`. The next wo bits are not used and are set to `1`.

---

The `dest` component of the C-instruction specifies where to store the computed value (the ALU output).

The first and second bits specify whether to store the computed value in the `A` register and in the `D` register, respectively.
The third bit specifies whether to store the computed value in the data memory location specified by the `A` register.

| d1 | d2 | d3 | **dest** mnemonic | Destination (where to store the computed value)                                           |
|----|----|----|-------------------|-------------------------------------------------------------------------------------------|
| 0  | 0  | 0  | `null`            | Do not store the computed value                                                           |
| 0  | 0  | 1  | `M`               | Store the computed value in the data memory                                               |
| 0  | 1  | 0  | `D`               | Store the computed value in the `D` register                                              |
| 0  | 1  | 1  | `MD`              | Store the computed value in the `D` register and in the data memory                       |
| 1  | 0  | 0  | `A`               | Store the computed value in the `A` register                                              |
| 1  | 0  | 1  | `AM`              | Store the computed value in the `A` register and in the data memory                       |
| 1  | 1  | 0  | `AD`              | Store the computed value in the `A` register and in the `D` register                      |
| 1  | 1  | 1  | `AMD`             | Store the computed value in the `A` register, in the `D` register, and in the data memory |

---

The `comp` component of the C-instruction specifies what the ALU should compute.
We can compute a fixed set of functions on the `D`, `A`, and `M` registers.
The a-bit specifies whether the `A` register or the `M` register should be used as the ALU's input.
And the six c-bits specifies the function to be computed.
All 7-bit comprise the `comp` field. While this 7-bit field can specify $128$ different possible operations, only $28$ are used in the Hack language.

| (when a=0) **comp** mnemonic | c1  | c2  | c3  | c4  | c5  | c6  | (when a=1) **comp** mnemonic |
|------------------------------|-----|-----|-----|-----|-----|-----|------------------------------|
| `0`                          | `1` | `0` | `1` | `0` | `1` | `0` |                              |
| `1`                          | `1` | `1` | `1` | `1` | `1` | `1` |                              |
| `-1`                         | `1` | `1` | `1` | `0` | `1` | `0` |                              |
| `D`                          | `0` | `0` | `1` | `1` | `0` | `0` |                              |
| `A`                          | `1` | `1` | `0` | `0` | `0` | `0` | `M`                          |
| `!D`                         | `0` | `0` | `1` | `1` | `0` | `1` |                              |
| `!A`                         | `1` | `1` | `0` | `0` | `0` | `1` | `!M`                         |
| `-D`                         | `0` | `0` | `1` | `1` | `1` | `1` |                              |
| `-A`                         | `1` | `1` | `0` | `0` | `1` | `1` | `-M`                         |
| `D+1`                        | `0` | `1` | `1` | `1` | `1` | `1` |                              |
| `A+1`                        | `1` | `1` | `0` | `1` | `1` | `1` | `M+1`                        |
| `D-1`                        | `0` | `0` | `1` | `1` | `1` | `0` |                              |
| `A-1`                        | `1` | `1` | `0` | `0` | `1` | `0` | `M-1`                        |
| `D+A`                        | `0` | `0` | `0` | `0` | `1` | `0` | `D+M`                        |
| `D-A`                        | `0` | `1` | `0` | `0` | `1` | `1` | `D-M`                        |
| `A-D`                        | `0` | `0` | `0` | `1` | `1` | `1` | `M-D`                        |
| `D&A`                        | `0` | `0` | `0` | `0` | `0` | `0` | `D&M`                        |
| `D\|A`                       | `0` | `1` | `0` | `1` | `0` | `1` | `D\|M`                       |

---

The `jump` component of the C-instruction specifies a jump condition, namely, which command to fetch and execute next.
Whether a not a jump should actually materialize depends on the three j-bits of the jump component and the ALU's output value.
It is a 3-bit field that can specify one of $8$ different jump conditions.

| j1 (`out < 0`)  | j2 (`out = 0`)  | j3 (`out > 0`)  | **jump** mnemonic | Effect                                                                    |
|-----------------|-----------------|-----------------|-------------------|---------------------------------------------------------------------------|
| `0`             | `0`             | `0`             | `null`            | No jump (this is the default, it simply proceeds to the next instruction) |
| `0`             | `0`             | `1`             | `JGT`             | Jump if `out > 0`                                                         |
| `0`             | `1`             | `0`             | `JEQ`             | Jump if `out = 0`                                                         |
| `0`             | `1`             | `1`             | `JGE`             | Jump if `out >= 0`                                                        |
| `1`             | `0`             | `0`             | `JLT`             | Jump if `out < 0`                                                         |
| `1`             | `0`             | `1`             | `JNE`             | Jump if `out != 0`                                                        |
| `1`             | `1`             | `0`             | `JLE`             | Jump if `out <= 0`                                                        |
| `1`             | `1`             | `1`             | `JMP`             | Jump unconditionally                                                      |

The `JMP` is used as `0;JMP`. This is because the C-instruction syntax requires that we always effect some computation, we instruct the ALU to compute $0$ (an arbitrary choice), which is ignored.

---

Example: We want the computer to increment the value of `DataMemory[7]` by $1$ and to also store the result in the `D` register. This can be achieved with the following instructions:

```binary
 0000 0000 0000 0111 // @7
 1111 1101 1101 1000 // MD=M+1
```

---

Assembly commands can refer to memory addresses using either constants or symbols. Symbols are introduced into assembly programs in the following three ways:

1. Predefined symbols: A subset of RAM addresses have predefined symbols:
    * Virtual registers: The symbols `R0` to `R15` refer to RAM addresses `0` to `15`, respectively.
    * Predefined pointers: The symbols `SP`, `LCL`, `ARG`, `THIS`, and `THAT` refer to RAM addresses `0`, `1`, `2`, `3`, and `4`, respectively.
    * I/O pointers: The symbols `SCREEN` and `KBD` refer to RAM addresses `16384` (0x4000) and `24576` (0x6000), respectively, which are the base addresses of the screen and
    keyboard memory maps.
2. Label symbols: These are user-defined symbols serve to label destinations of goto commands. They are declared by the pseudo-command `(Xxx)`. This directive defines the symbol
`Xxx` to refer to the ROM address holding the next command in the program.
3. Variable symbols: Any user-defined symbol `Xxx` that appears in an assembly program without being predefined or declared as a label is treated as a variable.
The assembler allocates a unique RAM address for each appearance of such a symbol and replaces the symbol with its RAM address in the assembly program.
The instruction is of the form `@value`, where `value` is a 15-bit constant.

---

The Hack platform can be connected to two peripheral devices: a screen and a keyboard.
Both devices interact with the computer platform through memory maps.
This means that drawing pixels on the screen is achieved by writing binary values into a memory segment associated with the screen.
Likewise, listening to the keyboard is done by reading a memory location associated with the keyboard.
The physical I/O devices and their memory maps are synchronized via continuous refresh loops.

---

The Hack computer includes a black-and-white screen organized as $256$ rows of $512$ pixels per row.
The screen’s contents are represented by an 8K memory map that starts at RAM address $16384$ ($0x4000$).
Each row in the physical screen, starting at the screen’s top left corner, is represented in the RAM by $32$ consecutive 16-bit words.
Thus, the pixel at row `r` from the top and column `c` from the left is mapped on the `c%16` bit (counting from LSB to MSB) of the word located at `RAM[16384 + r * 32 + c/16]`.
To write or read a pixel of the physical screen, one reads or writes the corresponding bit in the RAM-resident memory map (1 = black, 0 = white).

Example:
```hack
// Draw a single black dot at the screen's top left corner:
@SCREEN // Set the A register to point to the memory
       // word that is mapped to the 16 left-most
      // pixels of the top row of the screen.
M=1 // Blacken the left-most pixel.
```

---

The Hack computer interfaces with the physical keyboard via a single-word memory map located in RAM address $24576$ ($0x6000$).
Whenever a key is pressed on the physical keyboard, its 16-bit ASCII code appears in `RAM[24576]`.
When no key is pressed, the code `0` appears in this location.
In addition to the usual ASCII codes, the Hack keyboard recognizes the keys shown below.

| Key pressed | Code    |
|-------------|---------|
| newline     | 128     |
| backspace   | 129     |
| left arrow  | 130     |
| up arrow    | 131     |
| right arrow | 132     |
| down arrow  | 133     |
| home        | 134     |
| end         | 135     |
| page up     | 136     |
| page down   | 137     |
| insert      | 138     |
| delete      | 139     |
| esc         | 140     |
| f1-f2       | 141-152 |

---

## Chapter 5: Computer Architecture
The computer is based on a fixed hardware platform, capable of executing a fixed repertoire of simple instructions.
However, these instructions can be combined like building blocks, yielding arbitrarily sophisticated programs.

The <bmark>von Neumann architecture</bmark>, shown below, is based on a central processing unit (CPU), interacting with a memory device,
receiving data from some input device, and sending data to some output device.

At the heart of this architecture lies the <bmark>stored program concept</bmark>: The computer's memory stores both the
data that the computer manipulates and the instructions that tell the computer what to do.

![Von Neumann architecture](/docs/assets/nand-images/von_neumann_architecture.svg)

A related stored program computer architecture is the <bmark>Harvard architecture</bmark>, which physically separates the memory devices used for storing data and instructions.

![Harvard architecture](/docs/assets/nand-images/harvard_architecture.svg)

---

The CPU operation can be described as a repeated loop (aka fetch-decode-execute cycle):
1. Fetches (i.e, reads) a binary machine instruction from a selected register in the instruction memory
2. Decodes it
3. Executes the specified instruction
4. And figures out which instruction to fetch and execute next.

(3) and (4) are based on the fetched instruction which tells the CPU:
* What calculation to perform
* Which registers to read or write to
* And which instruction to fetch and execute next

The CPU executes these tasks using three main hardware elements:
* An ALU
* A set of registers and
* A control unit

The first two elements were already introduced in the previous chapters.

---

A computer instruction is represented as a binary code, typically 16, 32, or 64 bits wide.
Before such an instruction can be executed, it must be decoded, and the information embedded in it must be used to signal
various hardware devices (ALU, registers, memory) how to execute the instruction.

The instruction decoding is done by some <bmark>control unit</bmark>, which is also responsible for figuring out which
instruction to fetch and execute next.

---

The set of registers used by the Hack computer are:
* Data register (`D`): A 16-bit register used to store a data value. In principle, data values can just be stored in the RAM,
 but the `D` register is used to speed up operations.
* Address register (`A`): A 16-bit register used to store a memory address. The output of this register is connected
 to the address input ot our memory devices (RAM and ROM). Therefore, placing a value in the address register has the
 side effect of selecting a particular memory register, and this register makes itself available to subsequent instructions
 designed to manipulate it. The `A` register's value can be read directly as a data value.
* Program counter (`PC`): A 16-bit register used to store the address of the next instruction. The contents of the
 PC is computed and updated as a side effect of executing the current instruction.

---

The Hack computer is a 16-bit machine based on the Harvard architecture, designed to execute instructions written in the Hack machine language.

---

The Hack CPU interface:

```hack
/**
	CHIP	CPU
	
	IN
	    instruction[16],	//	Instruction	to	execute.
	    inM[16],			//	Value	of	Mem[A],	the	instruction’s	M	input
	    reset;				//	Signals	whether	to	continue	executing	the	current	program	(reset==0)	or	restart	the	current	program	(reset==1).
	    
	OUT
	    outM[16],			//	Value	to	write	to	Mem[addressM],	the	instruction’s	M	output
	    addressM[15],		//	In	which	address	to	write?
	    writeM,				//	Write	to	the	Memory?
	    pc[15];				//	address	of	next	instruction	
```

![Hack CPU](/docs/assets/nand-images/hack_cpu.png)

Key points:
* The Hack Central Processing Unit consists of an **ALU**, two registers named **A** and **D**, and a program counter named **PC** (these	internal chip-parts	are	not	shown in the diagram). 
* The **inM** input and **outM** output hold the values referred to as “**M**” in the Hack instruction syntax.
* The **addressM** output holds the memory address to which **outM** should be written.
* The CPU is designed to fetch and execute instructions written in the **Hack machine language**.
* If instruction is an **A-instruction**, the CPU loads the **16-bit** constant (including the `0` opcode) that the instruction represents into the **A** register.
* If instruction is a **C-instruction**, then:
  * The **CPU** causes the **ALU** to perform the computation specified by the instruction, and
  * The **CPU** causes this value to be stored in the subset of {**A**,**D**,**M**} registers specified by the instruction.
  * If one of these registers is **M**, the **CPU** asserts the **writeM** control bit output (when **writeM**	is	`0`, any value may appear in **outM**).
  * When the reset	input	is	`0`, the **CPU** uses the **ALU** output and the **jump directive** specified by the instruction to compute the address of the next instruction, and emits this address to the **pc** output.
  * If the reset	input	is	`1`, the CPU sets pc to `0`.
* The **outM** and **writeM** outputs are combinational, and are affected instantaneously by the instruction’s execution.
* The **addressM** and **pc** outputs are clocked: although they are affected by the instruction’s execution, they commit to their new values only in the next time step.

---

The Hack instruction memory interface:

```hdl
CHIP	ROM32K

    IN
        address[15];
    
    OUT
        out[16];	
```

![Hack instruction memory](/docs/assets/nand-images/hack_rom.png)

Key points:
* The instruction memory of the Hack computer, implemented as a read-only memory of **32K registers**, each **16-bit wide**.
* Performs the operation `out = ROM32K[address]`.
* In words: outputs the **16-bit value** stored in the register selected by the **address** input.
* This value is taken to be the **current instruction**.
* It is assumed that the chip is **preloaded** with a program written in the Hack machine language. 
* Software-based simulators of the Hack computer are expected to provide means for loading the chip with a Hack program, either interactively, or using a test script.

---

The Hack data memory interface:

```hdl
CHIP Memory

    IN
        in[16],	load,	address[15];
    
    OUT
        out[16];
```

![Hack data memory](/docs/assets/nand-images/hack_data_memory.png)

Key points:
* The complete address space of the Hack computer's data memory, including **RAM** and **memory-mapped I/O**.
* Facilitates read and write operations, as follows:
  * Read: `out(t) = Mem[address(t)](t)`
  * Write: `if load(t) then Mem[address(t)](t+1) = in(t)`
* In words: the chip always outputs the value stored at the memory location specified by address.
* If **load==1**, the **in** value is loaded into the register specified by address. This value becomes available through the **out** output from the next time step onward.
* The memory access rules are as follows:
  * Only the top `16K + 8K + 1` words of the address space are used.
  * `0x0000 - 0x5FFF`: accessing an address in this range results in accessing the **RAM**.
  * `0x4000 - 0x5FFF`: accessing an address in this range results in accessing the **Screen**.
  * `0x6000`: accessing this address results in accessing the **Keyboard**.
  * `0x6000`: accessing an address in this range is **invalid**.

---

The interface of the topmost chip in the Hack hardware platform, named Computer:

```hdl
CHIP Computer

    IN
        reset;	
```

![Hack computer](/docs/assets/nand-images/hack_computer.png)

Key points:
* The HACK computer, consisting of **CPU**, **ROM** and **Memory parts** (these	internal chip-parts	are	not	shown in the diagram).
* When `reset==0`, the program stored in the computer's ROM executes.
* When `reset==1`, the execution of the program restarts.
* Thus, to start a program's execution, the reset input must be pushed "up" (signaling 1) and "down" (signaling 0).
* From this point onward, the user is at the mercy of the software.
* In particular, depending on the program's code, the screen may show some output, and the user may be able to interact with the computer via the keyboard.

---

The Hack keyboard chip interface:

```hdl
CHIP Keyboard

    OUT
        out[16]; //	The	scan-code	of	the	pressed	key, or	0	if	no	key	is	currently	pressed.
```

Keypoint:
* The Keyboard (memory map) is connected to a standard, physical keyboard. 
* It is made to output the **16-bit scan-code** associated with the key which is presently pressed on the physical keyboard, or `0` if no key is pressed.

---

The Hack screen chip interface:

```hdl
CHIP Screen

    IN
        in[16], //	what	to	write
        address[13]; //	where	to	write	(or	read)
        load, // write-enable	bit
    
    OUT
        out[16]; //	Screen	value	at	the	given	address	
```

Keypoint:
* The Screen (memory map) functions exactly like a **16-bit**, **8K RAM**:
  * `out(t) = Screen[address(t)](t)`
  * `if load(t) then Screen[address(t)](t+1) = in(t)`
* The chip implementation has the side effect of continuously refreshing a physical screen.
* The physical screen consists of 256 rows and 512 columns of black and white pixels (simulators of the Hack computer are expected to simulate this screen).
* Each row in the physical screen, starting at the top left corner, is represented in the Screen memory map by **32 consecutive 16-bit words**.
* Thus, the pixel at row **r** from the top and column **c** from the left (**0 ≤ r ≤ 255**, **0 ≤ c ≤ 511**) is mapped on the `c % 16` bit (counting from LSB to MSB) of the 16-bit word stored in `Screen[r * 32 + c / 16]`.

---

All the chips needed to build the Hack CPU have been built in the previous chapters, the key question is how to arrange and
connect them in a way that effects the desired CPU operation.

The architecture shown below is used to perform three classical CPU tasks:
* Decoding the current instruction
* Executing the current instruction, and
* Deciding which instruction to fetch and execute next.

![Hack CPU architecture](/docs/assets/nand-images/hack_cpu_arch.png)
<em>Every `c` symbol entering a chip-part stands for some control bit, extracted from the instruction.
In the case of the ALU, the `c's` input stands for the 6 control bits that instruct the ALU what to compute, and the `c's`
output stands for its `zr` and `ng` outputs.
Taken together, the distributed behaviors that these control bits effect throughout the CPU architecture end up executing the instruction.</em>

```hack
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/5/CPU.hdl
/**
 * The Hack Central Processing unit (CPU).
 * Parses the binary code in the instruction input and executes it according to the
 * Hack machine language specification. In the case of a C-instruction, computes the
 * function specified by the instruction. If the instruction specifies to read a memory
 * value, the inM input is expected to contain this value. If the instruction specifies
 * to write a value to the memory, sets the outM output to this value, sets the addressM
 * output to the target address, and asserts the writeM output (when writeM = 0, any
 * value may appear in outM).
 * If the reset input is 0, computes the address of the next instruction and sets the
 * pc output to that value. If the reset input is 1, sets pc to 0.
 * Note: The outM and writeM outputs are combinational: they are affected by the
 * instruction's execution during the current cycle. The addressM and pc outputs are
 * clocked: although they are affected by the instruction's execution, they commit to
 * their new values only in the next cycle.
 */
CHIP CPU {

    IN  inM[16],         // M value input  (M = contents of RAM[A])
        instruction[16], // Instruction for execution
        reset;           // Signals whether to re-start the current
                         // program (reset==1) or continue executing
                         // the current program (reset==0).

    OUT outM[16],        // M value output
        writeM,          // Write to M? 
        addressM[15],    // Address in data memory (of M)
        pc[15];          // address of next instruction

    PARTS:
    // Negate the opCode.
    Not(in= instruction[15], out= notOpCode);
    // If opCode == 0, we route the instruction into the A register. Else, we route the ALU input.
    Mux16(a= outputOfALU, b= instruction, sel= notOpCode, out= inputToA);
    // The A register is enabled for writing if we have an A-instruction or a C-instruction with the d_1 control bit asserted.
    Or(a= notOpCode, b= instruction[5], out= writeToA);
    ARegister(in= inputToA, load= writeToA, out= outputOfA, out[0..14]=addressM);

    // Only select M, if we have an C-instruction and the a-bit is asserted
    And(a= instruction[15], b= instruction[12], out= controlAOrM);
    Mux16(a= outputOfA, b= inM, sel= controlAOrM, out= AOrM);
    // Use the ALU.
    ALU(x= outputOfD, y= AOrM, zx= instruction[11], nx= instruction[10], zy= instruction[9], ny= instruction[8], f= instruction[7], no= instruction[6], out= outputOfALU, out = outM, zr= isAluOutputZero, ng= isAluOutputNegative);

    // Only write to the D register, if we have a C-instruction AND the d_2 bit is asserted.
    And(a= instruction[15], b= instruction[4], out= writeToD);
    DRegister(in= outputOfALU, load= writeToD, out= outputOfD);

    // Only set writeM to true, if we have a C-instruction and the d_1 bit is asserted.
    And(a= instruction[15], b= instruction[3], out= controlWriteM);
    Mux(a= false, b= true, sel= controlWriteM, out= writeM);

    // Derive if ALU output is positive (i.e, it's not negative or zero)
    Or(a= isAluOutputNegative, b= isAluOutputZero, out= isAluOutputNegativeOrZero);
    Not(in= isAluOutputNegativeOrZero, out= isAluOutputPositive);

    // Check j_1 against ALU output is negative bit.
    And(a= instruction[2], b= isAluOutputNegative, out= jumpCauseNegative);
    // Check j_2 against ALU output is zero bit.
    And(a= instruction[1], b= isAluOutputZero, out= jumpCauseZero);
    // Check j_3 against ALU output is positive bit.
    And(a= instruction[0], b= isAluOutputPositive, out= jumpCausePositive);
    
    // Combine: We jump if we have a C-instruction and any of the jump predicates matches.
    Or(a= jumpCauseNegative, b= jumpCauseZero, out= jumpIntermediate);
    Or(a= jumpIntermediate, b= jumpCausePositive, out= jumpIntermediate2);
    And(a= instruction[15], b= jumpIntermediate2, out= controlJump);

    PC(in= outputOfA, load= controlJump, inc= true, reset= reset, out[0..14]= pc);
}
```

## Chapter 7: Virtual machine 1 (Processing)
Before a high-level program can run on a target computer, it must be translated into the computer’s machine language.

Modern compilers typically translate high-level programs into an intermediate code designed to run on an abstract computer called a <bmark>virtual machine (VM)</bmark>. The compiler is split into two:
* The <pmark>frontend tier</pmark> involves a compiler program that translates the high-level code into intermediate VM commands.
* The <pmark>backend tier</pmark> involves a <bmark> VM translator </bmark> program that translates the VM commands into the machine instructions of the target hardware platform.

Cross-platform compatibility is a key benefit that this two-tiered compilation model has over a traditional direct-to-machine code compilation model. The price paid for the elegance and power of the VM framework is reduced efficiency.

This chapter presents a typical VM architecture and VM language, conceptually similar to the Java Virtual Machine (JVM) and bytecode, respectively.

- - -

Traditional <pmark>monolithic compilers</pmark> were unique to each high-level language and target-machine pair. A two-tiered compiler breaks this coupling.

The design of an effective VM language strikes a good balance between high-level and low-level languages.

> The VM commands should be sufficiently “high” so that the VM code generated by the compiler will be reasonably elegant and well structured. At the same time, the VM commands should be sufficiently “low” so that the machine code generated from them by the VM translators will be tight and efficient.

One way to satisfy these somewhat conflicting requirements is to base the interim VM language on an abstract architecture called a <bmark>stack machine</bmark>. <ymark>Any program, written in any high-level programming language, can be translated into a sequence of operations on a stack</ymark>, as will be shown.

- - -

The centerpiece of the stack model is an <pmark>abstract data structure (ADT)</pmark> called a <bmark>Stack </bmark>. A stack is a sequential ADT with two key operations:
1. **Push**: Adds a value to the top of the stack.
2. **Pop**: Removes the stack’s top value.

The push/pop combination leads to a <bmark>last-in-first-out (LIFO)</bmark> access logic. This access logic lends itself perfectly to program translation and execution purposes.

Our VM abstraction consists of two data structures:
* A stack and
* A RAM like memory segment

- - -

### Translating arithmetic-logical expressions into stack commands
In a stack machine, the generic binary operation `x op y` is carried out as follows:
1. The operands `x` and `y` are popped off the stack.
2. The value of `x op y` is computed
3. The computed value is pushed into the stack.

The generic unary operation `op x` is carried out in a similar fashion.

From the stack’s perspective, each arithmetic or logical operation has the net impact of replacing the operation’s operands with the operation’s result, without affecting the rest of the stack.

![Stack arithmetic](/docs/assets/nand-images/stack_arithmetic.png)
<em><a href="http://www.btechsmartclass.com/data_structures/postfix-evaluation.html">Image source</a></em>

- - -

A typical object-based language have variables at various scopes:
* Class-level static variable
* Instance-level field of an object
* Method-level local or argument variable.

In virtual machines, variables are represented as entries in virtual memory segments:

| Segment  | Role                                                  |
|----------|-------------------------------------------------------|
| argument | Represents the function’s argument.                   |
| local    | Represents the function’s local variables.            |
| static   | Represents the static variables seen by the function. |
| constant | Represents the constant values 0, 1, 2, 3, …, 32767.  |
| this     |                                                       |
| that     |                                                       |
| pointer  |                                                       |
| temp     |                                                       |

VM commands access all the memory segments in exactly the same way: by using the segment name followed by a non-negative index.

The compiler maps the first, second, third, … static variable found in the high-level program onto `static 0`, `static 1`, `static 2`, and so on. The other variable kinds are mapped similarly into their respective segments.

For example, if the local variable `x` and the field `y` have been mapped on `local 1` and `this 3`, respectively, then a high-level statement like `let x = y` will be translated by the compiler into `push this 3` and `pop local 1`.

- - -

Our VM model is stack-based: all the VM operations take their operands from, and store their results on, the stack.

There is only one data type: a signed 16-bit integer.

A VM program is a sequence of VM commands that fall into four categories:
* **Push / pop commands** transfer data between the stack and memory segments.
* **Arithmetic-logical commands** perform arithmetic and logical operations.
* **Branching commands** facilitate conditional and unconditional branching operations.
* **Function commands** facilitate function call-and-return operations.

In this chapter we focus on the arithmetic-logical and push/pop commands.

- - -

### VM Specification (Part 1)
* **Comments and white space**: Lines beginning with `//` are considered comments and are ignored. Blank lines are permitted and are ignored.
* **Push / Pop Commands**:
    * `push segment index`: Pushes the value of `segment[index]` onto the stack.
    * `pop segment index`: Pops the top stack value and stores it in `segment[index]`.
* **Arithmetic-Logical Commands**:
    * **Arithmetic commands**: `add`, `sub`, `neg` (unary).
    * **Comparison commands**: `eq`, `gt`, `lt`.
    * **Logical commands**: `and`, `or`, `not` (unary).

The commands `add`, `sub`, `eq`, `gt`, `lt`, `and`, and `or` have two implicit operands. To execute each one of them, the VM implementation pops two values off the stack, computes the stated function on them, and pushes the resulting value back onto the stack. The remaining `neg` and `not` commands have one implicit operand and work the same way.

Implicit here means that the operand is not part of the command syntax: since the command is designed to always operate on the two top stack values, there is no need to specify them.

- - -

The abstract VM described so far must be implemented on a host machine to actually run. One implementation option is a VM translator.

Writing a VM translator entails two main tasks:
* First, we have to decide how to represent the stack and the virtual memory segments on the target platform.
* Second, we have to translate each VM command into a sequence of low-level instructions that can execute on the target platform.

We can represent the VM’s stack using a designated memory block in the host RAM. The lower end of this RAM block will be a fixed base address, and its higher end will change as the stack grows and shrinks.

Thus, given a fixed `stackBase` address, we can manage the stack by keeping track of a single variable: a `stack pointer`, or `SP`, which holds the address of the RAM entry just following the stack’s top-most value. To initialize the stack, we set `SP` to `stackBase`.

Lets assume that the `stack base` address is `256` in the Hack computer RAM. In that case, the VM translator can start by generating assembly code that realizes `SP=256`, that is:

```
@256
D = A
@SP
M = D
```

From this point onward, the VM translator can handle each `push x` and `pop x` command by generating assembly code that realizes the operations `RAM[++sp] = x` and `x = RAM[--sp]`, respectively.

For the VM arithmetic-logical commands, conveniently, all the commands share exactly the same access logic: popping the command’s operands off the stack, carrying out a simple calculation, and pushing the result onto the stack.

- - -

In principle, the most important thing is correctly and effienciently implementing the VM abstraction on a hardware platform (I.e. The actual implementation details are irrelevant). Nevertheless, VM architects normally publish basic implementation guidelines, known as <bmark>standard mappings</bmark>, for different hardware platforms.

### VM program
A <bmark>VM program</bmark> is a sequence of **VM commands** stored in a text file named `FileName.vm`. The VM translator should read each line in the file, treat it as a **VM command**, and translate it into one or more instructions written in the **Hack assembly language** stored in a text file named `FileName.asm`.

### Data type
The VM abstraction has only one data type: **a signed integer**. This type is implemented on the Hack platform as a two’s complement 16-bit value. The **VM Boolean values** `true` and `false` are represented as `-1` and `0` respectively.

### RAM usage
The host Hack RAM consists of 32K 16-bit words. VM implementations should use the top of this address space as follows:

| RAM address | Usage                                                      |
|-------------|------------------------------------------------------------|
| 0-15        | Sixteen virtual registers (described in other table below) |
| 16-255      | Static variables                                           |
| 256-2047    | Stack                                                      |

VirtualRegistersTable

> Assume that `SP`, `ARG`, `LCL`, `THIS`, and `THAT` have been already initialized to some sensible addresses in the host RAM.

Note that VM implementations never see these addresses anyway. Rather, they manipulate them **symbolically**, using the **pointer names**. For example, suppose we want to push the value of the **D register** onto the **stack**. This operation can be implemented using the logic which can be expressed in Hack assembly as:
```
@SP
A = M
M = D
@SP
M = M + 1
```

- - -
### Memory segments mapping
1. **Local, argument, this, that**: The base addresses of these segments are stored in the registers `LCL`, `ARG`, `THIS`, and `THAT`, respectively. Therefore, any access to the **i-th entry** of a virtual segment (in the context of a VM “`push / pop segmentName i`” command) should be translated into assembly code that accesses address (`base + i`)  in the RAM.
2. **Pointer**: Unlike the virtual segments described above, the pointer segment contains exactly two values and is mapped directly onto RAM locations `3` and `4`. Recall that these RAM locations are also called, respectively, `THIS` and `THAT`. Thus, the semantics of the pointer segment is as follows: Any access to `pointer 0` should result in accessing the `THIS` pointer, and any access to `pointer 1` should result in accessing the `THAT` pointer. For example, `pop pointer 0` should set `THIS` to the popped value, and `push pointer 1` should push onto the stack the current value of `THAT`.
3. **Temp**: This 8-word segment is also fixed and mapped directly on RAM locations 5 – 12. With that in mind, any access to `temp i`, where `i` varies from `0 to 7`, should be translated into assembly code that accesses RAM location `5 + i`.
4. **Constant**: This virtual memory segment is truly virtual, as it does not occupy any physical RAM space. Instead, the VM implementation handles any access to `constant i` by simply supplying the constant `i`.
5. **Static**: Static variables are mapped on addresses `16 to 255` of the host RAM. The VM translator can realize this mapping automatically, as follows:
    * Each reference to `static i` in a VM program stored in file `Foo.vm` can be translated to the assembly symbol `Foo.i`.
    * According to the Hack machine language specification (chapter 6), the Hack assembler will map these symbolic variables on the host RAM, starting at address `16`.
    * This convention will cause the static variables that appear in a VM program to be mapped on addresses `16` and onward, in the order in which they appear in the VM code.
    * For example, suppose that a VM program starts with the code `push constant 100, push constant 200, pop static 5, pop static 2`. The translation scheme described above will cause `static 5` and `static 2` to be mapped on RAM addresses `16` and `17`, respectively.
    * This implementation of static variables is somewhat devious, but works well. It causes the static variables of different VM files to coexist without intermingling, since their generated `FileName.i` symbols have unique prefix file names.
    * Since the stack begins at address `256`, the implementation limits the number of static variables in a Jack program to $255 - 16 + 1 = 240$.

- - -

> One relatively simple way to implement a virtual machine is to write a high-level program (called a <bmark>VM emulator</bmark>) that represents the stack and the memory segments and implements all the VM commands using high-level programming.

## Virtual Machine II: Control
In this chapter we’ll learn how to use and implement the VM’s branching commands and function commands.

- - -

In general, whenever one function (the caller) calls a function (the callee), someone must take care of the following overhead:
* Save the return address, which is the address within the caller’s code to which execution must return after the callee completes its execution;
* Save the memory resources of the caller;
* Allocate the memory resources required by the callee;
* Make the arguments passed by the caller available to the callee’s code;
* Start executing the callee’s code.

When the callee terminates and returns a value, someone must take care of the following overhead:
* Make the callee’s return value available to the caller’s code;
* Recycle the memory resources used by the callee;
* Reinstate the previously saved memory resources of the caller;

- - -

The default flow of computer programs is sequential, executing one command after the other. This sequential flow can be redirected by branching commands.

In low-level programming, branching is accomplished by `goto` destination commands. The destination specification can take several forms:
* The most primitive being the physical memory address of the instruction that should be executed next.
* A slightly more abstract specification is established by specifying a <ymark>symbolic label</ymark> (bound to a physical memory address). This variation requires that the language be equipped with a labeling directive, designed to assign symbolic labels to selected locations in the code. In our VM language, this is done using a labeling command whose syntax is `label symbol`.

The VM language supports two forms of branching:
* <pmark>Unconditional branching</pmark> is effected using a `goto symbol` command, which means: jump to execute the command just after the label symbol command in the code.
* <pmark>Conditional branching</pmark> is effected using the `if-goto symbol` command, whose semantics is: Pop the topmost value off the stack; if it’s not false, jump to execute the command just after the label symbol command; otherwise, execute the next command in the code.

>  Any flow of control structure found in high-level programming languages can be realized using our (rather minimal set of) VM logical and branching commands.

- - -

Function calls and primitive commands share a consistent calling protocol, thus, enabling both to be seamless composed. e.g. expressions like $(x + y)^3$ can be evaluated using:
```
push x
push y
add
push 3
call power
```

Both operations require:
* The caller to set the stage by pushing arguments onto the stack
* Both operations are expected to consume their arguments
* Both operations are expected to push return values onto the stack.

- - -

use the term calling chain to refer, conceptually, to all the functions that are currently involved in the program’s execution. only function that is truly active in the calling chain is the last one, which we call the current function,

In order to carry out their work, functions normally use local and argument variables. These variables are temporary: the memory segments that represent them must be allocated when the function starts executing and can be recycled when the function returns. During run-time, each function call must be executed independently of all the other calls and maintain its own stack, local variables, and argument variables.

>  The property that makes this housekeeping task tractable is the linear nature of the call-and-return logic. Although the function calling chain may be arbitrarily deep as well as recursive, at any given point in time only one function executes at the chain’s end, while all the other functions up the calling chain are waiting for it to return. This Last-In-First-Out processing model lends itself perfectly to the stack data structure, which is also LIFO.

Now, putting foo’s working stack on hold is not a problem: because the stack grows only in one direction, the working stack of bar will never override previously pushed values. Therefore, saving the working stack of the caller is easy—we get it “for free” thanks to the linear and unidirectional stack structure. But how can we save foo’s memory segments? Recall that in chapter 7 we used the pointers LCL, ARG, THIS, and THAT to refer to the base RAM addresses of the local, argument, this, and that segments of the current function. If we wish to put these segments on hold, we can push their pointers onto the stack and pop them later, when we’ll want to bring foo back to life. In what follows, we use the term frame to refer, collectively, to the set of pointer values needed for saving and reinstating the function’s state.

Specifically, we now use the same data structure to hold both the working stacks as well as the frames of all the functions up the calling chain. To give it the respect that it deserves, from now on we’ll refer to this hard-working data structure as the global stack.

Figure8.3

The global stack, shown when the callee is running. Before the callee terminates, it pushes a return value onto the stack (not shown). When the VM implementation handles the return command, it copies the return value onto argument 0, and sets SP to point to the address just following it. This effectively frees the global stack area below the new value of SP. Thus, when the caller resumes its execution, it sees the return value at the top of its working stack.

when handling the call functionName command, the VM implementation pushes the caller’s frame onto the stack. At the end of this housekeeping, we are ready to jump to executing the callee’s code. This mega jump is not hard to implement. As we’ll see later, when handling a function functionName command, we use the function’s name to create, and inject into the generated assembly code stream, a unique symbolic label that marks where the function starts. Thus, when handling a “function functionName” command, we can generate assembly code that effects a “goto functionName” operation. When executed, this command will effectively transfer control to the callee.

Returning from the callee to the caller when the former terminates is trickier, since the VM return command specifies no return address. Indeed, the caller’s anonymity is inherent in the notion of a function call: functions like mult or sqrt are designed to serve any caller, implying that a return address cannot be specified a priori. Instead, a return command is interpreted as follows: redirect the program’s execution to the memory location holding the command just following the call command that invoked the current function.

The VM implementation can realize this contract by (i) saving the return address just before control is transferred to executing the caller and (ii) retrieving the return address and jumping to it just after the callee returns. But where shall we save the return address? Once again, the resourceful stack comes to the rescue. To remind you, the VM translator advances from one VM command to the next, generating assembly code as it goes along. When we encounter a call foo command in the VM code, we know exactly which command should be executed when foo terminates: it’s the assembly command just after the assembly commands that realize the call foo command. Thus, we can have the VM translator plant a label right there, in the generated assembly code stream, and push this label onto the stack. When we later encounter a return command in the VM code, we can pop the previously saved return address off the stack—let’s call it returnAddress— and effect the operation goto returnAddress in assembly.

Each call operation is implemented by saving the frame of the caller on the stack and jumping to execute the callee. Each return operation is implemented by (i) using the most recently stored frame for getting the return address within the caller’s code and reinstating its memory segments, (ii) copying the topmost stack value (the return value) onto the stack location associated with argument 0, and (iii) jumping to execute the caller’s code from the return address onward.

- - -

### VM Specification: Part II
1. **Branching Commands**:
    * `label label`: Labels the current location in the function’s code. Only labeled locations can be jumped to. The scope of the label is the function in which it is defined. The label is a string composed of any sequence of letters, digits, underscore (_), dot (.), and colon (:) that does not begin with a digit. The label command can be located anywhere in the function, before or after the goto commands that refer to it.
    * `goto label`: Effects an unconditional goto operation, causing execution to continue from the location marked by the label. The goto command and the labeled jump destination must be located in the same function.
    * `if-goto label`: Effects a conditional goto operation. The stack’s topmost value is popped; if the value is not zero, execution continues from the location marked by the label; otherwise, execution continues from the next command in the program. The if-goto command and the labeled jump destination must be located in the same function.
2. **Function commands**:
    * `function functionName nVars`: Marks the beginning of a function named functionName. The command informs that the function has nVars local variables.
    * `call functionName nArgs`: Calls the named function. The command informs that nArgs arguments have been pushed onto the stack before the call.
    * `return`: Transfers execution to the command just following the call command in the code of the function that called the current function.

The scope of VM function names is global: all the VM functions in all the vm files in the program folder see each other and may call each other using the unique and full function name FileName functionName.

One file in any Jack program must be named Main jack, and one function in this file must be named main. which is the application's entry point. This run-time convention is implemented as follows. When we start running a VM program, the first function that always executes is an argument-less VM function named `Sys.init`, which is part of the operating system. This OS function is programmed to call the entry point function in the user's program. In the case of Jack programs, `Sys.init` is programmed to call `Main.main`.

- - -
### Function call and return
The caller’s view:
1. Before calling a function, I must push onto the stack as many arguments (`nArgs`) as the callee expects to get.
2. Next, I invoke the callee using the command call `fileName.functionName nArgs`.
3. After the callee returns, the argument values that I pushed before the call have disappeared from the stack, and a return value (that always exists) appears at the top of the stack. Except for this change, my working stack is exactly the same as it was before the call [i], except that the contents of my **static segment** may have changed and the **temp segment** is undefined.
   ﻿﻿
   The callee's view:
   ﻿
1. Before I start executing, my **argument segment** been initialized with the argument values passed by the caller, and my **local variables** segment has been allocated and initialized to zeros. My **static segment** has been set to the static segment of the VM file to which I belong, and my working stack is empty. The memory segments `this`, `that`, `pointer`, and `temp` are undefined upon entry.
2. Before returning, I must push a return value onto the stack.

In particular, every function, call, and return command in the VM code is handled by generating assembly code that manipulates the global stack as follows: A call command generates code that saves the frame of the caller on the stack and jumps to execute the callee. A function command generates code that initializes the local variables of the callee. Finally, a return command generates code that copies the return value to the top of the caller’s working stack, reinstates the segment pointers of the caller, and jumps to execute the latter from the return address onward.

Figure8.5

- - -

First, it manages predefined assembly-level symbols like SP, LCL, and ARG. Second, it generates and uses symbolic labels for marking return addresses and function entry points

When the VM translator is applied to this same folder, it produces a single assembly code file, named PointDemo.asm. At the assembly code level, the function abstractions no longer exist. Instead, for each function command, the VM translator generates an entry label in assembly; for each call command, the VM translator (i) generates an assembly goto instruction, (ii) creates a return address label and pushes it onto the stack, and (iii) injects the label into the generated code. For each return command, the VM translator pops the return address off the stack and generates a goto instruction.

Figure8.6

- - -

The output of the VM translator is a single assembly file, named source.asm. If source is a folder name, the single .asm file contains the translation of all the functions in all the .vm files in the folder, one after the other.
