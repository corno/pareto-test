import * as p_ from 'pareto-core/interface/schema'

import type * as s_directory_content from "./directory_content.js"

export type Node =
    | ['file', {
        'support': p_.Optional_Value<s_directory_content.Node>
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
    'nodes': p_.Dictionary<s_directory_content.Node>
}