# [WIP] Introduction to Algorithms

## Chapter 1: The Role of Algorithms in Computing

A <mark>computational problem</mark> is a specification of a desired input-output relationship. e.g.

> **Computational problem**: Sorting
>
> **Input**: A sequence of $n$ values ($a_1$, ..., $a_n$).
>
> **Output**: A permutation (reordering) of the input such that $a'_1 \leq a'_2$ ... $a'_{n-1} \leq a'_n$.


## Chapter 2: Getting Started

### Insertion Sort
Insertion sort is a sorting algorithm that builds the final sorted array one item at a time.
At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.
It repeats until no input elements remain.

![Insertion Sort](/docs/assets/introduction-to-algorithms-images/insertion_sort.gif)

> **Pseudocode**:
> insertionSort(A)
>     for i = 1 to n
>        key = A[i]
>        // Insert A[i] into the sorted subarray A[0:i-1]
>       j = i - 1

Loop invariant:
* Initialization: Before the first iteration, $i = 1$. The sub-array `input[0:i-1]` contains just one element and is thus trivially sorted.
* Maintenance: The body of the for loop works by moving the elements in `input[i - 1]`, `input[i - 2]`, `input[i - 3]`, ..., `input[0]` that are greater than `input[i]` one position to the right. This makes space for `input[i]` to be inserted in the correct position.
The `i` variable is incremented and the sub-array `input[0:i-1]` is still sorted.
* Termination: The loop terminates when `i = n`. At this point, the sub-array `input[0:n-1]` is sorted and the algorithm has finished.