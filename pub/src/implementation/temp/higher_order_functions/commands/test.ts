import * as _ea from 'exupery-core-alg'
import * as _easync from 'exupery-core-async'
import * as _et from 'exupery-core-types'
import * as _ed from 'exupery-core-dev'

import * as d_main from "exupery-resources/dist/interface/temp_main"
import * as d_log_error from "exupery-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"
import * as d_log from "exupery-resources/dist/interface/generated/pareto/schemas/log/data_types/target"
import * as d_write_to_stdout from "exupery-resources/dist/interface/generated/pareto/schemas/write_to_stdout/data_types/source"
import * as d_read_directory from "exupery-resources/dist/interface/generated/pareto/schemas/read_directory/data_types/source"
import * as d_read_file from "exupery-resources/dist/interface/generated/pareto/schemas/read_file/data_types/source"
import * as d_directory_content from "exupery-resources/dist/interface/algorithms/queries/directory_content"
import * as d_test_result from "../../../../interface/data/test_result"

import * as d_generic_testset from "../../../../interface/data/generic_testset"

import * as r_test_command_refiner from "../../../refiners/test_command/refiners"

import * as t_directory_content_to_generic_testset from "../../../transformers/directory_content/generic_testset"
// import * as t_generic_testset_to_test_result from "../transformers/generic_testset/test_result"
import * as t_fountain_pen_to_lines from "pareto-fountain-pen/dist/implementation/algorithms/transformations/block/lines"
import * as t_directory_content_to_fountain_pen from "../../../transformers/directory_content/fountain_pen"

import * as t_test_result_to_fountain_pen from "../../../transformers/test_result_2/fountain_pen"
import * as t_test_result_to_summary from "../../../transformers/test_result_2/summary"

import * as t_path_to_path from "exupery-resources/dist/implementation/transformers/path/path"
import * as t_path_to_text from "exupery-resources/dist/implementation/transformers/path/text"

import { $$ as o_flatten } from "pareto-standard-operations/dist/implementation/algorithms/operations/pure/list/flatten"

import * as temp from "../generic_testset/temp"


const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const ENDCOLOR = "\x1b[0m"

export type Query_Resources = {
    'read directory': _et.Query<d_read_directory.Result, d_read_directory.Error, d_read_directory.Parameters>
    'read file': _et.Query<d_read_file.Result, d_read_file.Error, d_read_file.Parameters>
    'read directory content': _et.Query<d_directory_content.Result, d_directory_content.Error, d_directory_content.Parameters>
}

export type Command_Resources = {
    'write to stdout': _et.Command<null, d_write_to_stdout.Parameters>
    'log error': _et.Command<null, d_log_error.Parameters>
    'log': _et.Command<null, d_log.Parameters>
}

export type Procedure = _et.Command_Procedure<d_main.Error, d_main.Parameters, Command_Resources, Query_Resources>


export type My_Error =
    | ['command line', null]
    | ['writing to stdout', null]
    | ['read directory content', d_directory_content.Error]
    | ['failed tests', {
        'path': string
        'tests': d_test_result.Test_Group_Result
    }]


