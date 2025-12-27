import * as _ea from 'exupery-core-alg'
import * as _et from 'exupery-core-types'
import * as _easync from 'exupery-core-async'

import * as d_test from "../../interface/temp/generic"
import * as d_log_error from "exupery-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"
import * as d_log from "exupery-resources/dist/interface/generated/pareto/schemas/log/data_types/target"

import * as resources_exupery from "exupery-resources/dist/interface/resources"


export type Parameters = {
    'test results': d_test.Results,
}

export type Command = _et.Command<null, Parameters>

export type Signature = _et.Command_Procedure<
    Command,
    {
        'log error': resources_exupery.commands.log_error,
        'log': resources_exupery.commands.log,
    },
    null
>

import * as t_test_result_to_text from "../transformers/schemas/test_result/lines"

const has_passed = (results: d_test.Results): boolean => {
    return results.filter<null>(($) => {
        return _ea.cc($, ($) => {
            switch ($[0]) {
                case 'test': return _ea.ss($, ($) => $.passed ? _ea.not_set() : _ea.set(null))
                case 'group': return _ea.ss($, ($) => has_passed($) ? _ea.not_set() : _ea.set(null))
                default: return _ea.au($[0])
            }
        })
    }).is_empty()
}

export const $$: Signature = _easync.create_command_procedure(
    ($p, $cr) => [
        $cr.log.execute(
            {
                'lines': _ea.list_literal([
                    `Running tests...`,
                ])
            },
            ($) => $,
        ),
        _easync.p.if_(
            has_passed($p['test results']),
            [
                $cr.log.execute(
                    {
                        'lines': _ea.list_literal([
                            t_test_result_to_text.Results($p['test results']),
                            _ea.list_literal([
                                ``,
                                `all tests successful.`
                            ]),
                        ]).flatten(($) => $)
                    },
                    ($) => $,
                ),
            ]
        ),
        _easync.p.if_(
            !has_passed($p['test results']),
            [
                $cr['log error'].execute(
                    {
                        'lines': _ea.list_literal([
                            t_test_result_to_text.Results($p['test results']),
                            _ea.list_literal([
                                ``,
                                `some tests failed`
                            ]),
                        ]).flatten(($) => $)
                    },
                    ($) => $,
                ),
                // $cr['write directory content'].execute(
                //     {
                //         'path': 
                //         'content': $p,
                //     },
                //     ($): d_write_directory_content.Error => ['writing test failures', $],
                // ),
            ]
        )
    ]
)

