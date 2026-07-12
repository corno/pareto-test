import * as p_ from 'pareto-core/implementation/transformer'
import p_implement_me from 'pareto-core-dev/implement_me'

//schemas
import type * as s_in from "../../../interface/schemas/directory_content.js"
import type * as s_out from "../../../interface/schemas/merged_filesystem_nodes.js"

namespace declarations {
    export type Directory = p_.Transformer_With_Parameter<
        s_in.Directory,
        s_out.Valid_Directory,
        {
        'support': s_in.Directory

        /**
         * the file suffix makes it possible to match a support file that is expected to have a suffix.
         * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
         */
        'support suffix': string
    }
    >
}

//schemas

export const Directory: declarations.Directory = ($, $p) => p_.from.dictionary($).map(
    ($, id) => {
        const $v_support_directory = $p.support
        return p_.from.state($).decide(
            ($): s_out.Node => {
                switch ($[0]) {
                    case 'other': return p_.option($, ($): s_out.Node => p_implement_me("expected a file or a directory"))
                    case 'file': return p_.option($, ($): s_out.Node => ['file', {
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
                            ($): s_out.Directory => p_.from.state($).decide(
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
                            (): s_out.Directory => ['invalid', {
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
