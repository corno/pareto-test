import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'
import * as _ed from 'exupery-core-dev'

import * as d_in from "../../../interface/data/test_result"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const YELLOW = "\x1b[33m"
const ENDCOLOR = "\x1b[0m"


export const Test_Group_Result = ($: d_in.Test_Group_Result): d_out.Group_Part => {
    return sh.g.sub($.deprecated_to_array(() => 0).map(($) => sh.g.nested_block([
        sh.b.snippet($.key),
        sh.b.snippet(": "),
        _ea.cc($.value, ($) => {
            switch ($[0]) {
                case 'individual test': return _ea.ss($, ($) => _ea.cc($.result, ($) => {
                    switch ($[0]) {
                        case 'source invalid': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'not an individual test': return sh.b.snippet(YELLOW + "⚠️ NOT A TEST" + ENDCOLOR)
                                case 'problem with expected': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                    switch ($[0]) {
                                        case 'does not exist': return sh.b.snippet(YELLOW + "⚠️ NO EXPECTED" + ENDCOLOR)
                                        case 'is not an individual test': return sh.b.snippet(YELLOW + "⚠️ EXPECTED NOT TEST" + ENDCOLOR)

                                        default: return _ea.au($[0])
                                    }
                                }))
                                default: return _ea.au($[0])
                            }
                        }))
                        case 'tested': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'passed': return sh.b.snippet(GREEN + "✅ PASS" + ENDCOLOR)
                                case 'failed': return _ea.ss($, ($) => sh.b.sub([
                                    sh.b.snippet(RED + "❌ FAIL" + ENDCOLOR),
                                    sh.b.snippet($.actual)
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
                                Test_Group_Result($)
                            ])
                        ]))
                        case 'source invalid': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'missing': return sh.b.snippet(YELLOW + "⚠️ MISSING" + ENDCOLOR)
                                case 'problem with expected': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                    switch ($[0]) {

                                        case 'expected is not a group': return sh.b.snippet(YELLOW + "⚠️ EXPECTED NOT A GROUP" + ENDCOLOR)
                                        case 'expected does not exist': return sh.b.snippet(YELLOW + "⚠️ NO EXPECTED" + ENDCOLOR)
                                        default: return _ea.au($[0])
                                    }
                                }))
                                case 'not a group': return _ea.ss($, ($) => sh.b.snippet(YELLOW + "⚠️ NOT A GROUP" + ENDCOLOR))
                                default: return _ea.au($[0])
                            }
                        }))
                        default: return _ea.au($[0])
                    }
                }))
                default: return _ea.au($[0])
            }
        })
    ])))
}