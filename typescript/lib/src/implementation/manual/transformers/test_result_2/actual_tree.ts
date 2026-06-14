// import * as pi from 'pareto-core/dist/interface'
// import * as pt from 'pareto-core/dist/assign'

// import * as d_in from "../../../../interface/to_be_generated/test_result"
// import * as d_out from "pareto-resources/dist/interface/to_be_generated/directory_content"


// const op_cast_to_non_empty_dictionary = <T>($: pi.Dictionary<T>): pi.Optional_Value<pi.Dictionary<T>> => pt.boolean.from.dictionary($).is_empty() ? pt.optional.literal.not_set() : pt.optional.literal.set($)

// export const Test_Node_Result: pi.Transformer<d_in.Test_Node_Result, pi.Optional_Value<d_out.Node>> = ($) => pt.decide.state($, ($): pi.Optional_Value<d_out.Node> => {
//     switch ($[0]) {
//         case 'collection': return pt.ss($, ($) => pt.decide.state($.result, ($) => {
//             switch ($[0]) {
//                 case 'source invalid': return pt.ss($, ($) => pt.optional.literal.not_set())
//                 case 'source valid': return pt.ss($, ($): pi.Optional_Value<d_out.Node> => pt.optional.from.optional(
//                     op_cast_to_non_empty_dictionary(Test_Group_Result($)),
//                 ).map(
//                     ($) => ['directory', $])
//                 )
//                 default: return pt.au($[0])
//             }
//         }))
//         case 'individual test': return pt.ss($, ($) => pt.decide.state($.result, ($): pi.Optional_Value<d_out.Node> => {
//             switch ($[0]) {
//                 case 'source invalid': return pt.ss($, ($) => pt.optional.literal.not_set())
//                 case 'tested': return pt.ss($, ($) => pt.decide.state($, ($) => {
//                     switch ($[0]) {
//                         case 'passed': return pt.ss($, ($) => pt.optional.literal.not_set())
//                         case 'failed': return pt.ss($, ($) => pt.decide.state($, ($) => {
//                             switch ($[0]) {
//                                 case 'transform': return pt.ss($, ($) => pt.decide.state($, ($) => {
//                                     switch ($[0]) {
//                                         case 'initialization': return pt.ss($, ($) => pt.optional.literal.not_set())
//                                         case 'unexpected output': return pt.ss($, ($) => pt.optional.literal.set(['file', $.actual]))
//                                         default: return pt.au($[0])
//                                     }
//                                 }))
//                                 case 'refine': return pt.ss($, ($) => pt.decide.state($, ($) => {
//                                     switch ($[0]) {
//                                         case 'initialization': return pt.ss($, ($) => pt.optional.literal.not_set())
//                                         case 'unexpected output': return pt.ss($, ($) => pt.optional.literal.set(['file', $.actual]))
//                                         case 'unexpected error': return pt.ss($, ($) => pt.optional.literal.set(['file', $.actual]))
//                                         case 'should have failed but succeeded': return pt.ss($, ($) => pt.optional.literal.not_set())
//                                         case 'should have succeeded but failed': return pt.ss($, ($) => pt.optional.literal.not_set())
//                                         default: return pt.au($[0])
//                                     }
//                                 }))
//                                 default: return pt.au($[0])
//                             }
//                         }))
//                         default: return pt.au($[0])
//                     }
//                 }))
//                 default: return pt.au($[0])
//             }
//         }))
//         default: return pt.au($[0])
//     }
// })

// export const Test_Group_Result: pi.Transformer<d_in.Test_Collection_Result, d_out.Directory> = ($) => pt.dictionary.from.dictionary(
//     $,
// ).map_optionally(
//     ($) => Test_Node_Result($)
// )