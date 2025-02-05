#On the Criteria To Be Used in Decomposing Systems into Modules — Paper Summary


Author: D.L. Parnas
Date: 1971
Link: [PDF](https://www.win.tue.nl/~wstomv/edu/2ip30/references/criteria_for_modularization.pdf)

-----

1. This paper discusses modularization as a mechanism for improving the flexibility and comprehensibility of a system while allowing the shortening of its development time.
2. The effectiveness of a "modularization" is dependent upon the criteria used in dividing the system into modules.
3. Point (2) buttresses the idea that it’s not about having “small” modules — however a module size is measured.
4. Expected benefits of modular programming:
    * Managerial — development time should be shortened because separate groups would work on each module with little need for communication.
    * Product flexibility — it should be possible to make drastic changes to one module without a need to change others.
    * Comprehensibility — it should be possible to study the system one module at a time with the result that the whole system could be better designed because it was better understood.
4. The author shows two ways to decompose an example software project.
    * **First strategy**:
        * In the first decomposition the criterion used was to make each major step in the processing a module.
        * This is the most common approach to decomposition or modularization.
    * **Second strategy**:
        * The second decomposition was made using 'fin- formation hiding" [4] as a criterion.
        * Every module in the second decomposition is characterized by its knowledge of a design decision which it hides from all others.
5. The order in time in which processing is expected to take place should not be used in making the decomposition into modules.
6. Hierarchical structure and "clean" decomposition are two desirable but independent properties of a system structure.
7. The author concludes with:
> We have tried to demonstrate by these examples that it is **almost always incorrect to begin the decomposition of a system into modules based on a flowchart**. We propose instead that one begins with a list of difficult design decisions or design decisions that are likely to change. Each module is then designed to hide such a decision from the others. 