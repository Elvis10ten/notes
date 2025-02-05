#The Emperor's Old Clothes — Paper Summary


Author: Charles Antony Richard Hoare
Date: 1981
Link: [PDF](https://dl.acm.org/doi/pdf/10.1145/358549.358561)

-----

1. The author recounts his experiences in the implementation, design, and standardization of computer programming languages, and issues a warning for the future.
2. > Failures are much more fun to hear about afterwards; they are not so funny at the time.
3. > I have regarded it as the highest goal of programming language design to enable good ideas to be elegantly expressed.

4. > If as a result of care taken in implementation the available hardware remains more powerful than may seem necessary for a particular application, the applications programmer can nearly always take advantage of the extra capacity to increase the quality of his program, its simplicity, its ruggedness, and its reliability.
5. Redundancy in a programming language can be a good protection against expensive coding errors. An example is the story of the Mariner space rocket to Venus, lost because of the lack of compulsory declarations in FORTRAN.
6. > […] I was eventually persuaded of the need to design programming notations so as to maximise the number of errors which cannot be made, or if made, can be reliably detected at compile time
7. > […] You know, you shouldn't trust us intelligent programmers. We can think up such good arguments for convincing ourselves and each other of the utterly absurd.
8. “You let your programmers do things which you yourself do not understand.” — A feedback given to the author about why a project he lead and managed had failed.
9. > There are two ways of constructing a software design: One way is to make it so simple that there are **obviously no deficiencies** and the other way is to make it so complicated that there are **no obvious deficiencies**.
> The first method is far more difficult. It demands the same skill, devotion, insight, and even inspiration as the discovery of the simple physical laws which underlie the complex phenomena of nature. It also requires a willingness to accept objectives which are limited by physical, logical, and technological constraints, and to accept a compromise when conflicting objectives cannot be met. No committee will ever do this until it is too late.  
9. > […] If our basic tool, the language in which we design and code our programs, is also complicated, the language itself becomes part of the problem rather than part of its solution.
10. > […] At first I hoped that such a technically unsound project would collapse but I soon realized it was doomed to success. Almost anything in software can be implemented, sold, and even used given enough determination. There is nothing a mere scientist can say that will stand against the flood of a hundred million dollars. But there is one quality that cannot be purchased in this way — and that is **reliability**. The **price of reliability is the pursuit of the utmost simplicity**. It is a price which the very rich find most hard to pay.
11. > If you want a language with no subsets, you must make it small.
12. The author concludes with:
> To have our best advice ignored is the common fate of all who take on the role of consultant, ever since Cassandra pointed out the dangers of bringing a wooden horse within the walls of Troy.  