import * as _et from 'exupery-core-types'
import * as _ed from 'exupery-core-dev'
import * as _ea from 'exupery-core-alg'
import * as _easync from 'exupery-core-async'

import * as d_log from "exupery-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"

import * as generic from "../interface/generic"

export const run_transformer_tests_with_parameters = <Input, Parameters, Expected>(tests: _et.Dictionary<generic.Transformer_With_Parameters<Input, Parameters, Expected>>, implementation: ($: Input, parameters: Parameters) => Expected): generic.Results => {
    return tests.map(($) => {
        return ['test', {
            'passed': implementation($.input, $.parameters) === $.expected
        }]
    })
}

export const run_transformer_tests_without_parameters = <Input, Expected>($: _et.Dictionary<generic.Transformer<Input, Expected>>, implementation: ($: Input) => Expected): generic.Results => {
    return $.map(($) => {
        return ['test', {
            'passed': implementation($.input) === $.expected
        }]
    })
}

export const run_refiner_tests_with_parameters = <Input, Parameters, Expected>(tests: _et.Dictionary<generic.Refiner_With_Parameters<Input, Parameters, Expected>>, implementation: ($: Input, parameters: Parameters, abort: (error: string) => never) => Expected): generic.Results => {
    return tests.map(($) => {
        try {
            const actual = implementation($.input, $.parameters, (error: string) => _ea.deprecated_panic(error))
            return ['test', {
                'passed': $.expected.transform(
                    ($) => actual === $,
                    () => false
                )
            }]
        } catch {
            return ['test', {
                'passed': $.expected.transform(
                    () => false,
                    () => true
                )
            }]
        }
    })
}

export const run_refiner_tests_without_parameters = <Input, Expected>($: _et.Dictionary<generic.Refiner_Without_Parameters<Input, Expected>>, implementation: ($: Input, abort: (error: string) => never) => Expected): generic.Results => {
    return $.map(($) => {
        try {
            const actual = implementation($.input, (error: string) => _ea.deprecated_panic(error))
            $.expected.map(
                ($) => {
                    if (actual !== $) {
                        _ed.log_debug_message(`Expected value does not match actual value: ${actual}`, () => { })
                    }
                }
            )
            return ['test', {
                'passed': $.expected.transform(
                    ($) => actual === $,
                    () => false
                )
            }]
        } catch {
            return ['test', {
                'passed': $.expected.transform(
                    () => false,
                    () => true
                )
            }]
        }
    })
}



export type Resources = {
    'commands': {
        'log error': _et.Command<d_log.Parameters, null>
        'log': _et.Command<d_log.Parameters, null>
    }
}