export const $$ = (
    $: {
        'astn to astn': _et.Transformer<d_test_result.Test_Group_Result, d_generic_testset.Directory>
        'text to astn': _et.Transformer<d_test_result.Test_Group_Result, d_generic_testset.Directory>
        'astn to text': _et.Transformer<d_test_result.Test_Group_Result, d_generic_testset.Directory>
    }
): Procedure => _easync.create_command_procedure(
    ($p, $cr, $qr) => [

        _easync.p.create_error_handling_context<d_main.Error, My_Error>(
            [

                _easync.p.refine_with_error_transformation(
                    r_test_command_refiner.Parameters($p.arguments),
                    ($): My_Error => ['command line', null],
                    ($v) => [

                        //write the path to stdout
                        $cr['write to stdout'].execute(
                            `Testing with data from: ${t_path_to_text.Context_Path($v['path to test data'])}\n`,
                            ($): My_Error => ['writing to stdout', null]
                        ),

                        //read input dir
                        _easync.p.query_stacked(
                            $qr['read directory content'](
                                {
                                    'path': t_path_to_path.create_node_path(
                                        $v['path to test data'],
                                        `input`,
                                    ),
                                },
                                ($): My_Error => ['read directory content', $]
                            ),
                            $v,
                            ($v, $parent) => {
                                const path_to_test_data = $parent['path to test data']
                                return [


                                    //read expected dir
                                    _easync.p.query_stacked(
                                        $qr['read directory content'](
                                            {
                                                'path': t_path_to_path.create_node_path(
                                                    $parent['path to test data'],
                                                    `expected`,
                                                ),
                                            },
                                            ($): My_Error => ['read directory content', $]
                                        ),
                                        $v,
                                        ($v, $parent) => {

                                            const test_results: d_test_result.Test_Group_Result = _ea.dictionary_literal<{ 'suffix': t_directory_content_to_generic_testset.Suffix_Settings, transformer: _et.Transformer<d_test_result.Test_Group_Result, d_generic_testset.Directory> }>({
                                                'astn_to_astn': {
                                                    'transformer': $['astn to astn'],
                                                    'suffix': {
                                                        'to be appended to expected': _ea.not_set(),
                                                        'to be removed from input': _ea.not_set(),
                                                    }
                                                },
                                                'text_to_astn': {
                                                    'transformer': $['text to astn'],
                                                    'suffix': {
                                                        'to be appended to expected': _ea.set(`.astn`),
                                                        'to be removed from input': _ea.not_set(),
                                                    }
                                                },
                                                'astn_to_text': {
                                                    'transformer': $['astn to text'],
                                                    'suffix': {
                                                        'to be appended to expected': _ea.not_set(),
                                                        'to be removed from input': _ea.set(`.astn`),
                                                    }
                                                },
                                            }).map(($, key): d_test_result.Test_Node_Result => {
                                                const the_func = ($x: {
                                                    'input': d_directory_content.Directory,
                                                    'expected': d_directory_content.Directory,
                                                }) => $.transformer(t_directory_content_to_generic_testset.Group(
                                                    $x.input,
                                                    {
                                                        'expected': $x.expected,
                                                        'suffix settings': $.suffix,
                                                    }
                                                ))
                                                const expected_node = $v.__get_entry(key)
                                                const input_node = $parent.__get_entry(key)
                                                return ['group', {
                                                    'result': input_node.transform(
                                                        ($): d_test_result.Test_Node_Result__group__result => {
                                                            return _ea.cc($, ($): d_test_result.Test_Node_Result__group__result => {
                                                                switch ($[0]) {
                                                                    case 'directory': return _ea.ss($, ($) => {
                                                                        const input_dir = $
                                                                        return expected_node.transform(
                                                                            ($): d_test_result.Test_Node_Result__group__result => {
                                                                                return _ea.cc($, ($): d_test_result.Test_Node_Result__group__result => {
                                                                                    switch ($[0]) {
                                                                                        case 'directory': return _ea.ss($, ($) => {
                                                                                            const expected_dir = $
                                                                                            return ['source valid', the_func(
                                                                                                {
                                                                                                    'input': input_dir,
                                                                                                    'expected': expected_dir,
                                                                                                }
                                                                                            )]
                                                                                        })
                                                                                        default: return ['source invalid', ['problem with expected', ['node for expected is not a directory', null]]]
                                                                                    }
                                                                                })
                                                                            },
                                                                            (): d_test_result.Test_Node_Result__group__result => ['source invalid', ['problem with expected', ['directory for expected does not exist', null]]]
                                                                        )
                                                                    })
                                                                    default: return ['source invalid', ['not a group', null]]
                                                                }
                                                            })
                                                        },
                                                        (): d_test_result.Test_Node_Result__group__result => ['source invalid', ['missing', null]]
                                                    )
                                                }]
                                            })

                                            const number_of_failed_tests = t_test_result_to_summary.Test_Group_Result(
                                                test_results,
                                                {
                                                    'include passed tests': false,
                                                    'include structural problems': true,
                                                }
                                            )



                                            return [

                                                _easync.p.if_(
                                                    number_of_failed_tests === 0,
                                                    [
                                                        $cr['log'].execute(
                                                            {
                                                                'lines': o_flatten(_ea.list_literal([
                                                                    t_fountain_pen_to_lines.Group_Part(
                                                                        t_test_result_to_fountain_pen.Test_Group_Result(
                                                                            test_results,
                                                                            {
                                                                                'path to test data': t_path_to_text.Context_Path(path_to_test_data),
                                                                                'path to test': ``
                                                                            }
                                                                        ),
                                                                        {
                                                                            'indentation': `   `
                                                                        }
                                                                    ),
                                                                    _ea.list_literal([``]),
                                                                    _ea.list_literal([`${GREEN}All tests passed!${ENDCOLOR}`]),
                                                                ]))

                                                            },
                                                            ($): My_Error => ['writing to stdout', null]
                                                        )
                                                    ],
                                                    [
                                                        _easync.p.fail(['failed tests', {
                                                            'path': t_path_to_text.Context_Path(path_to_test_data),
                                                            'tests': test_results
                                                        }])
                                                    ]
                                                ),
                                            ]
                                        }
                                    )

                                ]
                            }
                        )
                    ]
                )

            ],
            ($) => $cr['log error'].execute(
                {
                    'lines': _ea.cc($, ($) => {
                        switch ($[0]) {
                            case 'command line': return _ea.ss($, ($) => _ea.list_literal([`command line error`]))
                            case 'writing to stdout': return _ea.ss($, ($) => _ea.list_literal([`stdout error`]))
                            case 'read directory content': return _ea.ss($, ($) => o_flatten(_ea.list_literal([
                                _ea.list_literal([`read dir error`]),
                                t_fountain_pen_to_lines.Block_Part(t_directory_content_to_fountain_pen.Error($), { 'indentation': `   ` })
                            ])))
                            case 'failed tests': return _ea.ss($, ($) => o_flatten(_ea.list_literal([
                                t_fountain_pen_to_lines.Group_Part(
                                    t_test_result_to_fountain_pen.Test_Group_Result(
                                        $.tests,
                                        {
                                            'path to test data': $.path,
                                            'path to test': ``
                                        }
                                    ),
                                    {
                                        'indentation': `   `
                                    }
                                ),
                                _ea.list_literal([`${RED}${t_test_result_to_summary.Test_Group_Result(
                                    $.tests,
                                    {
                                        'include passed tests': false,
                                        'include structural problems': true,
                                    }
                                )} test failed${ENDCOLOR}`]),
                            ])))
                            default: return _ea.au($[0])
                        }
                    })
                },
                ($): d_main.Error => ({
                    'exit code': 2
                })
            ),
            {
                'exit code': 1
            }
        ),
    ]
)