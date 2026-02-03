import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import { Refinement_Result } from 'pareto-core/dist/__internals/async/create_refinement_context'

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
        _p_unreachable_code_path()
    }
    return out
}