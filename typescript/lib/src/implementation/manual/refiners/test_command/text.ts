import * as p_pi from 'pareto-core/interface/refiner'

import * as d from "../../../../interface/data/test_command.js"

import * as r_path_from_text from "pareto-filesystem-unrestricted-api/implementation/manual/refiners/path_unrestricted/text"

export const Parameters: p_pi.Production<
    d.Parameters,
    string,
    string,
    null
> = (iterator, abort) => {
    return {
        'path to test data': r_path_from_text.Context_Path(
            iterator.consume(
                ($) => abort("expected path to test data"),
                ($) => $,
            ),
        )
    }
}