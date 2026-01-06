import * as _pi from 'pareto-core-interface'
import * as _p from 'pareto-core-transformer'

import * as d_in from "../../../../../interface/to_be_generated/test_result"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

const RED = `\x1b[31m`
const GREEN = `\x1b[32m`
const YELLOW = `\x1b[33m`
const GRAY = `\x1b[90m`
const CYAN = `\x1b[36m`
const BLUE = `\x1b[34m`
const MAGENTA = `\x1b[35m`
const ENDCOLOR = `\x1b[0m`

export const Test_Collection_Result = (
    $: d_in.Test_Collection_Result,
    $p: {
        'path to test data': string
        'path to test': string
    }
): d_out.Group_Part => {

    const do_context_path = (which: string) => sh.b.sub([
        sh.b.snippet($p['path to test data']),
        sh.b.snippet(`/`),
        sh.b.snippet(which),
        sh.b.snippet($p['path to test']),
    ])
    return sh.g.sub($.map(($, key): d_out.Group_Part => sh.g.nested_block([
        _p.sg($, ($) => {
            switch ($[0]) {
                case 'collection': return _p.ss($, ($) => _p.sg($.type, ($) => {
                    switch ($[0]) {
                        case 'group': return _p.ss($, ($) => sh.b.snippet(CYAN))
                        case 'dictionary': return _p.ss($, ($) => sh.b.snippet(BLUE))
                        default: return _p.au($[0])
                    }
                }))
                case 'individual test': return _p.ss($, ($) => sh.b.snippet(MAGENTA))
                default: return _p.au($[0])
            }
        }),
        sh.b.snippet(key),
        sh.b.snippet(ENDCOLOR),
        _p.sg($, ($) => {
            const do_node_path = (which: string) => sh.b.sub([
                sh.b.snippet($p['path to test data']),
                sh.b.snippet(`/`),
                sh.b.snippet(which),
                sh.b.snippet($p['path to test']),
                sh.b.snippet(`/`),
                sh.b.snippet(key),
            ])
            switch ($[0]) {
                case 'individual test': return _p.ss($, ($) => _p.sg($.result, ($) => {
                    switch ($[0]) {
                        case 'source invalid': return _p.ss($, ($) => _p.sg($, ($) => {
                            switch ($[0]) {
                                case 'not an individual test': return sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(` not a file: `),
                                    do_node_path(`input`),
                                    sh.b.snippet(ENDCOLOR),
                                ])
                                case 'problem with expected': return _p.ss($, ($) => _p.sg($, ($) => {
                                    switch ($[0]) {
                                        case 'required input suffix missing': return _p.ss($, ($) => sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(` does not have the required suffix '`),
                                            sh.b.snippet($),
                                            sh.b.snippet(`': `),
                                            do_node_path(`input`),
                                            sh.b.snippet(ENDCOLOR),
                                        ]))
                                        case 'expected': return _p.ss($, ($) => _p.sg($, ($) => {
                                            switch ($[0]) {
                                                case 'does not exist': return sh.b.sub([
                                                    sh.b.snippet(YELLOW),
                                                    sh.b.snippet(` missing in the 'expected' file structure: `),
                                                    do_context_path(`expected`),
                                                    sh.b.snippet(ENDCOLOR),
                                                ])
                                                case 'is not a file': return sh.b.sub([
                                                    sh.b.snippet(YELLOW),
                                                    sh.b.snippet(` node in 'expected' file structure is not a file: `),
                                                    do_node_path(`expected`),
                                                    sh.b.snippet(ENDCOLOR),
                                                ])
                                                default: return _p.au($[0])
                                            }
                                        }))

                                        default: return _p.au($[0])
                                    }
                                }))
                                default: return _p.au($[0])
                            }
                        }))
                        case 'tested': return _p.ss($, ($) => _p.sg($, ($) => {
                            switch ($[0]) {
                                case 'passed': return sh.b.sub([
                                    sh.b.snippet(GREEN),
                                    sh.b.snippet(` ✅ pass`),
                                    sh.b.snippet(ENDCOLOR),
                                ])
                                case 'failed': return _p.ss($, ($) => sh.b.sub([
                                    sh.b.sub([
                                        sh.b.snippet(RED),
                                        sh.b.snippet(` ❌ fail`),
                                        sh.b.snippet(ENDCOLOR),
                                    ]),
                                    sh.b.indent([
                                        sh.g.nested_block([
                                            do_node_path(`input`),
                                        ]),
                                        sh.g.nested_block([
                                            do_node_path(`expected`),
                                        ]),
                                        _p.sg($, ($) => {
                                            switch ($[0]) {
                                                case 'transform': return _p.ss($, ($) => _p.sg($, ($) => {
                                                    switch ($[0]) {
                                                        case 'initialization': return _p.ss($, ($) => sh.g.simple_block(`initialization`))
                                                        case 'unexpected output': return _p.ss($, ($) => sh.g.simple_block(`unexpected output`))
                                                        default: return _p.au($[0])
                                                    }
                                                }))
                                                case 'refine': return _p.ss($, ($) => _p.sg($, ($) => {
                                                    switch ($[0]) {
                                                        case 'initialization': return _p.ss($, ($) => sh.g.simple_block(`initialization`))
                                                        case 'should have failed but succeeded': return _p.ss($, ($) => sh.g.simple_block(`should have failed but succeeded`))
                                                        case 'should have succeeded but failed': return _p.ss($, ($) => sh.g.simple_block(`should have succeeded but failed`))
                                                        case 'unexpected output': return _p.ss($, ($) => sh.g.simple_block(`unexpected output`))
                                                        case 'unexpected error': return _p.ss($, ($) => sh.g.simple_block(`unexpected error`))
                                                        default: return _p.au($[0])
                                                    }
                                                }))
                                                default: return _p.au($[0])
                                            }
                                        })
                                    ])
                                ]))
                                default: return _p.au($[0])
                            }
                        }))
                        default: return _p.au($[0])
                    }
                }))
                case 'collection': return _p.ss($, ($) => _p.sg($.result, ($) => {
                    switch ($[0]) {

                        case 'source valid': return _p.ss($, ($) => sh.b.sub([
                            sh.b.indent([
                                Test_Collection_Result(
                                    $,
                                    {
                                        'path to test data': $p['path to test data'],
                                        'path to test': `${$p['path to test']}/${key}`,
                                    }
                                )
                            ])
                        ]))
                        case 'source invalid': return _p.ss($, ($) => _p.sg($, ($) => {
                            switch ($[0]) {
                                case 'missing': return sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(` missing: `),
                                    do_context_path(`input`),
                                    sh.b.snippet(ENDCOLOR),
                                ])
                                case 'problem with expected': return _p.ss($, ($) => _p.sg($, ($) => {
                                    switch ($[0]) {

                                        case 'node for expected is not a directory': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(` node in 'expected' file structure is not a directory: `),
                                            do_node_path(`expected`),
                                            sh.b.snippet(ENDCOLOR),

                                        ])
                                        case 'directory for expected does not exist': return sh.b.sub([
                                            sh.b.snippet(YELLOW),
                                            sh.b.snippet(` missing in 'expected' file structure: `),
                                            do_context_path(`expected`),
                                            sh.b.snippet(ENDCOLOR),
                                        ])
                                        default: return _p.au($[0])
                                    }
                                }))
                                case 'not a collection': return _p.ss($, ($) => sh.b.sub([
                                    sh.b.snippet(YELLOW),
                                    sh.b.snippet(` not a directory: `),
                                    do_node_path(`input`),
                                    sh.b.snippet(ENDCOLOR),
                                ]))
                                default: return _p.au($[0])
                            }
                        }))
                        default: return _p.au($[0])
                    }
                }))
                default: return _p.au($[0])
            }
        })
    ])).to_list(($, key) => $))
}