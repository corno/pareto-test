// import * as p_ from 'pareto-core/implementation/transformer'

// import type * as s_out from "../../../interface/schemas/prose.js"
// import type * as s_in from "../../../interface/temp/generic.js"

// import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

// export const Results = ($: s_in.Results): s_out.Paragraph => Branch($)


// export const Branch = ($: s_in.Results): s_out.Paragraph => sh.pg.sentences(p_.from.dictionary(//     $,
// ).convert(
//     ($, id) => sh.sentence([
//         sh.ph.literal(id),
//         sh.ph.literal(": "),
//         p_.from.state($).decide(
//($) => {
//             switch ($[0]) {
//                 case 'test': return p_.option($, ($) => $.passed
//                     ? sh.ph.literal("✅ PASS")
//                     : sh.ph.literal("❌ FAIL")
//                 )
//                 case 'group': return p_.option($, ($) => sh.ph.composed([
//                     sh.ph.indent(
//                         Branch($)
//                     )
//                 ]))
//                 default: return p_.exhaustive($[0])
//             }
//         })
//     ])
// ))
