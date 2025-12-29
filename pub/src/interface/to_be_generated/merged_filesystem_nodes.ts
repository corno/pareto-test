import * as _pi from 'pareto-core-interface'

import * as d_directory_content from "exupery-resources/dist/interface/to_be_generated/directory_content"

export type Node =
    | ['file', {
        'support': _pi.Optional_Value<d_directory_content.Node>
    }]
    | ['directory', Directory]

export type Directory =
    | ['invalid', Invalid_Directory]
    | ['valid', Valid_Directory]

export type Valid_Directory = _pi.Dictionary<Node>

export type Invalid_Directory = {
    'support':
    | ['does not exist', null]
    | ['is not a directory', null]
    'nodes': _pi.Dictionary<d_directory_content.Node>
}