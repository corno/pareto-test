import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/expression'

import * as d_in from "pareto-resources/dist/interface/to_be_generated/write_directory_content"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/block/data"

import * as t_make_directory_to_fountain_pen from "pareto-resources/dist/implementation/manual/schemas/make_directory/transformers/fountain_pen"
import * as t_write_file_to_fountain_pen from "pareto-resources/dist/implementation/manual/schemas/write_file/transformers/fountain_pen"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export const Error: _pi.Transformer<d_in.Error, d_out.Phrase> = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'directory content': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.indent(
                sh.pg.sentences(_p.list.from_dictionary($, ($, id) => sh.ph.composed([
                    sh.ph.literal(id),
                    sh.ph.literal(": "),
                    _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'file': return _p.ss($, ($) => t_write_file_to_fountain_pen.Error($))
                            case 'directory': return _p.ss($, ($) => Error($))
                            default: return _p.au($[0])
                        }
                    })
                ])))
            )
        ]))
        // case 'make directory': return _p.ss($, ($) => t_make_directory_to_fountain_pen.Error($))
        default: return _p.au($[0])
    }
})