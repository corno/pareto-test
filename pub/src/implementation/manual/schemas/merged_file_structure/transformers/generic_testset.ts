// import * as _pi from 'pareto-core/dist/interface'

// import * as d_in from "../../../interface/data/merged_filesystem_nodes"
// import * as d_out from "../../../interface/data/generic_testset"

// export const Group: _pi.Transformer<d_out.Node__group, d_in.Directory> = ($) => {
//     return _p.decide.state($, ($): d_out.Node__group => {
//         switch ($[0]) {
//             case 'invalid': return _p.ss($, ($): d_out.Node__group => ['expected does not exist'])
//             case 'valid': return _p.ss($, ($) => {
//                 return $.__d_map(($, key) => {
//                     const expected_node = $p.expected.get_entry(key)
//                     return _p.decide.state($, ($): d_out.Node => {
//                         switch ($[0]) {
//                             case 'other': return _p.ss($, ($): d_out.Node => {
//                                 return _pinternals.panic(`expected a file or a directory`)
//                             })
//                             case 'file': return _p.ss($, ($): d_out.Node => {
//                                 const top_node = $
//                                 return ['test', {
//                                     'input': top_node,
//                                     'expected': expected_node.__decide(
//                                         ($) => _p.decide.state($, ($) => {
//                                             switch ($[0]) {
//                                                 case 'file': return _p.ss($, ($) => ['valid', $])
//                                                 case 'directory': return _p.ss($, ($) => ['is not a file', null])
//                                                 case 'other': return _p.ss($, ($) => ['is not a file', null])
//                                                 default: return _p.au($[0])
//                                             }
//                                         }),
//                                         () => ['does not exist', null]
//                                     )
//                                 }]
//                             })
//                             case 'directory': return _p.ss($, ($) => {
//                                 const input_node = $
//                                 return ['group', expected_node.__decide(
//                                     ($) => _p.decide.state($, ($) => {
//                                         switch ($[0]) {
//                                             case 'other': return _p.ss($, ($) => ['expected is not a group', null])
//                                             case 'file': return _p.ss($, ($) => ['expected is not a group', null])
//                                             case 'directory': return _p.ss($, ($) => ['valid', Group(input_node, { 'expected': $ })])
//                                             default: return _p.au($[0])
//                                         }
//                                     }),
//                                     () => ['expected does not exist', null]
//                                 )]
//                             })
//                             default: return _p.au($[0])
//                         }
//                     })
//                 })
//             })
//             default: return _p.au($[0])
//         }
//     })
// }

