---
{"dg-publish":true,"permalink":"/book-notes/the-elements-of-computing-systems-building-a-modern-computer-from-first-principles/","tags":["hardware","book-notes"],"updated":"2024-10-01T20:34:39.191+02:00"}
---


## Chapter 1: Boolean logic
### Binary variables

Modern computers store and process information stored as two-valued signals — called `bits` (i.e. binary digits). Two-value signals were chosen because they can readily be represented, stored, and transmitted. For example, they can be represented as:
* The presence or absence of a hole in a punched card,
* High or low voltage on a wire,
* A magnetic domain oriented clockwise or counterclockwise.

A binary variable or a bit can represent two possible states: `0` and `1`; `off` and `on`; `false` and `true`; `no` and `yes`; etc. $n$ binary variables can be used to represent $2^n$ states. e.g.

| $b_2$ | $b_1$ | $b_0$ |
| ----- | ----- | ----- |
| 0     | 0     | 0     |
| 0     | 0     | 1     |
| 0     | 1     | 0     |
| 0     | 1     | 1     |

### Boolean functions

**Boolean algebra** is used to manipulate binary values. A boolean function (aka boolean operator) is a function that operates on binary inputs and returns binary outputs.

The total number of boolean functions for $n$ binary variables is $2^{2^n}$, because:

* There are $2^n$ input combinations.
* Each of these input combinations can be mapped to either `0` or `1`.
* Therefore, the total number of boolean functions is: $2^{2^n}$

e.g. There are `16` distinct boolean functions for `2` binary variables.

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
A hardware description language (HDL) is a specialized computer language used to describe the structure and behavior of chips.

> The designer specifies the chip logic by writing a HDL program, which is then subjected to a rigorous battery of tests. The tests are carried out virtually, using computer simulation: A special software tool, called a **hardware simulator**, takes the HDL program as input and creates a software representation of the chip logic. Next, the designer can instruct the simulator to test the virtual chip on various sets of inputs. The simulator computes the chip outputs, which are then compared to the desired outputs.

The hardware simulator can also simulate and quantify the performance characteristics (energy consumption, computational speed, cost) of a chip.

### Gates specification
The specifications of the logic gates needed to build the chips of our computer system are given below.

#### Primitive gates

##### Nand gate

