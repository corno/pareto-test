import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'
import p_implement_me from 'pareto-core-dev/implement_me'

//data types
import type * as d_in from "pareto-filesystem-unrestricted-api/interface/data/directory_content"
import type * as d_out from "../../../data/merged_filesystem_nodes.js"

export namespace interface_ {
    export type Directory = p_i.Transformer_With_Parameter<
        d_in.Directory,
        d_out.Valid_Directory,
        {
            'support': d_in.Directory

            /**
             * the file suffix makes it possible to match a support file that is expected to have a suffix.
             * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
             */
            'support suffix': string
        }
    >
}
