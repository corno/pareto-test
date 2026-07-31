import type * as p_pi from 'pareto-core/interface/refiner'

import * as d from "../schema.js"

import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/deserializers"

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