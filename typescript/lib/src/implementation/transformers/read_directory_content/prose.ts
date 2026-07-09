import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/read_directory_content/prose.js"
//dependencies
import * as t_read_directory_to_prose from "pareto-filesystem-unrestricted-api/implementation/transformers/read_directory/prose"
import * as t_read_file_to_prose from "pareto-filesystem-unrestricted-api/implementation/transformers/read_file/prose"

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
                                    default: return p_.exhaustive($[0])
                                }
                            })
                    ])
                ))
            ))
            case 'read directory': return p_.option($, ($) => t_read_directory_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    }
)