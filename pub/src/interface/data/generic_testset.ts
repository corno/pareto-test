import * as _et from 'exupery-core-types'



/**
 * this data structure is the result of merging 2 file structures:
 * - the main file structure, which contains the test inputs
 * - the expected file structure, which contains the expected outputs
 * 
 * 
 */
export type Directory = _et.Dictionary<Node>

export type Node =
    | ['other', null]
    | ['file', Node__file]
    | ['directory', Node__directory]


export type Node__file = {
    'input': string
    'matching': Node__file__expected
}

export type Node__file__expected =
    | ['valid', string]
    | ['invalid', Node__file__expected__invalid
    ]

export type Node__file__expected__invalid =
    | ['required input suffix missing', string]
    | ['expected',
        | ['does not exist', null]
        | ['is not a file', null]
    ]

export type Node__directory =
    | ['valid', Directory]
    | ['invalid', Node__directory__invalid
    ]

export type Node__directory__invalid =
    | ['directory for expected does not exist', null]
    | ['node for expected is not a directory', null]