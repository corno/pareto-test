
// import type * as s_in from "../../../interface/schemas/merged_filesystem_nodes.js"
// import type * as s_out from "../../../interface/schemas/generic_testset.js"

// export const Group: p_i.Transformer<
// s_out.Node__group, s_in.Directory
// > = ($) => {
//     return p_.from.state($).decide(
//($): s_out.Node__group => {
//         switch ($[0]) {
//             case 'invalid': return p_.option($, ($): s_out.Node__group => ['expected does not exist'])
//             case 'valid': return p_.option($, ($) => {
//                 return $.__ s_map_deprecated(
//($, id) => {
//                     const expected_node = $p.expected.get_entry(key)
//                     return p_.from.state($).decide(
//($): s_out.Node => {
//                         switch ($[0]) {
//                             case 'other': return p_.option($, ($): s_out.Node => {
//                                 return _pinternals.panic("expected a file or a directory")
//                             })
//                             case 'file': return p_.option($, ($): s_out.Node => {
//                                 const top_node = $
//                                 return ['test', {
//                                     'input': top_node,
//                                     'expected': expected_node.__ decide(
//                                         ($) => p_.from.state($).decide(
//($) => {
//                                             switch ($[0]) {
//                                                 case 'file': return p_.option($, ($) => ['valid', $])
//                                                 case 'directory': return p_.option($, ($) => ['is not a file', null])
//                                                 case 'other': return p_.option($, ($) => ['is not a file', null])
//                                                 default: return p_.exhaustive($[0])
//                                             }
//                                         }),
//                                         () => ['does not exist', null]
//                                     )
//                                 }]
//                             })
//                             case 'directory': return p_.option($, ($) => {
//                                 const input_node = $
//                                 return ['group', expected_node.__ decide(
//                                     ($) => p_.from.state($).decide(
//($) => {
//                                         switch ($[0]) {
//                                             case 'other': return p_.option($, ($) => ['expected is not a group', null])
//                                             case 'file': return p_.option($, ($) => ['expected is not a group', null])
//                                             case 'directory': return p_.option($, ($) => ['valid', Group(input_node, { 'expected': $ })])
//                                             default: return p_.exhaustive($[0])
//                                         }
//                                     }),
//                                     () => ['expected does not exist', null]
//                                 )]
//                             })
//                             default: return p_.exhaustive($[0])
//                         }
//                     })
//                 })
//             })
//             default: return p_.exhaustive($[0])
//         }
//     })
// }

