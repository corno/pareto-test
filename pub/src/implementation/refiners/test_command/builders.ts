import * as _ea from 'exupery-core-alg'

import * as d from "../../../interface/data/test_command"

import * as core from "../../../temp_core"

import * as ds_path from "exupery-resources/dist/implementation/deserializers/schemas/context_path"
export const Parameters = (
    abort: core.Abort<string>,
    iterator: core.Iterator<string, number>,
): d.Parameters => {
    return {
        'path to test data': iterator['consume current']().transform(
            ($) => ds_path.Context_Path($),
            () => abort("expected path to test data")
        ),
    }
}