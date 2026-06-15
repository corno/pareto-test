// import * as pt from 'pareto-core/dist/transformer/implementation'
// import * as p_di from 'pareto-core/dist/data/interface'
// import p_unreachable_code_path from 'pareto-core/dist/specials/unreachable_code_path'
// import p_list_build_deprecated from 'pareto-core/dist/specials/list_build_deprecated'
// import p_list_from_text from 'pareto-core/dist/specials/list_from_text'
// import p_text_from_list from 'pareto-core/dist/specials/text_from_list'

// import * as d_in from "pareto-resources/dist/interface/to_be_generated/directory_content"
// import * as d_out from "../../../../interface/to_be_generated/generic_testset"

// const remove_suffix = ($: string, suffix: string): p_di.Optional_Value<string> => {
//     let suffix_matches = true
//     const main_as_characters = p_list_from_text($, ($) => $)
//     const suffix_as_characters = p_list_from_text(suffix, ($) => $)
//     const main_length = main_as_characters.__get_number_of_items()
//     const suffix_length = suffix_as_characters.__get_number_of_items()
    
//     const stripped = p_list_build_deprecated<number>(($i) => {
//         let index = -1
//         main_as_characters.__l_map(($) => {
//             index += 1
//             if (index < main_length - suffix_length) {
//                 $i['add item']($)
//             } else {
//                 //validate the right suffix
//                 const cur_char = $
//                 const suffix_index = index - (main_length - suffix_length)
//                 pt.optional.from.optional(
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
//         return pt.optional.literal.set(p_text_from_list(stripped, ($) => $))
//     }
//     return pt.optional.literal.set($)
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


// export const Directory: p_ti.Transformer_With_Parameter<d_in.Directory, d_out.Directory, Parameters> = ($, $p) => ({
//     'nodes': $.__d_map(($, id) => pt.decide.state($, ($): d_out.Node => {
//         switch ($[0]) {
//             case 'other': return pt.ss($, () => p_unreachable_code_path("this needs proper handling"))//"expected a file or a directory"
//             case 'file': return pt.ss($, ($): d_out.Node => {



//                 const get_matching_expect_file = ($: string): d_out.Node__file__expected => {
//                     const expected_node = $p.expected.__get_possible_entry_deprecated($ + $p['suffix settings']['to be appended to expected'].__decide(
//                         ($) => $,
//                         () => ""
//                     ))
//                     return expected_node.__decide(
//                         ($) => pt.decide.state($, ($): d_out.Node__file__expected => {
//                             switch ($[0]) {
//                                 case 'file': return pt.ss($, ($) => ['valid', $])
//                                 case 'directory': return pt.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
//                                 case 'other': return pt.ss($, ($) => ['invalid', ['expected', ['is not a file', null]]])
//                                 default: return pt.au($[0])
//                             }
//                         }),
//                         (): d_out.Node__file__expected => ['invalid', ['expected', ['does not exist', null]]]
//                     )
//                 }

//                 const top_node = $
//                 return ['file', {
//                     'input': top_node,
//                     'matching': $p['suffix settings']['to be removed from input'].__decide(
//                         ($) => remove_suffix(id, $).__decide(
//                             ($): d_out.Node__file__expected => get_matching_expect_file($),
//                             (): d_out.Node__file__expected => ['invalid', ['required input suffix missing', $]]

//                         ),
//                         (): d_out.Node__file__expected => get_matching_expect_file(id)
//                     )
//                 }]
//             })
//             case 'directory': return pt.ss($, ($) => {
//                 const expected_node = $p.expected.__get_possible_entry_deprecated(id)
//                 const input_node = $
//                 return ['directory', expected_node.__decide(
//                     ($) => pt.decide.state($, ($) => {
//                         switch ($[0]) {
//                             case 'other': return pt.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
//                             case 'file': return pt.ss($, ($) => ['invalid', ['node for expected is not a directory', null]])
//                             case 'directory': return pt.ss($, ($) => ['valid', Directory(
//                                 input_node,
//                                 {
//                                     'expected': $,
//                                     'suffix settings': $p['suffix settings'],
//                                 }
//                             )])
//                             default: return pt.au($[0])
//                         }
//                     }),
//                     () => ['invalid', ['directory for expected does not exist', null]]
//                 )]
//             })
//             default: return pt.au($[0])
//         }
//     })),
//     // 'superfluous nodes': pt.block(() => {
//     //     const temp: { [id: string]: null } = {}
//     //     $.__d_map(($, id) => {
//     //         const key_of_expected = pt.decide.state($, ($): string => {
//     //             switch ($[0]) {

//     //                 case 'other': return pt.ss($, ($) => key)
//     //                 case 'file': return pt.ss($, ($): string => $p['suffix settings']['to be removed from input'].__decide(
//     //                     ($) => {
//     //                         return remove_suffix(key, $).__decide(
//     //                             ($) => $,
//     //                             () => key

//     //                         )
//     //                     },
//     //                     () => key
//     //                 ))
//     //                 case 'directory': return pt.ss($, ($) => key)
//     //                 default: return pt.au($[0])
//     //             }
//     //         })
//     //         temp[key_of_expected] = null
//     //     })
//     //     const main = pt.dictionary.literal(temp)
//     //     return op_filter_dictionary($p.expected.__d_map(($, id) => {
//     //         return main.get_entry(key).__d_map(() => null)
//     //     }))
//     // })
// })