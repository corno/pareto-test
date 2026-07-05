import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import * as d_in from "pareto-resources/interface/data/read_directory_content"
import * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}
//dependencies
import * as t_read_directory_to_prose from "pareto-resources/implementation/manual/transformers/read_directory/prose"
import * as t_read_file_to_prose from "pareto-resources/implementation/manual/transformers/read_file/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'directory content processing': return p_.option($, ($) => sh.ph.indent(
                sh.pg.sentences(p_.from.dictionary($).convert_to_list(
                    ($, id) => sh.sentence([
                        sh.ph.literal(id),
                        sh.ph.literal(": "),
                        p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'file': return p_.option($, ($) => t_read_file_to_prose.Error($))
                                    case 'directory': return p_.option($, ($) => Error($))
                                    default: return p_.au($[0])
                                }
                            })
                    ])
                ))
            ))
            case 'read directory': return p_.option($, ($) => t_read_directory_to_prose.Error($))
            default: return p_.au($[0])
        }
    }
)