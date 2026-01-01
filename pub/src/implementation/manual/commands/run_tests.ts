import * as _pt from 'pareto-core-transformer'
import * as _pi from 'pareto-core-interface'
import * as _pc from 'pareto-core-command'

import * as d_test from "../../../interface/temp/generic"
import * as d_log_error from "pareto-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"
import * as d_log from "pareto-resources/dist/interface/generated/pareto/schemas/log/data_types/target"

import * as resources_exupery from "pareto-resources/dist/interface/resources"


export type Parameters = {
    'test results': d_test.Results,
}

export type Command = _pi.Command<null, Parameters>

export type Signature = _pi.Command_Procedure<
    Command,
    {
        'log error': resources_exupery.commands.log_error,
        'log': resources_exupery.commands.log,
    },
    null
>

import * as t_test_result_to_text from "../schemas/test_result/transformers/lines"

const has_passed = (results: d_test.Results): boolean => {
    return results.filter<null>(($) => {
        return _pt.cc($, ($) => {
            switch ($[0]) {
                case 'test': return _pt.ss($, ($) => $.passed ? _pt.not_set() : _pt.set(null))
                case 'group': return _pt.ss($, ($) => has_passed($) ? _pt.not_set() : _pt.set(null))
                default: return _pt.au($[0])
            }
        })
    }).is_empty()
}

export const $$: Signature = _pc.create_command_procedure(
    ($p, $cr) => [
        $cr.log.execute(
            {
                'lines': _pt.list_literal([
                    `Running tests...`,
                ])
            },
            ($) => $,
        ),
        _pc.if_(
            has_passed($p['test results']),
            [
                $cr.log.execute(
                    {
                        'lines': _pt.list_literal([
                            t_test_result_to_text.Results($p['test results']),
                            _pt.list_literal([
                                ``,
                                `all tests successful.`
                            ]),
                        ]).flatten(($) => $)
                    },
                    ($) => $,
                ),
            ]
        ),
        _pc.if_(
            !has_passed($p['test results']),
            [
                $cr['log error'].execute(
                    {
                        'lines': _pt.list_literal([
                            t_test_result_to_text.Results($p['test results']),
                            _pt.list_literal([
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

