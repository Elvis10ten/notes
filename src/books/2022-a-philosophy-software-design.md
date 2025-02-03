# A Philosophy of Software Design

This is my summary and notes from [A Philosophy of Software Design, 2nd Edition](https://amzn.to/382B0oX) by John Ousterhout. Please use the link if you decide to buy the book after reading this as it contains my affiliate code. Thanks.

> The most fundamental problem in computer science is problem decomposition: how to take a complex problem and divide it up into pieces that can be solved independently.

## Chapter 1 — Introduction
1. Programmers aren’t bound by practical limitations such as laws of physics, they are bound by their limited ability to understand the systems they create.
2. [Complexity hinders understanding](https://elvischidera.com/2022-01-02-summary-out-of-the-tar-pit/) — which impedes development and leads to bugs.
3. Complexity begets complexity.
4. The larger the program and number of people working on it, the more difficult it is to manage complexity.
5. There is a limit to how much any tool can help to deal with complexity.
6. There are two general approaches to fighting complexity:
    * **Complexity elimination** — make code simpler and more obvious. E.g: eliminating special cases.
    * **Complexity encapsulation** — into relatively independent modules (aka `modular design`), so that programmers can work on a system without being exposed to all of its complexity at once.
7. Because software is so malleable, software design is a continuous process that spans the entire lifecycle of a software system.
8. It’s easier to see design problems in someone else’s code than your own.
9. Every rule has its exceptions, and every principle has its limits. If you take any design idea to its extreme, you will probably end up in a bad place.

### Notes
1. The author talked about how agile practices can reduce complexity because engineers can continuously change a design as they understand the problem space better.
2. However, at the limit, incremental changes can lead to a bad design overall when engineers don’t take a holistic view of the system.<br/>
   Edit: The author eventually mentions this in [chapter 19](#agile-development).

## Chapter 2 — The Nature of Complexity
###  Complexity defined
1. Complexity is anything related to the structure of a software system that makes it hard to understand and thus modify the system.
2. The overall complexity of a system (`C`) is determined by the complexity of each part p (`cₚ`) weighted by the fraction of time developers spend working on that part (`tₚ`).

$$
C = \sum_{p = 0}^{n} c_{p} t_{p}
$$

1.  Based on the above formula, interfaces should be designed to make the common case as simple as possible:
    > If the API for a **commonly used feature** forces users to learn about other features that are **rarely used**, this increases the cognitive load on users who don’t need the rarely used features.

### Symptoms of complexity
1. **Change amplification**: A seemingly simple change requires code modifications in many different places.
2. **Cognitive load**: how much a developer needs to know in order to complete a task.
   > Sometimes an approach that requires more lines of code is actually simpler, because it reduces cognitive load.
3. **Unknown unknowns**: It’s not obvious which pieces of code must be modified or what information a developer must have to complete a task.

### Causes of complexity
1. **Dependency**:
    * A dependency exists when a given piece of code cannot be understood and modified in isolation.
    * E.g: a dependency exists between a function and all its callers.
    * Dependencies lead to change amplification and a high cognitive load.
    * Because dependencies are a fundamental part of software that can’t be completely eliminated, the goal is to reduce them and make whatever remains simple and obvious.
2. **Obscurity**:
    * Occurs when important information is not obvious.
    * Obscurity creates unknown unknowns and contributes to cognitive load.

### Complexity is incremental
1. Death by a thousand cuts: Complexity isn’t caused by a single catastrophic error; it accumulates in lots of small chunks.

### Notes
1. The definition of complexity here is subjective: a junior engineer might find a project hard to understand or the task at hand might be inherently complex.
2. The author doesn’t explicitly distinguish between essential and accidental complexity.
3. Modularity suggested in [chapter 1](#chapter-1--introduction) can lead to obscurity.<br/>
   Edit: The author eventually gets to this in [chapter 4](#abstractions)
4. The overall complexity should be viewed relative to an individual/team — a single engineer or team might work on a module more than any other engineers in the company combined.

## Chapter 3 — Working Code Isn’t Enough
### Tactical programming
1. Tactical programming focuses on finishing tasks (i.e: shipping working code) quickly. Any endeavor like refactoring that doesn’t pay dividends now is deprioritized.
2. It adds to complexity due to myopic design decisions that are usually subpar.

### Strategic programming
1. Strategic programming requires an investment mindset to improve the design of the system even if it's not the fastest path to finish your current project.
2. Investment can be proactive (thinking ahead) or reactive (incorporating new knowledge into existing design).
3. In the short term, these investments slow development. In the long term, they make development faster.

### How much to invest?
1. Our expertise of a problem domain improves as we work in it. Hence, huge upfront investment (like the waterfall model) don’t work because of the details that usually emerge only during actual implementation or usage.
2. The best approach is to make lots of small investments on a continual basis.
3. The author suggest spending about `10–20%` of total development time on investments. This amount is small enough that it won’t impact your schedules significantly, but large enough to produce significant benefits over time.

### Notes
1. In my experience, effective teams know when to switch between tactical & strategic approaches.
2. The author discredits the tactical argument for startups. My counter argument is that I have see “well engineered” projects fail, a lot. In fact, a big trap I see great engineers fall for is to expend a significant amount of time on a product that hasn’t been validated — what’s the point?

## Chapter 4 — Modules Should Be Deep
### Modular design
1. Modules can take many forms, such as classes, subsystems, or services.
2. In order to manage dependencies, we think of each module in two parts:
    * The **interface** consists of everything that a developer working in a different module must know in order to use the given module.
    * The **implementation** consists of the code that carries out the promises made by the interface.
3. For the purposes of this book, a module is any unit of code that has an interface and an implementation.
4. The best modules are those whose interfaces are much simpler than their implementations. Such modules have two advantages:
    * A simple interface minimizes the complexity that a module imposes on the rest of the system.
    * If a module is modified in a way that does not change its interface, then no other module will be affected by the modification.
### What’s in an interface?
1. If a developer needs to know a particular piece of information in order to use a module, then that information is part of the module’s interface.
2. An interface has two parts:
    * **Formal parts**: are specified explicitly in the code and can be enforced by a programming language. E.g: a method’s signature, a class public methods & properties, etc.
    * **Informal parts**: are specified in the documentation and can’t be enforced by a programming language. It includes its high level behavior like: what a function does when it's called.

### Abstractions
1. An abstraction is a simplified view of an entity, which omits unimportant details.
2. A module provides an abstraction in form of its interface: The interface presents a simplified view of the module’s functionality; the details of the implementation are unimportant from the standpoint of the module’s abstraction, so they are omitted from the interface.
3. Two pitfalls with abstractions:
    * **Unimportant details inclusion**: this increases cognitive load as the the abstraction is more complicated than necessary.
    * **Important details exclusion**: This results in obscurity.

### Deep modules
1. The best modules are those that provide powerful functionality yet have simple interfaces.
2. Unix File I/O mechanism is a good example of deep modules.
3. Module depth is a way of thinking about cost versus benefit:
    - The benefit provided by a module is its functionality.
    - The cost of a module (in terms of system complexity) is its interface.

### Shallow modules
1. A shallow module is one whose interface is complicated relative to the functionality it provides.
2. Shallow modules don’t help much in the battle against complexity, because the benefit they provide (not having to learn about how they work internally) is negated by the cost of learning and using their interfaces.
3. Small modules tend to be shallow.

###  Classitis
1. The conventional wisdom in programming is that classes should be small, not deep:
    * Break up larger classes into smaller ones.
    * Any method longer than `N` lines should be divided into multiple methods
2. The extreme of the “classes should be small” approach is a syndrome the author calls classitis:

> Classitis may result in classes that are individually simple, but it increases the complexity of the overall system. Small classes don’t contribute much functionality, so there have to be a lot of them, each with its own interface. These interfaces accumulate to create tremendous complexity at the system level. Small classes also result in a verbose programming style, due to the boilerplate required for each class.

### Notes
1. Because all abstractions are leaky, in practice you will find that changes that don't change a module's interface might still require changes to consumers. See [Hyrum's law](https://www.hyrumslaw.com/).

## Chapter 5 — Information Hiding (and Leakage)
### Information hiding
1. Information hiding occurs when each module encapsulates a few pieces of knowledge, which represent design decisions. The knowledge is embedded in the module’s implementation but does not appear in its interface.
2. Information hiding also applies within a class:
    * Design the private methods so that each method encapsulates some information or capability and hides it from the rest of the class.
    * Minimize the number of places where each instance variable is used.
### Information leakage
1. Information leakage occurs when a design decision is reflected in multiple modules.
2. Information leakage is the opposite of information hiding.
3. Leakage can occur directly via a module’s interface, or indirectly via implicit knowledge used in different modules (like the expected structure of a file).

### Temporal decomposition
1. In temporal decomposition, execution order is reflected in the code structure: operations that happen at different times are in different methods or classes. If the same knowledge is used at different points in execution, it gets encoded in multiple places, resulting in information leakage.
2. Information hiding can often be improved by making a class slightly larger. This enables us encapsulate specific knowledge in one place and raise the interface level (i.e: instead of exposing many intermediary low-level steps, expose a small number of high-level steps).

## Chapter 6 — General-Purpose Modules are Deeper
1. General-purpose interfaces have many advantages over special-purpose ones:
    * They tend to be simpler, with fewer methods that are deeper.
    * They also provide a cleaner separation between classes, whereas special-purpose interfaces tend to leak information between classes.
2. Making your modules somewhat general-purpose is one of the best ways to reduce overall system complexity.

### Notes
1. This all ties down to layering (talked about in the next chapter): Make generic low-level modules, and specialized high-level modules.

## Chapter 7 — Different Layer, Different Abstraction
> Each piece of design infrastructure added to a system, such as an interface, argument, function, class, or definition, adds complexity, since developers must learn about this element. In order for an element to provide a net gain against complexity, it must eliminate some complexity that would be present in the absence of the design element. Otherwise, you are better off implementing the system without that particular element. For example, a class can reduce complexity by encapsulating functionality so that users of the class needn’t be aware of it.
1. Software systems are composed in layers, where higher layers use the facilities provided by lower layers and each layer has a different abstraction (level).

### Pass-Through Method
1. A pass-through method is one that does nothing except pass its arguments to another method, usually with the same API as the pass-through method. This typically indicates that there is not a clean division of responsibility between the classes.
2. The interface to a piece of functionality should be in the same class that implements the functionality.
3. Ways to eliminate pass-through methods:
    - Let callers invoke the method directly
    - Redistribute functionality to avoid calls between the two
    - Combining the classes

### When is interface duplication OK?
1. Having methods with the same signature is not always bad. The important thing is that each new method should contribute significant functionality. Pass-through methods are bad because they contribute no new functionality.

### Decorators
1. A decorator object takes an existing object and extends its functionality; it provides an API similar or identical to the underlying object, and its methods invoke the methods of the underlying object.
2. The decorator design pattern (also known as a “wrapper”) encourages API duplication across layers.
3. Because decorators tend to be shallow, it’s worth considering alternative options:
    * Could you add the new functionality directly to the underlying class, rather than creating a decorator class?
    * If the new functionality is specialized for a particular use case, would it make sense to merge it with the use case, rather than creating a separate class?
    * Could you merge the new functionality with an existing decorator, rather than creating a new decorator?
    * Ask yourself whether the new functionality really needs to wrap the existing functionality: could you implement it as a stand-alone class that is independent of the base class?

### Pass-through variables
1. Another form of API duplication across layers is a pass-through variable, which is a variable that is passed down through a long chain of methods.
2. Ways to eliminate pass-through variables:
    - Store the variable in a shared object
    - Use global variables
    - Use a context object that stores all system-wide information, such as a
      timeout value and performance counters; a reference to the context is stored in all objects whose methods need access to it.

### Notes
1. Context object introduce obscurity like the author mentioned: why does a value exists & where is it used. When is pass-through variables better than context objects?
2. Context objects could also exist at a more local scope.

## Chapter 8 — Pull Complexity Downwards
1. It’s more important for a module to have a simple interface than a simple implementation — Most modules have more users than developers, so it is better for the developers to suffer than the users.
2. Pulling complexity down makes the most sense if:
    * The complexity being pulled down is closely related to the class’s existing functionality
    * Pulling the complexity down will result in many simplifications elsewhere in the application
    * Pulling the complexity down simplifies the class’s interface.

### Notes
1. I disagree with the author on avoiding configuration parameters — Anyone who has built a niche complex system have run into a module that used values that are inadequate for the current situation.
2. Having settings or configuration parameters is not a design failure. Sensible defaults should be provided, but the user should be able to override them in most cases.

## Chapter 9 — Better Together Or Better Apart?
1. One of the most fundamental questions in software design is this: given two pieces of functionality, should they be implemented together in the same place, or should their implementations be separated?
2. While a large number of small modules lead to simpler individual modules, they usually increase the overall system complexity:
    * Complexity from the number of modules — hard to keep track of all of them or find a desired module. Subdivision usually results in more interfaces, and every new interface adds complexity.
    * May require additional code to manage multiple modules.
    * Creates separation:
        * For truly independent modules, separation is good — it allows the developer to focus on a single module at a time.
        * For dependent modules, separation is bad — Separation makes it harder for developers to see the modules at the same time, or even to be aware of their existence.
    * May result in duplication.
3. Related code should be brought together. Indications that code are related:
    * They share specific knowledge: X & Y have knowledge about Z
    * They are used together bidirectionally: X is used with Y and Y is used with X
    * They overlap conceptually: there is a simple higher-level category that includes both of the pieces of code.
    * It is hard to understand one of the pieces of code without looking at the other.

### Splitting and joining methods
1. Each method should do one thing and do it **completely**.
2. It should be possible to understand each method independently. If you can’t understand the implementation of one method without also understanding the implementation of another, that’s a red flag.
   > This is an instance of a general red flag: if two pieces of code are physically separated, but each can only be understood by looking at the other.
3. Methods can be split if the original method:
    * Can be split into independent general purpose subtasks
    * Has a complex interface and does too much, it can be split into multiple methods, so long as the callers don’t always have to use them all together in an exact order.
4. There are situations where a system can be made simpler by joining methods together:
    * Joining methods might replace two shallow methods with one deeper method
    * It might eliminate duplication of code
    * It might eliminate dependencies between the original methods, or intermediate data structures
    * It might result in better encapsulation, so that knowledge that was previously present in multiple places is now isolated in a single place
    * It might result in a simpler interface.

## Chapter 10 — Define Errors Out Of Existence
1. The exceptions thrown by a class are part of its interface
2. Four techniques for reducing the number of exception handlers:
    * Define errors out of existence by designing APIs that make an exception impossible/unnecessary.
    * Mask exceptions by detecting and handling them at a low-level.
    * Exception aggregation by handling many exceptions with a single piece of code (at a higher level).
    * Just crash when an exception is rare and difficult to deal with.

### Notes
1. Another technique is to have a clean and unclean part of the system. Parsing is done in the unclean part and exceptions are possible. The parsed objects are parsed to the clean part where exceptions are rare. See: [Parse don’t validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/).

## Chapter 11 — Design it Twice
1. Designing software is hard, so it’s unlikely that your first thoughts about how to structure a module or system will produce the best design. You’ll end up with a much better result if you consider multiple options for each major design decision.

### Notes
1. My favorite part of the book. Reminds me of a paragraph in SICP:

> “Every computer program is a model, hatched in the mind, of a real or mental process. These processes, arising from human experience and thought, are huge in number, intricate in detail, and at any time only partially understood. They are modeled to our permanent satisfaction rarely by our computer programs. Thus even though our programs are carefully handcrafted discrete collections of symbols, mosaics of interlocking functions, they continually evolve: we change them as our perception of the model deepens, enlarges, generalizes until the model ultimately attains a metastable place within still another model with which we struggle”


## Chapter 12 — Why Write Comments? The Four Excuses
1. The overall idea behind comments is to capture information that was in the mind of the designer but couldn’t be represented in the code.
### i. Good code is self-documenting
1. Good code reduces the need and amount of comments, it doesn’t eliminate the need for comments.
2. There is a significant amount of design information that can’t be represented in code.
3. While code is the source of truth, it’s painful and time consuming to expect people to read the code to understand the interface.

> Comments are fundamental to abstractions: an abstraction is a simplified view of an entity, which preserves essential information but omits details that can safely be ignored. If users must read the code of a method in order to use it, then there is no abstraction: all of the complexity of the method is exposed.

### ii. I don’t have time to write comments
1. Good comments make a huge difference in the maintainability of software, so the effort spent on them will pay for itself quickly.
2. This excuse sacrifices long term speed, for short term speed.

### iii. Comments get out of date and become misleading
1. Updating the docs doesn’t take as much time as updating the code; disciplined teams should have docs sync as part of the development process.

### iv. All the comments I have seen are worthless
1. This is solvable by learning how to write solid documentation.

### Notes
1. Worthless comments can usually be attributed to [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law). People write comments because there is some incentive to write comments, but since they don’t deeply care about it, they only satisfy the minimum or easily measurable requirement: is a piece of code documented?

## Chapter 13 — Comments Should Describe Things that Aren’t Obvious from the Code
### Pick conventions
1. Conventions serve two purposes:
    * They ensure consistency, which makes comments easier to read and understand.
    * They help to ensure that you actually write comments: constraints liberate, liberties constrain.
2. Most comments fall into one of the following categories:
    * **Interface**: a comment block that immediately precedes and describes a module such as a class, data structure, or method.
    * **Data structure member**: a comment next to the declaration of a field in a data structure, such as an instance variable or static variable for a class.
    * **Implementation comment**: a comment inside the code of a method, which describes how the code works internally.
    * **Cross-module comment**: a comment describing dependencies that cross module boundaries.

### Don’t repeat the code
1. A comment isn’t helpful if the information in it is already obvious from the code next to it. One example of this is when the comment uses the same words that make up the name of the thing it is describing.

### Lower-level comments add precision
1. Comments augment the code by providing information at a different level of detail.
2. Some comments provide information at a lower, more detailed, level than the code; these comments add precision by clarifying the exact meaning of the code.
3. Other comments provide information at a higher, more abstract, level than the code; these comments offer intuition, such as the reasoning behind the code, or a simpler and more abstract way of thinking about the code.
4. Comments at the same level as the code are likely to repeat the code.
5. When documenting a variable, think nouns, not verbs. In other words, focus on what the variable represents, not how it is manipulated.

### Interface documentation
1. Interface comments provide information that someone needs to know in order to use a class or method; they define the abstraction.
2. Implementation comments describe how a class or method works internally in order to implement the abstraction.
3. If interface comments must also describe the implementation, then the class or method is shallow.
4. Implementation documentation contaminates the interface.

### Implementation comments: what and why, not how
1. Most methods are so short and simple that they don’t need any implementation comments: given the code and the interface comments, it’s easy to figure out how a method works.
2. The main goal of implementation comments is to help readers understand what the code is doing (not how it does it).

### Notes
1. Some of the things the author said should be in comments can instead be in code:
    * A variable unit can be in its name.
    * Validation and information on method parameters can be in rich domain classes.
    * Variable names can be used for documentation — take the substring example, it can have `(startInclusive, endExclusive)` instead of `(start, end)` — the former doesn’t need extra documentation, the later does.
2. > “If your code is undergoing review and a reviewer tells you that something is not obvious, don’t argue with them; if a reader **thinks it’s not obvious, then it’s not obvious**”

   While this is usually true, it’s not always true. Also, “obvious” is subjective — you can make your code obvious for one person, and it becomes obscure to another.
3. Keep in mind people then to use unrelated words to describe a phenomenon. E.g: Conflating unfamiliarity with complexity.

## Chapter 14 — Choosing Names
1. Good names are a form of documentation:
    - They make code easier to understand.
    - They reduce the need for other documentation.
    - They make it easier to detect errors.
2. Names are a form of abstraction: they provide a simplified way of thinking about a more complex underlying entity.
3. Names should be precise: If a variable or method name is broad enough to refer to many different things, then it doesn’t convey much information to the developer and the underlying entity is more likely to be misused.
4. If it’s hard to find a simple name for a variable or method that creates a clear image of the underlying object, that’s a hint that the underlying object may not have a clean design.
5. Use names consistently: Consistent naming reduces cognitive load in much the same way as reusing a common class: once the reader has seen the name in one context, they can reuse their knowledge and instantly make assumptions when they see the name in a different context.

> “The greater the distance between a name’s declaration and its uses, the longer the name should be.” — Andrew Gerrand

## Chapter 15 — Write The Comments First
1. Use comments as part of the design process.
2. Delayed comments are [usually] bad comments.

### Notes
1. I’m a big fan of “documentation driven development”, so this chapter resonated with me.
2. On multiple occasions, I have simplified my designs or figured out better approaches by writing high-level documentation first.
3. However, the author seems to propose this like the TDD crowd proposes TDD. Sometimes clarity is obtained by first writing code. IMO, there is nothing wrong with “hacking code” locally — sometimes code is the best canvas.

## Chapter 16 — Modifying Existing Code
1. Ideally, when you have finished with each change, the system will have the structure it would have had if you had designed it from the start with that change in mind.
2. If you’re not making the design better, you are probably making it worse.
3. The best way to ensure that comments get updated is to position them close to the code they describe.
4. The farther a comment is from the code it describes, the more abstract it should be (this reduces the likelihood that the comment will be invalidated by code changes).
5. Comments belong in the code, not in the commit log.
6. Link to (external) resources, don’t duplicate them: It’s important that readers can easily find all the documentation needed to understand your code, but that doesn’t mean you have to write all of that documentation.

### Notes
1. Sometimes copying external resources into the docs is useful: the information can be displayed in a consistent & convenient fashion; and the copied information isn’t affected by dead links.

## Chapter 17 — Consistency
1. Consistency creates cognitive leverage: once you have learned how something is done in one place, you can use that knowledge to immediately understand other places that use the same approach.

## Chapter 18 — Code Should be Obvious
1. Software should be designed for ease of reading, not ease of writing.
2. If code is nonobvious, that usually means there is important information about the code that the reader does not have.
### Things that make code more obvious
1. Judicious use of white space.
2. Comments: Sometimes it isn’t possible to avoid code that is nonobvious. When this happens, it’s important to use comments to compensate by providing the missing information.

### Things that make code less obvious
1. Event-driven programming: Event-driven programming makes it hard to follow the flow of control.
2. Generic containers (like Pair in Java): Generic containers result in nonobvious code because the grouped elements have generic names that obscure their meaning.
3. Different types for declaration and allocation.
   ```java
   private List<Message> incomingMessageList;
   ...
   incomingMessageList = new ArrayList<Message>();
   ```
4. Code that violates reader expectations.

### Notes
1. Could the problem with event driven programming be solved with better tooling?
2. Obscurity might be eliminated if the objects in a generic container are rich domain objects.

## Chapter 19 — Software Trends
### Object-oriented programming and inheritance
1. Private methods and variables can be used to ensure information hiding.
2. The first form of inheritance is interface inheritance, in which a parent class defines the signatures for one or more methods, but does not implement the methods. Each subclass must implement the signatures.
3. Interface inheritance provides leverage against complexity by reusing the same interface for multiple purposes. It allows knowledge acquired in solving one problem (such as how to use an I/O interface to read and write disk files) to be used to solve other problems (such as communicating over a network socket).
4. The second form of inheritance is implementation inheritance. In this form, a parent class defines not only signatures for one or more methods, but also default implementations. Subclasses can choose to inherit the parent’s implementation of a method or override it by defining a new method with the same signature.
5. Implementation inheritance can reduce the amount of code that needs to be modified as the system evolves (i.e: the change amplification problem).
6. Implementation inheritance creates dependencies between the parent class and each of its subclasses.
7. Favor composition over implementation inheritance.

### Agile development
1. One of the most important elements of agile development is the notion that development should be incremental and iterative.
2. One of the risks of agile development is that it can lead to tactical programming.

### Unit tests
1. Tests facilitate refactoring.

### Test-driven development
1. The problems with test-driven development:
    - It focuses attention on getting specific features working, rather than finding the best design — this is tactical programming.
    - It's too incremental — at any point in time, it’s tempting to just hack in the next feature to make the next test pass.
2. Writing tests first makes the most sense when fixing bugs.

### Design patterns
1. A design pattern is a commonly used approach for solving a particular kind of problem.
2. The greatest risk with design patterns is over-application. Not every problem can be solved cleanly with an existing design pattern; don’t try to force a problem into a design pattern when a custom approach will be cleaner.
3. Using design patterns doesn’t automatically improve a software system; it only does so if the design patterns fit.
4. As with many ideas in software design, the notion that design patterns are good doesn’t necessarily mean that more design patterns are better.

### Getters and setters
1. The argument for getters and setters is that they allow additional functions to be performed while getting and setting.
2. Getters and setters are shallow methods (typically only a single line), so they add clutter to the class’s interface without providing much functionality.

### Notes
1. Modern languages like Kotlin eliminated the need for traditional getters/setters.
2. Poorly written tests or bad test infrastructure can actually hinder refactoring.

## Chapter 20 — Designing for Performance
1. Measure before modifying: allows you identify real performance issues and creates a baseline to compare your performance changes to.