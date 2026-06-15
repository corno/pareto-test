import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "pareto-resources/dist/interface/to_be_generated/write_directory_content"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_write_file_to_fountain_pen from "pareto-resources/dist/implementation/manual/transformers/write_file/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: p_i.Transformer<d_in.Error, d_out.Phrase> = ($) => p_.decide.state($, ($) => {
    switch ($[0]) {
        case 'directory content': return p_.ss($, ($) => sh.ph.composed([
            sh.ph.indent(
                sh.pg.sentences(p_.list.from.dictionary(
                    $,
                ).convert(
                    ($, id) => sh.sentence([
                        sh.ph.literal(id),
                        sh.ph.literal(": "),
                        p_.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'file': return p_.ss($, ($) => t_write_file_to_fountain_pen.Error($))
                                case 'directory': return p_.ss($, ($) => Error($))
                                default: return p_.au($[0])
                            }
                        })
                    ])
                ))
            )
        ]))
        // case 'make directory': return p_.ss($, ($) => t_make_directory_to_fountain_pen.Error($))
        default: return p_.au($[0])
    }
})