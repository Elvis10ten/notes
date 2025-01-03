# [WIP] Introduction to Algorithms

## Chapter 1: The Role of Algorithms in Computing

A <mark>computational problem</mark> is a specification of a desired input-output relationship. e.g.

> **Computational problem**: Sorting
>
> **Input**: A sequence of $n$ values ($a_1$, ..., $a_n$).
>
> **Output**: A permutation (reordering) of the input such that $a'_1 \leq a'_2$ ... $a'_{n-1} \leq a'_n$.


## Chapter 2: Getting Started
> Objective: This chapter introduces the analysis of algorithms and algorithm design techniques like the
> incremental method (using insertion sort) and design-and-conquer (using merge sort).

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

$$$
\begin{align*}
T(n) = [c_1 \cdot n] + [c_2 \cdot (n-1)] + [c_3 \cdot (n-1)]
\\ + \left[ c_4 \cdot \left( \frac{n(n + 1)}{2} - 1 \right) \right]
\\ + \left[ c_5 \cdot \left( \frac{n(n - 1)}{2} \right) \right]
\\ + \left[ c_6 \cdot \left( \frac{n(n - 1)}{2} \right) \right]
\\ + [c_7 \cdot (n-1)] + [c_8]
\end{align*}
$$$
// todo

> The wost-case is a **quadratic function** of $n$ because it can be expressed as $an^2 + bn + c$, where $a$, $b$ and $c$ are the various constants
of running the instructions on the various lines.

---

The **worst-case running time** is the longest running time for any input of size $n$. It is commonly used over other types of runtime because:
* It gives the upper bound on the running time for any input. This is useful in software engineering.
* The worst-case happens frequently in production.
* The "average case" is often roughly as bad as the worst case. The other problem is determining what constitutes an "average" for a particular problem.
  Assuming that all inputs of a given size are equally likely, is not usually true in practice.

---

In the analysis of algorithms, it's the rate of growth or order of growth that matters.
Therefore, only the leading term of the formula is considered, since the lower-order terms and constants are insignificant for large values of $n$.
The leading term's constant coefficient is also ignored, since constant factors are less significant than the rate of growth.

To highlight the order of growth of the running time, the theta notation $\Theta(n)$ is used.

#### Divide-and-conquer method
Divide-and-conquer is an algorithm design technique that uses <mark>recursion</mark> to find a solution to a problem by breaking the solution into two cases:
1. The **base case**: The recursion stops at the **base case**, which is a small enough problem that can be solved directly without recursing.
2. The **recursive case**:
   * **Divide** the problem into smaller sub-problems.
   * **Conquer** the sub-problems by solving them recursively (i.e. by further breaking them down into smaller sub-problems).
   * **Combine** the sub-problem solutions to form a solution to the original problem.

#### Merge sort algorithm
Merge sort algorithm is a sorting algorithm based the divide-and-conquer technique:
* **Divide** the subarray `A[p:r]` to be sorted into two adjacent sub-arrays, each of half the size.
  To do so, compute the midpoint `q` of `[p:r]` (taking the average of `p` and `r`), and divide `A[p:r]` into sub-arrays of `A[p:q]` and `A[q + 1: r]`.
* **Conquer** by sorting each ot the two sub-arrays `A[p:q]` and `A[q + 1:r]` recursively using merge sort.
* **Combine** by merging the sorted sub-arrays `A[p:q]` and `A[q + 1:r]` back into `A[p:r]`, producing the sorted answer.

![Merge Sort](/docs/assets/introduction-to-algorithms-images/merge_sort_operation.svg)

The **base case** is reached when the subarray contains one element (which is trivially sorted).

