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

    const do_context_path = (which: string) => sh.g.nested_block([
        sh.b.snippet($p['path to test data']),
        sh.b.snippet(`/`),
        sh.b.snippet(which),
        sh.b.snippet($p['path to test']),
    ])
    return sh.g.sub($.map(($, key): d_out.Group_Part => sh.g.nested_block([
        sh.b.snippet(key),
        sh.b.snippet(`: `),
        _ea.cc($, ($) => {
            const do_node_path = (which: string) => sh.g.nested_block([
                sh.b.snippet($p['path to test data']),
                sh.b.snippet(`/`),
                sh.b.snippet(which),
                sh.b.snippet($p['path to test']),
                sh.b.snippet(`/`),
                sh.b.snippet(key),
            ])
            switch ($[0]) {
                case 'individual test': return _ea.ss($, ($) => _ea.cc($.result, ($) => {
                    switch ($[0]) {
                        case 'source invalid': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'not an individual test': return sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(`⚠️ not a file`),
                                    sh.b.snippet(ENDCOLOR),
                                    sh.b.indent([
                                        do_node_path(`input`),
                                    ]),
                                ])
                                case 'problem with expected': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                    switch ($[0]) {
                                        case 'required input suffix missing': return _ea.ss($, ($) => sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ does not have the required suffix '`),
                                            sh.b.snippet($),
                                            sh.b.snippet(`'`),
                                            sh.b.snippet(ENDCOLOR),
                                            sh.b.indent([
                                                do_node_path(`input`),
                                            ]),
                                        ]))
                                        case 'expected': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                            switch ($[0]) {
                                                case 'does not exist': return sh.b.sub([
                                                    sh.b.snippet(YELLOW),
                                                    sh.b.snippet(`⚠️ missing in the 'expected' file structure`),
                                                    sh.b.snippet(ENDCOLOR),
                                                    sh.b.indent([
                                                        do_context_path(`expected`),
                                                    ]),
                                                ])
                                                case 'is not a file': return sh.b.sub([
                                                    sh.b.snippet(YELLOW),
                                                    sh.b.snippet(`⚠️ node in 'expected' file structure is not a file`),
                                                    sh.b.snippet(ENDCOLOR),
                                                    sh.b.indent([
                                                        do_node_path(`expected`),
                                                    ]),
                                                ])
                                                default: return _ea.au($[0])
                                            }
                                        }))

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
                                    sh.b.snippet(`✅ pass`),
                                    sh.b.snippet(ENDCOLOR),
                                ])
                                case 'failed': return _ea.ss($, ($) => sh.b.sub([
                                    sh.b.sub([
                                        sh.b.snippet(RED),
                                        sh.b.snippet(`❌ fail`),
                                        sh.b.snippet(ENDCOLOR),
                                    ]),
                                    sh.b.indent([
                                        do_node_path(`input`),
                                        do_node_path(`expected`),
                                        _ea.cc($, ($) => {
                                            switch ($[0]) {
                                                case 'transform': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                                    switch ($[0]) {
                                                        case 'initialization': return _ea.ss($, ($) => sh.g.simple_block(`initialization`))
                                                        case 'unexpected output': return _ea.ss($, ($) => sh.g.simple_block(`unexpected output`))
                                                        default: return _ea.au($[0])
                                                    }
                                                }))
                                                case 'refine': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                                    switch ($[0]) {
                                                        case 'initialization': return _ea.ss($, ($) => sh.g.simple_block(`initialization`))
                                                        case 'should have failed but succeeded': return _ea.ss($, ($) => sh.g.simple_block(`should have failed but succeeded`))
                                                        case 'should have succeeded but failed': return _ea.ss($, ($) => sh.g.simple_block(`should have succeeded but failed`))
                                                        case 'unexpected output': return _ea.ss($, ($) => sh.g.simple_block(`unexpected output`))
                                                        case 'unexpected error': return _ea.ss($, ($) => sh.g.simple_block(`unexpected error`))
                                                        default: return _ea.au($[0])
                                                    }
                                                }))
                                                default: return _ea.au($[0])
                                            }
                                        })
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

                        case 'source valid': return _ea.ss($, ($) => sh.b.sub([
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
                                    sh.b.snippet(`⚠️ missing in `),
                                    sh.b.snippet(ENDCOLOR),
                                    sh.b.indent([
                                        do_context_path(`input`),
                                    ]),
                                ])
                                case 'problem with expected': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                    switch ($[0]) {

                                        case 'node for expected is not a directory': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ node in 'expected' file structure is not a directory`),
                                            sh.b.snippet(ENDCOLOR),
                                            sh.b.indent([
                                                do_node_path(`expected`),
                                            ]),

                                        ])
                                        case 'directory for expected does not exist': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(`⚠️ missing in 'expected' file structure`),
                                            sh.b.snippet(ENDCOLOR),
                                            sh.b.indent([
                                                do_context_path(`expected`),
                                            ]),
                                        ])
                                        default: return _ea.au($[0])
                                    }
                                }))
                                case 'not a group': return _ea.ss($, ($) => sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(`⚠️ not a directory`),
                                    sh.b.snippet(ENDCOLOR),
                                    sh.b.indent([
                                        do_node_path(`input`),
                                    ]),
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