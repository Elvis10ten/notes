#A lightweight design for serverless Function-as-a- Service — Paper Summary


Authors: Ju Long, Hung-Ying Tai, Shen-Ta Hsieh, and Michael Juntao Yuan.

Date: 2020

Link: [PDF](https://arxiv.org/pdf/2010.07115v1.pdf)

-----

1. The authors demonstrate that lightweight high-level runtimes, such as **WebAssembly**, could offer performance and scaling advantages over existing solutions, and could enable finely-grained pay-as-you-use business models.
2. **Serverless computing** is an approach to building and deploying cloud services without having to manage servers. The key characteristics include:
    * Resource elasticity
    * Zero ops, and
    * Pay-as-you-use.
2. FaaS (Function as a Service) allows developers to upload and execute code in the cloud without managing servers.
3. Compared with system VMs, application containers like Docker are faster and lighter, but less secure.
4. FaaS offerings from leading public cloud providers are based on system microVM or application container technologies such as **Firecracker** or **Docker**. This is because serverless FaaS must provide a secure and isolated execution environment for user-submitted and untrusted code.
5. FaaS performance and scalability issues:
    * **Slow cold start**: To provision and start a microVM or container could take seconds.
    * **Large footprint**: The VM or container must set up a runtime software stack, including operating system-specific standard libraries, for every function call.
    * **Coarse-grained billing**: The current generation of FaaS solutions uses coarse resource consumption metrics like allocated memory and execution time. 
6. > WebAssembly functions can run securely and in isolation. Those functions can be started and stopped on-demand across different underlying platforms without any code change. Since WebAssembly provides abstractions at the opcode level, it can precisely measure finely-grained resource consumptions at runtime.
7. Performance evaluation: The authors ran benchmarks between Docker and WebAssembly. The conclusions were:
    * WebAssembly runtimes are 1/10 of the size of full Docker images for FaaS.
    * WebAssembly cold starts are at least 10x faster than Docker.
    * WebAssembly runtimes are at least 10x faster than Docker.
8. The authors conclude with:
> WebAssembly tooling and runtimes optimized for cloud servers, are the main hurdles the industry must overcome to see wide adoption of this technology. Developers probably need to rewrite part of their applications in C/C++ or Rust to take advantage of WebAssembly FaaS today.