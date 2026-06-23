// import * as p_ from 'pareto-core/dist/implementation/transformer'

// import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
// import * as d_in from "../../../../interface/temp/generic"

// import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

// export const Results = ($: d_in.Results): d_out.Paragraph => Branch($)


// export const Branch = ($: d_in.Results): d_out.Paragraph => sh.pg.sentences(p_.from.dictionary(//     $,
// ).convert(
//     ($, id) => sh.sentence([
//         sh.ph.literal(id),
//         sh.ph.literal(": "),
//         p_.from.state($).decide(
//($) => {
//             switch ($[0]) {
//                 case 'test': return p_.ss($, ($) => $.passed
//                     ? sh.ph.literal("✅ PASS")
//                     : sh.ph.literal("❌ FAIL")
//                 )
//                 case 'group': return p_.ss($, ($) => sh.ph.composed([
//                     sh.ph.indent(
//                         Branch($)
//                     )
//                 ]))
//                 default: return p_.au($[0])
//             }
//         })
//     ])
// ))
