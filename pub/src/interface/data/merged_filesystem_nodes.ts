import * as _et from 'exupery-core-types'

import * as d_directory_content from "exupery-resources/dist/interface/algorithms/queries/directory_content"

export type Node =
    | ['file', {
        'support': _et.Optional_Value<d_directory_content.Node>
    }]
    | ['directory', Directory]

export type Directory =
    | ['invalid', Invalid_Directory]
    | ['valid', Valid_Directory]

export type Valid_Directory = _et.Dictionary<Node>

export type Invalid_Directory = {
    'support':
    | ['does not exist', null]
    | ['is not a directory', null]
    'nodes': _et.Dictionary<d_directory_content.Node>
}