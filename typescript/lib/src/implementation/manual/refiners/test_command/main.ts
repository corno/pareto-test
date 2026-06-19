import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'

import * as builders from "../../productions/test_command/text"

import * as d from "../../../../interface/data/test_command"
import * as d_main from "pareto-resources/dist/interface/data/temp_main"

export const Parameters: p_i.Refiner<d.Parameters, string, d_main.Parameters> = ($, abort) => p_iterate(
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