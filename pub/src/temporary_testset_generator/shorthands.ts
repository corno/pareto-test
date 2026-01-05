import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'

import * as testers from './interface/testers'


export const package_: ($: testers.Package) => testers.Package = ($) => $

type Raw_Dictionary<T> = { [key: string]: T }

export const schema = (
    deserializers: Raw_Dictionary<testers.Deserializer>,
    refiners: Raw_Dictionary<Raw_Dictionary<testers.Refiner>>,
    transformers: Raw_Dictionary<Raw_Dictionary<testers.Transformer>>,
    serializers: Raw_Dictionary<testers.Serializer>,
    text_to_text: Raw_Dictionary<testers.Text_to_Text>,
): testers.Schema => {
    return {
        'deserializers': _pt.dictionary.literal(deserializers),
        'refiners': _pt.dictionary.literal(refiners).map(($) => _pt.dictionary.literal($)),
        'transformers': _pt.dictionary.literal(transformers).map(($) => _pt.dictionary.literal($)),
        'serializers': _pt.dictionary.literal(serializers),
        'text_to_text': _pt.dictionary.literal(text_to_text),
    }
}


export const serializer = <Input, Initialize_Error>(
    extension: string,
    serializer: _pi.Serializer<Input>,
    initialize: _pi.Deserializer<Input, Initialize_Error>,
    serialize_initialize_error: _pi.Serializer<Initialize_Error>,
): testers.Serializer => {
    return {
        extension: extension,
        process: ($, abort) => {
            return serializer(
                initialize(
                    $,
                    ($) => abort(
                        serialize_initialize_error($)
                    ),
                )
            )
        }
    }
}

export const transformer = <Input, Output, Initialize_Error>(
    transformer: _pi.Transformer<Input, Output>,
    initialize: _pi.Deserializer<Input, Initialize_Error>,
    serialize_initialize_error: _pi.Serializer<Initialize_Error>,
    serialize_output: _pi.Serializer<Output>,
): testers.Transformer => {
    return {
        process: ($, abort) => {
            return serialize_output(
                transformer(
                    initialize(
                        $,
                        ($) => abort(
                            serialize_initialize_error($)
                        ),
                    )
                )
            )
        }
    }
}

export const refiner = <Output, Refine_Error, Input, Initialize_Error>(
    refiner: _pi.Refiner<Output, Refine_Error, Input>,
    initialize: _pi.Deserializer<Input, Initialize_Error>,
    serialize_initialize_error: _pi.Serializer<Initialize_Error>,
    serialize_output: _pi.Serializer<Output>,
    serialize_refine_error: _pi.Serializer<Refine_Error>,
): testers.Refiner => {
    return {
        process: ($, abort) => {
            return serialize_output(
                refiner(
                    initialize(
                        $,
                        ($) => abort.initialize(
                            serialize_initialize_error($)
                        ),
                    ),
                    ($) => abort.refine(
                        serialize_refine_error($)
                    ),
                )
            )
        }
    }
}

export const deserializer = <Output, Deserialize_Error, Initialize_Error>(
    extension: string,
    deserializer: _pi.Deserializer<Output, Deserialize_Error>,
    serialize_output: _pi.Serializer<Output>,
    serialize_deserialize_error: _pi.Serializer<Deserialize_Error>,
): testers.Deserializer => {
    return {
        extension: extension,
        process: ($, abort) => {
            return serialize_output(
                deserializer(
                    $,
                    ($) => abort(
                        serialize_deserialize_error($)
                    ),
                )
            )
        }
    }
}


export const text_to_text = <Deserialize_Error, Initialize_Error>(
    extension_in: string,
    extension_out: string,
    text_to_text: _pi.Text_Deserializer<Deserialize_Error>,
    serialize_deserialize_error: _pi.Serializer<Deserialize_Error>,
): testers.Text_to_Text => {
    return {
        in_extension: extension_in,
        out_extension: extension_out,
        process: ($, abort) => {
            return text_to_text(
                $,
                ($) => abort(
                    serialize_deserialize_error($)
                ),
            )
        }
    }
}

