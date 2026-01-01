import * as _pi from 'pareto-core-interface'
import * as _p from 'pareto-core-transformer'

import * as d_in from "pareto-resources/dist/interface/to_be_generated/read_directory_content"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"

import * as t_read_directory_to_fountain_pen from "pareto-resources/dist/implementation/manual/schemas/read_directory/transformers/fountain_pen"
import * as t_read_file_to_fountain_pen from "pareto-resources/dist/implementation/manual/schemas/read_file/transformers/fountain_pen"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export const Error: _pi.Transformer<d_in.Error, d_out.Block_Part> = ($) => _p.cc($, ($) => {
    switch ($[0]) {
        case 'directory content processing': return _p.ss($, ($) => sh.b.sub([
            sh.b.indent([
                sh.g.sub($.to_list(($, key) => sh.g.nested_block([
                    sh.b.snippet(key),
                    sh.b.snippet(": "),
                    _p.cc($, ($) => {
                        switch ($[0]) {
                            case 'file': return _p.ss($, ($) => t_read_file_to_fountain_pen.Error($))
                            case 'directory': return _p.ss($, ($) => Error($))
                            default: return _p.au($[0])
                        }
                    })
                ])))
            ])
        ]))
        case 'read directory': return _p.ss($, ($) => t_read_directory_to_fountain_pen.Error($))
        default: return _p.au($[0])
    }
})