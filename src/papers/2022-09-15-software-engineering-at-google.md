#Software Engineering at Google — Paper Summary


Today's summary is about a [paper](https://arxiv.org/pdf/1702.01715.pdf) written by Fergus Henderson in 2017.

> The aim of this paper is to catalogue and briefly describe Google’s key software engineering practices.  

Note: In the summary, I skipped lots of items that I found fairly obvious and now widely practiced in the industry (at least from my experience).

-----

## Software development
1. **The source repository**:
    * A single unified source-code repository contains most of Google’s projects.
    * As of January 2015, this 86 terabyte repository contained a billion files with a history of 35 million commits.
    * Write access to the repository is controlled: only the listed owners of each subtree of the repository can approve changes to that subtree.
    * Almost all development occurs at the “head” of the repository.
2. **The build system**:
    * Google uses a distributed build system known as Blaze.
    * Builds are run and cached in the cloud.
    * Processes and commands are mostly the same across projects to allow developers to easily go from one to another.
3. **Code Review**
    * Google has built excellent web-based code review tools.
    * All changes to the main source code repository must be reviewed by at least one other engineer.
    * Engineers are encouraged to keep each individual change small.
4. **Release engineering**
    * Releases are done frequently for most software; weekly or fortnightly releases are a common goal, and some teams even release daily.
    * This is made possible by automating most of the normal release engineering tasks.
5. **Frequent rewrites**
    * Most software at Google gets rewritten every few years.
    * Rewriting code cuts away all the unnecessary accumulated complexity that was addressing requirements which are no longer so important.
    * Rewriting code is a way of transferring knowledge and a sense of ownership to newer team members, which can help with (long term) productivity.

## Project management
1. **20% time**
    * Engineers are permitted to spend up to 20% of their time working on any project of their choice, without needing approval from their manager.
    * It provides management with visibility into activity that might otherwise be hidden. In other companies that don’t have an official policy of allowing 20% time, engineers sometimes work on “skunkwork” projects without informing management.
2. **Objectives and Key Results (OKRs)**
    * Individuals and teams at Google are required to explicitly document their goals and to assess their progress towards these goals.

## People management
1. **Roles**
    * Engineering manager:
        * Engineering managers do not necessarily lead projects; projects are led by a tech lead, who can be an engineering manager, but who is more often a software engineer.
        * Managers are responsible for selecting tech leads, and for the performance of their teams.
    * Software Engineer (SWE)
        * Google has separate career progression sequences for engineering and management.
    * Research Scientist
    * Site Reliability Engineer (SRE)
    * Product managers:
        > Product managers are responsible for the management of a product; as advocates for the product users, they coordinate the work of software engineers, evangelizing features of importance to those users, coordinating with other teams, tracking bugs and schedules, and ensuring that everything needed is in place to produce a high quality product.
    * Program Manager / Technical Program Manager (TPM)
        > Program managers have a role that is broadly similar to product manager, but rather than managing a product, they manage projects, processes, or operations (e.g. data collection). Technical program managers are similar, but also require specific technical expertise relating to their work, e.g. linguistics for dealing with speech data.

> The ratio of Software Engineers to Product Managers and Program Managers varies across the organization, but is generally high, e.g. in the range 4:1 to 30:1.