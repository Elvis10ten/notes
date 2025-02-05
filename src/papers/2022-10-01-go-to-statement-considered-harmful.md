#Go To Statement Considered Harmful — Paper Summary


Author: Edsger W. Dijkstra

Date: 1968

Link: [PDF](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf) 

-----

1. GOTO performs a **one-way transfer** of control to another line of code; in contrast a  [function call](https://en.m.wikipedia.org/wiki/Subroutine)  normally returns control.
2. Dijkstra argued that unrestricted GOTO statements should be abolished from higher-level languages because they complicated the task of analyzing and verifying the correctness of programs.
3. A process runs on a machine and is directed by a program written by a programmer.
4. It’s this process that in its dynamic behavior has to satisfy the desired specifications.
5. Our intellectual powers are rather geared to master static relations and that our powers to visualize processes evolving in time are relatively poorly developed.
6. > For that reason we should do (as wise programmers aware of our limitations) our utmost to shorten the conceptual gap between the static program and the dynamic process, to make the correspondence between the program (spread out in text space) and the process (spread out in time) as trivial as possible.
7. Consider how we can characterize the progress of a process:
    * If the program text is a pure concatenation of assignment statements, it‘a sufficient to point in the program text to a point (textual index) between two successive statements.
    * When conditionals are included, the progress of the process is still characterized by a single textual index.
    * When procedures or looping is included, a single textual index is insufficient. Dynamic indices are needed to track the procedure call stack or the loop iteration count.
9. The value of a variable can only be interpreted with respect to the progress of the process.
10. The unbridled use of the GOTO statement has an immediate consequence that it becomes terribly hard to find a meaningful set of coordinates in which to describe the process progress.
11. The author concludes with:
> The GOTO statement as it stands is just too primitive; it is too much an invitation to make a mess of one's program.  