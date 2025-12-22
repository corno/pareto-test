import * as _et from "exupery-core-types"
import * as _ea from "exupery-core-alg"

import * as d_in from "exupery-resources/dist/interface/algorithms/queries/directory_content"
import * as d_out from "../../../interface/data/generic_testset"

export type Parameters = {
    'expected': d_in.Directory

    /**
     * an individual file in the main file structure will be matched against the expected file/directory with this suffix appended
     * for esmple, to match "test1.txt" against "test1.txt.astn", the suffix would be ".astn"
     */
    'suffix to be appended to expected': _et.Optional_Value<string>
    /**
     * an individual file in the expected file structure will be matched against the main file/directory with this suffix removed
     * for esmple, to match "test1.txt.astn" against "test1.txt", the suffix would be ".astn"
     */
    'suffix to be removed from input': _et.Optional_Value<string>
}

export const Group: _et.Transformer_With_Parameters<d_out.Group, d_in.Directory, Parameters> = ($, $p) => {
    return $.map(($, key) => {
        return _ea.cc($, ($): d_out.Node => {
            switch ($[0]) {
                case 'other': return _ea.ss($, ($): d_out.Node => {
                    return _ea.deprecated_panic(`expected a file or a directory`)
                })
                case 'file': return _ea.ss($, ($): d_out.Node => {

                    const remove_suffix = ($: string, suffix: string): _et.Optional_Value<string> => {
                        let suffix_matches = true
                        const stripped = _ea.build_text(($i) => {
                            const main_as_characters = _ea.text_to_character_list($)
                            const suffix_as_characters = _ea.text_to_character_list(suffix)
                            const main_length = main_as_characters.__get_number_of_elements()
                            const suffix_length = suffix_as_characters.__get_number_of_elements()
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
                            return _ea.set(stripped)
                        }
                        return _ea.set($)
                    }


                    const get_matching_expect_file = ($: string): d_out.Node__test__expected => {
                        const expected_node = $p.expected.__get_entry($ + $p['suffix to be appended to expected'].transform(
                            ($) => $,
                            () => ``
                        ))
                        return expected_node.transform(
                            ($) => _ea.cc($, ($) => {
                                switch ($[0]) {
                                    case 'file': return _ea.ss($, ($) => ['valid', $])
                                    case 'directory': return _ea.ss($, ($) => ['invalid', ['is not an individual test', null]])
                                    case 'other': return _ea.ss($, ($) => ['invalid', ['is not an individual test', null]])
                                    default: return _ea.au($[0])
                                }
                            }),
                            () => ['invalid', ['does not exist', null]]
                        )
                    }

                    const top_node = $
                    return ['test', {
                        'input': top_node,
                        'matched expected output': $p['suffix to be removed from input'].transform(
                            ($) => {
                                return remove_suffix(key, $).transform(
                                    ($): d_out.Node__test__expected => get_matching_expect_file($),
                                    (): d_out.Node__test__expected => ['invalid', ['required input suffix missing', $]]

                                )
                            },
                            (): d_out.Node__test__expected => get_matching_expect_file(key)
                        )
                    }]
                })
                case 'directory': return _ea.ss($, ($) => {
                    const expected_node = $p.expected.__get_entry(key)

                    const input_node = $
                    return ['group', expected_node.transform(
                        ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'other': return _ea.ss($, ($) => ['invalid', ['expected is not a group', null]])
                                case 'file': return _ea.ss($, ($) => ['invalid', ['expected is not a group', null]])
                                case 'directory': return _ea.ss($, ($) => ['valid', Group(
                                    input_node,
                                    {
                                        'expected': $,
                                        'suffix to be appended to expected': $p['suffix to be appended to expected'],
                                        'suffix to be removed from input': $p['suffix to be removed from input'],
                                    }
                                )])
                                default: return _ea.au($[0])
                            }
                        }),
                        () => ['invalid', ['expected does not exist', null]]
                    )]
                })
                default: return _ea.au($[0])
            }
        })
    })
}

