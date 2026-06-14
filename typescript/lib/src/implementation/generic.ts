// import * as pi from 'pareto-core/dist/interface'
// import * as _pt from 'pareto-core/dist/assign'

// import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

// import * as generic from "../interface/temp/generic"

// import * as resources_pareto from "pareto-stream/dist/interface/resources"

// export type Resources = {
//     'commands': {
//         'log error': resources_pareto.commands.log_error
//         'log': resources_pareto.commands.log
//     }
// }

// export const run_transformer_tests_with_parameters = <Input extends pi.Value, Expected extends pi.Value, Parameters>(
//     tests: pi.Dictionary<generic.Transformer_With_Parameter<Input, Expected, Parameters>>,
//     implementation: pi.Transformer_With_Parameter<Input, Expected, Parameters>
// ): generic.Results => tests.__d_map(($) => ['test', {
//     'passed': implementation($.input.input, $.input.parameters) === $.expected
// }])

// export const run_transformer_tests_without_parameters = <Input extends pi.Value, Expected extends pi.Value>(
//     $: pi.Dictionary<generic.Transformer<Input, Expected>>,
//     implementation: pi.Transformer<Input, Expected>
// ): generic.Results => $.__d_map(($) => ['test', {
//     'passed': implementation($.input) === $.expected
// }])

// export const run_refiner_tests_with_parameters = <Expected_Output, Expected_Error, Input, Parameters>(
//     tests: pi.Dictionary<generic.Refiner_With_Parameter<Expected_Output, Expected_Error, Input, Parameters>>,
//     implementation: pi.Refiner_With_Parameter<Expected_Output, Expected_Error, Input, Parameters>
// ): generic.Results => tests.__d_map(($) => {
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
//                         default: return _pt.au($[0])
//                     }
//                 })
//             },
//             ($) => {
//                 const error = $
//                 return _pt.decide.state(expected, ($) => {
//                     switch ($[0]) {
//                         case 'output': return _pt.ss($, ($) => false)
//                         case 'error': return _pt.ss($, ($) => error === $)
//                         default: return _pt.au($[0])
//                     }
//                 })
//             },
//         )
//     }]
// })

// export const run_refiner_tests_without_parameters = <Expected_Output, Expected_Error, Input>(
//     $: pi.Dictionary<generic.Refiner_Without_Parameters<Expected_Output, Expected_Error, Input>>,
//     implementation: pi.Refiner<Expected_Output, Expected_Error, Input>
// ): generic.Results => {
//     return $.__d_map(($) => {
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
//                             default: return _pt.au($[0])
//                         }
//                     })
//                 },
//                 ($) => {
//                     const error = $
//                     return _pt.decide.state(expected, ($) => {
//                         switch ($[0]) {
//                             case 'output': return _pt.ss($, ($) => false)
//                             case 'error': return _pt.ss($, ($) => error === $)
//                             default: return _pt.au($[0])
//                         }
//                     })
//                 },
//             )
//         }]
//     })
// }