```rust
fn merge_sort(input: &mut Vec<i32>, p: usize, r: usize) {
    if p >= r {
       return;
    }

    let q = (r + p) / 2;
    merge_sort(input, p, q);
    merge_sort(input, q + 1, r);
    merge(input, p, q, r);
}

fn merge(input: &mut Vec<i32>, p: usize, q: usize, r: usize) {
    let left_length = (q - p) + 1; // Explanation for the +1: Given that q >= p, there are two cases: when q == p, there is 1 element; and when q > p, e.g. q = 2 and p = 0, there are 3 elements.
    let right_length = (r - q);
    let mut left = vec![0;left_length];
    let mut right = vec![0;right_length];

    for i in 0..left_length {
        left[i] = input[p + i]
    }
    for i in 0..right_length {
        right[i] = input[q + i + 1]
    }

    println!("left: {:?}", left);
    println!("right: {:?}", right);

    let mut left_index = 0;
    let mut right_index = 0;
    let mut input_index = p;

    while left_index < left_length && right_index < right_length {
        if left[left_index] <= right[right_index] {
            input[input_index] = left[left_index];
            left_index += 1;
        } else {
            input[input_index] = right[right_index];
            right_index += 1;
        }

        input_index += 1;
    }

    while left_index < left_length {
        input[input_index] = left[left_index];
        input_index += 1;
        left_index += 1;
    }

    while right_index <right_length {
        input[input_index] = right[right_index];
        input_index += 1;
        right_index += 1;
    }
}
```

---

The `merge` procedure takes $\Theta(n)$ time. To demonstrate:
* Take $n = r - p + 1$
* The lines outside the loops takes constant time.
* The first two `for` loops take $\Theta(left_length + right_length) = \Theta(n)$ time.
* Each iteration of the bottom three `while` loops copy exactly one value from `left` or `right` back into `input`,
  and each value is copied back into `input` exactly once. The total time spent in these three loops is $\Theta(n)$.

The `merge_sort` procedure recursively splits the `input` into halves:
* The first half contains $\lceil n / 2 \rceil$ elements.
* And the second half contains $\lfloor n / 2 \rfloor$ elements. 
* The above two statements can be proven by examining the four possible cases when $p$ or $r$ is odd or even.

#### Analyzing divide-and-conquer algorithms
When an algorithm contains a recursive call, the running time can often be described by a **recurrence equation** or **recurrence**.
A recurrence describes the overall running time on a problem of size $n$ in terms of the running time of the same algorithm on smaller inputs.

Let $T(n)$ denote the worst-case running time on a problem of size $n$, the recurrence for a divide-and-conquer algorithm can be described using its structure:
* **Base case**: The base case occurs when $n < n_0$ for some constant $n_0$. The running time of the algorithm on a problem of size $n_0$ is $\Theta(1)$.
* **Recursive case**:
    * **Divide**: The divide step takes $D(n)$ time.
    * **Conquer**: The division of the problem yields $a$ sub-problems, each with size $n/b$ (i.e. $1/b$ the size of the original). It takes $a \cdot T(n / b)$ time to solve all $a$ problems.
    * **Combine**: The combine step takes $C(n)$ time.

This yields the following recurrence:
$$
T(n) = \begin{cases}
\Theta(1) & \text{if } n < n_0 \\
D(n) + a \cdot T(n / b) + C(n) & \text{if } n \geq n_0
\end{cases}
$$

---

For **merge sort**, $a = 2$, $b = 2$.
While in some cases, the array is not divided exactly in half, we can ignore this because at most, the difference is one element.
Also, to simply the equations, the base case is also ignored, because it takes $\Theta(1)$ time: <mark>the running time of an algorithm  on an input of constant size is constant</mark>.

For merge sort, the recurrence can be described as:
* **Divide**: The divide step just computes the middle of the subarray, which takes constant time.
* **Conquer**: The two recursive calls on problems of size $n/2$ each take $T(n/2)$ time.
* **Combine**: The `merge` procedure takes $\Theta(n)$ time.

Hence, the running time of merge sort on a problem of size $n$ can be described as:
$$
T(n) = 2T(n/2) + \Theta(n)
$$

The solution to this recurrence is $\Theta(n \log_2 n)$. We can prove this intuitively:

![Merge Sort Recurrence Tree](/docs/assets/introduction-to-algorithms-images/merge_sort_recursion_tree.png)

1. For simplicity, assume $n = 2^k$ for some integer $k$.
2. Each level has twice as many nodes as the level above, however, each node contributes half the cost of the node above.
3. The doubling and halving cancel each other out, such that the total cost at any level is the same.
4. There are $\log_2 n + 1$ levels in the tree. `+1` because the root level is level 0.
5. The total cost is the sum of the costs at each level, which is $\Theta(n \log_2 n)$.