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