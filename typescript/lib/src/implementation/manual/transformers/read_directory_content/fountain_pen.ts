import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

import * as d_in from "pareto-resources/dist/interface/data/read_directory_content"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

import * as t_read_directory_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/read_directory/fountain_pen"
import * as t_read_file_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/read_file/fountain_pen"

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: p_i.Transformer<d_in.Error, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'directory content processing': return p_.ss($, ($) => sh.ph.indent(
                sh.pg.sentences(p_.from.dictionary($,
                ).convert_to_list(
                    ($, id) => sh.sentence([
                        sh.ph.literal(id),
                        sh.ph.literal(": "),
                        p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'file': return p_.ss($, ($) => t_read_file_to_fountain_pen.Error($))
                                    case 'directory': return p_.ss($, ($) => Error($))
                                    default: return p_.au($[0])
                                }
                            })
                    ])
                ))
            ))
            case 'read directory': return p_.ss($, ($) => t_read_directory_to_fountain_pen.Error($))
            default: return p_.au($[0])
        }
    })