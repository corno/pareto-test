import * as _pt from 'pareto-core/dist/assign'
import * as p_pi from 'pareto-core/dist/production/interface'
import * as p_i from 'pareto-core/dist/interface'

import * as d from "../../../../interface/to_be_generated/test_command"


import * as r_path_from_text from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/text"


export const Parameters = (
    iterator: p_pi.Iterator<string, null>,
    abort: p_i.Abort<string>,
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