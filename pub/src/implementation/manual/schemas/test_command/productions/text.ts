import * as _pt from 'pareto-core/dist/expression'
import * as _pi from 'pareto-core/dist/interface'

import * as d from "../../../../../interface/to_be_generated/test_command"


import * as r_path_from_text from "pareto-resources/dist/implementation/manual/schemas/context_path/refiners/text"


export const Parameters = (
    iterator: _pi.Iterator<string>,
    abort: _pi.Abort<string>,
): d.Parameters => {
    return {
        'path to test data': r_path_from_text.Context_Path(iterator.consume(
            ($) => $,
            () => abort("expected path to test data")
        )),
    }
}