import * as _pi from 'pareto-core-interface'
import * as _pdev from 'pareto-core-dev'
import * as _pt from 'pareto-core-transformer'
import * as _pinternals from 'pareto-core-internals'

import * as d_log from "exupery-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"

import * as generic from "../interface/temp/generic"

import * as resources_exupery from "exupery-resources/dist/interface/resources"

export type Resources = {
    'commands': {
        'log error': resources_exupery.commands.log_error
        'log': resources_exupery.commands.log
    }
}

export const run_transformer_tests_with_parameters = <Input, Expected, Parameters>(tests: _pi.Dictionary<generic.Transformer_With_Parameters<Input, Expected, Parameters>>, implementation: ($: Input, parameters: Parameters) => Expected): generic.Results => {
    return tests.map(($) => {
        return ['test', {
            'passed': implementation($.input.input, $.input.parameters) === $.expected
        }]
    })
}

export const run_transformer_tests_without_parameters = <Input, Expected>($: _pi.Dictionary<generic.Transformer<Input, Expected>>, implementation: ($: Input) => Expected): generic.Results => {
    return $.map(($) => {
        return ['test', {
            'passed': implementation($.input) === $.expected
        }]
    })
}

export const run_refiner_tests_with_parameters = <Expected_Output, Expected_Error, Input, Parameters>(tests: _pi.Dictionary<generic.Refiner_With_Parameters<Expected_Output, Expected_Error, Input, Parameters>>, implementation: ($: Input, parameters: Parameters, abort: (error: Expected_Error) => never) => Expected_Output): generic.Results => {
    return tests.map(($) => {
        const expected = $.expected
        const x = _pinternals.deprecated_create_refinement_context<Expected_Output, Expected_Error>(
            (abort) => implementation($.input.input, $.input.parameters, abort)
        )
        return ['test', {
            'passed': x.transform(
                ($) => {
                    const output = $
                    return _pt.cc(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _pt.ss($, ($) => output === $)
                            case 'error': return _pt.ss($, ($) => false)
                            default: return _pt.au($[0])
                        }
                    })
                },
                ($) => {
                    const error = $
                    return _pt.cc(expected, ($) => {
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

export const run_refiner_tests_without_parameters = <Expected_Output, Expected_Error, Input>($: _pi.Dictionary<generic.Refiner_Without_Parameters<Expected_Output, Expected_Error, Input>>, implementation: ($: Input, abort: (error: Expected_Error) => never) => Expected_Output): generic.Results => {
    return $.map(($) => {
        const expected = $.expected
        const x = _pinternals.deprecated_create_refinement_context<Expected_Output, Expected_Error>(
            (abort) => implementation($.input, abort)
        )
        return ['test', {
            'passed': x.transform(
                ($) => {
                    const output = $
                    return _pt.cc(expected, ($) => {
                        switch ($[0]) {
                            case 'output': return _pt.ss($, ($) => output === $)
                            case 'error': return _pt.ss($, ($) => false)
                            default: return _pt.au($[0])
                        }
                    })
                },
                ($) => {
                    const error = $
                    return _pt.cc(expected, ($) => {
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


