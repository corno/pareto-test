import * as _p from 'pareto-core-transformer'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"
import * as d_in from "../../../../../interface/temp/generic"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export const Results = ($: d_in.Results): d_out.Group => sh.group([
    Branch($)
])


export const Branch = ($: d_in.Results): d_out.Group_Part => sh.g.sub(_p.list.from_dictionary($, ($, key) => sh.g.nested_block([
    sh.b.snippet(key),
    sh.b.snippet(": "),
    _p.sg($, ($) => {
        switch ($[0]) {
            case 'test': return _p.ss($, ($) => $.passed
                ? sh.b.snippet("✅ PASS")
                : sh.b.snippet("❌ FAIL")
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
