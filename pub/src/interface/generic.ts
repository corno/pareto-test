import * as _et from 'exupery-core-types'

export type Input_And_Expected<In, Expected> = {
    'input': In
    'expected': Expected
}

export type Output_Or_Error<Output, Error> =
    | ['output', Output]
    | ['error', Error]

export type Transformer<Input, Expected_Output> = Input_And_Expected<Input, Expected_Output>

export type Transformer_With_Parameters<Input, Parameters, Expected_Output> = Input_And_Expected<{
    'input': Input
    'parameters': Parameters
}, Expected_Output>

export type Refiner_Without_Parameters<Input, Expected_Output, Expected_Error> = Input_And_Expected<Input, Output_Or_Error<Expected_Output, Expected_Error>>

export type Refiner_With_Parameters<Input, Parameters, Expected_Output, Expected_Error> = {
    'input': {
        'input': Input
        'parameters': Parameters
    }
    'expected': Output_Or_Error<Expected_Output, Expected_Error>
}

// Type definitions for test results


export type Results = Branch

export type Branch = _et.Dictionary<Result_Entry>

export type Result_Entry =
    | ['test', {
        'passed': boolean
    }]
    | ['group', Branch]

