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
> * Initialization: Before the first iteration, $i = 1$. The sub-array `input[0:i-1]` contains just one element and is thus trivially sorted.
> * Maintenance: The body of the for loop works by moving the elements in `input[i - 1]`, `input[i - 2]`, `input[i - 3]`, ..., `input[0]` that are greater than `input[i]` one position to the right. This makes space for `input[i]` to be inserted in the correct position. 
> The `i` variable is incremented and the sub-array `input[0:i-1]` is still sorted.
> * Termination: The loop terminates when `i = n`. At this point, the sub-array `input[0:n-1]` is sorted and the algorithm has finished.