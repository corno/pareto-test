import { $$ as panic } from 'pareto-core-internals/dist/sync/expression/special/panic'
import { Refinement_Result } from 'pareto-core-internals/dist/async/create_refinement_context'

export const transform_refinement_result = <Out, Success, Error>(
    $: Refinement_Result<Success, Error>,
    on_success: ($: Success) => Out,
    on_error: ($: Error) => Out,
): Out => {
    let out: null | Out = null
    $.__extract_data(
        ($) => {
            out = on_success($)
        },
        ($) => {
            out = on_error($)
        }
    )
    if (out === null) {
        panic("unreachable")
    }
    return out
}