// import * as _et from "exupery-core-types"
// import * as _ea from "exupery-core-alg"

// import * as d_in from "../../../interface/data/merged_filesystem_nodes"
// import * as d_out from "../../../interface/data/generic_testset"

// export const Group: _et.Transformer<d_out.Node__group, d_in.Directory> = ($) => {
//     return _ea.cc($, ($): d_out.Node__group => {
//         switch ($[0]) {
//             case 'invalid': return _ea.ss($, ($): d_out.Node__group => ['expected does not exist'])
//             case 'valid': return _ea.ss($, ($) => {
//                 return $.map(($, key) => {
//                     const expected_node = $p.expected.__get_entry(key)
//                     return _ea.cc($, ($): d_out.Node => {
//                         switch ($[0]) {
//                             case 'other': return _ea.ss($, ($): d_out.Node => {
//                                 return _ea.deprecated_panic(`expected a file or a directory`)
//                             })
//                             case 'file': return _ea.ss($, ($): d_out.Node => {
//                                 const top_node = $
//                                 return ['test', {
//                                     'input': top_node,
//                                     'expected': expected_node.transform(
//                                         ($) => _ea.cc($, ($) => {
//                                             switch ($[0]) {
//                                                 case 'file': return _ea.ss($, ($) => ['valid', $])
//                                                 case 'directory': return _ea.ss($, ($) => ['is not a file', null])
//                                                 case 'other': return _ea.ss($, ($) => ['is not a file', null])
//                                                 default: return _ea.au($[0])
//                                             }
//                                         }),
//                                         () => ['does not exist', null]
//                                     )
//                                 }]
//                             })
//                             case 'directory': return _ea.ss($, ($) => {
//                                 const input_node = $
//                                 return ['group', expected_node.transform(
//                                     ($) => _ea.cc($, ($) => {
//                                         switch ($[0]) {
//                                             case 'other': return _ea.ss($, ($) => ['expected is not a group', null])
//                                             case 'file': return _ea.ss($, ($) => ['expected is not a group', null])
//                                             case 'directory': return _ea.ss($, ($) => ['valid', Group(input_node, { 'expected': $ })])
//                                             default: return _ea.au($[0])
//                                         }
//                                     }),
//                                     () => ['expected does not exist', null]
//                                 )]
//                             })
//                             default: return _ea.au($[0])
//                         }
//                     })
//                 })
//             })
//             default: return _ea.au($[0])
//         }
//     })
// }

