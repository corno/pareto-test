import * as _pt from 'pareto-core-refiner'
import * as _pi from 'pareto-core-interface'

import * as d from "../../../interface/to_be_generated/test_command"

import * as core from "../../../temp_core"

import * as ds_path from "exupery-resources/dist/implementation/deserializers/schemas/context_path"
export const Parameters = (
    abort: _pi.Abort<string>,
    iterator: core.Iterator<string, number>,
): d.Parameters => {
    return {
        'path to test data': iterator['consume current']().transform(
            ($) => ds_path.Context_Path($),
            () => abort("expected path to test data")
        ),
    }
}