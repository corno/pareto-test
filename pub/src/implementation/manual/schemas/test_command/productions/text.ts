import * as _pt from 'pareto-core-refiner'
import * as _pi from 'pareto-core-interface'

import * as d from "../../../../../interface/to_be_generated/test_command"


import * as ds_path from "pareto-resources/dist/implementation/manual/schemas/context_path/deserializers"


export const Parameters = (
    iterator: _pi.Iterator<string>,
    abort: _pi.Abort<string>,
): d.Parameters => {
    return {
        'path to test data': ds_path.Context_Path(iterator.consume(
            ($) => $,
            () => abort("expected path to test data")
        )),
    }
}