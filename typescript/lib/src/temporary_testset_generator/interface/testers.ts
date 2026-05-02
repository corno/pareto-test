import * as _pi from 'pareto-core/dist/interface'

import { Directory_to_Test_Collection_Result_Transformer } from "../../implementation/temp/higher_order_functions/generic_testset/temp"

export type Package = {
    'schemas': { [id: string]: Schema }
}


export type Serializer = {
    extension: string
    process: (
        $: string,
        abort: _pi.Abort<string>
    ) => string
}

export type Deserializer = {
    extension: string
    process: (
        $: string,
        abort: _pi.Abort<string>
    ) => string
}

export type Schema = {
    'deserializers': _pi.Dictionary<Deserializer>
    'refiners': _pi.Dictionary<_pi.Dictionary<Refiner>>
    'transformers': _pi.Dictionary<_pi.Dictionary<Transformer>>
    'serializers': _pi.Dictionary<Serializer>
    'text_to_text': _pi.Dictionary<Text_to_Text>
}

export type Transformer = {
    process: (
        $: string,
        abort: _pi.Abort<string>
    ) => string
}


export type Refiner = {
    process: (
        $: string,
        abort: {
            initialize: _pi.Abort<string>
            refine: _pi.Abort<string>
        }
    ) => string
}



export type Text_to_Text = {
    in_extension: string
    out_extension: string
    process: (
        $: string,
        abort: _pi.Abort<string>
    ) => string
}