import * as p_ from 'pareto-core/implementation/transformer'
import p_implement_me from 'pareto-core-dev/implement_me'

import type * as interface_ from "../../../declarations/transformers/directory_content/merged_file_structure.js"

//data types
import type * as d_out from "../../../interface/schemas/merged_filesystem_nodes.js"

export const Directory: interface_.Directory = ($, $p) => p_.from.dictionary($).map(
    ($, id) => {
        const $v_support_directory = $p.support
        return p_.from.state($).decide(
            ($): d_out.Node => {
                switch ($[0]) {
                    case 'other': return p_.option($, ($): d_out.Node => p_implement_me("expected a file or a directory"))
                    case 'file': return p_.option($, ($): d_out.Node => ['file', {
                        'support': p_.from.dictionary($v_support_directory).get_possible_entry(
                            id + $p['support suffix'],
                            ($) => p_.literal.set($),
                            () => p_.literal.not_set()
                        )
                    }])
                    case 'directory': return p_.option($, ($) => {
                        const main_node = $
                        return ['directory', p_.from.dictionary($v_support_directory).get_possible_entry(
                            id,
                            ($): d_out.Directory => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'directory': return p_.option($, ($) => ['valid', Directory(
                                            main_node,
                                            {
                                                'support': $,
                                                'support suffix': $p['support suffix']
                                            })])
                                        default: return ['invalid', {
                                            'support': ['is not a directory', null],
                                            'nodes': main_node
                                        }]
                                    }
                                }),
                            (): d_out.Directory => ['invalid', {
                                'support': ['does not exist', null],
                                'nodes': main_node
                            }]
                        )]
                    })
                    default: return p_.exhaustive($[0])
                }
            }
        )
    }
)
