import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "../../../../interface/to_be_generated/test_result"
import * as d_out from "../../../../interface/to_be_generated/summary"

export type Parameters = {
    'include passed tests': boolean
    'include structural problems': boolean
}

export const Test_Node_Result: _pi.Transformer_With_Parameter<d_in.Test_Node_Result, d_out.Test_count, Parameters> = ($, $p) => {
    const structural_problem_incrementer = $p['include structural problems'] ? 1 : 0
    return _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'collection': return _p.ss($, ($) => _p.decide.state($.result, ($) => {
                switch ($[0]) {
                    case 'source invalid': return _p.ss($, ($) => structural_problem_incrementer)
                    case 'source valid': return _p.ss($, ($) => Test_Group_Result($, $p))
                    default: return _p.au($[0])
                }
            }))
            case 'individual test': return _p.ss($, ($) => _p.decide.state($.result, ($) => {
                switch ($[0]) {
                    case 'source invalid': return _p.ss($, ($) => structural_problem_incrementer)
                    case 'tested': return _p.ss($, ($) => _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'passed': return _p.ss($, ($) => $p['include passed tests'] ? 1 : 0)
                            case 'failed': return _p.ss($, ($) => 1)
                            default: return _p.au($[0])
                        }
                    }))
                    default: return _p.au($[0])
                }
            }))
            default: return _p.au($[0])
        }
    })
}

export const Test_Group_Result: _pi.Transformer_With_Parameter<d_in.Test_Collection_Result, d_out.Test_count, Parameters> = ($, $p) => {
    let count = 0
    $.__d_map(($): number => Test_Node_Result($, $p)).__d_map(($) => count += $)
    return count
}
