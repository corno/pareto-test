
// import create_refinement_context from 'pareto-core/__internals/async/create_refinement_context'

// import * as generic from "../interface/temp/generic.js"

// import * as resources_pareto from "pareto-stream-api/interface/resources"

// export type Resources = {
//     'commands': {
//         'log error': resources_pareto.commands.log_error
//         'log': resources_pareto.commands.log
//     }
// }

// export const run_transformer_tests_with_parameters = <Input extends p_di.Value, Expected extends p_di.Value, Parameters>(
//     tests: p_di.Dictionary<generic.Transformer_With_Parameter<
// Input, Expected, Parameters>>,
//     implementation: p_ti.Transformer_With_Parameter<
// Input, Expected, Parameters>
// ): generic.Results => tests.__d_ map_ deprecated(
// ($) => ['test', {
//     'passed': implementation($.input.input, $.input.parameters) === $.expected
// }])

// export const run_transformer_tests_without_parameters = <Input extends p_di.Value, Expected extends p_di.Value>(
//     $: p_di.Dictionary<generic.Transformer<
// Input, Expected>>,
//     implementation: p_ti.Transformer<
// Input, Expected>
// ): generic.Results => p_.from.dictionary($).map(
//($) => ['test', {
//     'passed': implementation($.input) === $.expected
// }])

// export const run_refiner_tests_with_parameters = <Expected_Output, Expected_Error, Input, Parameters>(
//     tests: p_di.Dictionary<generic.Refiner_With_Parameter<
// Expected_Output, Expected_Error, Input, Parameters
// >>,
//     implementation: p_ri.Refiner_With_Parameter<
// Expected_Output, Expected_Error, Input, Parameters
// >
// ): generic.Results => tests.__d _map_deprecated(
// ($) => {
//     const expected = $.expected
//     return ['test', {
//         'passed': create_refinement_context<Expected_Output, Expected_Error>(
//             (abort) => implementation($.input.input, abort, $.input.parameters)
//         ).__extract_data(
//             ($) => {
//                 const output = $
//                 return _pt.decide.state(expected, ($) => {
//                     switch ($[0]) {
//                         case 'output': return _pt.ss($, ($) => output === $)
//                         case 'error': return _pt.ss($, ($) => false)
//                         default: return _pt.exhaustive($[0])
//                     }
//                 })
//             },
//             ($) => {
//                 const error = $
//                 return _pt.decide.state(expected, ($) => {
//                     switch ($[0]) {
//                         case 'output': return _pt.ss($, ($) => false)
//                         case 'error': return _pt.ss($, ($) => error === $)
//                         default: return _pt.exhaustive($[0])
//                     }
//                 })
//             },
//         )
//     }]
// })

// export const run_refiner_tests_without_parameters = <Expected_Output, Expected_Error, Input>(
//     $: p_di.Dictionary<generic.Refiner_  Without_Parameters<Expected_Output, Expected_Error, Input>>,
//     implementation: p_ri.Refiner<
// Expected_Output, Expected_Error, Input
// >
// ): generic.Results => {
//     return p_.from.dictionary($).map(
// ($) => {
//         const expected = $.expected
//         return ['test', {
//             'passed': create_refinement_context<Expected_Output, Expected_Error>(
//                 (abort) => implementation($.input, abort)
//             ).__extract_data(
//                 ($) => {
//                     const output = $
//                     return _pt.decide.state(expected, ($) => {
//                         switch ($[0]) {
//                             case 'output': return _pt.ss($, ($) => output === $)
//                             case 'error': return _pt.ss($, ($) => false)
//                             default: return _pt.exhaustive($[0])
//                         }
//                     })
//                 },
//                 ($) => {
//                     const error = $
//                     return _pt.decide.state(expected, ($) => {
//                         switch ($[0]) {
//                             case 'output': return _pt.ss($, ($) => false)
//                             case 'error': return _pt.ss($, ($) => error === $)
//                             default: return _pt.exhaustive($[0])
//                         }
//                     })
//                 },
//             )
//         }]
//     })
// }


