import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'
import p_implement_me from 'pareto-core-dev/implement_me'

//data types
import * as d_in from "pareto-filesystem-unrestricted-api/interface/data/directory_content"
import * as d_out from "../../../../interface/data/merged_filesystem_nodes.js"

export namespace interface_ {
    export type Directory = p_i.Transformer_With_Parameter<
        d_in.Directory,
        d_out.Valid_Directory,
        {
            'support': d_in.Directory

            /**
             * the file suffix makes it possible to match a support file that is expected to have a suffix.
             * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
             */
            'support suffix': string
        }
    >
}

export const Directory: interface_.Directory = ($, $p) => {
    return p_.from.dictionary($).map(
        ($, id) => {
            const $v_support_directory = $p.support
            return p_.from.state($).decide(
                ($): d_out.Node => {
                    switch ($[0]) {
                        case 'other': return p_.option($, ($): d_out.Node => {
                            return p_implement_me("expected a file or a directory")
                        })
                        case 'file': return p_.option($, ($): d_out.Node => {
                            return ['file', {
                                'support': p_.from.dictionary($v_support_directory).get_possible_entry(
                                    id + $p['support suffix'],
                                    ($) => p_.literal.set($),
                                    () => p_.literal.not_set()
                                )
                            }]
                        })
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
                })
        })
}

