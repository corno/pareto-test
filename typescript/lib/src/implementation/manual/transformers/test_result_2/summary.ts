import * as pt from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

import * as d_in from "../../../../interface/data/test_result"
import * as d_out from "../../../../interface/data/summary"

export type Parameters = {
    'include passed tests': boolean
    'include structural problems': boolean
}

export const Test_Node_Result: p_i.Transformer_With_Parameter<d_in.Test_Node_Result, d_out.Test_count, Parameters> = ($, $p) => {
    const structural_problem_incrementer = $p['include structural problems'] ? 1 : 0
    return pt.decide.state($, ($) => {
        switch ($[0]) {
            case 'collection': return pt.ss($, ($) => pt.decide.state($.result, ($) => {
                switch ($[0]) {
                    case 'source invalid': return pt.ss($, ($) => structural_problem_incrementer)
                    case 'source valid': return pt.ss($, ($) => Test_Group_Result($, $p))
                    default: return pt.au($[0])
                }
            }))
            case 'individual test': return pt.ss($, ($) => pt.decide.state($.result, ($) => {
                switch ($[0]) {
                    case 'source invalid': return pt.ss($, ($) => structural_problem_incrementer)
                    case 'tested': return pt.ss($, ($) => pt.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'passed': return pt.ss($, ($) => $p['include passed tests'] ? 1 : 0)
                            case 'failed': return pt.ss($, ($) => 1)
                            default: return pt.au($[0])
                        }
                    }))
                    default: return pt.au($[0])
                }
            }))
            default: return pt.au($[0])
        }
    })
}

export const Test_Group_Result: p_i.Transformer_With_Parameter<d_in.Test_Collection_Result, d_out.Test_count, Parameters> = ($, $p) => {
    let count = 0
    $.__d_map(($): number => Test_Node_Result($, $p)).__d_map(($) => count += $)
    return count
}
