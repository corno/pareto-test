import * as _pi from 'pareto-core-interface'

import * as d_generic from "./generic_testset"

export type Test_Collection_Result = _pi.Dictionary<Test_Node_Result>

export type Test_Node_Result =
    | ['collection', Test_Node_Result__collection]
    | ['individual test', Individual_Test_Result]

export type Test_Node_Result__collection = {
    'type': 
    | ['dictionary', null]
    | ['group', null]
    'result': Test_Node_Result__collection__result
}

export type Test_Node_Result__collection__result =
    | ['source invalid',
        | ['not a collection', null]
        | ['missing', null] // the tester expected this test collection, but it was not found
        | ['problem with expected', d_generic.Node__directory__invalid]
    ]
    | ['source valid', Test_Collection_Result]

export type Individual_Test_Result = {
    'result': Individual_Test_Result__result
}
export type Individual_Test_Result__result =
    | ['source invalid',
        | ['not an individual test', null]
        | ['problem with expected', d_generic.Node__file__expected__invalid]
    ]
    | ['tested', Tested
    ]

export type Tested =
    | ['passed', null]
    | ['failed', Failed]

export type Failed =
    | ['transform', Transform_Failure]
    | ['refine', Refine_Failure]

export type Transform_Failure =
    | ['initialization', string]
    | ['unexpected output', Unexpected_Data]

export type Unexpected_Data = {
    'expected': string,
    'actual': string,
}

export type Refine_Failure =
    | ['initialization', string]
    | ['should have failed but succeeded', string]
    | ['should have succeeded but failed', string]
    | ['unexpected output', Unexpected_Data]
    | ['unexpected error', Unexpected_Data]