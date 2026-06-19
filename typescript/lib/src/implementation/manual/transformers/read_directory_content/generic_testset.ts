// import * as p_ from 'pareto-core/dist/implementation/transformer'
// import p_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'
// import p_list_build_deprecated from 'pareto-core/dist/implementation/refiner/specials/list_build_deprecated'
// import p_list_from_text from 'pareto-core/dist/implementation/refiner/specials/list_from_text'
// import p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

// import * as d_in from "pareto-resources/dist/interface/to_be_generated/directory_content"
// import * as d_out from "../../../../interface/data/generic_testset"

// const remove_suffix = ($: string, suffix: string): p_di.Optional_Value<string> => {
//     let suffix_matches = true
//         const main_as_characters = p_list_from_text(
// $, ($) => $)
//         const suffix_as_characters = p_list_from_text(
// suffix, ($) => $)
//         const main_length = main_as_characters.__get_number_of_items()
//         const suffix_length = suffix_as_characters.__get_number_of_items()
//     const stripped = p_list_build_deprecated<number>(($i) => {
//         let index = -1
//         main_as_characters.__l_map_deprecated(($) => {
//             index += 1
//             if (index < main_length - suffix_length) {
//                 $i['add item']($)
//             } else {
//                 //validate the right suffix
//                 const cur_char = $
//                 const suffix_index = index - (main_length - suffix_length)
//                 p_.from.optional(
//                     suffix_as_characters.__deprecated_get_possible_item_at(suffix_index),
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


// export const Directory: p_i.Transformer_With_Parameter<d_in.Directory, d_out.Directory, Parameters> = ($, $p) => ({
//     'nodes': $.__d_map_deprecated(($, id) => {
//         return p_.from.state($).decide(($): d_out.Node => {
//             switch ($[0]) {
//                 case 'other': return p_.ss($, () => p_unreachable_code_path("needs proper handling"))
//                 case 'file': return p_.ss($, ($): d_out.Node => {



//                     const get_matching_expect_file = ($: string): d_out.Node__file__expected => {
//                         const expected_node = $p.expected.__get_possible_entry_deprecated($ + $p['suffix settings']['to be appended to expected'].__decide(
//                             ($) => $,
//                             () => ""
//                         ))
//                         return expected_node.__decide(
//                             ($) => p_.from.state($).decide(($): d_out.Node__file__expected => {
//                                 switch ($[0]) {
//                                     case 'file': return p_.ss($, ($) => ['valid', $])
//                                     case 'directory': return p_.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
//                                     case 'other': return p_.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
//                                     default: return p_.au($[0])
//                                 }
//                             }),
//                             (): d_out.Node__file__expected => ['invalid', ['expected', ['does not exist', null]]]
//                         )
//                     }

//                     const top_node = $
//                     return ['file', {
//                         'input': top_node,
//                         'matching': $p['suffix settings']['to be removed from input'].__decide(
//                             ($) => {
//                                 return remove_suffix(id, $).__decide(
//                                     ($): d_out.Node__file__expected => get_matching_expect_file($),
//                                     (): d_out.Node__file__expected => ['invalid', ['required input suffix missing', $]]

//                                 )
//                             },
//                             (): d_out.Node__file__expected => get_matching_expect_file(id)
//                         )
//                     }]
//                 })
//                 case 'directory': return p_.ss($, ($) => {
//                     const expected_node = $p.expected.__get_possible_entry_deprecated(id)
//                     const input_node = $
//                     return ['directory', expected_node.__decide(
//                         ($) => p_.from.state($).decide(($) => {
//                             switch ($[0]) {
//                                 case 'other': return p_.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
//                                 case 'file': return p_.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
//                                 case 'directory': return p_.ss($, ($) => ['valid', Directory(
//                                     input_node,
//                                     {
//                                         'expected': $,
//                                         'suffix settings': $p['suffix settings'],
//                                     }
//                                 )])
//                                 default: return p_.au($[0])
//                             }
//                         }),
//                         () => ['invalid', ['directory for expected does not exist', null]]
//                     )]
//                 })
//                 default: return p_.au($[0])
//             }
//         })
//     }),
//     // 'superfluous nodes': p_.block(() => {
//     //     const temp: { [id: string]: null } = {}
//     //     $.__d_map_deprecated(($, id) => {
//     //         const key_of_expected = p_.from.state($).decide(($): string => {
//     //             switch ($[0]) {

//     //                 case 'other': return p_.ss($, ($) => key)
//     //                 case 'file': return p_.ss($, ($): string => $p['suffix settings']['to be removed from input'].__decide(
//     //                     ($) => {
//     //                         return remove_suffix(key, $).__decide(
//     //                             ($) => $,
//     //                             () => key

//     //                         )
//     //                     },
//     //                     () => key
//     //                 ))
//     //                 case 'directory': return p_.ss($, ($) => key)
//     //                 default: return p_.au($[0])
//     //             }
//     //         })
//     //         temp[key_of_expected] = null
//     //     })
//     //     const main = p_.literal.dictionary(temp)
//     //     return op_filter_dictionary($p.expected.__d_map_deprecated(($, id) => {
//     //         return main.get_entry(key).__d_map_deprecated(() => null)
//     //     }))
//     // })
// })

