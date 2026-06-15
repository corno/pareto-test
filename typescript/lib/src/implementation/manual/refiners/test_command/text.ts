import * as _pt from 'pareto-core/dist/assign'
import * as p_pi from 'pareto-core/dist/production/interface'

import * as d from "../../../../interface/to_be_generated/test_command"


import * as r_path_from_text from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/text"


export const Parameters: p_pi.Production<
    d.Parameters,
    string,
    string,
    null
> = (
    iterator,
    abort,
): d.Parameters => {
    return {
        'path to test data': r_path_from_text.Context_Path(
            iterator.consume(
                ($) => $,
                () => abort("expected path to test data")
            ),
            //($) => abort(`invalid path to test data: ${$}`),
        )
    }
}