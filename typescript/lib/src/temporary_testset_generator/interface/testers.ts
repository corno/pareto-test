// import * as pi from 'pareto-core/dist/interface'

// import { Directory_to_Test_Collection_Result_Transformer } from "../../implementation/temp/higher_order_functions/generic_testset/temp"

// export type Package = {
//     'schemas': { [id: string]: Schema }
// }


// export type Serializer = {
//     extension: string
//     process: (
//         $: string,
//         abort: pi.Abort<string>
//     ) => string
// }

// export type Deserializer = {
//     extension: string
//     process: (
//         $: string,
//         abort: pi.Abort<string>
//     ) => string
// }

// export type Schema = {
//     'deserializers': pi.Dictionary<Deserializer>
//     'refiners': pi.Dictionary<pi.Dictionary<Refiner>>
//     'transformers': pi.Dictionary<pi.Dictionary<Transformer>>
//     'serializers': pi.Dictionary<Serializer>
//     'text_to_text': pi.Dictionary<Text_to_Text>
// }

// export type Transformer = {
//     process: (
//         $: string,
//         abort: pi.Abort<string>
//     ) => string
// }


// export type Refiner = {
//     process: (
//         $: string,
//         abort: {
//             initialize: pi.Abort<string>
//             refine: pi.Abort<string>
//         }
//     ) => string
// }



// export type Text_to_Text = {
//     in_extension: string
//     out_extension: string
//     process: (
//         $: string,
//         abort: pi.Abort<string>
//     ) => string
// }