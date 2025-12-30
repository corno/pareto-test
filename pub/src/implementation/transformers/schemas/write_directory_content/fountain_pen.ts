import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'

import * as d_in from "exupery-resources/dist/interface/to_be_generated/write_directory_content"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"

import * as t_make_directory_to_fountain_pen from "exupery-resources/dist/implementation/transformers/schemas/make_directory/fountain_pen"
import * as t_write_file_to_fountain_pen from "exupery-resources/dist/implementation/transformers/schemas/write_file/fountain_pen"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export const Error: _pi.Transformer<d_in.Error, d_out.Block_Part> = ($) => _pt.cc($, ($) => {
    switch ($[0]) {
        case 'directory content': return _pt.ss($, ($) => sh.b.sub([
            sh.b.indent([
                sh.g.sub($.to_list(($, key) => sh.g.nested_block([
                    sh.b.snippet(key),
                    sh.b.snippet(": "),
                    _pt.cc($, ($) => {
                        switch ($[0]) {
                            case 'file': return _pt.ss($, ($) => t_write_file_to_fountain_pen.Error($))
                            case 'directory': return _pt.ss($, ($) => Error($))
                            default: return _pt.au($[0])
                        }
                    })
                ])))
            ])
        ]))
        // case 'make directory': return _pt.ss($, ($) => t_make_directory_to_fountain_pen.Error($))
        default: return _pt.au($[0])
    }
})