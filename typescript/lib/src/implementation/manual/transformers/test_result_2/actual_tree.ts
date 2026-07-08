// import * as p_ from 'pareto-core/implementation/transformer'

// import * as d_in from "../../../../interface/data/test_result.js"
// import * as d_out from "pareto-resources/interface/to_be_generated/directory_content"


// const op_cast_to_non_empty_dictionary = <T>($: p_di.Dictionary<T>): p_di.Optional_Value<p_di.Dictionary<T>> => p_.from.dictionary($).is _empty() ? p_.literal.not_set() : p_.literal.set($)

// export const Test_Node_Result: p_i.Transformer<
// d_in.Test_Node_Result, p_di.Optional_Value<d_out.Node
// >> = ($) => p_.from.state($).decide(
//($): p_di.Optional_Value<d_out.Node> => {
//     switch ($[0]) {
//         case 'collection': return p_.option($, ($) => p_.from.state($.result).decide(
//($) => {
//             switch ($[0]) {
//                 case 'source invalid': return p_.option($, ($) => p_.literal.not_set())
//                 case 'source valid': return p_.option($, ($): p_di.Optional_Value<d_out.Node> => p_.from.optional(//                     op_cast_to_non_empty_dictionary(Test_Group_Result($)),
//                 ).map(
//                     ($) => ['directory', $])
//                 )
//                 default: return p_.exhaustive($[0])
//             }
//         }))
//         case 'individual test': return p_.option($, ($) => p_.decide.state($.result, ($): p_di.Optional_Value<d_out.Node> => {
//             switch ($[0]) {
//                 case 'source invalid': return p_.option($, ($) => p_.literal.not_set())
//                 case 'tested': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//                     switch ($[0]) {
//                         case 'passed': return p_.option($, ($) => p_.literal.not_set())
//                         case 'failed': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//                             switch ($[0]) {
//                                 case 'transform': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//                                     switch ($[0]) {
//                                         case 'initialization': return p_.option($, ($) => p_.literal.not_set())
//                                         case 'unexpected output': return p_.option($, ($) => p_.literal.set(['file', $.actual]))
//                                         default: return p_.exhaustive($[0])
//                                     }
//                                 }))
//                                 case 'refine': return p_.option($, ($) => p_.from.state($).decide(
//($) => {
//                                     switch ($[0]) {
//                                         case 'initialization': return p_.option($, ($) => p_.literal.not_set())
//                                         case 'unexpected output': return p_.option($, ($) => p_.literal.set(['file', $.actual]))
//                                         case 'unexpected error': return p_.option($, ($) => p_.literal.set(['file', $.actual]))
//                                         case 'should have failed but succeeded': return p_.option($, ($) => p_.literal.not_set())
//                                         case 'should have succeeded but failed': return p_.option($, ($) => p_.literal.not_set())
//                                         default: return p_.exhaustive($[0])
//                                     }
//                                 }))
//                                 default: return p_.exhaustive($[0])
//                             }
//                         }))
//                         default: return p_.exhaustive($[0])
//                     }
//                 }))
//                 default: return p_.exhaustive($[0])
//             }
//         }))
//         default: return p_.exhaustive($[0])
//     }
// })

// export const Test_Group_Result: p_i.Transformer<
// d_in.Test_Collection_Result, d_out.Directory
// > = ($) => p_.from.dictionary(//     $,
// ).map_optionally(
//     ($) => Test_Node_Result($)
// )