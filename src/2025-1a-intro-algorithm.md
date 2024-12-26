# [WIP] Introduction to Algorithms

## Chapter 1: The Role of Algorithms in Computing

A <mark>computational problem</mark> is a specification of a desired input-output relationship. e.g.

> **Computational problem**: Sorting
>
> **Input**: A sequence of $n$ values ($a_1$, ..., $a_n$).
>
> **Output**: A permutation (reordering) of the input such that $a'_1 \leq a'_2$ ... $a'_{n-1} \leq a'_n$.


## Chapter 2: Getting Started

### Loop invariants
A loop invariant is a property or condition that holds true before and after every iteration of a loop. It is a useful tool for understanding the correctness of an algorithm.

It consists of three parts:
1. **Initialization**: Prove that the invariant is true <mark>before the first iteration</mark>.
2. **Maintenance**: Prove that if the invariant is true before an iteration, it remains true <mark>before the next iteration</mark>.
3. **Termination**: At the end of the loop, the <mark>invariant along with the termination condition should imply the correctness of the algorithm</mark>.

### Insertion Sort
Insertion sort is a sorting algorithm that builds the final sorted array one item at a time.
At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.
It repeats until no input elements remain.

![Insertion Sort](/docs/assets/introduction-to-algorithms-images/insertion_sort.gif)

```rust
fn insertion_sort(mut input: Vec<i32>) -> Vec<i32> {
    for i in 1..input.len() {
        let current = input[i];
        let mut j = i;

        while j > 0 && input[j - 1] > current {
            input[j] = input[j - 1];
            j -= 1;
        }

        input[j] = current;
    }

    input
}
```

Correctness of the insertion sort algorithm can be proven using loop invariants:

> At the start of each iteration, the sub-array `input[0:i-1]` contains the same elements as the original sub-array `input[0:i-1]`, but in sorted order.
> 
> **Proof**:
> 
> * Initialization: Before the first iteration, $i = 1$. The sub-array `input[0..i-1]` (an empty subarray) is trivially sorted.
> * Maintenance: The body of the for loop works by moving the elements in `input[i - 1]`, `input[i - 2]`, `input[i - 3]`, ..., `input[0]` that are greater than `input[i]` one position to the right. This makes space for `input[i]` to be inserted in the correct position. 
> The `i` variable is incremented and the sub-array `input[0..i-1]` is still sorted.
> * Termination: The loop terminates when `i = n`. At this point, the sub-array `input[0..n-1]` is sorted and the algorithm has finished.

Exercises:
#### 2.1-1
[31, 41, 59, 26, 41, 58] (i = 1, current = 41, j = 1)

[31, 41, 59, 26, 41, 58] (i = 2, current = 59, j = 2)

[31, 41, 59, 26, 41, 58] (i = 3, current = 26, j = 3)
[31, 41, 59, 59, 41, 58] (i = 3, current = 26, j = 2)
[31, 41, 41, 59, 41, 58] (i = 3, current = 26, j = 1)
[31, 31, 41, 59, 41, 58] (i = 3, current = 26, j = 0)
[26, 31, 41, 59, 41, 58] (i = 3, current = 26, j = 0)

[26, 31, 41, 59, 41, 58] (i = 4, current = 41, j = 4)
[26, 31, 41, 59, 59, 58] (i = 4, current = 41, j = 3)
[26, 31, 41, 41, 59, 58] (i = 4, current = 41, j = 2)

[26, 31, 41, 41, 59, 58] (i = 5, current = 58, j = 5)
[26, 31, 41, 41, 59, 59] (i = 5, current = 58, j = 4)
[26, 31, 41, 41, 58, 59] (i = 5, current = 58, j = 4)

#### 2.1-2
Loop invariant: At the start of each iteration, the `sum` variable holds the sum of the first `i-1` elements of the array.

