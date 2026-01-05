import * as _pn from 'pareto-host-nodejs'
import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'
import { $$ as command_creator } from "../implementation/temp/higher_order_functions/command_creators/test"


import { $$ as q_read_directory_content } from "pareto-resources/dist/implementation/manual/queries/read_directory_content"
import { $$ as c_write_directory_content } from "pareto-resources/dist/implementation/manual/commands/write_directory_content"

import * as sh from "../implementation/temp/higher_order_functions/generic_testset/testset_shorthands"

import * as testers from "./interface/testers"
import { Directory_to_Test_Collection_Result_Transformer } from '../implementation/temp/higher_order_functions/generic_testset/temp'
import { Package } from './interface/testers'

const dict_to_raw = <T>($: _pi.Dictionary<T>) => {
    const temp: { [key: string]: T } = {}
    $.map(($, key) => {
        temp[key] = $
    })
    return temp
}

const dict_to_test_group_result_transformer = <T>(type: 'group' | 'dictionary', $: undefined | { [key: string]: T }, map: ($: T) => Directory_to_Test_Collection_Result_Transformer): Directory_to_Test_Collection_Result_Transformer => {

    return sh.test_collection(type, dict_to_raw(_pt.dictionary.literal($ === undefined ? {} : $).map(($): Directory_to_Test_Collection_Result_Transformer => map($))))
}

namespace t_package_tester_to_test_group_result_transformer {

    export const Package: ($: testers.Package) => Directory_to_Test_Collection_Result_Transformer = ($) => dict_to_test_group_result_transformer('group', {
        "schemas": Schema($.schemas)
    }, ($) => $)

    const xx = ($: testers.Testset_for_set_of_algorithms) => dict_to_test_group_result_transformer('dictionary', $, ($) => $)

    export const Schema: ($: testers.Schema) => Directory_to_Test_Collection_Result_Transformer = ($) => {
        return dict_to_test_group_result_transformer('group', {
            "deserializers": xx($.deserializers),
            "refiners": dict_to_test_group_result_transformer('dictionary', $.refiners, ($) => xx($)),
            "transformers": dict_to_test_group_result_transformer('dictionary', $.transformers, ($) => xx($)),
            "serializers": xx($.serializers),
            "text_to_text": xx($.text_to_text),
        }, ($) => $)
    }

}
export const $$ = (package_: Package) => ($r: _pn.Available_Standard_Resources) => {
    return command_creator(
        {
            'text to astn': sh.test_collection('group', {}),
            'astn to astn': sh.test_collection('group', {}),
            'astn to text': t_package_tester_to_test_group_result_transformer.Package(package_),
        }
    )(
        {
            'write to stdout': $r.commands['write to stdout'],
            'log error': $r.commands['log error'],
            'log': $r.commands['log'],
            'write directory content': c_write_directory_content(
                {
                    'write file': $r.commands['write file'],
                },
                null,
            )
        },
        {
            'read directory': $r.queries['read directory'],
            'read file': $r.queries['read file'],
            'read directory content': q_read_directory_content(
                {
                    'read directory': $r.queries['read directory'],
                    'read file': $r.queries['read file'],
                }
            ),
        },
    )
}
