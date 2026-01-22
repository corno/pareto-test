import * as _p from 'pareto-core/dist/command'
import * as _pt from 'pareto-core/dist/transformer'
import * as _pi from 'pareto-core/dist/interface'

import * as d_test from "../../../interface/temp/generic"
import * as d_log_error from "pareto-resources/dist/interface/generated/pareto/schemas/log_error/data"
import * as d_log from "pareto-resources/dist/interface/generated/pareto/schemas/log/data"

import * as resources_pareto from "pareto-resources/dist/interface/resources"


export type Parameters = {
    'test results': d_test.Results,
}

export type Command = _pi.Command<null, Parameters>

export type Signature = _pi.Command_Procedure<
    Command,
    {
        'log error': resources_pareto.commands.log_error,
        'log': resources_pareto.commands.log,
    },
    null
>

import * as t_test_result_to_text from "../schemas/test_result/transformers/lines"

const has_passed = (results: d_test.Results): boolean => _pt.boolean.dictionary_is_empty(
    _pt.dictionary.filter(results, ($) => _pt.sg($, ($): _pi.Optional_Value<null> => {
        switch ($[0]) {
            case 'test': return _pt.ss($, ($) => $.passed ? _pt.optional.not_set() : _pt.optional.set(null))
            case 'group': return _pt.ss($, ($) => has_passed($) ? _pt.optional.not_set() : _pt.optional.set(null))
            default: return _pt.au($[0])
        }
    }))
)

export const $$: Signature = _p.command_procedure(
    ($p, $cr) => [
        $cr.log.execute(
            {
                'lines': _pt.list.literal([
                    `Running tests...`,
                ])
            },
            ($) => $,
        ),
        _p.if_.direct(
            has_passed($p['test results']),
            [
                $cr.log.execute(
                    {
                        'lines': _pt.list.nested_literal_old([
                            t_test_result_to_text.Results($p['test results']),
                            [
                                ``,
                                `all tests successful.`
                            ],
                        ])
                    },
                    ($) => $,
                ),
            ]
        ),
        _p.if_.direct(
            !has_passed($p['test results']),
            [
                $cr['log error'].execute(
                    {
                        'lines': _pt.list.nested_literal_old([
                            t_test_result_to_text.Results($p['test results']),
                            [
                                ``,
                                `some tests failed`
                            ],
                        ])
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

