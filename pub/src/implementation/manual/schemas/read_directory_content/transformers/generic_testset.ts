import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as d_in from "pareto-resources/dist/interface/to_be_generated/directory_content"
import * as d_out from "../../../../../interface/to_be_generated/generic_testset"

const remove_suffix = ($: string, suffix: string): _pi.Optional_Value<string> => {
    let suffix_matches = true
        const main_as_characters = _p_list_from_text($, ($) => $)
        const suffix_as_characters = _p_list_from_text(suffix, ($) => $)
        const main_length = main_as_characters.__get_number_of_items()
        const suffix_length = suffix_as_characters.__get_number_of_items()
    const stripped = _p_list_build_deprecated<number>(($i) => {
        let index = -1
        main_as_characters.__l_map(($) => {
            index += 1
            if (index < main_length - suffix_length) {
                $i['add item']($)
            } else {
                //validate the right suffix
                const cur_char = $
                const suffix_index = index - (main_length - suffix_length)
                _p.optional.from.optional(
                    suffix_as_characters.__deprecated_get_possible_item_at(suffix_index),
                ).map(
                    ($) => {
                        if (cur_char !== $) {
                            suffix_matches = false
                        }
                    }
                )
            }
        })
    })
    if (suffix_matches) {
        return _p.optional.literal.set(_p_text_from_list(stripped, ($) => $))
    }
    return _p.optional.literal.set($)
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


export const Directory: _pi.Transformer_With_Parameter<d_in.Directory, d_out.Directory, Parameters> = ($, $p) => ({
    'nodes': $.__d_map(($, id) => {
        return _p.decide.state($, ($): d_out.Node => {
            switch ($[0]) {
                case 'other': return _p.ss($, ($): d_out.Node => {
                    return _p_unreachable_code_path("needs proper handling")//"expected a file or a directory"
                })
                case 'file': return _p.ss($, ($): d_out.Node => {



                    const get_matching_expect_file = ($: string): d_out.Node__file__expected => {
                        const expected_node = $p.expected.__get_possible_entry_deprecated($ + $p['suffix settings']['to be appended to expected'].__decide(
                            ($) => $,
                            () => ""
                        ))
                        return expected_node.__decide(
                            ($) => _p.decide.state($, ($): d_out.Node__file__expected => {
                                switch ($[0]) {
                                    case 'file': return _p.ss($, ($) => ['valid', $])
                                    case 'directory': return _p.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
                                    case 'other': return _p.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
                                    default: return _p.au($[0])
                                }
                            }),
                            (): d_out.Node__file__expected => ['invalid', ['expected', ['does not exist', null]]]
                        )
                    }

                    const top_node = $
                    return ['file', {
                        'input': top_node,
                        'matching': $p['suffix settings']['to be removed from input'].__decide(
                            ($) => {
                                return remove_suffix(id, $).__decide(
                                    ($): d_out.Node__file__expected => get_matching_expect_file($),
                                    (): d_out.Node__file__expected => ['invalid', ['required input suffix missing', $]]

                                )
                            },
                            (): d_out.Node__file__expected => get_matching_expect_file(id)
                        )
                    }]
                })
                case 'directory': return _p.ss($, ($) => {
                    const expected_node = $p.expected.__get_possible_entry_deprecated(id)
                    const input_node = $
                    return ['directory', expected_node.__decide(
                        ($) => _p.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'other': return _p.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
                                case 'file': return _p.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
                                case 'directory': return _p.ss($, ($) => ['valid', Directory(
                                    input_node,
                                    {
                                        'expected': $,
                                        'suffix settings': $p['suffix settings'],
                                    }
                                )])
                                default: return _p.au($[0])
                            }
                        }),
                        () => ['invalid', ['directory for expected does not exist', null]]
                    )]
                })
                default: return _p.au($[0])
            }
        })
    }),
    // 'superfluous nodes': _p.block(() => {
    //     const temp: { [id: string]: null } = {}
    //     $.__d_map(($, id) => {
    //         const key_of_expected = _p.decide.state($, ($): string => {
    //             switch ($[0]) {

    //                 case 'other': return _p.ss($, ($) => key)
    //                 case 'file': return _p.ss($, ($): string => $p['suffix settings']['to be removed from input'].__decide(
    //                     ($) => {
    //                         return remove_suffix(key, $).__decide(
    //                             ($) => $,
    //                             () => key

    //                         )
    //                     },
    //                     () => key
    //                 ))
    //                 case 'directory': return _p.ss($, ($) => key)
    //                 default: return _p.au($[0])
    //             }
    //         })
    //         temp[key_of_expected] = null
    //     })
    //     const main = _p.dictionary.literal(temp)
    //     return op_filter_dictionary($p.expected.__d_map(($, id) => {
    //         return main.get_entry(key).__d_map(() => null)
    //     }))
    // })
})

