import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'
import * as _pinternals from 'pareto-core-internals'

import * as d_in from "exupery-resources/dist/interface/to_be_generated/directory_content"
import * as d_out from "../../../../interface/to_be_generated/merged_filesystem_nodes"

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
        return _pt.cc($, ($): d_out.Node => {
            switch ($[0]) {
                case 'other': return _pt.ss($, ($): d_out.Node => {
                    return _pinternals.panic(`expected a file or a directory`)
                })
                case 'file': return _pt.ss($, ($): d_out.Node => {
                    return ['file', {
                        'support': support_directory.get_entry(key + $p['support suffix'])
                    }]
                })
                case 'directory': return _pt.ss($, ($) => {
                    const main_node = $
                    return ['directory', support_directory.get_entry(key).transform(
                        ($): d_out.Directory => _pt.cc($, ($) => {
                            switch ($[0]) {
                                case 'directory': return _pt.ss($, ($) => ['valid', Directory(
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
                default: return _pt.au($[0])
            }
        })
    })
}

