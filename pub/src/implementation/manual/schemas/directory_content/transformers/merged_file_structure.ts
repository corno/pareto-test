import * as _pi from 'pareto-core-interface'
import * as _p from 'pareto-core-transformer'
import * as _pinternals from 'pareto-core-internals'

import * as d_in from "pareto-resources/dist/interface/to_be_generated/directory_content"
import * as d_out from "../../../../../interface/to_be_generated/merged_filesystem_nodes"

export const Directory: _pi.Transformer_With_Parameters<d_in.Directory, d_out.Valid_Directory, {
    'support': d_in.Directory

    /**
     * the file suffix makes it possible to match a support file that is expected to have a suffix.
     * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
     */
    'support suffix': string
}> = ($, $p) => {
    return $.map(($, key) => {
        const support_directory = $p.support
        return _p.cc($, ($): d_out.Node => {
            switch ($[0]) {
                case 'other': return _p.ss($, ($): d_out.Node => {
                    return _pinternals.panic(`expected a file or a directory`)
                })
                case 'file': return _p.ss($, ($): d_out.Node => {
                    return ['file', {
                        'support': support_directory.get_possible_entry(key + $p['support suffix'])
                    }]
                })
                case 'directory': return _p.ss($, ($) => {
                    const main_node = $
                    return ['directory', support_directory.get_possible_entry(key).transform(
                        ($): d_out.Directory => _p.cc($, ($) => {
                            switch ($[0]) {
                                case 'directory': return _p.ss($, ($) => ['valid', Directory(
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
                default: return _p.au($[0])
            }
        })
    })
}

