import * as _pinternals from 'pareto-core-internals'

export const transform_refinement_result = <Out, Success, Error>(
    $: _pinternals.Refinement_Result<Success, Error>,
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
        _pinternals.panic("unreachable")
    }
    return out
}