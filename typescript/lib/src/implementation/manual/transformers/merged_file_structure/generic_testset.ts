// import * as p_di from 'pareto-core/dist/data/interface'

// import * as d_in from "../../../interface/data/merged_filesystem_nodes"
// import * as d_out from "../../../interface/data/generic_testset"

// export const Group: p_ti.Transformer<d_out.Node__group, d_in.Directory> = ($) => {
//     return pt.decide.state($, ($): d_out.Node__group => {
//         switch ($[0]) {
//             case 'invalid': return pt.ss($, ($): d_out.Node__group => ['expected does not exist'])
//             case 'valid': return pt.ss($, ($) => {
//                 return $.__d_map(($, id) => {
//                     const expected_node = $p.expected.get_entry(key)
//                     return pt.decide.state($, ($): d_out.Node => {
//                         switch ($[0]) {
//                             case 'other': return pt.ss($, ($): d_out.Node => {
//                                 return _pinternals.panic("expected a file or a directory")
//                             })
//                             case 'file': return pt.ss($, ($): d_out.Node => {
//                                 const top_node = $
//                                 return ['test', {
//                                     'input': top_node,
//                                     'expected': expected_node.__decide(
//                                         ($) => pt.decide.state($, ($) => {
//                                             switch ($[0]) {
//                                                 case 'file': return pt.ss($, ($) => ['valid', $])
//                                                 case 'directory': return pt.ss($, ($) => ['is not a file', null])
//                                                 case 'other': return pt.ss($, ($) => ['is not a file', null])
//                                                 default: return pt.au($[0])
//                                             }
//                                         }),
//                                         () => ['does not exist', null]
//                                     )
//                                 }]
//                             })
//                             case 'directory': return pt.ss($, ($) => {
//                                 const input_node = $
//                                 return ['group', expected_node.__decide(
//                                     ($) => pt.decide.state($, ($) => {
//                                         switch ($[0]) {
//                                             case 'other': return pt.ss($, ($) => ['expected is not a group', null])
//                                             case 'file': return pt.ss($, ($) => ['expected is not a group', null])
//                                             case 'directory': return pt.ss($, ($) => ['valid', Group(input_node, { 'expected': $ })])
//                                             default: return pt.au($[0])
//                                         }
//                                     }),
//                                     () => ['expected does not exist', null]
//                                 )]
//                             })
//                             default: return pt.au($[0])
//                         }
//                     })
//                 })
//             })
//             default: return pt.au($[0])
//         }
//     })
// }

