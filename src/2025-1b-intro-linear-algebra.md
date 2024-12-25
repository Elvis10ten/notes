# [WIP] Introduction to Linear Algebra by Gilbert Strang

## Chapter 1: Vectors and Matrices

The fundamental objects of Linear Algebra are **vectors** ( $v$ ) and **matrices** ( $A$ ).

### Vectors
A **vector** is a list of numbers. The numbers are called the **components** of the vector. e.g.

$$
v = \begin{bmatrix} v_1 \\ v_2 \end{bmatrix} = \begin{bmatrix} 2 \\ 4 \end{bmatrix}
$$
<em>$v$ is called a 2-dimensional vector because it has two components.</em>

#### Properties of Vectors
1. **Dimension**: The number of components determines the dimension of the vector. e.g. $v$ below is a vector in 3-dimensional space ($\mathbb{R}^3$):
$$
v = \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix}
$$
2. **Operations**:
   * **Addition**: Two vectors of the <mark>same dimension</mark> can be added together by adding their components. e.g.
    $$
    u + v = \begin{bmatrix} u_1 + v_1 \\ u_2 + v_2 \end{bmatrix}
    $$
   * **Scalar multiplication**: A vector can be scaled by multiplying each component by a scalar (a single number). e.g.
    $$
    c \cdot v = \begin{bmatrix} c \cdot v_1 \\ c \cdot v_2 \end{bmatrix}
    $$
3**Dot product**: The dot product of two vectors $v$ and $w$ is the sum of the products of their corresponding components. e.g.
$$
v \cdot w = v_1 \cdot w_1 + v_2 \cdot w_2
$$
4**Magnitude (or length or Norm)**: The length of a vector $v$ is the square root of the sum of the squares of its components. e.g.
$$
\|v\| = \sqrt{v_1^2 + v_2^2}
$$

#### Linear combinations
The linear combination of vectors is a sum of scalar multiples of the vectors. e.g. The linear combination of $v$ and $w$ are the vectors $cv + dw$ where $c$ and $d$ are any numbers.
$$
c\begin{bmatrix} u_1 \\ u_2 \end{bmatrix} + d\begin{bmatrix} v_1 \\ v_2 \end{bmatrix} = \begin{bmatrix} c \cdot u_1 + d \cdot v_1 \\ c \cdot v_2 + d \cdot v_2 \end{bmatrix}
$$

#### Using linear combinations to solve systems of equations
A system of linear equations is a collection of equations that involve the same set of variables.
Solving such systems often involves finding whether the equations have:
* No solution (inconsistent)
* One solution (consistent and independent)
* Infinitely many solutions (consistent and dependent)

Consider a system of equations:
$$
\begin{align*}
a_{11}x_1 + a_{12}x_2 + ... a_{1n}x_n &= b_1 \\
a_{21}x_1 + a_{22}x_2 + ... a_{2n}x_n &= b_2
\end{align*}
$$
Here:
* $a_{ij}$ are the coefficients of the variables $x_i$,
* $b_i$ are the constants on the right side of the equations, and
* $x_i$ are the variables to be solved for.

This system can be rewritten in vector form as:
$$
x_1\begin{bmatrix} a_{11} \\ a_{21} \end{bmatrix} + x_2\begin{bmatrix} a_{12} \\ a_{22} \end{bmatrix} + ... + x_n\begin{bmatrix} a_{1n} \\ a_{2n} \end{bmatrix} = \begin{bmatrix} b_1 \\ b_2 \end{bmatrix}
$$

The goal is to find the scalars $x_1, x_2, ..., x_n$, such that the linear combination produces the vector $b$.

The elimination method can be used to solve the system of equations by transforming the system into an equivalent system that is easier to solve.
It is based on the same principles used in "Scalar algebra".

#### Basis Vectors
A basis for a vector space is a set of vectors that are <mark>linearly independent</mark> and <mark>spans</mark> the vector space. e.g.
* The standard basis for $\mathbb{R}^2$ is the set of vectors $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$ and $\begin{bmatrix} 0 \\ 1 \end{bmatrix}$.
* The standard basis for $\mathbb{R}^3$ is the set of vectors $\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$, $\begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}$, and $\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$.
* The standard basis for $\mathbb{R}^n$ is the set of vectors $\begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}$, $\begin{bmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{bmatrix}$, ..., and $\begin{bmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{bmatrix}$.
This implies that the number of vectors in the basis must be equal to the dimension of the vector space.

There can be multiple basis vectors for a vector space. To determine if a vector $\begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}$ forms a basis, verify:
1. Linear independence: The vector is not a linear combination of the other vectors. This can be verified by solving the equation
$c_1v_1 + c_2v_2 + \ldots + c_nv_n = 0$ where $c_1, c_2, \ldots, c_n$ are scalars.
If the only solution is $c_1 = c_2 = \ldots = c_n = 0$, then the vectors are linearly independent.
2. Spanning: The vectors span the vector space. This means that any vector in the space can be expressed as a linear combination of the basis vectors.
To verify, use the rank of the matrix formed by the vectors. If the rank is equal to the dimension of the space, then the vectors span the space.