import * as _et from "exupery-core-types"
import * as _ea from "exupery-core-alg"

import * as d_in from "exupery-resources/dist/interface/algorithms/queries/directory_content"
import * as d_out from "../../../interface/data/merged_filesystem_nodes"

export const Directory: _et.Transformer_With_Parameters<d_out.Valid_Directory, d_in.Directory, {
    'support': d_in.Directory

    /**
     * the file suffix makes it possible to match a support file that is expected to have a suffix.
     * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
     */
    'support suffix': string
}> = ($, $p) => {
    return $.map(($, key) => {
        const support_directory = $p.support
        return _ea.cc($, ($): d_out.Node => {
            switch ($[0]) {
                case 'other': return _ea.ss($, ($): d_out.Node => {
                    return _ea.deprecated_panic(`expected a file or a directory`)
                })
                case 'file': return _ea.ss($, ($): d_out.Node => {
                    return ['file', {
                        'support': support_directory.__get_entry(key + $p['support suffix'])
                    }]
                })
                case 'directory': return _ea.ss($, ($) => {
                    const main_node = $
                    return ['directory', support_directory.__get_entry(key).transform(
                        ($): d_out.Directory => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'directory': return _ea.ss($, ($) => ['valid', Directory(
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
                default: return _ea.au($[0])
            }
        })
    })
}

