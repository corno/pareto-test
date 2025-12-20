import * as _et from 'exupery-core-types'

export type Group = _et.Dictionary<Node>

export type Node =
    | ['other', null]
    | ['test', Node__test]
    | ['group', Node__group]


export type Node__test = {
    'input': string
    'expected': Node__test__expected
}

export type Node__test__expected =
    | ['valid', string]
    | ['invalid', Node__test__expected__invalid
    ]

export type Node__test__expected__invalid =
    | ['does not exist', null]
    | ['is not an individual test', null]

export type Node__group =
    | ['valid', Group]
    | ['invalid', Node__group__invalid
    ]
    
export type Node__group__invalid =
    | ['expected does not exist', null]
    | ['expected is not a group', null]