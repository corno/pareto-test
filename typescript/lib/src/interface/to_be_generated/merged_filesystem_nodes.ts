import * as pi from 'pareto-core/dist/interface'

import * as d_directory_content from "pareto-resources/dist/interface/to_be_generated/directory_content"

export type Node =
    | ['file', {
        'support': pi.Optional_Value<d_directory_content.Node>
    }]
    | ['directory', Directory]

export type Directory =
    | ['invalid', Invalid_Directory]
    | ['valid', Valid_Directory]

export type Valid_Directory = pi.Dictionary<Node>

export type Invalid_Directory = {
    'support':
    | ['does not exist', null]
    | ['is not a directory', null]
    'nodes': pi.Dictionary<d_directory_content.Node>
}