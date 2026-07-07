import * as p_ from 'pareto-core/interface/data'

import * as d_directory_content from "pareto-filesystem-unrestricted-api/interface/data/directory_content"

export type Node =
    | ['file', {
        'support': p_.Optional_Value<d_directory_content.Node>
    }]
    | ['directory', Directory]

export type Directory =
    | ['invalid', Invalid_Directory]
    | ['valid', Valid_Directory]

export type Valid_Directory = p_.Dictionary<Node>

export type Invalid_Directory = {
    'support':
    | ['does not exist', null]
    | ['is not a directory', null]
    'nodes': p_.Dictionary<d_directory_content.Node>
}