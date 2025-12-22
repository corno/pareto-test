import * as _et from 'exupery-core-types'

import * as d_generic from "./generic_testset"

export type Test_Group_Result = _et.Dictionary<Test_Node_Result>

export type Test_Node_Result =
    | ['group', Test_Node_Result__group]
    | ['individual test', Individual_Test_Result]

export type Test_Node_Result__group = {
    'result': Test_Node_Result__group__result
}

export type Test_Node_Result__group__result =
    | ['source invalid',
        | ['not a group', null]
        | ['missing', null] // the tester expected this test group, but it was not found
        | ['problem with expected', d_generic.Node__group__invalid]
    ]
    | ['tested', Test_Group_Result]

export type Individual_Test_Result = {
    'result': Individual_Test_Result__result
}
export type Individual_Test_Result__result =
    | ['source invalid',
        | ['not an individual test', null]
        | ['problem with expected', d_generic.Node__test__expected__invalid]
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