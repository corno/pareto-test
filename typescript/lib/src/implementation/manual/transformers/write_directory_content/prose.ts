import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "pareto-resources/dist/interface/data/write_directory_content"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}

//dependencies
import * as t_write_file_to_prose from "pareto-resources/dist/implementation/manual/transformers/write_file/prose"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'directory content': return p_.option($, ($) => sh.ph.composed([
                sh.ph.indent(
                    sh.pg.sentences(p_.from.dictionary($).convert_to_list(
                        ($, id) => sh.sentence([
                            sh.ph.literal(id),
                            sh.ph.literal(": "),
                            p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'file': return p_.option($, ($) => t_write_file_to_prose.Error($))
                                        case 'directory': return p_.option($, ($) => Error($))
                                        default: return p_.au($[0])
                                    }
                                })
                        ])
                    ))
                )
            ]))
            // case 'make directory': return p_.option($, ($) => t_make_directory_to_prose.Error($))
            default: return p_.au($[0])
        }
    }
)