
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "pareto-filesystem-unrestricted-api/interface/data/read_directory_content"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>

