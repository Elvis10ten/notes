#Reflections on Trusting Trust — Paper Summary


Author: Ken Thompson

Date: 1984

Link: [PDF](https://users.ece.cmu.edu/~ganger/712.fall02/papers/p761-thompson.pdf)

-----

> To what extent should one trust a statement that a program is free of Trojan horses? Perhaps it is more important to trust the people who wrote the software.  

1. Third party code cannot be trusted.
2. No amount of source-level verification or scrutiny can protect against using untrusted code. 
3. Ken shows this with a Trojan horse:
    * He modified the C compiler so that it inserts a back door when it compiles the `login` program.
    * And when the C compiler compiles the C compiler, it will insert the code that inserts the code into both the login program and the C compiler. [See [Quine](https://en.wikipedia.org/wiki/Quine_(computing))].
    * When the infected compiler binary is used to produce a new version of the compiler from the source, it will insert the back-door code into the new version.
    * This works because of the chicken and egg problem: The C compiler is written in C, thus you need a C compiler binary to create future versions of the C compiler.
    * If the base compiler binary is infected, any source code analysis would yield no joy. This is because the infection can be deleted from the compiler source code — it only needs to exist in the compiler binary.
5. When the paper was published, compiling source code in the Unix world was commonplace. However in today’s world, making changes to the compiler source code feels overkill when you can infect binaries directly (in the software supply chain).

```c
compile (code)
{
  /* If the code we're compiling is code for the Unix login command */
  if (match (code, login_code_pattern))
  {
    compile (backdoor);
    return;
  }

  /* If the code we're compiling is similar to the compiler source code */
  if (match (code, compiler_code_pattern))
  {
    compile (compiler_code_with_both_if_statements_inserted);
    return;
  }

  else
  {
    /* Do regular compilation things */
    ...
  }
}
```
— [Malicious compiler code](https://mananshah99.github.io/blog/2020/07/01/trusting-trust/)