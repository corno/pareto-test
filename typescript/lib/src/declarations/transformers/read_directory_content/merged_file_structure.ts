
import type * as p_ from 'pareto-core/interface/transformer'
import p_implement_me from 'pareto-core-dev/implement_me'

//data types
import type * as s_in from "pareto-filesystem-unrestricted-api/interface/data/directory_content"
import type * as s_out from "../../../interface/schemas/merged_filesystem_nodes.js"


export type Directory = p_.Transformer_With_Parameter<
    s_in.Directory,
    s_out.Valid_Directory,
    {
        'support': s_in.Directory

        /**
         * the file suffix makes it possible to match a support file that is expected to have a suffix.
         * for example given the suffix 'foo': /a/b/c.txt.foo is matched to /a/b/c.txt
         */
        'support suffix': string
    }
>

