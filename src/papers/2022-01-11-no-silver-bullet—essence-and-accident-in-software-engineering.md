# No Silver Bullet — Essence and Accident in Software Engineering — Paper Summary


["No Silver Bullet — Essence and Accident in Software Engineering” [PDF]](https://www.researchgate.net/publication/220477127_No_Silver_Bullet_Essence_and_Accidents_of_Software_Engineering) is a famous software engineering paper written by Turing Award winner Fred Brooks in 1987. This post summarizes the key ideas.

1. Brooks likens software projects to [werewolves](https://en.wikipedia.org/wiki/Werewolf) (to the non-technical manager) — they usually start innocent and straightforward, but can morph into a monster of missed schedules, blown budgets, and flawed products.
2. There has been no [silver bullet](https://en.wikipedia.org/wiki/Silver_bullet) (despite cries for it) over the decades — There is no single development, in either technology or management technique, that offers even one [order-of-magnitude](https://en.wikipedia.org/wiki/Order_of_magnitude) improvement in productivity, reliability, or simplicity.
3. This paper, attempts to show why, by examining both the nature of the software problem and the properties of the bullets proposed.

## Does It Have to Be Hard? — Essential Difficulties
1. The very nature of software makes it unlikely that there will be any silver bullet.
2. Computer hardware progress is so fast ([Moore's law](https://en.wikipedia.org/wiki/Moore%27s_law)) — making software progress seem so slow in comparison.
3. Following [Aristotle](https://en.wikipedia.org/wiki/Aristotle), Brooks divides software difficulties into two kinds:
   - **Essence**: the difficulties inherent in the nature of software.
   - **Accidents**: those difficulties that today attend its production but are not inherent.

> The essence of a software entity is a construct of interlocking concepts: data sets, relationships among data items, algorithms, & invocations of functions.
> This essence is abstract in that such a conceptual construct is the same under many different representations.

> I believe the hard part of building software to be the specification, design, and testing of this conceptual construct, not the labor of representing it and testing the fidelity of the representation. [Syntax errors are fuzz compared to conceptual errors in most systems.]
> **If this is true, building software will always be hard — there is inherently no silver bullet.**

The following are inherent properties of this irreducible essence of modern software systems:

### i. Complexity
1. Software differs from other industries where repeated elements abound. Usually, no two software parts are alike (at least above the statement level).
2. Scaling-up of a software entity is not merely a repetition of the same elements in larger sizes, it's necessarily an increase in the number of different elements. In most cases, the elements interact with each other in some nonlinear fashion, and the complexity of the whole increases much more than linearly.
3. The complexity of software is an essential property, not an accidental one. Many of the classic problems of developing software products derive from complexity and its nonlinear increases with size:
    - Difficulty of communication among team members, which leads to product flaws, cost overruns, schedule delays.
    - Difficulty of enumerating, much less understanding, all the possible states of the program, and from that comes unreliability.
    - It makes overview hard, thus impeding conceptual integrity.

### ii. Conformity
1. Software unlike objects in physics usually have no unifying principles because it wasn't created by some capricious God.
2. Much of the complexity that a software engineer must master is arbitrary complexity, forced without rhyme or reason by the many human institutions and systems to which her interfaces must conform.
3. This complexity cannot be simplified out by any redesign of the software alone.

### iii. Changeability
1. Software is frequently modified compared to other objects because:
   - The software of a system embodies its function, and the function is the part that most feels the pressures of change.
   - Software is infinitely malleable — it's pure thought-stuff.
2. Buildings do get changed, but the high costs of change, understood by all, serve to dampen the whims of the changers.
3. The software product is embedded in a cultural matrix of evolving applications, users, laws, and machine vehicles.

### iv. Invisibility
1. Diagramming software structures is hard — they constitute several superimposed general directed graphs — for things like control flow, data flow, patterns of dependency, time sequence, name-space relationships.
2. Software structures are inherently unvisualizable. Thus, they do not permit the mind to use some of its most powerful conceptual tools.

## Past Breakthroughs Solved Accidental Difficulties
### i. High-level languages
1.  High-level languages frees a program from a lot of a machine's accidental complexity.
2. **Limit**: At some point, the elaboration of a high-level language creates a tool-mastery burden that increases, not reduces, the intellectual task of the user who rarely uses the esoteric constructs.

### ii. Time-sharing
1. [Time-sharing](https://en.wikipedia.org/wiki/Time-sharing) (as opposed to batch processing) preserves immediacy, and hence enables one to maintain an overview of complexity.
2. **Limit**: As this response time goes to zero, at some point, it passes the human threshold of noticeability, about `100 milliseconds`. Beyond that threshold, no benefits are to be expected.

### iii. Unified programming environments
1. A unified environment stimulates the development of whole tool benches since each new tool could be applied to any program that uses the standard formats.

## Hopes for the Silver

### i. Ada and other high-level language advances
1. Ada philosophy provided an advancement — it's the philosophy of modularization, of abstract data types, of hierarchical structuring.
2. The biggest payoff from high-level languages comes from the transition from the accidental complexities of the machine into a more abstract statement of step-by-step solutions.

### ii. Object-oriented programming
1. The concept of the abstract data type is that an object's type should be defined by a name, a set of proper values, and a set of proper operations rather than by its storage structure, which should be hidden.
2. Hierarchical types, allow one to define general interfaces that can be further refined by providing subordinate types. The two concepts are orthogonal — one may have hierarchies without hiding and hiding without hierarchies.
3. Each only removes yet another accidental difficulty from the process, allowing the designer to express the essence of the design without having to express large amounts of syntactic material that add no information content.

### iii. Artificial intelligence
1. Two quite different definitions of AI are in common use today.
   - The use of computers to solve problems that previously could only be solved by applying human intelligence.
   - The use of a specific set of programming techniques known as heuristics or rule-based programming (aka **expert systems**).
2. Most of the work is problem-specific, and some abstraction or creativity is required to see how to transfer it.
3. The hard thing about building software is deciding what one wants to say, not saying it. No facilitation of expression can give more than marginal gains.

### iv. Expert systems
1. An expert system is a program that contains a generalized inference engine and a rule base, takes input data and assumptions, explores the inferences derivable from the rule base, yields conclusions, and advice, and offers to explain its results by retracing its reasoning for the user.
2. Such a system can be applied to the software engineering task in many ways: suggesting interface rules, advising on testing strategies, remembering bug-type frequencies, and offering optimization hints. 
3. The most powerful contribution by expert systems will surely be to put at the service of the inexperienced programmer the experience and accumulated wisdom of the best programmers.

### v. "Automatic" programming
1. The generation of a program for solving a problem from a statement of the problem specifications.
2. This only works well for applications with the following favorable properties:
    - The problems are readily characterized by relatively few parameters.
    - There are many known methods of solution to provide a library of alternatives.
    - Extensive analysis has led to explicit rules for selecting solution techniques, given problem parameters. 

### vi. Graphical programming
1. The application of computer graphics to software design.
2. As noted earlier, software structures are hard to visualize. Diagrams usually only capture one dimension at a time and eventually becomes too large.

### vii. Program verification
1. Verifications are so much work that only a few substantial programs have ever been verified.
2. Perfect program verification can only establish that a program meets its specification. The hardest part of the software task is arriving at a complete and consistent specification, and much of the essence of building a program is the debugging of the specification.

### viii. Environments and tools
1. Most of the low-hanging fruits have been plucked — things like hierarchical file systems, uniform file formats to make possible uniform program interfaces, and generalized tools.
> Perhaps the biggest gain yet to be realized from programming environments is the use of integrated database systems to keep track of the myriad details that must be recalled accurately by the individual programmer and kept current for a group of collaborators on a single system.

### ix. Workstations
> The composition and editing of programs and documents are fully supported by today's speeds.
> Compiling could stand a boost, but a factor of 10 in machine speed would surely leave think time the dominant activity in the programmer's day.

## Promising Attacks on the Conceptual Essence
1. All of the technological attacks on the accidents of the software process are fundamentally limited by the productivity equation:
   > Zhongmin wang time of task = Sum(Frequency * Time)
2. Brooks believes that the conceptual components of the task are now taking most of the time. (The paper was written in 1987)

### i. Buy versus build
1. The most radical possible solution for constructing software is not to construct it at all.
2. The use of `n` copies of a software system effectively multiplies the productivity of its developers by `n` (cutting down the per-user development cost).
3. Even for one hundred thousand dollars, a purchased piece of software is costing only about as much as one programmer year. And delivery is immediate!

### ii. Requirements refinement and rapid prototyping
1. The hardest single part of building a software system is deciding precisely what to build.
2. The client does not know what he wants.
3. It's impossible for a client, even working with a software engineer, to specify completely, precisely, and correctly the exact requirements of a modern software product before trying some versions of the product. 

>  Systems should first be made to run, even if it does nothing useful except call the proper set of dummy subprograms.
> Then, bit by bit, it should be fleshed out, with the subprograms, in turn, being developed — into actions or calls to empty stubs in the level below.
> [...] Enthusiasm jumps when there is a running system, even a simple one.

### iii. Great designers
1. We can get good designs by following good practices instead of poor ones. Good design practices can be taught.
2. Nevertheless, Brooks does not believe we can make the next step upward this way: 

> Whereas the difference between poor conceptual designs and good ones may lie in the soundness of the design method, the difference between good designs and great ones surely does not.
> Great designs come from great designers. Software construction is a creative process.
> Sound methodology can empower and liberate the creative mind; it cannot inflame or inspire the drudge.