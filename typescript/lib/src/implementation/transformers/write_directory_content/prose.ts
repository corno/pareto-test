import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/write_directory_content.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//dependencies
import * as t_write_file_to_prose from "pareto-filesystem-unrestricted-api/implementation/transformers/write_file/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
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
                                        default: return p_.exhaustive($[0])
                                    }
                                })
                        ])
                    ))
                )
            ]))
            // case 'make directory': return p_.option($, ($) => t_make_directory_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    }
)