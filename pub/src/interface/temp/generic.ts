import * as _pi from 'pareto-core-interface'

export type Input_And_Expected<In, Expected> = {
    'input': In
    'expected': Expected
}

export type Output_Or_Error<Output, Error> =
    | ['output', Output]
    | ['error', Error]

export type Transformer<Input, Expected_Output> = Input_And_Expected<Input, Expected_Output>

export type Transformer_With_Parameters<Input, Expected_Output, Parameters> = Input_And_Expected<{
    'input': Input
    'parameters': Parameters
}, Expected_Output>

export type Refiner_Without_Parameters<Expected_Result, Expected_Error, Input> = Input_And_Expected<Input, Output_Or_Error<Expected_Result, Expected_Error>>

export type Refiner_With_Parameters<Expected_Result, Expected_Error, Input, Parameters> = {
    'input': {
        'input': Input
        'parameters': Parameters
    }
    'expected': Output_Or_Error<Expected_Result, Expected_Error>
}

// Type definitions for test results

export type Results = Branch

export type Branch = _pi.Dictionary<Result_Entry>

export type Result_Entry =
    | ['test', {
        'passed': boolean
    }]
    | ['group', Branch]

