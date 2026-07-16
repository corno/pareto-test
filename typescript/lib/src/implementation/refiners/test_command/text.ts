import type * as p_pi from 'pareto-core/interface/refiner'

import * as d from "../../../interface/schemas/test_command.js"

import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/deserializers/path"

export const Parameters: p_pi.Production<
    d.Parameters,
    string,
    string,
    null
> = (iterator, abort) => {
    return {
        'path to test data': deser_path.Context_Path(
            iterator.consume(
                ($) => abort("expected path to test data"),
                ($) => $,
            ),
        )
    }
}