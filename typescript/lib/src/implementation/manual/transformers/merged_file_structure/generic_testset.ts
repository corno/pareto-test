
// import * as d_in from "../../../interface/data/merged_filesystem_nodes"
// import * as d_out from "../../../interface/data/generic_testset"

// export const Group: p_i.Transformer<d_out.Node__group, d_in.Directory> = ($) => {
//     return p_.from.state($).decide(($): d_out.Node__group => {
//         switch ($[0]) {
//             case 'invalid': return p_.ss($, ($): d_out.Node__group => ['expected does not exist'])
//             case 'valid': return p_.ss($, ($) => {
//                 return $.__ d_map_deprecated(($, id) => {
//                     const expected_node = $p.expected.get_entry(key)
//                     return p_.from.state($).decide(($): d_out.Node => {
//                         switch ($[0]) {
//                             case 'other': return p_.ss($, ($): d_out.Node => {
//                                 return _pinternals.panic("expected a file or a directory")
//                             })
//                             case 'file': return p_.ss($, ($): d_out.Node => {
//                                 const top_node = $
//                                 return ['test', {
//                                     'input': top_node,
//                                     'expected': expected_node.__ decide(
//                                         ($) => p_.from.state($).decide(($) => {
//                                             switch ($[0]) {
//                                                 case 'file': return p_.ss($, ($) => ['valid', $])
//                                                 case 'directory': return p_.ss($, ($) => ['is not a file', null])
//                                                 case 'other': return p_.ss($, ($) => ['is not a file', null])
//                                                 default: return p_.au($[0])
//                                             }
//                                         }),
//                                         () => ['does not exist', null]
//                                     )
//                                 }]
//                             })
//                             case 'directory': return p_.ss($, ($) => {
//                                 const input_node = $
//                                 return ['group', expected_node.__ decide(
//                                     ($) => p_.from.state($).decide(($) => {
//                                         switch ($[0]) {
//                                             case 'other': return p_.ss($, ($) => ['expected is not a group', null])
//                                             case 'file': return p_.ss($, ($) => ['expected is not a group', null])
//                                             case 'directory': return p_.ss($, ($) => ['valid', Group(input_node, { 'expected': $ })])
//                                             default: return p_.au($[0])
//                                         }
//                                     }),
//                                     () => ['expected does not exist', null]
//                                 )]
//                             })
//                             default: return p_.au($[0])
//                         }
//                     })
//                 })
//             })
//             default: return p_.au($[0])
//         }
//     })
// }

