import * as p_di from 'pareto-core/dist/data/interface'
import * as pt from 'pareto-core/dist/assign'
import * as p_ti from 'pareto-core/dist/transformer/interface'

import * as d_in from "pareto-resources/dist/interface/to_be_generated/read_directory_content"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

import * as t_read_directory_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/read_directory/fountain_pen"
import * as t_read_file_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/read_file/fountain_pen"

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: p_ti.Transformer<d_in.Error, d_out.Phrase> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'directory content processing': return pt.ss($, ($) => sh.ph.indent(
            sh.pg.sentences(pt.list.from.dictionary(
                $,
            ).convert(
                ($, id) => sh.sentence([
                    sh.ph.literal(id),
                    sh.ph.literal(": "),
                    pt.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'file': return pt.ss($, ($) => t_read_file_to_fountain_pen.Error($))
                            case 'directory': return pt.ss($, ($) => Error($))
                            default: return pt.au($[0])
                        }
                    })
                ])
            ))
        ))
        case 'read directory': return pt.ss($, ($) => t_read_directory_to_fountain_pen.Error($))
        default: return pt.au($[0])
    }
})