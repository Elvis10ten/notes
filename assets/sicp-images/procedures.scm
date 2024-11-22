(define (but-last str)
    (substring str 0 (last-index str))
)

(define (last-index str)
    (- (string-length str) 1)
)

(define (last str)
    (substring str (last-index str) (string-length str))
)

(define (first str)
    (substring str 0 1)
)

(define (but-first str)
    (substring str 1 (string-length str))
)

(define (plural str)
    (if (string=? (last str) "y")
        (string-append (but-last str) "ies")
        (string-append str "s")
    )
)

(define (pig-latin str)
    (define vowels
        (char-set #\a #\A #\e #\E #\i #\I #\o #\O #\u #\U)
    )

    (define (is-vowel? char)
        (string-find-next-char-in-set char vowels)
    )

    (define simplified (string-append (but-first str) (first str)))

    (if (is-vowel? (first str))
        (string-append str "ay")
        (pig-latin simplified)
    )
)

(define (pascal row column)
    (cond ((= column 0) 1)
        ((= column row) 1)
        (else
            (+
                (pascal (- row 1) (- column 1))
                (pascal (- row 1) column)
            )
        )
    )
)