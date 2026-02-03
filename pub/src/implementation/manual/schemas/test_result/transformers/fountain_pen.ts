import * as _p from 'pareto-core/dist/expression'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/block/data"
import * as d_in from "../../../../../interface/temp/generic"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export const Results = ($: d_in.Results): d_out.Group => sh.group([
    Branch($)
])


export const Branch = ($: d_in.Results): d_out.Group_Part => sh.g.sub(_p.list.from_dictionary($, ($, id) => sh.g.nested_block([
    sh.b.literal(id),
    sh.b.literal(": "),
    _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'test': return _p.ss($, ($) => $.passed
                ? sh.b.literal("✅ PASS")
                : sh.b.literal("❌ FAIL")
            )
            case 'group': return _p.ss($, ($) => sh.b.sub([
                sh.b.indent([
                    Branch($)
                ])
            ]))
            default: return _p.au($[0])
        }
    })
])))
