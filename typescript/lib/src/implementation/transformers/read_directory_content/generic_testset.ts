// import * as p_ from 'pareto-core/implementation/transformer'
// import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
// import p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

// import type * as d_in from "pareto-resources/interface/to_be_generated/directory_content"
// import type * as d_out from "../../../interface/schemas/generic_testset.js"

// const remove_suffix = ($: string, suffix: string): p_di.Optional_Value<string> => {
//     let suffix_matches = true
//         const main_as_characters = p_list_from_text(
// $, ($) => $)
//         const suffix_as_characters = p_list_from_text(
// suffix, ($) => $)
//         const main_length = main_as_characters.__get_number_of_items()
//         const suffix_length = suffix_as_characters.__get_number_of_items()
//     const stripped = p_list_build_ deprecated<number>(
// ($i) => {
//         let index = -1
//         main_as_characters.__ l_map_deprecated(
// ($) => {
//             index += 1
//             if (index < main_length - suffix_length) {
//                 $i['add item']($)
//             } else {
//                 //validate the right suffix
//                 const cur_char = $
//                 const suffix_index = index - (main_length - suffix_length)
//                 p_.from.optional(//                     suffix_as_characters.__deprecated_get_possible_item_at(suffix_index),
//                 ).map(
//                     ($) => {
//                         if (cur_char !== $) {
//                             suffix_matches = false
//                         }
//                     }
//                 )
//             }
//         })
//     })
//     if (suffix_matches) {
//         return p_.literal.set(p_text_from_list(
// stripped, ($) => $))
//     }
//     return p_.literal.set($)
// }

// export type Parameters = {
//     'expected': d_in.Directory
//     'suffix settings': Suffix_Settings
// }

// export type Suffix_Settings = {

//     /**
//      * an individual file in the main file structure will be matched against the expected file/directory with this suffix appended
//      * for esmple, to match "test1.txt" against "test1.txt.astn", the suffix would be ".astn"
//      */
//     'to be appended to expected': p_di.Optional_Value<string>
//     /**
//      * an individual file in the expected file structure will be matched against the main file/directory with this suffix removed
//      * for esmple, to match "test1.txt.astn" against "test1.txt", the suffix would be ".astn"
//      */
//     'to be removed from input': p_di.Optional_Value<string>
// }


// export const Directory: p_i.Transformer_With_Parameter<
// d_in.Directory, d_out.Directory, Parameters> = ($, $p) => ({
//     'nodes': $.__ d_map_deprecated(
// ($, id) => {
//         return p_.from.state($).decide(
// ($): d_out.Node => {
//             switch ($[0]) {
//                 case 'other': return p_.option($, () => p_unreachable_code_path("needs proper handling"))
//                 case 'file': return p_.option($, ($): d_out.Node => {



//                     const get_matching_expect_file = ($: string): d_out.Node__file__expected => {
//                         const expected_node = $p.expected.__ get_possible_entry_deprecated($ + $p['suffix settings']['to be appended to expected'].__ decide(
//                             ($) => $,
//                             () => ""
//                         ))
//                         return expected_node.__ decide(
//                             ($) => p_.from.state($).decide(
// ($): d_out.Node__file__expected => {
//                                 switch ($[0]) {
//                                     case 'file': return p_.option($, ($) => ['valid', $])
//                                     case 'directory': return p_.option($, ($) => ['invalid', ['expected', ['is not a file', null]]])
//                                     case 'other': return p_.option($, ($) => ['invalid', ['expected', ['is not a file', null]]])
//                                     default: return p_.exhaustive($[0])
//                                 }
//                             }),
//                             (): d_out.Node__file__expected => ['invalid', ['expected', ['does not exist', null]]]
//                         )
//                     }

//                     const top_node = $
//                     return ['file', {
//                         'input': top_node,
//                         'matching': $p['suffix settings']['to be removed from input'].__ decide(
//                             ($) => {
//                                 return remove_suffix(id, $).__ decide(
//                                     ($): d_out.Node__file__expected => get_matching_expect_file($),
//                                     (): d_out.Node__file__expected => ['invalid', ['required input suffix missing', $]]

//                                 )
//                             },
//                             (): d_out.Node__file__expected => get_matching_expect_file(id)
//                         )
//                     }]
//                 })
//                 case 'directory': return p_.option($, ($) => {
//                     const expected_node = $p.expected.__ get_possible_entry_deprecated(id)
//                     const input_node = $
//                     return ['directory', expected_node.__ decide(
//                         ($) => p_.from.state($).decide(
// ($) => {
//                             switch ($[0]) {
//                                 case 'other': return p_.option($, ($) => ['invalid', ['node for expected is not a directory', null]])
//                                 case 'file': return p_.option($, ($) => ['invalid', ['node for expected is not a directory', null]])
//                                 case 'directory': return p_.option($, ($) => ['valid', Directory(
//                                     input_node,
//                                     {
//                                         'expected': $,
//                                         'suffix settings': $p['suffix settings'],
//                                     }
//                                 )])
//                                 default: return p_.exhaustive($[0])
//                             }
//                         }),
//                         () => ['invalid', ['directory for expected does not exist', null]]
//                     )]
//                 })
//                 default: return p_.exhaustive($[0])
//             }
//         })
//     }),
//     // 'superfluous nodes': p_.block(
// () => {
//     //     const temp: { [id: string]: null } = {}
//     //     $.__ d_map_deprecated(
// ($, id) => {
//     //         const key_of_expected = p_.from.state($).decide(
// ($): string => {
//     //             switch ($[0]) {

//     //                 case 'other': return p_.option($, ($) => key)
//     //                 case 'file': return p_.option($, ($): string => $p['suffix settings']['to be removed from input'].__ decide(
//     //                     ($) => {
//     //                         return remove_suffix(key, $).__ decide(
//     //                             ($) => $,
//     //                             () => key

//     //                         )
//     //                     },
//     //                     () => key
//     //                 ))
//     //                 case 'directory': return p_.option($, ($) => key)
//     //                 default: return p_.exhaustive($[0])
//     //             }
//     //         })
//     //         temp[key_of_expected] = null
//     //     })
//     //     const main = p_.literal.dictionary(temp)
//     //     return op_filter_dictionary($p.expected.__ d_map_deprecated(
// ($, id) => {
//     //         return main.get_entry(key).__ d_map_deprecated(
// () => null)
//     //     }))
//     // })
// })

