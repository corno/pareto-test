import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'
import * as _pds from 'pareto-core-deserializer'
import * as _pinternals from 'pareto-core-internals'

import * as d_in from "pareto-resources/dist/interface/to_be_generated/directory_content"
import * as d_out from "../../../../../interface/to_be_generated/generic_testset"

const remove_suffix = ($: string, suffix: string): _pi.Optional_Value<string> => {
    let suffix_matches = true
    const stripped = _pds.build_text(($i) => {
        const main_as_characters = _pds.text_to_character_list($)
        const suffix_as_characters = _pds.text_to_character_list(suffix)
        const main_length = main_as_characters.get_number_of_elements()
        const suffix_length = suffix_as_characters.get_number_of_elements()
        let index = -1
        main_as_characters.__for_each(($) => {
            index += 1
            if (index < main_length - suffix_length) {
                $i['add character']($)
            } else {
                //validate the right suffix
                const cur_char = $
                const suffix_index = index - (main_length - suffix_length)
                suffix_as_characters.__get_element_at(suffix_index).map(($) => {
                    if (cur_char !== $) {
                        suffix_matches = false
                    }
                })
            }
        })
    })
    if (suffix_matches) {
        return _pt.set(stripped)
    }
    return _pt.set($)
}

export type Parameters = {
    'expected': d_in.Directory
    'suffix settings': Suffix_Settings
}

export type Suffix_Settings = {

    /**
     * an individual file in the main file structure will be matched against the expected file/directory with this suffix appended
     * for esmple, to match "test1.txt" against "test1.txt.astn", the suffix would be ".astn"
     */
    'to be appended to expected': _pi.Optional_Value<string>
    /**
     * an individual file in the expected file structure will be matched against the main file/directory with this suffix removed
     * for esmple, to match "test1.txt.astn" against "test1.txt", the suffix would be ".astn"
     */
    'to be removed from input': _pi.Optional_Value<string>
}


export const Directory: _pi.Transformer_With_Parameters<d_in.Directory, d_out.Directory, Parameters> = ($, $p) => {
    return {
        'nodes': $.map(($, key) => {
            return _pt.cc($, ($): d_out.Node => {
                switch ($[0]) {
                    case 'other': return _pt.ss($, ($): d_out.Node => {
                        return _pinternals.panic(`expected a file or a directory`)
                    })
                    case 'file': return _pt.ss($, ($): d_out.Node => {



                        const get_matching_expect_file = ($: string): d_out.Node__file__expected => {
                            const expected_node = $p.expected.get_entry($ + $p['suffix settings']['to be appended to expected'].transform(
                                ($) => $,
                                () => ``
                            ))
                            return expected_node.transform(
                                ($) => _pt.cc($, ($): d_out.Node__file__expected => {
                                    switch ($[0]) {
                                        case 'file': return _pt.ss($, ($) => ['valid', $])
                                        case 'directory': return _pt.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
                                        case 'other': return _pt.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
                                        default: return _pt.au($[0])
                                    }
                                }),
                                (): d_out.Node__file__expected => ['invalid', ['expected', ['does not exist', null]]]
                            )
                        }

                        const top_node = $
                        return ['file', {
                            'input': top_node,
                            'matching': $p['suffix settings']['to be removed from input'].transform(
                                ($) => {
                                    return remove_suffix(key, $).transform(
                                        ($): d_out.Node__file__expected => get_matching_expect_file($),
                                        (): d_out.Node__file__expected => ['invalid', ['required input suffix missing', $]]

                                    )
                                },
                                (): d_out.Node__file__expected => get_matching_expect_file(key)
                            )
                        }]
                    })
                    case 'directory': return _pt.ss($, ($) => {
                        const expected_node = $p.expected.get_entry(key)
                        const input_node = $
                        return ['directory', expected_node.transform(
                            ($) => _pt.cc($, ($) => {
                                switch ($[0]) {
                                    case 'other': return _pt.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
                                    case 'file': return _pt.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
                                    case 'directory': return _pt.ss($, ($) => ['valid', Directory(
                                        input_node,
                                        {
                                            'expected': $,
                                            'suffix settings': $p['suffix settings'],
                                        }
                                    )])
                                    default: return _pt.au($[0])
                                }
                            }),
                            () => ['invalid', ['directory for expected does not exist', null]]
                        )]
                    })
                    default: return _pt.au($[0])
                }
            })
        }),
        // 'superfluous nodes': _pt.block(() => {
        //     const temp: { [key: string]: null } = {}
        //     $.map(($, key) => {
        //         const key_of_expected = _pt.cc($, ($): string => {
        //             switch ($[0]) {

        //                 case 'other': return _pt.ss($, ($) => key)
        //                 case 'file': return _pt.ss($, ($): string => $p['suffix settings']['to be removed from input'].transform(
        //                     ($) => {
        //                         return remove_suffix(key, $).transform(
        //                             ($) => $,
        //                             () => key

        //                         )
        //                     },
        //                     () => key
        //                 ))
        //                 case 'directory': return _pt.ss($, ($) => key)
        //                 default: return _pt.au($[0])
        //             }
        //         })
        //         temp[key_of_expected] = null
        //     })
        //     const main = _pt.dictionary_literal(temp)
        //     return op_filter_dictionary($p.expected.map(($, key) => {
        //         return main.get_entry(key).map(() => null)
        //     }))
        // })
    }
}

