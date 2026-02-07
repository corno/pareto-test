import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_iterate from 'pareto-core/dist/_p_iterate'

import * as builders from "../productions/text"

import * as d from "../../../../../interface/to_be_generated/test_command"
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

export const Parameters: _pi.Refiner<d.Parameters, string, d_main.Parameters> = ($, abort) => _p_iterate(
    $.arguments,
    (iterator) => iterator.assert_finished(
        () => builders.Parameters(
            iterator,
            abort,
        ),
        ($) => abort("too many arguments")
    )
)