**Proof**:
* **Initialization**: Before the first iteration, `i = 0`. The sum of all elements in `input[0..(i-1)]` is trivially zero because that sub-array contains no elements.
* **Maintenance**: The body of the for loop adds `input[i]` to the `sum`. The `i` variable is incremented and the `sum` is still the sum of all elements in `input[0..(i-1)]`.
* **Termination**: When the loop terminates, `i = n`. `sum` is the sum of all elements in `input[0..(i-1)]` which equals `input[0..(n-1)]`, which is all the elements in `input`.

#### 2.1-3
```rust
fn insertion_sort_desc(mut input: Vec<i32>) -> Vec<i32> {
    for i in 1..input.len() {
        let current = input[i];
        let mut j = i;

        while j > 0 && input[j - 1] < current {
            input[j] = input[j - 1];
            j -= 1;
        }

        input[j] = current;
    }

    input
}
```

#### 2.1-4
```rust
fn linear_search(input: Vec<i32>, needle: i32) -> Option<usize> {
    let mut result = Option::None;

    for i in 0..input.len() {
        let number = input[i];

        if number == needle {
            result = Option::Some(i);
            break;
        }
    }

    result
}
```

Loop invariant: At the start of each iteration, the `result` variable holds any element in `input[0..(i-1)]` that equals `needle` (or empty if none matches).

**Proof**:

* **Initialization**: Before the first iteration, `i = 0`. There are no elements in `input[0..(i-1)]`, hence, `result` is empty.
* **Maintenance**: The body of the for loop sets `result` equal to `input[i]` if `input[i]` equals `needle`. The `i` variable is incremented and the `result` variable holds any element in `input[0..(i-1)]` that equals `needle`
* **Termination**: The loop terminates when `i = n` or when a match is found. In either, case the `result` variable holds any element in `input[0..(i-1)]` that equals `needle` (or empty if none matches).

#### 2.1-5
```rust
fn add_binary_integers(a: Vec<u8>, b: Vec<u8>) -> Vec<u8> {
    if (a.len() != b.len()) {
        panic!("Both a and b must have the same length")
    }

    let mut result = vec![0; a.len() + 1];
    let mut overflow: u8 = 0;

    for i in (0..a.len()).rev() {
        let bit_sum = a[i] + b[i] + overflow;
        result[i+1] = bit_sum % 2;
        overflow = if bit_sum >= 2 { 1 } else { 0 }
    }

    result[0] = overflow;
    result
}
```

### Analyzing algorithms
Analyzing an algorithm has come to mean predicting the resources that the algorithm requires. Resources include (but not limited to):
* Computational time
* Memory
* Communication bandwidth
* Energy consumption

To analyze algorithms, we need a model of the machine that it runs on, including the resources of that machine and
a way to express their costs.

A common model is the **random-access machine (RAM)**, which is a one-processor machine with the following properties:
* Instructions execute one after the other.
* Each primitive instruction takes a constant amount of time.
* Primitive instructions include:
  * Arithmetic operations,
  * Data access (i.e. reading or writing to memory)
  * Control operations (e.g. conditional and unconditional branch, subroutine call). Note: Calling a subroutine takes constant time,
    whereas executing the subroutine might not.

While simple, the RAM-model analyses are usually excellent predictors of performance on actual machines.

---

One way to analyze an algorithm is to run it on a particular computer given a specific input.
However, the result of this type of analysis depends on variables that are not inherent to the algorithm like computer type, current resource utilization, etc.
Hence, you can't simply extrapolate this data and use it to compare different algorithms generally.

---

A better form of analysis inspects features that are inherent to the algorithm and its input:
* The **running time** of an algorithm on a particular input is the number of primitive instructions executed on the RAM.
* An instruction that takes $c_k$ steps to execute and that executes $m$ times contributes $m \cdot c_k$ to the total running time.  
* The running time of an algorithm is a function of its input.
* There are many features of the input that can affect an algorithm's running time. It's typical to only consider the **input size** due to its dominant effect.
* The best notion for **input size** depends on the problem being studied:
  * For problems like searching or sorting, the natural measure is the number of items in the input.
  * For problems like multiplication, the measure can be the total number of bits.
  * For some graph problems, it might be appropriate to describe the size of the input with more than one number (e.g. for the number of vertices and edges).
