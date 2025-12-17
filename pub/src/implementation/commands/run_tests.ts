import * as _ea from 'exupery-core-alg'
import * as _et from 'exupery-core-types'
import * as _easync from 'exupery-core-async'

import * as d_test from "../../interface/generic"
import * as d_log_error from "exupery-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"
import * as d_log from "exupery-resources/dist/interface/generated/pareto/schemas/log/data_types/target"

export type Query_Resources = null

export type Command_Resources = {
    'log error': _et.Command<null, d_log_error.Parameters>,
    'log': _et.Command<null, d_log.Parameters>,
}

export type Signature = _et.Command_Procedure<null, d_test.Results, Command_Resources, Query_Resources>

import { $$ as op_is_empty } from "pareto-standard-operations/dist/implementation/algorithms/operations/impure/dictionary/is_empty"
import { $$ as op_filter } from "pareto-standard-operations/dist/implementation/algorithms/operations/pure/dictionary/filter"
import { $$ as op_flatten } from "pareto-standard-operations/dist/implementation/algorithms/operations/pure/list/flatten"

import * as t_test_result_to_text from "../transformers/test_result/lines"

const has_passed = (results: d_test.Results): boolean => {
    return op_is_empty(op_filter<null>(results.map(($) => {
        return _ea.cc($, ($) => {
            switch ($[0]) {
                case 'test': return _ea.ss($, ($) => $.passed ? _ea.not_set() : _ea.set(null))
                case 'group': return _ea.ss($, ($) => has_passed($) ? _ea.not_set() : _ea.set(null))
                default: return _ea.au($[0])
            }
        })
    })))
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
            has_passed($p),
            [
                $cr.log.execute(
                    {
                        'lines': op_flatten(_ea.list_literal([
                            t_test_result_to_text.Results($p),
                            _ea.list_literal([
                                ``,
                                `all tests successful.`
                            ]),
                        ]))
                    },
                    ($) => $,
                ),
            ]
        ),
        _easync.p.if_(
            !has_passed($p),
            [
                $cr['log error'].execute(
                    {
                        'lines': op_flatten(_ea.list_literal([
                            t_test_result_to_text.Results($p),
                            _ea.list_literal([
                                ``,
                                `some tests failed`
                            ]),
                        ]))
                    },
                    ($) => $,
                ),
            ]
        )
    ]
)

