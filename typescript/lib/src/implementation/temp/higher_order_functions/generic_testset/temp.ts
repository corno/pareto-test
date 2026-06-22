
// import * as d_in from "../../../../interface/data/generic_testset"
// import * as d_out from "../../../../interface/data/test_result"



// export type Tester = (
//     $p: {
//         'input': string,
//         'expected': string,
//     }
// ) => d_out.Tested


// export type Directory_to_Test_Collection_Result_Transformer = ($: d_in.Directory) => d_out.Test_Collection_Result
// export type Node_to_Test_Node_Result_Transformer = ($: d_in.Node) => d_out.Test_Node_Result

// export const create_individual_test_transformer = (
//     tester: Tester
// ): Node_to_Test_Node_Result_Transformer => ($) => ['individual test', {
//     'result': _pt.from.state($).decide(($): d_out.Individual_Test_Result__result => {
//         switch ($[0]) {
//             case 'file': return _pt.ss($, ($): d_out.Individual_Test_Result__result => {
//                 const input = $.input
//                 return _pt.decide.state($['matching'], ($): d_out.Individual_Test_Result__result => {
//                     switch ($[0]) {
//                         case 'valid': return _pt.ss($, ($) => {
//                             const expected_text = $
//                             return ['tested', tester(
//                                 {
//                                     'input': input,
//                                     'expected': expected_text,
//                                 }
//                             )]
//                         })
//                         case 'invalid': return _pt.ss($, ($): d_out.Individual_Test_Result__result => ['source invalid', ['problem with expected', $]])
//                         default: return _pt.au($[0])
//                     }
//                 })
//             })
//             default: return ['source invalid', ['not an individual test', null]]
//         }
//     })
// }]

// export const create_collection_transformer = (type: 'group' | 'dictionary', $: p_di.Dictionary<Directory_to_Test_Collection_Result_Transformer>): Directory_to_Test_Collection_Result_Transformer => (dir_group) => $.__d_map_deprecated(($, id) => {
//     const group_to_test_group_result = $
//     return ['collection', {
//         'type': type === 'group' ? ['group', null] : ['dictionary', null],
//         'result': dir_group.nodes.__ get_possible_entry_deprecated(id).__decide(
//             ($): d_out.Test_Node_Result__collection__result => _pt.from.state($).decide(($): d_out.Test_Node_Result__collection__result => {
//                 switch ($[0]) {
//                     case 'directory': return _pt.ss($, ($) => _pt.from.state($).decide(($) => {
//                         switch ($[0]) {
//                             case 'invalid': return _pt.ss($, ($): d_out.Test_Node_Result__collection__result => ['source invalid', ['problem with expected', $]])
//                             case 'valid': return _pt.ss($, ($): d_out.Test_Node_Result__collection__result => {

//                                 return ['source valid', group_to_test_group_result($)]
//                             })
//                             default: return _pt.au($[0])
//                         }
//                     }))
//                     default: return ['source invalid', ['not a collection', null]]
//                 }
//             }),
//             (): d_out.Test_Node_Result__collection__result => ['source invalid', ['missing', null]],
//         )
//     }]
// })