import * as _ea from 'exupery-core-alg'

import * as d from "../../../interface/data/test_command"

import * as core from "../../../temp_core"

import * as r_path_from_text from "exupery-resources/dist/implementation/refiners/context_path/text"
export const Parameters = (
    abort: core.Abort<string>,
    iterator: core.Iterator<string, number>,
): d.Parameters => {
    return {
        'path to test data': iterator['consume current']().transform(
            ($) => r_path_from_text.Context_Path($),
            () => abort("expected path to test data")
        ),
    }
}