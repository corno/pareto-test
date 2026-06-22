import * as p_ from 'pareto-core/dist/implementation/transformer'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import * as p_i from 'pareto-core/dist/interface/transformer'

import * as d_in from "pareto-resources/dist/interface/data/directory_content"
import * as d_out from "../../../../interface/data/merged_filesystem_nodes"

export const Directory: p_i.Transformer_With_Parameter<d_in.Directory, d_out.Valid_Directory, {
    'support': d_in.Directory

    /**
     * the file suffix makes it possible to match a support file that is expected to have a suffix.
     * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
     */
    'support suffix': string
}> = ($, $p) => $.__d_map_deprecated(($, id) => {
    const support_directory = $p.support
    return p_.from.state($).decide(($): d_out.Node => {
        switch ($[0]) {
            case 'other': return p_.ss($, ($): d_out.Node => p_implement_me("expected a file or a directory"))
            case 'file': return p_.ss($, ($): d_out.Node => ['file', {
                'support': p_.from.dictionary(support_directory).get_possible_entry(id + $p['support suffix'])
            }])
            case 'directory': return p_.ss($, ($) => {
                const main_node = $
                return ['directory', p_.from.optional(p_.from.dictionary(support_directory).get_possible_entry(id)).decide(
                    ($): d_out.Directory => p_.from.state($).decide(($) => {
                        switch ($[0]) {
                            case 'directory': return p_.ss($, ($) => ['valid', Directory(
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
            default: return p_.au($[0])
        }
    })
})