* Even for inputs of a given size, an algorithm can have different **best-case** and **worst-case** running times.

---

Performing this analysis on insertion sort:
```rust
fn insertion_sort(mut input: Vec<i32>) -> Vec<i32> {
    for i in 1..input.len() { // Line 1
        let current = input[i]; // Line 2
        let mut j = i; // Line 3

        while j > 0 && input[j - 1] > current { // Line 4
            input[j] = input[j - 1]; // Line 5
            j -= 1; // Line 6
        }

        input[j] = current; // Line 7
    }

    input // Line 8
}
```

For each `i = 1, 2, ..., n`, let $t_i$ denote the number of times the while loop test in line 4 is executed for that value of `i`.
Empty lines are ignored as we assume they take no time.

| Line # | Cost  | Times executed                                                                                          |
|--------|-------|---------------------------------------------------------------------------------------------------------|
| Line 1 | $c_1$ | $n$ (this is not n-1 times, because the loop condition is evaluated one more time before terminating).  |
| Line 2 | $c_2$ | $n-1$                                                                                                   |
| Line 3 | $c_3$ | $n-1$                                                                                                   |
| Line 4 | $c_4$ | $\sum_{i=2}^{n} t_i$                                                                                    |
| Line 5 | $c_5$ | $\sum_{i=2}^{n} (t_i - 1)$ (subtracting $1$ because the loop body executes one less than its condition) |
| Line 6 | $c_6$ | $\sum_{i=2}^{n} (t_i - 1)$ (^^^)                                                                        |
| Line 7 | $c_7$ | $n-1$                                                                                                   |
| Line 8 | $c_8$ | $1$                                                                                                     |

$$$
\begin{align*}
T(n) = [c_1 \cdot n] + [c_2 \cdot (n-1)] + [c_3 \cdot (n-1)] \\ + [c_4 \cdot \sum_{i=2}^{n} t_i ] + [c_5 \cdot \sum_{i=2}^{n} (t_i - 1)] + [c_6 \cdot \sum_{i=2}^{n} (t_i - 1)]  \\ + [c_7 \cdot (n-1)] + [c_8]
\end{align*}
$$$

For insertion sort on input of size $n$, the best-case runtime happens when the input is already sorted.
In this case, the while loop condition is checked and the loop is immediately terminated.
Hence, $t_i = 1$ in this case for all $i$.
The best-case runtime is then given by:

$$$
\begin{align*}
T(n) = [c_1 \cdot n] + [c_2 \cdot (n-1)] + [c_3 \cdot (n-1)] + [c_4 \cdot (n-1) ] + [c_7 \cdot (n-1)] + [c_8] \\
= (c_1 + c_2 + c_3 + c_4 + c_7) \cdot n - (c_2 + c_3 + c_7 - c_8)
\end{align*}
$$$

> The best-case runtime is a **linear function** of $n$ because it can be expressed as $an + b$, where $a$ and $b$ are the various constants
of running the instructions on the various lines.

For insertion sort, the worst case arises when the input is in reverse sorted order.
In this case, the while loop is executed for all elements in `input[0..(i-1)]`.
Hence, $t_i = i$ in this case for all $i$.
The worst-case runtime is then given by:
// TODO

> The wost-case is a **quadratic function** of $n$ because it can be expressed as $an^2 + bn + c$, where $a$, $b$ and $c$ are the various constants
of running the instructions on the various lines.

---

The **worst-case running time** is the longest running time for any input of size $n$. It is commonly used over other types of runtime because:
* It gives the upper bound on the running time for any input. This is useful in software engineering.
* The worst-case happens frequently in production.
* The "average case" is often roughly as bad as the worst case. The other problem is determining what constitutes an "average" for a particular problem.
  Assuming that all inputs of a given size are equally likely, is not usually true in practice.