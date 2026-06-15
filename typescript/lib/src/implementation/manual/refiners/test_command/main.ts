import * as p_ri from 'pareto-core/dist/refiner/interface'
import p_iterate from 'pareto-core/dist/specials/iterate'

import * as builders from "../../productions/test_command/text"

import * as d from "../../../../interface/to_be_generated/test_command"
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

export const Parameters: p_ri.Refiner<d.Parameters, string, d_main.Parameters> = ($, abort) => p_iterate(
    $.arguments,
    null,
    (iterator) => iterator.assert_finished(
        () => builders.Parameters(
            iterator,
            abort,
        ),
        {
            not_finished: ($) => abort("too many arguments")
        }
    )
)