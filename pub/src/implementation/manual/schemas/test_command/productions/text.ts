import * as _pt from 'pareto-core-refiner'
import * as _pi from 'pareto-core-interface'

import * as d from "../../../../../interface/to_be_generated/test_command"


const consume_current = <T>(iterator: _pi.Iterator<T>): _pi.Optional_Value<T> => {
    const current = iterator['get current']()
    iterator.consume()
    return current
}

import * as ds_path from "exupery-resources/dist/implementation/deserializers/schemas/context_path"


export const Parameters = (
    iterator: _pi.Iterator<string>,
    abort: _pi.Abort<string>,
): d.Parameters => {
    return {
        'path to test data': consume_current(iterator).transform(
            ($) => ds_path.Context_Path($),
            () => abort("expected path to test data")
        ),
    }
}