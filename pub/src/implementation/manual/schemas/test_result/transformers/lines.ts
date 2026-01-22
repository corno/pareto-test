
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/lines/data"
import * as d_in from "../../../../../interface/temp/generic"

import * as t_fp from "./fountain_pen"
import * as t_g_to_lines from "pareto-fountain-pen/dist/implementation/manual/schemas/block/transformers/lines"


export const Results = ($: d_in.Results): d_out.Lines => t_g_to_lines.Group(
    t_fp.Results($),
    {
        'indentation': `   `
    }
)