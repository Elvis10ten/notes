# []WIP Crafting interpreters

This is a book on implementing interpreters for programming languages with a focus on practicals (getting the language up and running) instead of theory (Formal reasoning on syntax and semantics).

### Chapter 2: A map of the territory

### Chapter 3: The Lox Language
The Lox language is a high-level language with a C syntax style.

Lox is dynamically typed. Variables can store values of any type. Implementing a statically typed language would have taken more time and effort.

There are two main techniques for managing memory: **reference counting** and **tracing garbage collection** (aka **garbage collection**). A garbage collector will be implemented for Lox.

#### Data types
Lox has the following data types:
1. Booleans
2. Numbers (Double-precision floating point)
3. Strings
4. Nil

#### Expressions
Lox has the following types of expressions:
1. **Arithmetic**: Lox features basic arithmetic operators like
   * `add + me`
   * `subtract - me`
   * `multiply * me`
   * `divide / me`
   
   > The subexpressions on either side of the operator are **operands**. 
   > 
   > Because there are two operands, the operators are called **binary operators**.
   > 
   > Because the operator is fixed in the middle of the operands, these are also called **infix operators**.
   > 
   > A **prefix operator** comes before the operand like `-negateMe` .
   > 
   >  A **postfix operator** comes after the operand like `increaseMe++` .
2. **Comparison and equality**: These operators always return a boolean result. e.g.
   * `less < than`
   * `lessThan <= orEqual`
   * `greater > than`
   * `greaterThan >= orEqual`
   * `is == equal`
   * `is != notEqual`
3. **Logical operators**:
   * `!notOperator`
   * `firstBoolean and secondBooleanMustBeTrue`
   * `firstBoolean or secondMustBeTrue`
   > The `and` and `or` are like control flow structures because they **short-circuit**. The right operand is not evaluated if not necessary.
4. **Precedence and grouping**: `()` can be used to group operations. e.g. `var average = (min + max) / 2;`.

#### Statements
An expression’s main job is to produce a value, a statement’s job is to produce an effect (e.g. modifying some state, reading input, or producing output). e.g.

```javascript
// A print statement evaluated a single expression
// and displays the result to the user.
print "Hello world!";
```

An **expression statement** is an expression used in a place where a statement is expected. The expression is evaluated and its result is discarded — therefore, it makes sense only for expressions that have side effects, such as executing a function or updating a variable.

#### Variables
Variables are declared using `var` statements. If the initializer is omitted, the variable’s value defaults to `nil`.

```javascript
var imAVariable = "here is my value";
var iAmNil;
```

#### Control flow
`and` and `or` can be used for branching, and recursion can be used to repeat code. Lox introduces `if`…`else`, `while` loop, and `for` loop as control flow statements.

#### Functions
Functions are first class in Lox, which means they are real values that you can get a reference to, store in variables, pass around, etc.

A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.

#### Classes
For a dynamically typed language, objects are handy because they serve the need for some way to define compound data types to bundle blobs of stuff together.

There are two approaches to objects:
1. **Classes**: “In class-based languages, there are two core concepts: **instances** and **classes**. **Instances** store the state for each object and have a reference to the instance’s class. **Classes** contain the methods and inheritance chain. To call a method on an instance, there is always a level of indirection: Look up the instance’s class and find the method there.”
2. **Prototypes**: “Prototype-based languages merge these two concepts. There are only objects — no classes— and each individual object may contain state and methods. Objects can directly inherit from each other”.
Learn more [here](https://stackoverflow.com/questions/2800964/benefits-of-prototypal-inheritance-over-classical).

Lox is class based. It supports object instantiation (i.e. creating an object from a class) and initialization (i.e. class constructor/initializers). It also supports single inheritance.


## A tree-walk interpreter

### Chapter 4: Scanning
The first step in any compiler or interpreter is **scanning** (aka **lexing** [short for lexical analysis]). The scanner takes in raw source code as a series of characters and groups it into a series of tokens.