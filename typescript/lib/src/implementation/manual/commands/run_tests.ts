// import * as p_qi from 'pareto-core/dist/interface/query'
// import * as p_i from 'pareto-core/dist/interface/command'



// import * as d_test from "../../../interface/temp/generic"

// import * as resources_pareto from "pareto-stream/dist/interface/resources"

// //shorthands
// import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

// export type Parameters = {
//     'test results': d_test.Results,
// }

// export type Command = p_i.Command<null, Parameters>

// export type Signature = p_i.Command_Procedure<
//     Command,
//     null,
//     null,
//     {
//         'log error': resources_pareto.commands.log_error,
//         'log': resources_pareto.commands.log,
//     }
// >

// import * as t_test_result_to_fp from "../transformers/test_result/fountain_pen"

// const has_passed = (results: d_test.Results): boolean => _pt.from.dictionary(
//     _pt.from.dictionary(results,
//     ).map_optionally(
//         ($) => _pt.from.state($).decide(($): p_di.Optional_Value<null> => {
//             switch ($[0]) {
//                 case 'test': return _pt.ss($, ($) => $.passed ? _pt.literal.not_set() : _pt.literal.set(null))
//                 case 'group': return _pt.ss($, ($) => has_passed($) ? _pt.literal.not_set() : _pt.literal.set(null))
//                 default: return _pt.au($[0])
//             }
//         })
//     )
// ).is_ empty()

// export const $$: Signature = p_.command_procedure(
//     ($d, $s, $q, $c) => [
//         $c.log.execute(
//             {
//                 'message': sh.pg.sentences([
//                     sh.sentence([
//                         sh.ph.literal("running tests..."),
//                     ])
//                 ]),
//             },
//             ($) => $,
//         ),
//         p_.s.if_.direct(
//             has_passed($d['test results']),
//             [
//                 $c.log.execute(
//                     {
//                         'message': sh.pg.sentences([
//                             sh.sentence([]),
//                             sh.sentence([
//                                 sh.ph.literal("all tests successful."),
//                             ]),
//                         ]),
//                     },
//                     ($) => $,
//                 ),
//             ]
//         ),
//         p_.s.if_.direct(
//             !has_passed($d['test results']),
//             [
//                 $c['log error'].execute(
//                     {
//                         'message': sh.pg.composed([
//                             t_test_result_to_fp.Results($d['test results']),
//                             sh.pg.sentences([
//                                 sh.sentence([]),
//                                 sh.sentence([
//                                     sh.ph.literal("some tests failed"),
//                                 ])
//                             ]),
//                         ])
//                     },
//                     ($) => $,
//                 ),
//                 // $c['write directory content'].execute(
//                 //     {
//                 //         'path': 
//                 //         'content': $p,
//                 //     },
//                 //     ($): d_write_directory_content.Error => ['writing test failures', $],
//                 // ),
//             ]
//         )
//     ]
// )