<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Created with Inkscape (http://www.inkscape.org/) --><svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://web.resource.org/cc/"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:sodipodi="http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   id="svg2"   sodipodi:version="0.32"   inkscape:version="0.43"   width="400pt"   height="144pt"   sodipodi:docbase="D:\wiki_svg"   sodipodi:docname="Nand-gate-en.svg"   version="1.0">  <metadata     id="metadata7">    <rdf:RDF>      <cc:Work         rdf:about="">        <dc:format>image/svg+xml</dc:format>        <dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />      </cc:Work>    </rdf:RDF>  </metadata>  <defs     id="defs5" />  <sodipodi:namedview     inkscape:window-height="652"     inkscape:window-width="756"     inkscape:pageshadow="2"     inkscape:pageopacity="0.0"     borderopacity="1.0"     bordercolor="#666666"     pagecolor="#ffffff"     id="base"     inkscape:showpageshadow="false"     borderlayer="top"     inkscape:zoom="1"     inkscape:cx="303.21391"     inkscape:cy="52.95286"     inkscape:window-x="66"     inkscape:window-y="66"     inkscape:current-layer="svg2" />  <text     xml:space="preserve"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="9"     y="77.173828"     id="text1308"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan1310"       x="9"       y="77.173828">A</tspan></text>  <text     sodipodi:linespacing="125%"     id="text1312"     y="155.17383"     x="9"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     xml:space="preserve"><tspan       y="155.17383"       x="9"       id="tspan1314"       sodipodi:role="line">B</tspan></text>  <path     style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"     d="M 72,51 L 185,51"     id="path1316" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use1318"     transform="translate(0,78)"     width="500"     height="180" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use2208"     transform="translate(196.5757,39)"     width="500"     height="180" />  <path     id="rect2193"     style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.49999857;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"     d="M 207,171 L 135.7,170.99994 L 135.7,12.499996 L 207.46,12.49997 C 246.3576,12.499945 278.3,48.003958 278.3,91.749974 C 278.3,135.49599 246.3576,171 207,171 z "     sodipodi:nodetypes="ccccsc" />  <text     xml:space="preserve"     style="font-size:56px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="395.41205"     y="109.23633"     id="text2210"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan2212"       x="395.41205"       y="109.23633">out</tspan></text>  <path     transform="translate(12.90989,-0.353527)"     d="M 305.47014 89.843887 A 20.152544 20.152544 0 1 1  265.16505,89.843887 A 20.152544 20.152544 0 1 1  305.47014 89.843887 z"     sodipodi:ry="20.152544"     sodipodi:rx="20.152544"     sodipodi:cy="89.843887"     sodipodi:cx="285.3176"     id="path2247"     style="opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"     sodipodi:type="arc" /></svg>

  

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

<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Created with Inkscape (http://www.inkscape.org/) --><svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://web.resource.org/cc/"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:sodipodi="http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   id="svg2"   sodipodi:version="0.32"   inkscape:version="0.43"   width="400pt"   height="144pt"   sodipodi:docbase="D:\wiki_svg"   sodipodi:docname="Not-gate-en.png.svg"   version="1.0">  <metadata     id="metadata7">    <rdf:RDF>      <cc:Work         rdf:about="">        <dc:format>image/svg+xml</dc:format>        <dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />      </cc:Work>    </rdf:RDF>  </metadata>  <defs     id="defs5" />  <sodipodi:namedview     inkscape:window-height="652"     inkscape:window-width="756"     inkscape:pageshadow="2"     inkscape:pageopacity="0.0"     borderopacity="1.0"     bordercolor="#666666"     pagecolor="#ffffff"     id="base"     inkscape:showpageshadow="false"     borderlayer="top"     inkscape:zoom="0.70710678"     inkscape:cx="299.78322"     inkscape:cy="81.877528"     inkscape:window-x="66"     inkscape:window-y="66"     inkscape:current-layer="svg2" />  <text     xml:space="preserve"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="9"     y="116.17383"     id="text1308"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan1310"       x="9"       y="116.17383">A</tspan></text>  <path     style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"     d="M 72,90 L 185,90"     id="path1316" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use2208"     transform="translate(196.5757,0)"     width="500"     height="180" />  <path     style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.49999857;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"     d="M 148,10.750011 L 261.2807,89.999989 L 148,169.24995 L 148,10.750011 z "     id="rect2193"     sodipodi:nodetypes="cccc" />  <text     xml:space="preserve"     style="font-size:56px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="395.41205"     y="109.23633"     id="text2210"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan2212"       x="395.41205"       y="109.23633">out</tspan></text>  <path     sodipodi:type="arc"     style="opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"     id="path2247"     sodipodi:cx="285.3176"     sodipodi:cy="89.843887"     sodipodi:rx="20.152544"     sodipodi:ry="20.152544"     d="M 305.47014 89.843887 A 20.152544 20.152544 0 1 1  265.16505,89.843887 A 20.152544 20.152544 0 1 1  305.47014 89.843887 z"     transform="translate(-2.828424,0.156093)" /></svg>

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

<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Created with Inkscape (http://www.inkscape.org/) --><svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://creativecommons.org/ns#"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   id="svg2"   sodipodi:version="0.32"   inkscape:version="0.48.3.1 r9886"   width="400pt"   height="144pt"   sodipodi:docname="Nand-gate-en.svg"   version="1.0">  <metadata     id="metadata7">    <rdf:RDF>      <cc:Work         rdf:about="">        <dc:format>image/svg+xml</dc:format>        <dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />        <dc:title></dc:title>      </cc:Work>    </rdf:RDF>  </metadata>  <defs     id="defs5" />  <sodipodi:namedview     inkscape:window-height="652"     inkscape:window-width="756"     inkscape:pageshadow="2"     inkscape:pageopacity="0.0"     borderopacity="1.0"     bordercolor="#666666"     pagecolor="#ffffff"     id="base"     inkscape:showpageshadow="false"     borderlayer="top"     inkscape:zoom="1"     inkscape:cx="303.21391"     inkscape:cy="52.95286"     inkscape:window-x="66"     inkscape:window-y="66"     inkscape:current-layer="svg2"     showgrid="false"     inkscape:window-maximized="0" />  <text     xml:space="preserve"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="9"     y="77.173828"     id="text1308"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan1310"       x="9"       y="77.173828">A</tspan></text>  <text     sodipodi:linespacing="125%"     id="text1312"     y="155.17383"     x="9"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     xml:space="preserve"><tspan       y="155.17383"       x="9"       id="tspan1314"       sodipodi:role="line">B</tspan></text>  <path     style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"     d="M 72,51 L 185,51"     id="path1316" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use1318"     transform="translate(0,78)"     width="500"     height="180" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use2208"     transform="translate(196.5757,39)"     width="500"     height="180" />  <path     id="rect2193"     style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.49999857;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"     d="M 207,171 L 135.7,170.99994 L 135.7,12.499996 L 207.46,12.49997 C 246.3576,12.499945 278.3,48.003958 278.3,91.749974 C 278.3,135.49599 246.3576,171 207,171 z "     sodipodi:nodetypes="ccccsc" />  <text     xml:space="preserve"     style="font-size:56px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="395.41205"     y="109.23633"     id="text2210"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan2212"       x="395.41205"       y="109.23633">out</tspan></text></svg>


Returns $1$ when both its inputs are $1$, and $0$ otherwise.

Truth table:  

| a   | b   | And(a, b) |
| --- | --- | --------- |
| 0   | 0   | 0         |
| 0   | 1   | 0         |
| 1   | 0   | 0         |
| 1   | 1   | 1         |

API:

|           |                                                       |
| --------- | ----------------------------------------------------- |
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

##### Or gate

<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Created with Inkscape (http://www.inkscape.org/) --><svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://web.resource.org/cc/"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:sodipodi="http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   id="svg2"   sodipodi:version="0.32"   inkscape:version="0.43"   width="400pt"   height="144pt"   sodipodi:docbase="D:\wiki_svg"   sodipodi:docname="Or-gate.png.svg"   version="1.0">  <metadata     id="metadata7">    <rdf:RDF>      <cc:Work         rdf:about="">        <dc:format>image/svg+xml</dc:format>        <dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />      </cc:Work>    </rdf:RDF>  </metadata>  <defs     id="defs5" />  <sodipodi:namedview     inkscape:window-height="652"     inkscape:window-width="756"     inkscape:pageshadow="2"     inkscape:pageopacity="0.0"     borderopacity="1.0"     bordercolor="#666666"     pagecolor="#ffffff"     id="base"     inkscape:showpageshadow="false"     borderlayer="top"     inkscape:zoom="0.70710678"     inkscape:cx="283.17996"     inkscape:cy="10.081012"     inkscape:window-x="312"     inkscape:window-y="54"     inkscape:current-layer="svg2" />  <text     xml:space="preserve"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="9"     y="77.173828"     id="text1308"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan1310"       x="9"       y="77.173828">A</tspan></text>  <text     sodipodi:linespacing="125%"     id="text1312"     y="155.17383"     x="9"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     xml:space="preserve"><tspan       y="155.17383"       x="9"       id="tspan1314"       sodipodi:role="line">B</tspan></text>  <path     style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"     d="M 72,51 L 185,51"     id="path1316" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use1318"     transform="translate(0,78)"     width="500"     height="180" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use2208"     transform="translate(196.5757,39)"     width="500"     height="180" />  <path     id="rect2193"     style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.49999857;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"     d="M 148,169.24997 C 147.86307,169.25544 189.01219,161.81425 189.01219,89.999999 C 189.01219,17.478772 147.99697,10.749695 148,10.750027 C 214.25305,18.014053 257.40202,7.7267425 303,90.000005 C 269,162.74602 224.41039,166.19896 148,169.24997 z "     sodipodi:nodetypes="czscs" />  <text     xml:space="preserve"     style="font-size:56px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="395.41205"     y="109.23633"     id="text2210"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan2212"       x="395.41205"       y="109.23633">out</tspan></text></svg>

Returns $1$ when at least one of its inputs is $1$, and $0$ otherwise.

Truth table:

| a   | b   | Or(a, b) |
| --- | --- | -------- |
| 0   | 0   | 0        |
| 0   | 1   | 1        |
| 1   | 0   | 1        |
| 1   | 1   | 1        |

  

API:

|           |                                                         |
| --------- | ------------------------------------------------------- |
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

##### Xor (aka exclusive or) gate

<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Created with Inkscape (http://www.inkscape.org/) --><svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://web.resource.org/cc/"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:sodipodi="http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   id="svg2"   sodipodi:version="0.32"   inkscape:version="0.43"   width="400pt"   height="144pt"   sodipodi:docbase="D:\wiki_svg"   sodipodi:docname="xor-gate-en.svg"   version="1.0">  <metadata     id="metadata7">    <rdf:RDF>      <cc:Work         rdf:about="">        <dc:format>image/svg+xml</dc:format>        <dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />      </cc:Work>    </rdf:RDF>  </metadata>  <defs     id="defs5" />  <sodipodi:namedview     inkscape:window-height="652"     inkscape:window-width="756"     inkscape:pageshadow="2"     inkscape:pageopacity="0.0"     borderopacity="1.0"     bordercolor="#666666"     pagecolor="#ffffff"     id="base"     inkscape:showpageshadow="false"     borderlayer="top"     inkscape:zoom="1"     inkscape:cx="236.89218"     inkscape:cy="112.57853"     inkscape:window-x="312"     inkscape:window-y="54"     inkscape:current-layer="svg2" />  <text     xml:space="preserve"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="9"     y="77.173828"     id="text1308"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan1310"       x="9"       y="77.173828">A</tspan></text>  <text     sodipodi:linespacing="125%"     id="text1312"     y="155.17383"     x="9"     style="font-size:72px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     xml:space="preserve"><tspan       y="155.17383"       x="9"       id="tspan1314"       sodipodi:role="line">B</tspan></text>  <path     style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#000000;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"     d="M 72,51 L 185,51"     id="path1316" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use1318"     transform="translate(0,78)"     width="500"     height="180" />  <use     x="0"     y="0"     xlink:href="#path1316"     id="use2208"     transform="translate(196.5757,39)"     width="500"     height="180" />  <path     id="rect2193"     style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.49999857;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"     d="M 148,169.24997 C 147.86307,169.25544 189.01219,161.81425 189.01219,89.999999 C 189.01219,17.478772 147.99697,10.749695 148,10.750027 C 214.25305,18.014053 257.40202,7.7267425 303,90.000005 C 269,162.74602 224.41039,166.19896 148,169.24997 z "     sodipodi:nodetypes="czscs" />  <text     xml:space="preserve"     style="font-size:56px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;font-family:Verdana"     x="395.41205"     y="109.23633"     id="text2210"     sodipodi:linespacing="125%"><tspan       sodipodi:role="line"       id="tspan2212"       x="395.41205"       y="109.23633">out</tspan></text>  <path     sodipodi:nodetypes="czs"     d="M 112,167.3404 C 111.86307,167.34574 153.01219,160.08385 153.01219,90.000034 C 153.01219,19.226279 111.99697,12.659345 112,12.659669"     style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:7.50000143;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"     id="path1315" /></svg>

  

Returns $1$ when exactly one of its input is $1$, and $0$ otherwise.

Truth table:

| a   | b   | Xor(a, b) |
| --- | --- | --------- |
| 0   | 0   | 0         |
| 0   | 1   | 1         |
| 1   | 0   | 1         |
| 1   | 1   | 0         |

API:

|           |                                          |
| --------- | ---------------------------------------- |
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

#### Control flow gates
These gates provide means for controlling flows of information.

##### Multiplexer
A multiplexer is a three-input gate. Two input bits, named `a` and `b`, are interpreted as **data bits**, and a third bit, named `sel`, is interpreted as a **selection bit**. The multiplexer uses `sel` to select and output the value of either `a` or `b`.

Fig1.9

Truth table:

| a   | b   | sel | out |
| --- | --- | --- | --- |
| 0   | 0   | 0   | 0   |
| 0   | 0   | 1   | 0   |
| 0   | 1   | 0   | 0   |
| 0   | 1   | 1   | 1   |
| 1   | 0   | 0   | 1   |
| 1   | 0   | 1   | 0   |
| 1   | 1   | 0   | 1   |
| 1   | 1   | 1   | 1   |

API:

|           |                                            |
| --------- | ------------------------------------------ |
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

##### Demultiplexer
A demultiplexer performs the opposite function of a multiplexer: it takes a single input value and routes it to one of two possible outputs, according a selector bit that selects the destination output.

Fig1.10

| in  | sel | a   | b   |
| --- | --- | --- | --- |
| 0   | 0   | 0   | 0   |
| 0   | 1   | 0   | 0   |
| 1   | 0   | 1   | 0   |
| 1   | 1   | 0   | 1   |

API:

|           |                                                               |
| --------- | ------------------------------------------------------------- |
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

#### Multi-bit versions of basic gates
This section describes several 16-bit logic gates that will be needed for constructing our target computer platform. HDL programs treat multi-bit values like single-bit values, except that the values can be indexed in order to access individual bits. For example, if `in` and `out` represent 16-bit values, then `out [3] = in[5]` sets the 3rd bit of `out` to the value of the 5th bit of `in`. The bits are indexed from right to left, the rightmost bit being the 0’th but and the leftmost bit being the 15’th bit (in a 16-bit setting).

##### 16-bit Not gate
Applies the Boolean operation `Not` to every one of the input bits.

API:

|           |                                     |
| --------- | ----------------------------------- |
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

##### 16-bit And gate
Applies the Boolean operation `And` to every one of the input bits.

API:

|           |                                          |
| --------- | ---------------------------------------- |
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
  
##### 16-bit Or gate
Applies the Boolean operation `Or` to every one of the input bits.

API:

|           |                                         |
| --------- | --------------------------------------- |
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

##### 16-bit Multiplexer gate
Operates exactly as the basic multiplexer, except that its input and output are 16-bits wide.

API:

|           |                                                                                    |
| --------- | ---------------------------------------------------------------------------------- |
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

#### Multi-way versions of basic gates
Logic gates that operate on one or two inputs have natural generalization to multi-way variants that operate on more than two inputs.

##### Multi-way Or
An m-way `Or` gate outputs `1` when at least one of its `m` input bits is `1`, and `0` otherwise. Our target computer will need an 8-way variant of this gate:

|           |                                      |
| --------- | ------------------------------------ |
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

// todo
##### Multi-way 16-bit demultiplexer gate
An m-way n-bit demultiplexer routes its single n-bit input to one of its m n-bit outputs. The other outputs are set to 0. The selection is specified by a set of k selection bits, where $k = log_2{m}$.

Our target computer platform requires two variants of this chip: a 4-way 1-bit demultiplexer and an 8-way 1-bit demultiplexer.

API:

|           |                                                                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chip name | `DMux4Way`                                                                                                                                                                                                                                     |
| Input     | `in`, `sel[2]`                                                                                                                                                                                                                                 |
| Output    | `a`, `b`, `c`, `d`                                                                                                                                                                                                                             |
| Function  | `if (sel == 00) then {a, b, c, d} = {1, 0, 0, 0},`<br><br>`else if (sel == 01) then {a, b, c, d} = {0, 1, 0, 0},`<br><br>`else if (sel == 01) then {a, b, c, d} = {0, 0, 1, 0},`<br><br>`else if (sel == 11) then {a, b, c, d} = {0, 0, 0, 1}` |

HDL:

```hdl
CHIP DMux4Way {

IN in, sel[2];

OUT a, b, c, d;

  

PARTS:

Not(in= sel[1], out= notsel1);

Not(in= sel[0], out= notsel0);

  

And(a= in, b= sel[1], out= inandsel1);

And(a= in, b= notsel1, out= inandnotsel1);

  

And(a= inandnotsel1, b= notsel0, out= a);

And(a= inandnotsel1, b= sel[0], out= b);

And(a= inandsel1, b= notsel0, out= c);

And(a= inandsel1, b= sel[0], out= d);

}
```

|           |                                                                                                                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chip name | `DMux8Way`                                                                                                                                                                                                                                                                                                    |
| Input     | `in`, `sel[3]`                                                                                                                                                                                                                                                                                                |
| Output    | `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`                                                                                                                                                                                                                                                                        |
| Function  | `if (sel == 000) then {a, b, c, …, h} = {1, 0, 0, 0, 0, 0, 0, 0},`<br><br>`else if (sel == 001) then {a, b, c, …, h} = {0, 1, 0, 0, 0, 0, 0, 0},`<br><br>`if (sel == 010) then {a, b, c, …, h} = {0, 0, 1, 0, 0, 0, 0, 0},`<br><br>…<br><br>`if (sel == 111) then {a, b, c, …, h} = {0, 0, 0, 0, 0, 0, 0, 1}` |

HDL:

```hdl

```

## Chapter 2: Boolean arithmetic

**🎯 Objective**: Use the gates from chapter 1 to build an ALU (Arithmetic logic unit).

The ALU is the centerpiece chip that executes all the arithmetic and logical operations performed by the computer.

### Binary numbers
A **binary number** is a number expressed in the **base-2 positional numeral system**. Let $x = x_{n}x_{n − 1}x_{n − 2} ... x_{0}$ be a string of binary digits, the value of $x$ in the base-2 positional numeral system is defined as:  
$$  
x = \sum_{i=0}^{n} x_i \cdot b^i  
$$

e.g.    

$100101_2$ = $[ ( 1 ) × 2^5 ] + [ ( 0 ) × 2^4 ] + [ ( 0 ) × 2^3 ] + [ ( 1 ) × 2^2 ] + [ ( 0 ) × 2^1 ] + [ ( 1 ) × 2^0 ]$

$100101_2$ = $[ 1 × 32 ] + [ 0 × 16 ] + [ 0 × 8 ] + [ 1 × 4 ] + [ 0 × 2 ] + [ 1 × 1 ]$

$100101_2$ = $37_{10}$

> [!faq]- What is a (positional) numeral system?
> 
> A **numeral system** is a mathematical notation for representing numbers of a given set using digits or other symbols in a consistent manner.
> 
>   
> 
> In a **positional numeral system**, the **radix** or **base** is the number of unique digits, including the digit zero, used to represent numbers.

Computers represent numbers in binary. Any number can be represented by a sequence of bits (binary digits), which in turn may be represented by any mechanism capable of being in two mutually exclusive states.

Integer numbers are unbounded: for any given number $x$, there are integers that are less than $x$ and integers greater than $x$. However, computers are finite machines that use a fixed word size for representing numbers. An 8-bit register can represent $2^8 = 256$ different things. Using $n$ bits, we can represent all the nonnegative integers ranging from $0$ to $2^n - 1$.

### Signed binary numbers
The three common methods of extending the binary numeral system to represent signed (positive, negative, and zero) numbers are:
* Sign–magnitude,
* Ones' complement, and
* Two's complement.

Of the three, two’s complement is the most commonly used today

#### Two's complement
A two's complement number system encodes positive and negative numbers in a binary number representation. The weight of each bit is a power of two, except for the **most significant bit** (aka **sign bit**), whose weight is the negative of the corresponding power of two. The value $w$ of an $N$-bit integer $a_{N-1} a_{N-2} ... a_0$ is given by the following formula:

$$
w = -(a_{N-1} 2^{N-1}) + \sum_{i=0}^{N-2} a_i 2^i
$$

  

The two's complement of an $N$-bit number is the complement of that number with respect to $2^N$ (this is the property that gives this system its name). i.e. Given that $x$ is an $N$-bit number and $y$ is its two's complement, then $x + y = 2^N$. e.g.

$$
N = 3
$$
$$
2^N = 2^3 = 8_10 = 1000_2
$$
$$
If \space x = 011_2 \space (3_{10})
$$
Then $y$ ($x$'s two's complement) $= 101_2$ $(5_{10})$ because:
$$
011_2 + 101_2 = 1000_2 = 2^N
$$

##### How to calculate the two's complement of a number
Calculation of the two's complement of a number essentially means subtracting the number from $2^N$. But as can be seen from the 3-bit example and the 4-bit $1000_2$, the number $2^N$ will not itself be representable in a system limited to $N$ bits, as it is just outside the $N$ bit space. Because of this, systems with maximally $N$-bit must break the subtraction into two operations:

1. First, subtract from the maximum number in the $N$-bit system, that is $2^N - 1$. This term in binary is actually a simple number consisting of 'all 1s', and a subtraction from it can be done by simply inverting all bits in the number. The number obtained in this step is called the **ones' complement** because summing it with the original number yields 'all 1s'.
2. Secondly, add one to the result.

| Bits | Unsigned value | Signed value (Two's complement) |
| ---- | -------------- | ------------------------------- |
| 000  | 0              | 0                               |
| 001  | 1              | 1                               |
| 010  | 2              | 2                               |
| 011  | 3              | 3                               |
| 100  | 4              | -4                              |
| 101  | 5              | -3                              |
| 110  | 6              | -2                              |
| 111  | 7              | -1                              |

##### Why the two's complement system works
Given a set of all possible $N$-bit values, we can assign the lower (by the binary value) half to be the integers from 0 to ($2^{N-1} - 1) inclusive and the upper half to be $-2^{N-1}$ to $-1$ inclusive. The upper half (again, by the binary value) can be used to represent negative integers from $-2^{N-1}$ to $-1$ because, under addition modulo $2^N$ they behave the same way as those negative integers. That is to say that, because $i + j \bmod 2^N = i + (j + 2^N) \bmod 2^N$, any value in the set $\{j + k2^N \space | \space k \space is \space an \space integer\}$ can be used in place of $j$. Fundamentally, the system counts negative numbers by counting backwards and wrapping around.

Given $2^N = 2^3$, these are some examples:

| Addition in the two's complement system      | Addition modulo $2^3$                                             |
| -------------------------------------------- | ----------------------------------------------------------------- |
| $-4 + 3 = -1$ (represented as $7$ in binary) | $4 + 3 \bmod 8 = 7$ (the two's complement representation of $-1$) |
| $-3 + 3 = 0$ (represented as $0$ in binary)  | $5 + 3 \bmod 8 = 8$ (the two's complement representation of $0$)  |
| $-2 + 3 = 1$ (represented as $1$ in binary)  | $6 + 3 \bmod 8 = 1$ (the two's complement representation of $1$)  |

##### Benefits of the two's complement system
The two's complement system has the following advantages over other systems for representing signed numbers:

1. The fundamental arithmetic operations of addition, subtraction, and multiplication are identical to those for unsigned binary numbers (as long as the inputs are represented in the same number of bits as the output, and any overflow beyond those bits are discarded from the result).
2. It has no representation for negative zero (unlike the ones' complement and sign-magnitude representations).

The material implications of these theoretical results are significant:
* Dedicated hardware is not needed to handle arithmetic with signed numbers.
* Subtraction can be treated as adding the complement of the subtrahend. Again, no dedicated hardware required.
### Binary arithmetic
A pair of binary numbers can be added bitwise from right to left, using the same decimal addition algorithm learned in elementary school.

```

1 1 1 1 1 (carried bits )

  0 1 1 0 1 (13_10)

+ 1 0 1 1 1 (23_10)

-------------

1 0 0 1 0 0 (36_10)

```

When adding in the two's complement system, any extra carry bit is discarded, such that the result and the addends always have the same number of bits. This is effectively the same as applying the modulo operator. For any number $x$, computing $x \bmod 2^N$ essentially results in keeping the lowest $N$ bits of the number $x$. As explained in the two's complement section, this modulo operation is what makes the two's complement system work.
### Specification
### Adder

An adder or summer is a digital circuit used in the ALU to perform addition on binary numbers. We saw (from the elementary school style addition) that computer hardware for binary addition of two $n$-bit numbers can be built from logic gates designed to calculate the sum of three bits (pair of bits plus carry bit). These are the following hierarchy of adders that will be built:

#### Half adder
A half adder is designed to add two bits.

|           |                                                    |
| --------- | -------------------------------------------------- |
| Chip name | `HalfAdder`                                        |
| Input     | `a`, `b`                                           |
| Output    | `sum`, `carry`                                     |
| Function  | `sum = LSB of a + b`<br><br>`carry = MSB of a + b` |
 An inspection of the truth table reveals that the outputs `sum(a, b)` and `carry(a, b)` are identical to those of two simple Boolean functions `Xor` and `And` repectively.

| a   | b   | carry | sum |
| --- | --- | ----- | --- |
| 0   | 0   | 0     | 0   |
| 0   | 1   | 0     | 1   |
| 1   | 0   | 0     | 1   |
| 1   | 1   | 1     | 0   |

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

#### Full adder
A full adder is designed to add three bits. Like the half-adder, the full-adder chip outputs two bits that, taken together, represents the addition of the three input bits.

|           |                                                            |
| --------- | ---------------------------------------------------------- |
| Chip name | FullAdder`                                                 |
| Input     | `a`, `b`, `c`                                              |
| Output    | `sum`, `carry`                                             |
| Function  | `sum = LSB of a + b + c`<br><br>`carry = MSB of a + b + c` |

| a   | b   | c   | carry | sum |
| --- | --- | --- | ----- | --- |
| 0   | 0   | 0   | 0     | 0   |
| 0   | 0   | 1   | 0     | 1   |
| 0   | 1   | 0   | 0     | 1   |
| 0   | 1   | 1   | 1     | 0   |
| 1   | 0   | 0   | 0     | 1   |
| 1   | 0   | 1   | 1     | 0   |
| 1   | 1   | 0   | 1     | 0   |
| 1   | 1   | 1   | 1     | 1   |

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

#### Adder
An adder is designed to add two $n$-bit numbers.

|           |                              |
| --------- | ---------------------------- |
| Chip name | `Add16`                      |
| Input     | `a[16]`, `b[16]`             |
| Output    | `out[16]`                    |
| Function  | Adds two 16-bit numbers.     |
| Comment   | The overflow bit is ignored. |

The addition of two $n$-bit numbers can be done bitwise, from right to left (from LSB pairs to MSB pairs). In each step, the resulting carry bit from the previous step is fed into the addition.
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

#### Incrementer
Designed to add `1` to a given number. Although, the `x + 1` operation can be realized with the general-purpose `Adder` chip, a dedicated `Incrementer` chip can do it more efficiently.
 
|           |                              |
| --------- | ---------------------------- |
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

#### ALU
The Arithmetic logic unit (ALU) is a chip designed to compute a set of arithmetic and logic operations. Unlike the generic chips discussed so far, the ALU described below is specific to the Hack computer:
* It only performs integer arithmetic (and not, for example, floating point arithmetic)
* It computes only a set of 18 arithmetic-logical functions.

| x   | y   | zx  | nx  | zy  | ny  | f   | no  | out | Description             |        |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------------------- | ------ |
| 0   | y   | 1   | 0   | 1   | 0   | 1   | 0   | 0   | 0 (constant zero)       |        |
| 1   | y   | 1   | 1   | 1   | 1   | 1   | 1   | 1   | 1 (constant one)        |        |
| -1  | y   | 1   | 1   | 1   | 0   | 1   | 0   | -1  | -1 (constant minus one) |        |
| x   | y   | 0   | 0   | 1   | 1   | 0   | 0   | x   | x                       |        |
| x   | y   | 1   | 1   | 0   | 0   | 0   | 0   | y   | y                       |        |
| x   | y   | 0   | 0   | 1   | 1   | 0   | 1   | ¬x  | NOT x                   |        |
| x   | y   | 1   | 1   | 0   | 0   | 0   | 1   | ¬y  | NOT y                   |        |
| x   | y   | 0   | 0   | 1   | 1   | 1   | 1   | -x  | -x                      |        |
| x   | y   | 1   | 1   | 0   | 0   | 1   | 1   | -y  | -y                      |        |
| x   | y   | 0   | 1   | 1   | 1   | 1   | 1   | x+1 | x + 1                   |        |
| x   | y   | 1   | 1   | 0   | 1   | 1   | 1   | y+1 | y + 1                   |        |
| x   | y   | 0   | 0   | 1   | 1   | 1   | 0   | x-1 | x - 1                   |        |
| x   | y   | 1   | 1   | 0   | 0   | 1   | 0   | y-1 | y - 1                   |        |
| x   | y   | 0   | 0   | 0   | 0   | 1   | 0   | x+y | x + y                   |        |
| x   | y   | 0   | 1   | 0   | 0   | 1   | 1   | x-y | x - y                   |        |
| x   | y   | 0   | 0   | 0   | 1   | 1   | 1   | y-x | y - x                   |        |
| x   | y   | 0   | 0   | 0   | 0   | 0   | 0   | x&y | x AND y                 |        |
| x   | y   | 0   | 1   | 0   | 1   | 0   | 1   | x   | y                       | x OR y |

The Hack ALU operates on two $16$-bit two's complement integers denoted `x` and `y`, an on six $1$-bit inputs, called control bits. The control bits "tell" the ALU which function to compute. Each control bit effects a standalone conditional micro-action:

```
1. if (zx) then x = 0 else x = x

2. if (nx) then x = !x else x = x

3. if (zy) then y = 0 else y = y

4. if (ny) then y = !y else y = y

5. if (f) then out = x + y else out = x and y

6. if (no) then out = !out else out = out
```

> It may be instructive to describe the thought process that led to the design of this particular ALU. First, we made a list of all the primitive operations that we wanted our computer to be able to perform (right column in figure 2.6). Next, we used backward reasoning to figure out how x, y, and out can be manipulated in binary fashion in order to carry out the desired operations. These processing requirements, along with our objective to keep the ALU logic as simple as possible, have led to the design decision to use six control bits, each associated with a straightforward binary operation.

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