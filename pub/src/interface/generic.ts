import * as _et from 'exupery-core-types'

export type Transformer<Input, Expected> = {
    'input': Input
    'expected': Expected
}

export type Transformer_With_Parameters<Input, Parameters, Expected> = {
    'input': Input
    'parameters': Parameters
    'expected': Expected
}

export type Refiner_Without_Parameters<Input, Expected> = {
    'input': Input
    'expected': _et.Optional_Value<Expected>
}

export type Refiner_With_Parameters<Input, Parameters, Expected> = {
    'input': Input
    'parameters': Parameters
    'expected': _et.Optional_Value<Expected>
}

// Type definitions for test results


export type Results = Branch

export type Branch = _et.Dictionary<Result_Entry>

export type Result_Entry =
| ['test', {
    'passed': boolean
}]
| ['group', Branch]

