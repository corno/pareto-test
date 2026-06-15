
// import { Directory_to_Test_Collection_Result_Transformer } from "../../implementation/temp/higher_order_functions/generic_testset/temp"

// export type Package = {
//     'schemas': { [id: string]: Schema }
// }


// export type Serializer = {
//     extension: string
//     process: (
//         $: string,
//         abort: p_i.Abort<string>
//     ) => string
// }

// export type Deserializer = {
//     extension: string
//     process: (
//         $: string,
//         abort: p_i.Abort<string>
//     ) => string
// }

// export type Schema = {
//     'deserializers': p_di.Dictionary<Deserializer>
//     'refiners': p_di.Dictionary<p_di.Dictionary<Refiner>>
//     'transformers': p_di.Dictionary<p_di.Dictionary<Transformer>>
//     'serializers': p_di.Dictionary<Serializer>
//     'text_to_text': p_di.Dictionary<Text_to_Text>
// }

// export type Transformer = {
//     process: (
//         $: string,
//         abort: p_i.Abort<string>
//     ) => string
// }


// export type Refiner = {
//     process: (
//         $: string,
//         abort: {
//             initialize: p_i.Abort<string>
//             refine: p_i.Abort<string>
//         }
//     ) => string
// }



// export type Text_to_Text = {
//     in_extension: string
//     out_extension: string
//     process: (
//         $: string,
//         abort: p_i.Abort<string>
//     ) => string
// }