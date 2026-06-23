
// import * as testers from './interface/testers'


// export const package_: ($: testers.Package) => testers.Package = ($) => $

// type Raw_Dictionary<T> = { [id: string]: T }

// export const schema = (
//     deserializers: Raw_Dictionary<testers.Deserializer>,
//     refiners: Raw_Dictionary<Raw_Dictionary<testers.Refiner>>,
//     transformers: Raw_Dictionary<Raw_Dictionary<testers.Transformer>>,
//     serializers: Raw_Dictionary<testers.Serializer>,
//     text_to_text: Raw_Dictionary<testers.Text_to_Text>,
// ): testers.Schema => ({
//     'deserializers': _pt.literal.dictionary(deserializers),
//     'refiners': _pt.literal.dictionary(refiners).__ d_map_deprecated(
//($) => _pt.literal.dictionary($)),
//     'transformers': _pt.literal.dictionary(transformers).__ d_map_deprecated(
//($) => _pt.literal.dictionary($)),
//     'serializers': _pt.literal.dictionary(serializers),
//     'text_to_text': _pt.literal.dictionary(text_to_text),
// })


// // export const serializer = <Input, Initialize_Error>(
// //     extension: string,
// //     serializer: pi.Serializer<Input>,
// //     initialize: pi.Deserializer<Input, Initialize_Error>,
// //     serialize_initialize_error: pi.Serializer<Initialize_Error>,
// // ): testers.Serializer => ({
// //     extension: extension,
// //     process: ($, abort) => serializer(
// //         initialize(
// //             $,
// //             ($) => abort(
// //                 serialize_initialize_error($)
// //             ),
// //         )
// //     )
// // })

// // export const transformer = <Input, Output, Initialize_Error>(
// //     transformer: p_ti.Transformer<
// Input, Output
// >,
// //     initialize: pi.Deserializer<Input, Initialize_Error>,
// //     serialize_initialize_error: pi.Serializer<Initialize_Error>,
// //     serialize_output: pi.Serializer<Output>,
// // ): testers.Transformer => ({
// //     process: ($, abort) => serialize_output(
// //         transformer(
// //             initialize(
// //                 $,
// //                 ($) => abort(
// //                     serialize_initialize_error($)
// //                 ),
// //             )
// //         )
// //     )
// // })

// // export const refiner = <Output, Refine_Error, Input, Initialize_Error>(
// //     refiner: p_ri.Refiner<
// Output, Refine_Error, Input
// >,
// //     initialize: pi.Deserializer<Input, Initialize_Error>,
// //     serialize_initialize_error: pi.Serializer<Initialize_Error>,
// //     serialize_output: pi.Serializer<Output>,
// //     serialize_refine_error: pi.Serializer<Refine_Error>,
// // ): testers.Refiner => ({
// //     process: ($, abort) => serialize_output(
// //         refiner(
// //             initialize(
// //                 $,
// //                 ($) => abort.initialize(
// //                     serialize_initialize_error($)
// //                 ),
// //             ),
// //             ($) => abort.refine(
// //                 serialize_refine_error($)
// //             ),
// //         )
// //     )
// // })

// // export const deserializer = <Output, Deserialize_Error, Initialize_Error>(
// //     extension: string,
// //     deserializer: pi.Deserializer<Output, Deserialize_Error>,
// //     serialize_output: pi.Serializer<Output>,
// //     serialize_deserialize_error: pi.Serializer<Deserialize_Error>,
// // ): testers.Deserializer => ({
// //     extension: extension,
// //     process: ($, abort) => serialize_output(
// //         deserializer(
// //             $,
// //             ($) => abort(
// //                 serialize_deserialize_error($)
// //             ),
// //         )
// //     )
// // })


// // export const text_to_text = <Deserialize_Error, Initialize_Error>(
// //     extension_in: string,
// //     extension_out: string,
// //     text_to_text: p_ri.Refiner<
// string, Deserialize_Error, string
// >,
// //     serialize_deserialize_error: pi.Serializer<Deserialize_Error>,
// // ): testers.Text_to_Text => ({
// //     in_extension: extension_in,
// //     out_extension: extension_out,
// //     process: ($, abort) => text_to_text(
// //         $,
// //         ($) => abort(
// //             serialize_deserialize_error($)
// //         ),
// //     )
// // })

