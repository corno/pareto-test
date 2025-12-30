import * as _pr from 'pareto-core-refiner'
import * as _pi from 'pareto-core-interface'

import * as builders from "./builders"

import * as d from "../../../interface/to_be_generated/test_command"
import * as d_main from "exupery-resources/dist/interface/to_be_generated/temp_main"

export const Parameters: _pi.Refiner<d.Parameters, string, d_main.Parameters> = ($, abort) => {
    return builders.Parameters(
        _pr.create_iterator($.arguments),
        abort,
    )
}