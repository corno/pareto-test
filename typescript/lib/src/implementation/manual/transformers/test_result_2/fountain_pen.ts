import * as p_ from 'pareto-core/dist/implementation/transformer'

import * as d_in from "../../../../interface/data/test_result"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const YELLOW = "\x1b[33m"
const CYAN = "\x1b[36m"
const BLUE = "\x1b[34m"
const MAGENTA = "\x1b[35m"
const ENDCOLOR = "\x1b[0m"

export const Test_Collection_Result = (
    $: d_in.Test_Collection_Result,
    $p: {
        'path to test data': string
        'path to test': string
    }
): d_out.Paragraph => {

    const do_context_path = (which: string) => sh.ph.composed([
        sh.ph.literal($p['path to test data']),
        sh.ph.literal("/"),
        sh.ph.literal(which),
        sh.ph.literal($p['path to test']),
    ])
    return sh.pg.sentences(
        p_.from.dictionary($,).convert_to_list(
            ($, id) => sh.sentence([
                p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'collection': return p_.ss($, ($) => p_.from.state($.type).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'group': return p_.ss($, ($) => sh.ph.literal(CYAN))
                                        case 'dictionary': return p_.ss($, ($) => sh.ph.literal(BLUE))
                                        default: return p_.au($[0])
                                    }
                                }))
                            case 'individual test': return p_.ss($, ($) => sh.ph.literal(MAGENTA))
                            default: return p_.au($[0])
                        }
                    }),
                sh.ph.literal(id),
                sh.ph.literal(ENDCOLOR),
                p_.from.state($).decide(
                    ($) => {
                        const do_node_path = (which: string) => sh.ph.composed([
                            sh.ph.literal($p['path to test data']),
                            sh.ph.literal("/"),
                            sh.ph.literal(which),
                            sh.ph.literal($p['path to test']),
                            sh.ph.literal("/"),
                            sh.ph.literal(id),
                        ])
                        switch ($[0]) {
                            case 'individual test': return p_.ss($, ($) => p_.from.state($.result).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'source invalid': return p_.ss($, ($) => p_.from.state($).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'not an individual test': return sh.ph.composed([
                                                        sh.ph.literal(YELLOW),
                                                        sh.ph.literal(" not a file: "),
                                                        do_node_path("input"),
                                                        sh.ph.literal(ENDCOLOR),
                                                    ])
                                                    case 'problem with expected': return p_.ss($, ($) => p_.from.state($).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'required input suffix missing': return p_.ss($, ($) => sh.ph.composed([
                                                                    sh.ph.literal(YELLOW),
                                                                    sh.ph.literal(" does not have the required suffix '"),
                                                                    sh.ph.literal($),
                                                                    sh.ph.literal("': "),
                                                                    do_node_path("input"),
                                                                    sh.ph.literal(ENDCOLOR),
                                                                ]))
                                                                case 'expected': return p_.ss($, ($) => p_.from.state($).decide(
                                                                    ($) => {
                                                                        switch ($[0]) {
                                                                            case 'does not exist': return sh.ph.composed([
                                                                                sh.ph.literal(YELLOW),
                                                                                sh.ph.literal(" missing in the 'expected' file structure: "),
                                                                                do_context_path("expected"),
                                                                                sh.ph.literal(ENDCOLOR),
                                                                            ])
                                                                            case 'is not a file': return sh.ph.composed([
                                                                                sh.ph.literal(YELLOW),
                                                                                sh.ph.literal(" node in 'expected' file structure is not a file: "),
                                                                                do_node_path("expected"),
                                                                                sh.ph.literal(ENDCOLOR),
                                                                            ])
                                                                            default: return p_.au($[0])
                                                                        }
                                                                    }))

                                                                default: return p_.au($[0])
                                                            }
                                                        }))
                                                    default: return p_.au($[0])
                                                }
                                            }))
                                        case 'tested': return p_.ss($, ($) => p_.from.state($).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'passed': return sh.ph.composed([
                                                        sh.ph.literal(GREEN),
                                                        sh.ph.literal(" ✅ pass"),
                                                        sh.ph.literal(ENDCOLOR),
                                                    ])
                                                    case 'failed': return p_.ss($, ($) => sh.ph.composed([
                                                        sh.ph.composed([
                                                            sh.ph.literal(RED),
                                                            sh.ph.literal(" ❌ fail"),
                                                            sh.ph.literal(ENDCOLOR),
                                                        ]),
                                                        sh.ph.indent(
                                                            sh.pg.sentences([
                                                                sh.sentence([
                                                                    do_node_path("input"),
                                                                ]),
                                                                sh.sentence([
                                                                    do_node_path("expected"),
                                                                ]),
                                                                sh.sentence([
                                                                    p_.from.state($).decide(
                                                                        ($) => {
                                                                            switch ($[0]) {
                                                                                case 'transform': return p_.ss($, ($) => p_.from.state($).decide(
                                                                                    ($) => {
                                                                                        switch ($[0]) {
                                                                                            case 'initialization': return p_.ss($, ($) => sh.ph.literal("initialization"))
                                                                                            case 'unexpected output': return p_.ss($, ($) => sh.ph.literal("unexpected output"))
                                                                                            default: return p_.au($[0])
                                                                                        }
                                                                                    }))
                                                                                case 'refine': return p_.ss($, ($) => p_.from.state($).decide(
                                                                                    ($) => {
                                                                                        switch ($[0]) {
                                                                                            case 'initialization': return p_.ss($, ($) => sh.ph.literal("initialization"))
                                                                                            case 'should have failed but succeeded': return p_.ss($, ($) => sh.ph.literal("should have failed but succeeded"))
                                                                                            case 'should have succeeded but failed': return p_.ss($, ($) => sh.ph.literal("should have succeeded but failed"))
                                                                                            case 'unexpected output': return p_.ss($, ($) => sh.ph.literal("unexpected output"))
                                                                                            case 'unexpected error': return p_.ss($, ($) => sh.ph.literal("unexpected error"))
                                                                                            default: return p_.au($[0])
                                                                                        }
                                                                                    }))
                                                                                default: return p_.au($[0])
                                                                            }
                                                                        })
                                                                ])
                                                            ]))
                                                    ]))
                                                    default: return p_.au($[0])
                                                }
                                            }))
                                        default: return p_.au($[0])
                                    }
                                }))
                            case 'collection': return p_.ss($, ($) => p_.from.state($.result).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'source valid': return p_.ss($, ($) => sh.ph.composed([
                                            sh.ph.indent(
                                                Test_Collection_Result(
                                                    $,
                                                    {
                                                        'path to test data': $p['path to test data'],
                                                        'path to test': `${$p['path to test']}/${id}`,
                                                    }
                                                )
                                            )
                                        ]))
                                        case 'source invalid': return p_.ss($, ($) => p_.from.state($).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'missing': return sh.ph.composed([
                                                        sh.ph.literal(YELLOW),
                                                        sh.ph.literal(" missing: "),
                                                        do_context_path("input"),
                                                        sh.ph.literal(ENDCOLOR),
                                                    ])
                                                    case 'problem with expected': return p_.ss($, ($) => p_.from.state($).decide(
                                                        ($) => {
                                                            switch ($[0]) {

                                                                case 'node for expected is not a directory': return sh.ph.composed([
                                                                    sh.ph.literal(YELLOW),
                                                                    sh.ph.literal(" node in 'expected' file structure is not a directory: "),
                                                                    do_node_path("expected"),
                                                                    sh.ph.literal(ENDCOLOR),

                                                                ])
                                                                case 'directory for expected does not exist': return sh.ph.composed([
                                                                    sh.ph.literal(YELLOW),
                                                                    sh.ph.literal(" missing in 'expected' file structure: "),
                                                                    do_context_path("expected"),
                                                                    sh.ph.literal(ENDCOLOR),
                                                                ])
                                                                default: return p_.au($[0])
                                                            }
                                                        }))
                                                    case 'not a collection': return p_.ss($, ($) => sh.ph.composed([
                                                        sh.ph.literal(YELLOW),
                                                        sh.ph.literal(" not a directory: "),
                                                        do_node_path("input"),
                                                        sh.ph.literal(ENDCOLOR),
                                                    ]))
                                                    default: return p_.au($[0])
                                                }
                                            }))
                                        default: return p_.au($[0])
                                    }
                                }))
                            default: return p_.au($[0])
                        }
                    })
            ]))
    )
}