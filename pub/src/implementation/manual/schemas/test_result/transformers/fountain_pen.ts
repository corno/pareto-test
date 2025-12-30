import * as _pt from 'pareto-core-transformer'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"
import * as d_in from "../../../../../interface/temp/generic"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export const Results = ($: d_in.Results): d_out.Group => {
    return sh.group([
        Branch($)
    ])
}


export const Branch = ($: d_in.Results): d_out.Group_Part => {
    return sh.g.sub($.to_list(($, key) => sh.g.nested_block([
        sh.b.snippet(key),
        sh.b.snippet(": "),
        _pt.cc($, ($) => {
            switch ($[0]) {
                case 'test': return _pt.ss($, ($) => $.passed
                    ? sh.b.snippet("✅ PASS")
                    : sh.b.snippet("❌ FAIL")
                )
                case 'group': return _pt.ss($, ($) => sh.b.sub([
                    sh.b.indent([
                        Branch($)
                    ])
                ]))
                default: return _pt.au($[0])
            }
        })
    ])))
}
