import * as _p from 'pareto-core/dist/assign'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_in from "../../../../interface/temp/generic"

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Results = ($: d_in.Results): d_out.Paragraph => Branch($)


export const Branch = ($: d_in.Results): d_out.Paragraph => sh.pg.sentences(_p.list.from.dictionary(
    $,
).convert(
    ($, id) => sh.sentence([
        sh.ph.literal(id),
        sh.ph.literal(": "),
        _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'test': return _p.ss($, ($) => $.passed
                    ? sh.ph.literal("✅ PASS")
                    : sh.ph.literal("❌ FAIL")
                )
                case 'group': return _p.ss($, ($) => sh.ph.composed([
                    sh.ph.indent(
                        Branch($)
                    )
                ]))
                default: return _p.au($[0])
            }
        })
    ])
))
