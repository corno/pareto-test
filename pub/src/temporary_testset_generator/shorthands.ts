import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'

import * as sh from "../implementation/temp/higher_order_functions/generic_testset/testset_shorthands"
import { Directory_to_Test_Collection_Result_Transformer } from "../implementation/temp/higher_order_functions/generic_testset/temp"
import * as testers from './interface/testers'


export const package_: ($: testers.Package) => testers.Package = ($) => $

export const schema: ($: testers.Schema) => testers.Schema = ($) => $

export const serializer = <Input, Initialize_Error>(
    extension: string,
    serializer: _pi.Serializer<Input>,
    initialize: _pi.Deserializer<Input, Initialize_Error>,
    serialize_initialize_error: _pi.Serializer<Initialize_Error>,
): Directory_to_Test_Collection_Result_Transformer => {
    return sh.transformer(
        ($, abort) => {
            return serializer(
                initialize(
                    $,
                    ($) => abort(
                        serialize_initialize_error($)
                    ),
                ),
            )
        },
    )
}

export const transformer = <Input, Output, Initialize_Error>(
    transformer: _pi.Transformer<Input, Output>,
    initialize: _pi.Deserializer<Input, Initialize_Error>,
    serialize_initialize_error: _pi.Serializer<Initialize_Error>,
    serialize_output: _pi.Serializer<Output>,
): Directory_to_Test_Collection_Result_Transformer => {
    return sh.transformer(
        ($, abort) => {
            return serialize_output(
                transformer(
                    initialize(
                        $,
                        ($) => abort(
                            serialize_initialize_error($)
                        ),
                    ),
                )
            )
        },
    )
}

export const refiner = <Output, Refine_Error, Input, Initialize_Error>(
    refiner: _pi.Refiner<Output, Refine_Error, Input>,
    initialize: _pi.Deserializer<Input, Initialize_Error>,
    serialize_initialize_error: _pi.Serializer<Initialize_Error>,
    serialize_output: _pi.Serializer<Output>,
    serialize_refine_error: _pi.Serializer<Refine_Error>,
): Directory_to_Test_Collection_Result_Transformer => {
    return sh.refiner(
        ($, abort) => {
            return serialize_output(
                refiner(
                    initialize(
                        $,
                        ($) => abort.setup(
                            serialize_initialize_error($)
                        ),
                    ),
                    ($) => abort.refine(
                        serialize_refine_error($)
                    ),
                )
            )
        },
    )
}

export const deserializer = <Output, Deserialize_Error, Initialize_Error>(
    extension: string,
    deserializer: _pi.Deserializer<Output, Deserialize_Error>,
    serialize_output: _pi.Serializer<Output>,
    serialize_deserialize_error: _pi.Serializer<Deserialize_Error>,
): Directory_to_Test_Collection_Result_Transformer => {
    return sh.refiner(
        ($, abort) => {
            return serialize_output(
                deserializer(
                    $,
                    ($) => abort.refine(
                        serialize_deserialize_error($)
                    ),
                )
            )
        },
    )
}


export const text_to_text = <Deserialize_Error, Initialize_Error>(
    extension_in: string,
    extension_out: string,
    text_to_text: _pi.Text_Deserializer<Deserialize_Error>,
    serialize_deserialize_error: _pi.Serializer<Deserialize_Error>,
): Directory_to_Test_Collection_Result_Transformer => {
    return sh.refiner(
        ($, abort) => {
            return text_to_text(
                $,
                ($) => abort.refine(
                    serialize_deserialize_error($)
                ),
            )
        },
    )
}

