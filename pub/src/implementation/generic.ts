import * as _et from 'exupery-core-types'
import * as _ed from 'exupery-core-dev'
import * as _ea from 'exupery-core-alg'
import * as _easync from 'exupery-core-async'

import * as d_log from "exupery-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"

import * as generic from "../interface/temp/generic"

export const run_transformer_tests_with_parameters = <Input, Expected, Parameters>(tests: _et.Dictionary<generic.Transformer_With_Parameters<Input, Expected, Parameters>>, implementation: ($: Input, parameters: Parameters) => Expected): generic.Results => {
    return tests.map(($) => {
        return ['test', {
            'passed': implementation($.input.input, $.input.parameters) === $.expected
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

export const run_refiner_tests_with_parameters = <Expected_Output, Expected_Error, Input, Parameters>(tests: _et.Dictionary<generic.Refiner_With_Parameters<Expected_Output, Expected_Error, Input, Parameters>>, implementation: ($: Input, parameters: Parameters, abort: (error: Expected_Error) => never) => Expected_Output): generic.Results => {
    return tests.map(($) => {
        const expected = $.expected
        const x = _ea.create_refinement_context<Expected_Output, Expected_Error>(
            (abort) => implementation($.input.input, $.input.parameters, abort)
        )
        return ['test', {
            'passed': x.transform(
                ($) => {
                    const output = $
                    return _ea.cc(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _ea.ss($, ($) => output === $)
                            case 'error': return _ea.ss($, ($) => false)
                            default: return _ea.au($[0])
                        }
                    })
                },
                ($) => {
                    const error = $
                    return _ea.cc(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _ea.ss($, ($) => false)
                            case 'error': return _ea.ss($, ($) => error === $)
                            default: return _ea.au($[0])
                        }
                    })
                },
            )
        }]
    })
}

export const run_refiner_tests_without_parameters = <Expected_Output, Expected_Error, Input>($: _et.Dictionary<generic.Refiner_Without_Parameters<Expected_Output, Expected_Error, Input>>, implementation: ($: Input, abort: (error: Expected_Error) => never) => Expected_Output): generic.Results => {
    return $.map(($) => {
        const expected = $.expected
        const x = _ea.create_refinement_context<Expected_Output, Expected_Error>(
            (abort) => implementation($.input, abort)
        )
        return ['test', {
            'passed': x.transform(
                ($) => {
                    const output = $
                    return _ea.cc(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _ea.ss($, ($) => output === $)
                            case 'error': return _ea.ss($, ($) => false)
                            default: return _ea.au($[0])
                        }
                    })
                },
                ($) => {
                    const error = $
                    return _ea.cc(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _ea.ss($, ($) => false)
                            case 'error': return _ea.ss($, ($) => error === $)
                            default: return _ea.au($[0])
                        }
                    })
                },
            )
        }]
    })
}



export type Resources = {
    'commands': {
        'log error': _et.Command<d_log.Parameters, null>
        'log': _et.Command<d_log.Parameters, null>
    }
}