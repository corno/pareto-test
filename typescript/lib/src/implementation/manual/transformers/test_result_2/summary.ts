import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

import * as d_in from "../../../../interface/data/test_result"
import * as d_out from "../../../../interface/data/summary"

export type Parameters = {
    'include passed tests': boolean
    'include structural problems': boolean
}

export const Test_Node_Result: p_i.Transformer_With_Parameter<d_in.Test_Node_Result, d_out.Test_count, Parameters> = ($, $p) => {
    const structural_problem_incrementer = $p['include structural problems'] ? 1 : 0
    return p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'collection': return p_.ss($, ($) => p_.from.state($.result).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'source invalid': return p_.ss($, ($) => structural_problem_incrementer)
                            case 'source valid': return p_.ss($, ($) => Test_Group_Result($, $p))
                            default: return p_.au($[0])
                        }
                    }))
                case 'individual test': return p_.ss($, ($) => p_.from.state($.result).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'source invalid': return p_.ss($, ($) => structural_problem_incrementer)
                            case 'tested': return p_.ss($, ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'passed': return p_.ss($, ($) => $p['include passed tests'] ? 1 : 0)
                                        case 'failed': return p_.ss($, ($) => 1)
                                        default: return p_.au($[0])
                                    }
                                }))
                            default: return p_.au($[0])
                        }
                    }))
                default: return p_.au($[0])
            }
        })
}

export const Test_Group_Result: p_i.Transformer_With_Parameter<d_in.Test_Collection_Result, d_out.Test_count, Parameters> = ($, $p) => {
    let count = 0
    p_.from.dictionary(p_.from.dictionary($).map(
        ($): number => Test_Node_Result($, $p)
    )
    ).map(
        ($) => count += $)
    return count
}
