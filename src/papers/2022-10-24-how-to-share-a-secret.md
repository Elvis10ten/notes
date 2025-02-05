#How to Share a Secret — Paper Summary


Author: Adi Shamir

Date: 1979

Link: [PDF](https://web.mit.edu/6.857/OldStuff/Fall03/ref/Shamir-HowToShareASecret.pdf)

-----

Note: This note is augmented with paragraphs from Wikipedia.

1. The author shows how to divide data `D` into `n` pieces in such a way that `D` is easily reconstructable from any `k` pieces, but even complete knowledge of
`k - 1` pieces reveals absolutely no information about `D` (i.e: all its possible values are equally likely).
2. Such a scheme is called a `(k, n)` [threshold scheme](https://en.wikipedia.org/wiki/Threshold_cryptosystem).
3. Efficient threshold schemes can be used in the management of cryptographic keys.
4. > By using a `(k, n)` threshold scheme with `n = 2k - 1` we get a very robust key management scheme: We can recover the original key even when `[n / 2] = k - 1` of the `n` pieces are destroyed, but our opponents cannot reconstruct the key even when security breaches expose `[n / 2] = k - 1` of the remaining `k` pieces.
5. E.g:
    * k = 3
    * n = 2k - 1 = 2(3) - 1 = 5
    * n / 2 = 2.5 = 2 (rounded down) = k - 1
    * If 2 (`n / 2`) pieces are destroyed, the remaining 3 (`k`) pieces can be used to recover the key.
    * If 2 (`n / 2`) pieces are exposed, the opponent can’t reconstruct the key.
6. The scheme proposed in this paper is based on polynomial interpolation:
given `k` points in the 2-dimensional plane (`x₁`, `y₁`), … ,(`xₖ`, `yₖ`) with distinct `xᵢ`'s , there is one and only one
polynomial `q(x)` of degree `k - 1`such that `q(x) =yᵢ` for all `i`.
7. > The essential idea of the scheme is based on the  [Lagrange interpolation theorem](https://en.m.wikipedia.org/wiki/Lagrange_polynomial) , specifically that
`k` points is enough to uniquely determine a  [polynomial](https://en.m.wikipedia.org/wiki/Polynomial)  of  [degree](https://en.m.wikipedia.org/wiki/Degree_of_a_polynomial)  less than or equal to `k − 1`. For instance:
    * `2`  [points](https://en.m.wikipedia.org/wiki/Point_(geometry))  are sufficient to define a  [line](https://en.m.wikipedia.org/wiki/Line_(geometry))
    * `3` points are sufficient to define a  [parabola](https://en.m.wikipedia.org/wiki/Parabola)
    * `4` points to define a  [cubic curve](https://en.m.wikipedia.org/wiki/Cubic_function)  and
    * so forth. — [Wikipedia](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)
8. Assume that the data `D` is (or can be made) a number.
9.  To divide `D` into pieces `Dᵢ`:
    * Pick a random `k - 1` degree polynomial: `q(x) = a₀ + a₁x + ... aₖ₋₁ xᵏ⁻¹` in which `a₀=D`, and
    * Evaluate: `D₁= q(1)`, … ,`Dᵢ= q(i)`, … ,`Dₙ = q(n)`.
9. Given any subset of `k` of these `Dᵢ` values (together with their identifying indices), the coefficients of `q(x)` can be found by interpolation, and then evaluate `D = q(O)`. Knowledge of just `k - 1` of these values, on the other hand, does not suffice in order to calculate `D`.
10. Example calculation using integer arithmetic:
    * `D = 1234`
    * `n = 6`
    * `k = 3`
    * `k - 1 = 2` numbers are taken at random. Let them be `166` and `94`.
    * This yields coefficients:
        * `a₀ = 1234` (i.e: the secret)
        * `a₁ = 166`
        * `a₂ = 94`
    * The polynomial to produce secret shares (points): `q(x) = 1234 + 166x + 94x²`.
    * Each `n` participant in the scheme receives a different point from the polynomial:
        * D₁ = (1, 1494)
        * D₂ = (2, 1942)
        * D₃ = (3, 2578)
        * D₄ = (4, 3402)
        * D₅ = (5, 4414)
        * D₆ = (6, 5614)
    * Polynomial interpolation can be used to reconstruct the secret given any 3 point.
11. **Problem of using integer arithmetic**:
    > Although the simplified version of the method demonstrated above, which uses integer arithmetic rather than finite field arithmetic, works, there is a security problem:  An attacker gains information about D with every `Dᵢ` they find.
12. This problem can be fixed by using finite field arithmetic. A field of size `p ∈ ℙ : p > D, p > n` is used.
13. In practice this is only a small change:
    * A prime `p` must be chosen that is bigger than the number of participants and every `aᵢ `(including `a₀ = D`).
    * The points on the polynomial must also be calculated as `(x, q(x) mod p)` instead of `(x, q(x))`.
    * `p` is publicly known: Everybody who receives a point must also know its value.
14. Useful properties of the scheme includes:
    * **Minimal**: The size of each piece does not exceed the size of the original data.
    * **Extensible**: For any given threshold, shares can be dynamically added or deleted without affecting existing shares.
    * **Dynamic**: Security can be easily enhanced without changing the secret, but by changing the polynomial occasionally (keeping the same free term) and constructing new shares for the participants.
    * **Flexible**: In organizations where hierarchy is important, each participant can be issued different numbers of shares according to their importance inside the organization.