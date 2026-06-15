import * as pt from 'pareto-core/dist/transformer/implementation'
import p_implement_me from 'pareto-core-dev/dist/implement_me'
import * as p_ti from 'pareto-core/dist/transformer/interface'

import * as d_in from "pareto-resources/dist/interface/to_be_generated/directory_content"
import * as d_out from "../../../../interface/to_be_generated/merged_filesystem_nodes"

export const Directory: p_ti.Transformer_With_Parameter<d_in.Directory, d_out.Valid_Directory, {
    'support': d_in.Directory

    /**
     * the file suffix makes it possible to match a support file that is expected to have a suffix.
     * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
     */
    'support suffix': string
}> = ($, $p) => $.__d_map(($, id) => {
    const support_directory = $p.support
    return pt.decide.state($, ($): d_out.Node => {
        switch ($[0]) {
            case 'other': return pt.ss($, ($): d_out.Node => p_implement_me("expected a file or a directory"))
            case 'file': return pt.ss($, ($): d_out.Node => ['file', {
                'support': support_directory.__get_possible_entry_deprecated(id + $p['support suffix'])
            }])
            case 'directory': return pt.ss($, ($) => {
                const main_node = $
                return ['directory', support_directory.__get_possible_entry_deprecated(id).__decide(
                    ($): d_out.Directory => pt.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'directory': return pt.ss($, ($) => ['valid', Directory(
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
            default: return pt.au($[0])
        }
    })
})
