import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'


//data types
import * as d from "../../../../interface/data/test_command"
import * as d_main from "pareto-resources/dist/interface/data/temp_main"

//dependencies
import * as pr_text_command_from_text from "../../productions/test_command/text"

export const Parameters: p_i.Refiner<
    d.Parameters, string, d_main.Parameters
> = ($, abort) => p_iterate<
    d.Parameters,
    string,
    null
>({
    list: $.arguments,
    end_info: null,
    assign: (iterator) => pr_text_command_from_text.Parameters(
        iterator,
        abort,
    ),
    on_dangling_item: () => abort("too many arguments"),
})