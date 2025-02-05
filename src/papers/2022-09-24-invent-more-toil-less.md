#Invent More, Toil Less — Paper Summary


Today's summary is about a  [paper](https://www.usenix.org/system/files/login/articles/login_fall16_08_beyer.pdf)  written by four Google employees in 2016.

-----

1. Toil is the kind of work tied to running a production service that tends to be:
    * Manual
    * Repetitive
    * Automatable and not requiring human judgment
    * Interrupt-­driven and reactive
    * Of no enduring value
2. Work with enduring value leaves a service permanently better, whereas toil is “running fast to stay in the same place.” 
3. Google top sources of toil:
    * Interrupts (non­-urgent service­ related messages and emails).
    * On­call (urgent) responses
    * Releases and pushes
4. Toil is ONLY invariantly bad in large amounts because it can lead to career stagnation and low morale.
5. SRE engineering work tends to fall into two categories:
    * **Software engineering**: Involves writing or modifying code, in addition to any associated design and documentation work.
    * **Systems engineering**: Involves configuring production systems, modifying configurations, or documenting systems in a way that produces lasting improvements from a one-­time effort.
6. The paper briefly outlined how the BigTable team was able to minimize toil around 2014. This involved:
    * Incremental progress in automation.
    * Sacrificing short-term goals for long-term goals. E.g: In the short term, they said “no” to some support requests and encouraged people to evaluate the merits of a request before requesting.
    > In the long run, customers value a reliable, predictable interface offered by a healthy team more than they value a request queue that processes any and every request, be it standard or an unconventional one­off, in an **inde­terminate amount of time**.

## Best Practices for Reducing Toil
1. **Buy-in is key**: To tackle toil in a meaningful way, management must support the idea that toil reduction is a worthwhile goal.
2. **Minimize Unique Requirements**
> Using the “pets vs. cattle” analogy discussed in a [2013 UK Register article](http://www.theregister.co.uk/2013/03/18 /servers_pets_or_cattle_cern/), your systems should be automated, easily interchangeable, replaceable, and low­ maintenance (cattle); they should not have unique requirements for human care and atten­tion (pets).  
3. **Invest in Build/Test/Release Infrastructure Early**: Standardization and automation pay off in the long run.
4. **Audit Your Monitoring Regularly**: Establish a regular feedback loop to evaluate signal versus noise in your monitoring setup. 
5. **Conduct Postmortems**: Docs should be blameless and actionable.
6. **No Haunted Graveyards**: Companies usually have parts of the code that are deemed “too risky to change”. The goal is to control trouble, not to avoid it at all costs.

> Any team tasked with operational work will necessarily be burdened with some degree of toil.  
>   
> While toil can never be com­pletely eliminated, it can and should be thoughtfully mitigated to ensure the long­-term health of the team responsible for this work.  
>   
> When operational work is left unchecked, it naturally grows over time to consume 100% of a team’s resources.  
>   
> Engi­neers and teams performing an SRE or DevOps role owe it to themselves to focus relentlessly on reducing toil — not as a luxury, but as a necessity for survival.