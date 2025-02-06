# Out Of The Tar Pit — Paper Summary


Authors: Ben Moseley & Peter Mark

> Summary structure:
> 1. Comment blocks are used to add personal comments. These are usually clarifications, extra info, or guidance.
> 2. This summary includes all quotes and key points only. You can read the full paper [here](https://github.com/papers-we-love/papers-we-love/blob/master/design/out-of-the-tar-pit.pdf).
> 3. Unless otherwise stated, all claims are made by the authors.

## Abstract
> Complexity is the single major difficulty in the successful development of **large-scale** software systems.
> Following Brooks we distinguish **accidental** from **essential** complexity, but disagree with his premise that most complexity remaining in contemporary systems is essential.
> We identify common causes of complexity and discuss general approaches which can be taken to eliminate them where they are accidental.
> To make things more concrete we then give an outline for a potential complexity-minimizing approach based on **functional programming** and Codd’s **relational model** of data.

## 2. Complexity
1. > Comment: The authors didn't rigorously define complexity but implied that it's the degree of difficulty in understanding/maintaining software systems. Alas, "difficulty" is subjective.
2. According to the [No Silver Bullet paper](https://en.wikipedia.org/wiki/No_Silver_Bullet), four properties that make software construction hard are:
   - Complexity
   - Conformity
   - Changeability
   - Invisibility
3. Complexity is the most significant problem — the others are forms of complexity, or only problematic as a result of complexity.
   > **Complexity hinders understanding** — Being able to understand a system (like the effects of changes) is a prerequisite for avoiding problems.
4. > “...we have to keep it crisp, disentangled, and simple if we refuse to be crushed by the complexities of our own making...” - Dijkstra
5. > “The general problem with ambitious systems is complexity.”, “...it's important to emphasize the value of simplicity and elegance, for complexity has a way of compounding difficulties” — Corbato, 1990
6. > “there is a desperate need for a powerful methodology to help us
think about programs. ... conventional languages create unnecessary confusion in the way we think about programs” - Backus, 1977
6. > “...there is one quality that cannot be purchased... — and that is reliability. The price of reliability is the pursuit of the utmost simplicity” — Hoare, 1980
7. > “I conclude that there are two ways of constructing a software design: One way is to make it so simple that there are **obviously** no deficiencies and the other way is to make it so complicated that there are no **obvious** deficiencies. The first method is far more difficult.” - Hoare, 1980
8. **Simplicity is Hard**.

## 3. Approaches to Understanding Systems
1. There are two widely-used approaches to understanding systems (or system components):
   - **(Automated/Manual) Testing**: attempting to understand a system from the outside — as a “black box”. Conclusions about the system are drawn based on observations about how it behaves in certain specific situations.
   - **Informal reasoning**: Attempting to understand the system by examining it from the inside and building some mental model.
2. **Informal reasoning** is more important because:
   - It's always used, as it's an inherent part of the development process.
   - In an existing system, improvements in informal reasoning will lead to fewer errors being created while improvements in testing only lead to more errors being detected.
3. > “Those who want really reliable software will discover that they must find means of avoiding the majority of bugs to start with.” — Dijkstra
4. > “Our response to mistakes should be to look for ways that we can avoid making them, not to blame the nature of things.” — O'Keefe
5. The key problem with **testing** is that a test (of any kind) that uses one particular set of inputs tells you **nothing at all** about the behavior of the system when it is given a different set of inputs.
6. The huge number of different possible inputs usually rules out the possibility of testing them all, hence the unavoidable concern with testing will always be — `have you performed the right tests?`. The only certain answer you will ever get to this question is an answer in the **negative — when the system breaks**.
7. > “testing is hopelessly inadequate....(it) can be used very effectively to show the presence of bugs but never to show their absence.” - Dijkstra
8. **Informal reasoning** is limited in scope, imprecise, and hence prone to error.
9.  **Formal reasoning** is dependent upon the accuracy of a specification.
10. The bottom line is that all ways of attempting to understand a system have their limitations.
11. When considered next to testing and reasoning, simplicity is more important than either. Given a stark choice between investment in testing and investment in simplicity, the latter may often be the better choice because it will facilitate all future attempts of any kind to understand the system.

## 4. Causes of Complexity

### 4.1. State
1. State: mutable state — i.e. excluding (immutable) single-assignment variables which are provided by logic programming languages.
2. The presence of state makes programs hard to understand.
3. > “From the complexity comes the difficulty of enumerating, much less understanding, all the possible states of the program, and from that comes the unreliability” — Brook
4. > “computers. . . have very large numbers of states. This makes conceiving, describing, and testing them hard. Software systems have orders-of-magnitude more states than computers do.” — Brook
5. Arguably, the single biggest cause of complexity in most contemporary large systems is state, and the more we can do to limit and manage state, the better.
6. The number of possible states grows at an exponential rate — for every single bit of state that is added, the number of possible states doubles.
7. Stateful procedures can contaminate stateless procedures directly or indirectly.
   > “when you let the nose of the camel into the tent, the rest of him tends to follow”

#### 4.1.1. Impact of State on Testing
1. State affects all types of testing — from system-level to component-level testing.
2.  The key problem is that a test (of any kind) on a program that is in one particular state tells you **nothing at all** about the behavior of that program when it's in another state.
3.  The common approach to testing a stateful system:
    - Start it up such that it is in some kind of “clean”/“initial” (albeit mostly hidden) state
    - Perform the desired tests using the test inputs and then rely upon the (ill-founded) assumption that the system would perform the same way — `regardless of its hidden internal state` — every time the test is run with those inputs.
4.  This approach is pragmatic but ignores the problem of state.
5.  The reason for this approach is that there isn’t any alternative when testing a stateful system with a complicated internal hidden state.

#### 4.1.2 Impact of State on Informal Reasoning
1.  State hinders the developer who must attempt to reason (most commonly on an informal basis) about the expected behavior of the system.
2.  The mental processes which are used to do this informal reasoning often revolve around a case-by-case mental simulation of behavior.

### 4.2. Control
1. Control: the order in which things happen.
2. Most traditional programming languages force a concern with control — control is based on statements' order.
3. The difficulty is that when control is an implicit part of the language, then every single piece of the program must be understood in that context — even when the programmer may wish to say nothing about this.
4. When a programmer is forced (through the use of a language with implicit control flow) to specify the control, they are being forced to specify an aspect of `how` the system should work rather than simply `what` is desired. Effectively they are being forced to `over-specify` the problem.
5. Consider the pseudo-code example:
   ```
   a := b + 3
   c := d + 2
   e := f * 4
   ```

   The programmer is only interested in specifying a `relationship` between certain values but has been forced to say more than this by choosing an arbitrary control flow.
6. This forced order complicates informal reasoning — the person reading the code above must effectively duplicate the work of a compiler — they must (under the definition of the language semantics) start with the assumption that the ordering specified is significant, and then by further inspection determine that it's not.
7. The problem is not in the text of the program above — after all that does have to be written down in some order — it's solely in the semantics of the imperative language.
8. The second control-related problem is concurrency which affects:
    - Informal reasoning: `Shared-state concurrency` is the common concurrency model — where specification for explicit synchronization is provided. This further adds to the number of scenarios that must mentally be considered as the program is read.
    - Testing: result consistency cannot be assured when repeating tests on a system — even if a consistent starting state is ensured.

### 4.3. Code Volume
1. This cause is in many ways a secondary effect — much code is simply concerned with managing state or specifying control.
2. It's the easiest form of complexity to measure.
3. It interacts badly with the other causes of complexity.
4. > “Many of the classic problems of developing software products derive from this essential complexity and its nonlinear increase with size” — Brooks
5. This quote by Dijkstra highlights that if managed properly, code volume doesn't have to grow non-linearly with complexity:
   > “It has been suggested that there is some kind of law of nature telling us that the amount of intellectual effort needed grows with the square of program length. But, thank goodness, no one has been able to prove this law. And this is because it need not be true. . . . I tend to the assumption — up till now not disproved by experience — that by suitable application of our `powers of abstraction`, the intellectual effort needed to conceive or to understand a program need not grow more than proportional to program length.” — Dijkstra

### 4.4. Others
1. Other causes of complexity includes:
   - Duplicated code
   - Unnecessary abstraction
   - Missed abstraction
   - Poor modularity
   - Poor documentation
2. All these other causes come down to the following three (inter-related) principles:
   - **Complexity breeds complexity**: More complexity is introduced as a result of not being able to clearly understand a system. Duplication is a prime example of this — if it's not clear that a given functionality already exists, or it's too complex to understand whether what exists does exactly what is required, there will be a strong tendency to duplicate.
   - **Simplicity is Hard**: Simplicity needs to be sought and prized — because a significant amount of effort is required to achieve simplicity.
   - **Power corrupts**: the more powerful a language (i.e. the more that is possible within the language), the harder it is to understand systems constructed in it. E.g: Manual memory management (instead of garbage collection), stateful variables (instead of stateless variables), etc.

## 5. Classical approaches to managing complexity

### 5.1. Object-Orientation
1. It's an imperative style to programming.
2. It's the dominant method of general software development for traditional (von-Neumann) computers. Many of its characteristics spring from a desire to facilitate von-Neumann style (i.e. state-based) computation.

#### 5.1.1. State
1. An object is usually seen as consisting of some state together with a set of procedures for accessing and manipulating that state.
2. The above is referred to as encapsulation, and it allows the programmer to enforce integrity constraints over an object’s state by regulating access to that state through the access procedures (“methods”).
3. Problems:
   - Enforcing constraints when several procedures access or manipulate the same bit of state.
   - Encapsulation-based integrity constraint enforcement is strongly biased toward single-object constraints and it is awkward to enforce more complicated constraints involving multiple objects with this approach (where do such constraints reside?).

##### Identity and State
1. Each object is seen as being a uniquely identifiable entity regardless of its attributes. This is known as `intensional identity` (in contrast with `extensional identity` in which things are considered the same if their attributes are the same).
2. >"In a sense, `object identity` can be considered to be a rejection of the “relational algebra” view of the world in which two objects can only be distinguished through differing attributes." — Baker
3. Object identity makes sense when objects are used to provide a (mutable) stateful abstraction.
4. `Value Objects` are used in cases where mutability is not required. They attempt to de-emphasize the original concept of object identity and re-introduce extensional identity. This is usually done using access procedures to check equivalence in a domain-specific sense.
5. Risks with value objects:
   - (Usually) Extra code volume.
   - Such domain-specific equivalence might not conform to the standard idea of an equivalence relation — e.g: transitivity property.
   - Mentally switching between the two equivalence concepts.
6. OOP does not provide an adequate foundation for avoiding complexity (caused by state) — it relies on state (contained within objects) and in general all behavior is affected by this state.

#### 5.1.2. Control
1. Most OOP languages offer standard sequential control flow and explicit classical "shared-state concurrency" mechanisms.
2. Actor-style languages are an exception — they use "message-passing" model of concurrency — which can improve informal reasoning.

### 5.2. Functional Programming
1. It has its roots in the completely stateless lambda calculus of Church.
2. The untyped lambda calculus is equivalent in power to the standard stateful abstraction of computation — the Turing machine.

#### 5.2.1. State
1. Pure functional PL like Haskell shun state and side-effects completely.
2. Impure functional PL like ML advocates the avoidance of state and side-effects in general but permits their use.
3. The primary strength of systems written in a pure functional PL is the property of `referential transparency` — which implies that when supplied with a given set of arguments a function will always return the same result.
4. Testing & informal reasoning become more effective due to the lack of statefulness.

#### 5.2.2. Control
1. Most functional languages specify implicit (left-to-right) sequencing (of calculation of function arguments).
2. They have a slight edge in control because they encourage a more abstract use of control using functionals (such as `fold`/`map`) rather than explicit looping.
3. In a pure functional language, it will always be safe to evaluate all arguments to a function in parallel.

#### 5.2.3. Kinds of State
1. It's possible to achieve similar effects to mutable state by passing extra parameters to a function. E.g:
   Using mutable state:
   ```
   procedure int getNextCounter()
      // ’counter’ is declared and initialized elsewhere in the code
      counter := counter + 1
      return counter
   ```
   Using extra parameters:
   ```
   function (int, int) getNextCounter(int oldCounter)
      let int result = oldCounter + 1
      let int newCounter = oldCounter + 1
      return (newCounter, result)
   ```
2. There is in principle nothing to stop functional programs from passing a single extra parameter into and out of every single function in the entire system. If this extra parameter were a collection (compound value) of some kind then it could be used to simulate an arbitrarily large set of mutable variables. In effect this approach recreates a single pool of global variables — hence, even though referential transparency is maintained, ease of reasoning is lost.
3. Whatever the language being used — there are large benefits to be had from avoiding hidden, implicit, mutable states.

#### 5.2.4. State and Modularity
1. State permits a particular kind of modularity — within a stateful framework, it's possible to add state to any component without adjusting the components which invoke it. The same can't be said when working in a functional framework.
2. There is a fundamental trade-off between the two approaches.
3. The trade-off is between complexity (with the ability to take a shortcut when making some specific types of change) and simplicity (with huge improvements in both testing and reasoning).
4.  As with the discipline of static typing, it is trading a one-off up-front cost for continuing future gains and safety (“one-off” because each piece of code is written once but is read, reasoned about, and tested continuingly).
5. In a functional framework, you can always tell exactly what will control the outcome of a procedure simply by looking at the arguments supplied where it is invoked.

### 5.3. Logic Programming
1. Declarative style of programming emphasizes specifying what needs to be done rather than exactly how to do it.
2. Logic and functional programming are considered declarative.
3. Pure logic programming is done by stating a set of axioms that describe the problem and the attributes required of something for it to be considered a solution. The infrastructure uses these raw axioms to find/check solutions.


#### 5.3.1. State
1. Pure logic programming uses no mutable state — thus, it has the same benefits as pure functional programming.

#### 4.3.2. Control
1. In the ideal world of logic programming, there is no specified control.

## 6. Accidents and Essence
1. Brooks defined difficulties of “essence” as those inherent in the nature of software and classified the rest as “accidents”.
2. A similar definition is used here, but more strict and without considering software:
   - **Essential Complexity** is inherent in, and the essence of, the problem (as seen by the users).
   - **Accidental Complexity** is something non-essential that is present. It's complexity with which the development team would not have to deal with in the ideal world (e.g. complexity arising from performance issues and from suboptimal language and infrastructure).
3. > ... if there is any possible way that the team could produce a system that the users will consider correct without having to be concerned with a given type of complexity then that complexity is not essential.

## 7. Recommended General Approach
1. The main recommendations revolve around trying to avoid as much accidental complexity as possible.

### 7.1. Ideal World
1. In the ideal world we are not concerned with performance, and our language and infrastructure provide all the general support we desire.
2. Accidental state can be omitted in this ideal world, and the same applies to control.
3. `Informal requirements` gets converted directly to `Formal requirements`.
4. The sole concern when producing the formal requirements must be to ensure that there is no relevant ambiguity in the informal requirements (i.e. that it has no omissions).
5. The next step in the ideal world is to execute these formal requirements directly.
6. What is described in this section is the essence of declarative programming.

#### 7.1.1. State in the ideal world
1. We aim to eliminate state in the ideal world.
2. Accidental state means that it can be excluded from the ideal world (by re-deriving the data as required).
3. All data mentioned in the users’ informal requirements are of concern to the users, and is as such essential (data).
4. Essential data does not mean that it will correspond to essential state.

##### Types of data

###### Input Data
1. Data that is provided directly (input) will have to have been included in the informal requirements and as such is deemed essential. There are two cases:
   - There is (according to the requirements) a possibility that the system may be required to refer to the data in the future. The system must retain the data and it corresponds to `essential state`.
   - There is no such possibility. The data is not maintained as it's often used to cause a side-effect (eg: most click events).

###### Immutable Essential Derived Data
1. Data of this kind can always be re-derived (from the input data — i.e. from the essential state) whenever required.
2. We do not need to store it in the ideal world and it's an accidental state.
3. It's intended only for display.

###### Mutable Essential Derived Data
1. It's an accidental state and can be excluded like the immutable essential derived state.
2. Explicit reference is made within the requirements to the ability of users to update that data.
3. Mutability of derived data makes sense only where the function (logic) used to derive the data has an inverse (otherwise — given its mutability — the data cannot be considered derived on an ongoing basis, and it is effectively input). Modifications to the data can simply be treated identically to the corresponding modifications to the existing essential state.

###### Accidental Derived Data
1. State which is derived but not in the users’ requirements is also an accidental state. E.g: Caching an expensive computation (it's derived from the input and can be eliminated — because it's usually not part of the user's requirement).
2. It's an accidental state.

| Data essentiality | Data type | Data mutability | Classification |
|---|---|---|---|
| Essenital | Input | - | Essential state |
| Essenital | Derived | Immutable | Accidental state |
| Essenital | Derived | Mutable | Accidental state |
| Accidental | Derived | - | Accidental state |

#### 7.1.2. Control in the ideal world
1. Control generally can be completely omitted from the ideal world and as such is considered entirely accidental.
2. It typically won’t be mentioned in the informal requirements and hence should not appear in the formal requirements (because these are derived with no view to execution).
3. Clearly if the program is ever to run, some control will be needed somewhere — but this isn't our concern.
4. Typically the informal requirements will not mention concurrency, that too is normally of an accidental nature.

### 7.2. Theoretical and Practical Limitations
1. We examine assumptions made in `7.1` and see where they break down in the real world.
2. State is required simply because most systems do have some state as part of their true essence. Practical (e.g. efficiency) concerns will often dictate the use of some accidental state.
3. Control generally is accidental (the users normally are not concerned about it at all) but the ability to restrict and influence it is often required from a practical point of view.

#### 7.2.1. Formal Specification Languages
1. In the ideal world described above, we described executable "formal requirements" which can also be called executable "formal specification".
2. Formal specification categories:
   - **Property-based** approaches focus (in a declarative manner) on what is required rather than how the requirements should be achieved. These approaches include the algebraic (equational axiomatic semantics) approaches such as Larch and OBJ.
   - **Model-based (or State-based)** approaches construct a potential model for the system (often a stateful model) and specify how that model must behave. These approaches (which include Z and VDM) can hence be used to specify how a stateful, imperative language solution must behave to satisfy the requirements.
3. Primary problems of executable formal specification:
   - **Theoretical**:  consideration of specification languages highlights the (theoretically) fuzzy boundary between what is essential and what is accidental — specifically it challenges the validity of our definition of essential (which we identified closely with requirements from the users) by observing that it is possible to specify things which are not directly executable.
   - **Practical**: impractical for effciency reasons.

#### 7.2.3. Ease of Expression
1. There are occasionally situations where the ideal world approach (of having no accidental state, and using on-demand derivation) does not give rise to the most natural modeling of the problem.
2. An example of this would be the derived data representing the position state of a character in an interactive game — it's at all times derivable by a function of both all prior user movements, the initial starting positions, & time, but this is not the way it's most naturally expressed.

#### 7.2.3 Required Accidental Complexity
1. Specifically we can see that if we add in the accidental state which has to be managed explicitly by the logic of the system, then we become at risk of the possibility of the system entering an inconsistent state (or “bad state”) due to errors in that explicit logic.

### 7.3 Recommendations
1. Recommendations for dealing with complexity:
   - Avoid: avoid state and control where they are not absolutely and truly essential.
   - Separate: there will sometimes be complexity that either is truly essential (section 7.1.1) or, whilst not truly essential, is useful from a practical point of view (section 7.2.3). Such complexity must be separated out from the rest of the system.
2. > “Algorithm = Logic + Control” — Kowalski
3. > Comment: Because the authors claim that state is the prime cause of complexity, they use it interchangeably with complexity.

#### 7.3.1. Required Accidental Complexity
1. Most appropriate way of handling each identified reason for requiring accidental complexity:

##### Performance
1. Accidental complexity has risks when introduced in an undisciplined manner.
2. The recommendation here is that we completely avoid explicit management of the accidental state — instead, we should restrict ourselves to simply declaring what accidental state should be used, and leave it to a completely separate infrastructure (on which our system will eventually run) to maintain. This is reasonable because the infrastructure can make use of the (separate) system logic which specifies how accidental data must be derived. By doing this we eliminate any risk of state inconsistency.

##### Ease of Expression
1. In cases where it really is the only natural thing to do, we should pretend that the accidental state is really an essential state for the purposes of the separation discussed below. One straightforward way to do this is to make use of an external component that observes the derived data in question and creates the illusion of the user typing that same (derived, accidental) data back in as input data.

##### 7.3.2. Separation and the relationship between the components
1. Separation encompasses two things:
   - Separating out all complexity of any kind from the pure logic of the system (which — having nothing to do with either state or control — we’re not really considering part of the complexity). This could be referred to as the logic/state split (although of course state is just one aspect of complexity — albeit the main one).
   - Further dividing the complexity which we do retain into accidental and essential. This could be referred to as the accidental/essential split.

| Complexity | Type | Recommendation |
|---|---|---|---|
| Essential Logic | | Separate |
| Essential complexity | State | Separate |
| Accidental useful complexity | State / Control | Separate |
| Accidental useless complexity | State / Control | Avoid |

2. Control is not considered essential.
3. We advocate a split between the state and control components of the “useful” Accidental Complexity — but this distinction is less important than the others.
4. > “The logic component determines the meaning . . . whereas the control component only affects its efficiency” — Kowalski
5. Given that each separated component is of a different nature, different specific/restricted languages might be ideal for each.
6. The weaker the language, the more simple it is to reason about.
7. Each component can be reasoned about individually, which facilitates reasoning about the system as a whole.

![Figure 1](figure1.png)
Changes to a component depended upon might require changes to the dependent component, but not vice versa.
8. **Essential State**: This can be seen as the foundation of the system. The specification of the required state is completely self-contained.
9. **Essential Logic**: aka “business” logic. It does not say anything about how, when, or why the state might change dynamically.

## 8. The Relational Model
1. Four aspects of the relational model:
   - **Structure**: the use of relations as the means for representing all data.
   - **Manipulation**: a means to specify derived data.
   - **Integrity**: a means to specify certain inviolable restrictions on the data.
   - **Data Independence**: a clear separation is enforced between the logical data and its physical representation.
2. SQL (of any version) is not an accurate reflection of the relational model.

### 8.1. Structure
#### 8.1.1. Relations
1.  A relation is best seen as a homogeneous set of records, each record itself consisting of a heterogeneous set of uniquely named attributes.
2.  Relations can be of the following kinds:
    - **Base Relations** are those which are stored directly.
    - **Derived Relations** (also known as Views) are those which are defined in terms of other relations (base or derived).
3. It's useful to think of a relation as being a single (albeit compound) value, and to consider any mutable state not as a “mutable relation” but rather as a variable which at any time can contain a particular relation value. [Date](https://www.amazon.com/Introduction-Database-Systems-8th/dp/0321197844) calls these variables `relation variables` or `relvars`, leading to the terms base `relvar` and `derived relvar`, and we shall use this terminology later.

#### 8.1.2. Structuring benefits of Relations — Access path independence
1. The idea of structuring data using relations is appealing because no subjective, up-front decisions need to be made about the access paths that will later be used to query and process the data.
2. The two main data structuring approaches which preceded the relational model were both access path-dependent:
   - **Hierarchical model**:  a subjective choice would be forced early on as to whether departments would form the top-level (with each department “containing” its employees) or the other way round (with employees “containing” their departments). The choice made would impact all future use of the data. If the first alternative was selected, then users of the data would find it easy to retrieve all employees within a given department (following the access path), but they would find it harder to retrieve the department of a given employee.
   -  **Network model**: alleviated the problem to some degree by allowing multiple access paths between data instances (so the choice could be made to provide both an access path from department to employee and an access path from employee to department). Because it's impossible to predict all future required access paths, this can still lead to difficulty with new requirements.
3. Being access path independent was a primary reason the relational model dominated both.

### 8.2. Manipulation
1. Relational algebra was introduced by Codd as one of the mechanisms for expressing the manipulation aspects of the relational model.
2. Relational algebra consists of the following eight operations:
   - **Restrict** is a unary operation that allows the selection of a subset of the records in a relation according to some desired criteria.
   - **Project** is a unary operation that creates a new relation corresponding to the old relation with various attributes removed from the records.
   - **Product** is a binary operation corresponding to the cartesian product of mathematics.
   - **Union** is a binary operation that creates a relation consisting of all records in either argument relation.
   - **Intersection** is a binary operation that creates a relation consisting of all records in both argument relations.
   - **Difference** is a binary operation that creates a relation consisting of all records in the first but not the second argument relation.
   - **Join** is a binary operation that constructs all possible records that result from matching identical attributes of the records of the argument relations.
   - **Divide** is a ternary operation that returns all records of the first argument which occur in the second argument associated with each record of the third argument.

### 8.3. Integrity
1. Integrity in the relational model is maintained simply by specifying — in a purely declarative way — a set of constraints that must hold at all times.

### 8.4. Data Independence
1. Data independence is the principle of separating the logical model from the physical storage representation.

## 9. Functional Relational Programming
1. In FRP all essential state takes the form of relations, and the essential logic is expressed using relational algebra extended with (pure) user-defined functions.

![Figure 2](figure2.png)

### 9.1. Architecture
1. **Essential State**: A Relational definition of the stateful components of the system
2. **Essential Logic**: Derived-relation definitions, integrity constraints and (pure) functions
3. **Accidental State & Control**: A declarative specification of a set of performance optimizations for the system
4. **Other** A specification of the required interfaces to the outside world (user and system interfaces)

#### 9.1.1. Essential State (“State”)
1. FRP strongly encourages that data be treated as an essential state only when it has been input directly by a user or external system.
2. It consists solely of a specification of the essential state for the system in terms of base relvars (in FRP all state is stored solely in terms of relations).
3. Specifically it's the names and types of the base relvars that are specified here, not their actual contents.

#### 9.1.2. Essential Logic (“Behaviour”)
1. The essential logic comprises both functional and algebraic (relational) parts.
2. The main (in the sense that it provides the overall structure for the component) part is the relational one and consists of derived-relvar names and definitions. These definitions consist of applications of the relational algebra operators to other relvars (both derived relvars and the base relvars which make up the essential state).
3. In addition to relational algebra, the definitions can make use of an arbitrary set of pure user-defined functions which make up the functional part of the essential logic.
4. Finally (in accordance with the standard relational model) the logic specifies a set of integrity constraints — boolean expressions which must hold at all times. (These can include everything from simple foreign key constraints to complicated multiple-relvar requirements making use of user-defined functions).

#### 9.1.3 Accidental State and Control (“Performance”)
1. This component fundamentally consists of a series of isolated (in the sense that they cannot refer to each other in any way) performance “hints”. These hints — which should be declarative in nature — are intended to provide guidance to the infrastructure responsible for running the FRP system.
2. On the state side, this component is concerned with both the accidental state itself and accidental aspects of the state.
3. Firstly, it provides a means to specify what state (of the accidental variety) should exist (eg: a hint that a derived-relvar should be stored instead of continually recalculated).
4. Secondly it provides (if desired) a means to specify what physical storage mechanisms should be used for storing state (of both kinds) — i.e. the accidental aspects of storage (eg: a hint to store an infrequently used state separately).
5. On the control side, recommendations for parallel evaluation of derived relvars might be given. Also, declarative hints could be given about whether the derived relvars should be computed eagerly (as soon as the essential state changes), lazily (when the infrastructure is forced to provide them).


#### 9.1.4. Other (Interfacing with the outside world)
##### Feeders
1. Feeders are components that convert input into relational assignments — i.e. cause changes to the essential state.

##### Observers
1. Observers are components that generate output in response to changes which they observe in the values of the (derived) relvars.
2. At a minimum, observers will only need to specify the name of the relvar which they wish to observe.

#### 9.1.5. Infrastructure
1. The FRP system is the specification — comprising of the four components above, the infrastructure is what is needed to execute this specification.
2. The different components of an FRP system lead to different requirements on the infrastructure which is going to support them.

##### Infrastructure for Essential State
1. Some means of storing and retrieving data in the form of relations assigned to named relvars.
2. A state manipulation language that allows the stored relvars to be updated (within the bounds of the integrity constraints).
3. Optionally secondary (e.g. disk-based) storage in addition to the primary (in-memory) storage.
4. A base set of generally useful types (typically an integer, boolean, string, date, etc).

##### Infrastructure for Essential Logic
1. A means to evaluate relational expressions.
2. A base set of generally useful functions (for things such as basic arithmetic etc).
3. A language to allow specification (and evaluation) of the user-defined functions in the FRP system. (It does not have to be a functional language, but the infrastructure must only allow it to be used in a functional way).
4. optionally a means of type inference (this will also require a mechanism for declaring the types of the user-defined functions in the FRP system)
5. A means to express and enforce integrity constraints.

##### Infrastructure for Accidental State and Control
1. A means to specify which derived relvars should actually be stored, along with the ability to store such relvars and ensure that the stored values are accurately up-to-date at all times.
2. A flexible means to specify physical storage mechanisms to be used by a relvar. This is a vital part of the infrastructure — without it, the infrastructure must store relvars in a way that closely mirrors their logical (essential) definitions, and that inevitably leads to accidental (performance) concerns corrupting the essential parts of the system. Specifically, procedures such as normalization or “de-normalization” at the logical (essential) level should have no intrinsic performance implications because of the presence of this mechanism.

##### Infrastructure for Feeders
1. The minimum requirement on the infrastructure is for it to be able to process relational assignment commands (containing complete new relation values) and reject them if necessary.
2. Practical extensions that could be useful include the ability to accept commands which specify new relvar values in terms of their previous values — typically in the form of INSERT / UPDATE / DELETE commands.

##### Infrastructure for Observers
1. The minimum requirement on the infrastructure is for it to be able to supply the new value of a relvar whenever it changes.
2. Practical extensions that could be useful are the ability to provide deltas, throttling, and coalescing capabilities (if the observers are viewed as live query handlers, then these extensions represent potential query meta-data).
3. Finally, the ability to access arbitrary historical relvar values would obviously be a useful extension in some scenarios.

### 9.2. Benefits of this approach
1. FRP follows the guidelines of `avoid` and `separate` as recommended in section 7 and hence gains all the benefits we derive from that.

#### 9.2.1. Benefits for  Data Abstraction
1. By data abstraction we basically mean the creation of compound data types and the use of the corresponding compound values (whose internal contents are hidden).
2. Un-needed data abstraction actually represents another common (and serious) cause of complexity. This is for two reasons:
   - **Subjectivity**: The grouping of data items together into larger compound data abstractions is inherently subjective. Groupings that make sense for one purpose will inevitably differ from those most natural for other uses, yet the presence of pre-existing data abstractions all too easily leads to inappropriate reuse.
   - **Data Hiding**: Secondly, large and heavily structured data abstractions can seriously erode the benefits of referential transparency. This problem occurs both because data abstractions will often cause un-needed, irrelevant data to be supplied to a function, and because the data which does get used (and hence influences the result of a function) is hidden at the function call site.
3. One of the primary strengths of the relational model (inherited by FRP) is that it involves only minimal commitment to any subjective groupings (basically just the structure chosen for the base relations), and this commitment has only minimal impact on the rest of the system. Derived relvars offer a straightforward way for different (application-specific) groupings to be used alongside the base groupings. The benefits in terms of subjectivity are closely related to the benefits of access path independence.
4. FRP also offers benefits in the area of data hiding, simply by discouraging it.

### 9.3. Types
1. FRP provides a limited ability to define new user types for use in the essential state and essential logic components.
2. Specifically it permits the creation of disjoint union types (sometimes known as “enumeration” types) but does not permit the creation of new product types (types with multiple subsidiary components). This is because (as mentioned above) we have a strong desire to avoid any unnecessary data abstraction.

## 10. Example of an FRP system
1. A simple real-estate project is used to demonstrate the FRP approach.

> The example can be found in the [paper](https://github.com/papers-we-love/papers-we-love/blob/master/design/out-of-the-tar-pit.pdf).