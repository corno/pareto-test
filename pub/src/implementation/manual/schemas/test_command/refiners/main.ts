import * as _p from 'pareto-core-refiner'
import * as _pi from 'pareto-core-interface'

import * as builders from "../productions/text"

import * as d from "../../../../../interface/to_be_generated/test_command"
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

export const Parameters: _pi.Refiner<d.Parameters, string, d_main.Parameters> = ($, abort) => {
    return builders.Parameters(
        _p.create_iterator($.arguments),
        abort,
    )
}