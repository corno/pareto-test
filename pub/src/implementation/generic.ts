import * as _pi from 'pareto-core-interface'
import * as _pdev from 'pareto-core-dev'
import * as _pt from 'pareto-core-transformer'
import * as _pinternals from 'pareto-core-internals'

import * as d_log from "pareto-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"

import * as generic from "../interface/temp/generic"

import * as resources_exupery from "pareto-resources/dist/interface/resources"
import { transform_refinement_result } from './temp_transform_refinement_result'

export type Resources = {
    'commands': {
        'log error': resources_exupery.commands.log_error
        'log': resources_exupery.commands.log
    }
}

export const run_transformer_tests_with_parameters = <Input, Expected, Parameters>(
    tests: _pi.Dictionary<generic.Transformer_With_Parameters<Input, Expected, Parameters>>,
    implementation: _pi.Transformer_With_Parameters<Input, Expected, Parameters>
): generic.Results => tests.map(($) => ['test', {
    'passed': implementation($.input.input, $.input.parameters) === $.expected
}])

export const run_transformer_tests_without_parameters = <Input, Expected>(
    $: _pi.Dictionary<generic.Transformer<Input, Expected>>,
    implementation: _pi.Transformer<Input, Expected>
): generic.Results => $.map(($) => ['test', {
    'passed': implementation($.input) === $.expected
}])

export const run_refiner_tests_with_parameters = <Expected_Output, Expected_Error, Input, Parameters>(
    tests: _pi.Dictionary<generic.Refiner_With_Parameters<Expected_Output, Expected_Error, Input, Parameters>>,
    implementation: _pi.Refiner_With_Parameters<Expected_Output, Expected_Error, Input, Parameters>
): generic.Results => tests.map(($) => {
    const expected = $.expected
    return ['test', {
        'passed': transform_refinement_result(

            _pinternals.create_refinement_context<Expected_Output, Expected_Error>(
                (abort) => implementation($.input.input, abort, $.input.parameters)
            ),
            ($) => {
                const output = $
                return _pt.sg(expected, ($) => {
                    switch ($[0]) {
                        case 'output': return _pt.ss($, ($) => output === $)
                        case 'error': return _pt.ss($, ($) => false)
                        default: return _pt.au($[0])
                    }
                })
            },
            ($) => {
                const error = $
                return _pt.sg(expected, ($) => {
                    switch ($[0]) {
                        case 'output': return _pt.ss($, ($) => false)
                        case 'error': return _pt.ss($, ($) => error === $)
                        default: return _pt.au($[0])
                    }
                })
            },
        )
    }]
})

export const run_refiner_tests_without_parameters = <Expected_Output, Expected_Error, Input>(
    $: _pi.Dictionary<generic.Refiner_Without_Parameters<Expected_Output, Expected_Error, Input>>,
    implementation: _pi.Refiner<Expected_Output, Expected_Error, Input>
): generic.Results => {
    return $.map(($) => {
        const expected = $.expected
        return ['test', {
            'passed': transform_refinement_result(
                _pinternals.create_refinement_context<Expected_Output, Expected_Error>(
                    (abort) => implementation($.input, abort)
                ),
                ($) => {
                    const output = $
                    return _pt.sg(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _pt.ss($, ($) => output === $)
                            case 'error': return _pt.ss($, ($) => false)
                            default: return _pt.au($[0])
                        }
                    })
                },
                ($) => {
                    const error = $
                    return _pt.sg(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _pt.ss($, ($) => false)
                            case 'error': return _pt.ss($, ($) => error === $)
                            default: return _pt.au($[0])
                        }
                    })
                },
            )
        }]
    })
}


