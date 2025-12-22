import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'
import * as _ed from 'exupery-core-dev'

import * as d_in from "../../../interface/data/test_result"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

const RED = `\x1b[31m`
const GREEN = `\x1b[32m`
const YELLOW = `\x1b[33m`
const ENDCOLOR = `\x1b[0m`


export const Test_Group_Result = (
    $: d_in.Test_Group_Result,
    $p: {
        'path to test data': string
        'path to test': string
    }
): d_out.Group_Part => {
    return sh.g.sub($.map(($, key): d_out.Group_Part => sh.g.nested_block([
        sh.b.snippet(key),
        sh.b.snippet(`: `),
        _ea.cc($, ($) => {
            switch ($[0]) {
                case 'individual test': return _ea.ss($, ($) => _ea.cc($.result, ($) => {
                    switch ($[0]) {
                        case 'source invalid': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'not an individual test': return sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(`⚠️ NOT A TEST`),
                                    sh.b.snippet(ENDCOLOR),
                                ])
                                case 'problem with expected': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                    switch ($[0]) {
                                        case 'required input suffix missing': return _ea.ss($, ($) => sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ EXPECTED INPUT SUFFIX '`),
                                            sh.b.snippet($),
                                            sh.b.snippet(`' MISSING`),
                                            sh.b.snippet(ENDCOLOR),
                                        ]))
                                        case 'does not exist': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ NO EXPECTED`),
                                            sh.b.snippet(ENDCOLOR),
                                        ])
                                        case 'is not an individual test': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ EXPECTED NOT TEST`),
                                            sh.b.snippet(ENDCOLOR),
                                        ])

                                        default: return _ea.au($[0])
                                    }
                                }))
                                default: return _ea.au($[0])
                            }
                        }))
                        case 'tested': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'passed': return sh.b.sub([
                                    sh.b.snippet(GREEN),
                                    sh.b.snippet(`✅ PASS`),
                                    sh.b.snippet(ENDCOLOR),
                                ])
                                case 'failed': return _ea.ss($, ($) => sh.b.sub([
                                    sh.b.sub([
                                        sh.b.snippet(RED),
                                        sh.b.snippet(`❌ FAIL`),
                                        sh.b.snippet(ENDCOLOR),
                                    ]),
                                    sh.b.indent([
                                        sh.g.nested_block([
                                            sh.b.snippet($p['path to test data']),
                                            sh.b.snippet(`/input/`),
                                            sh.b.snippet($p['path to test']),
                                            sh.b.snippet(`/`),
                                            sh.b.snippet(key),
                                        ]),
                                        sh.g.nested_block([
                                            sh.b.snippet($p['path to test data']),
                                            sh.b.snippet(`/expected/`),
                                            sh.b.snippet($p['path to test']),
                                            sh.b.snippet(`/`),
                                            sh.b.snippet(key),
                                        ])
                                    ])
                                ]))
                                default: return _ea.au($[0])
                            }
                        }))
                        default: return _ea.au($[0])
                    }
                }))
                case 'group': return _ea.ss($, ($) => _ea.cc($.result, ($) => {
                    switch ($[0]) {

                        case 'tested': return _ea.ss($, ($) => sh.b.sub([
                            sh.b.indent([
                                Test_Group_Result(
                                    $,
                                    {
                                        'path to test data': $p['path to test data'],
                                        'path to test': `${$p['path to test']}/${key}`,
                                    }
                                )
                            ])
                        ]))
                        case 'source invalid': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'missing': return sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(`⚠️ MISSING`),
                                    sh.b.snippet(ENDCOLOR),
                                ])
                                case 'problem with expected': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                    switch ($[0]) {

                                        case 'expected is not a group': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ EXPECTED NOT A GROUP`),
                                            sh.b.snippet(ENDCOLOR),
                                        ])
                                        case 'expected does not exist': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ NO EXPECTED`),
                                            sh.b.snippet(ENDCOLOR),
                                        ])
                                        default: return _ea.au($[0])
                                    }
                                }))
                                case 'not a group': return _ea.ss($, ($) => sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(`⚠️ NOT A GROUP`),
                                    sh.b.snippet(ENDCOLOR),
                                ]))
                                default: return _ea.au($[0])
                            }
                        }))
                        default: return _ea.au($[0])
                    }
                }))
                default: return _ea.au($[0])
            }
        })
    ])).deprecated_to_array(() => 0).map(($) => $.value))
}