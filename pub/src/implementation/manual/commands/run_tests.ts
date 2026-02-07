import * as _p from 'pareto-core/dist/command'
import * as _pt from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_test from "../../../interface/temp/generic"
import * as d_log_error from "pareto-resources/dist/interface/generated/liana/schemas/log_error/data"
import * as d_log from "pareto-resources/dist/interface/generated/liana/schemas/log/data"

import * as resources_pareto from "pareto-resources/dist/interface/resources"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/block"

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

import * as t_test_result_to_fp from "../schemas/test_result/transformers/fountain_pen"

const has_passed = (results: d_test.Results): boolean => _pt.boolean.from.dictionary(
    _pt.dictionary.from.dictionary(results,
    ).filter(
        ($) => _pt.decide.state($, ($): _pi.Optional_Value<null> => {
            switch ($[0]) {
                case 'test': return _pt.ss($, ($) => $.passed ? _pt.optional.literal.not_set() : _pt.optional.literal.set(null))
                case 'group': return _pt.ss($, ($) => has_passed($) ? _pt.optional.literal.not_set() : _pt.optional.literal.set(null))
                default: return _pt.au($[0])
            }
        })
    )
).is_empty()

export const $$: Signature = _p.command_procedure(
    ($p, $cr) => [
        $cr.log.execute(
            {
                'message': sh.pg.sentences([
                    sh.ph.literal("running tests..."),
                ]),
            },
            ($) => $,
        ),
        _p.if_.direct(
            has_passed($p['test results']),
            [
                $cr.log.execute(
                    {
                        'message': sh.pg.sentences([
                            sh.ph.literal(""),
                            sh.ph.literal("all tests successful."),
                        ]),
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
                        'message': sh.pg.composed([
                            t_test_result_to_fp.Results($p['test results']),
                            sh.pg.sentences([
                                sh.ph.literal(""),
                                sh.ph.literal("some tests failed"),
                            ]),
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

