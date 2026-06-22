// import p_change_context from 'pareto-core/dist/implementation/specials/change_context'
// import p_text_from_list from 'pareto-core/dist/implementation/specials/text_from_list'

// import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"
// import * as d_read_directory_content from "pareto-resources/dist/interface/to_be_generated/read_directory_content"
// import * as d_directory_content from "pareto-resources/dist/interface/to_be_generated/directory_content"
// import * as d_test_result from "../../../../interface/data/test_result"
// import * as d_write_directory_content from "pareto-resources/dist/interface/to_be_generated/write_directory_content"

// import * as d_generic_testset from "../../../../interface/data/generic_testset"

// import * as r_test_command_refiner from "../../../manual/refiners/test_command/main"

// import * as t_directory_content_to_generic_testset from "../../../manual/transformers/directory_content/generic_testset"
// import * as t_read_directory_content_to_fountain_pen from "../../../manual/transformers/read_directory_content/fountain_pen"
// import * as t_write_directory_content_to_fountain_pen from "../../../manual/transformers/write_directory_content/fountain_pen"

// import * as t_test_result_to_fountain_pen from "../../../manual/transformers/test_result_2/fountain_pen"
// import * as t_test_result_to_summary from "../../../manual/transformers/test_result_2/summary"
// import * as t_test_result_to_actual_tree from "../../../manual/transformers/test_result_2/actual_tree"

// import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/unrestricted_path"
// import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"

// import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

// const RED = "\x1b[31m"
// const GREEN = "\x1b[32m"
// const ENDCOLOR = "\x1b[0m"

// import * as resources_pareto from "pareto-resources/dist/interface/resources"
// import * as resources_pareto_stream from "pareto-stream/dist/interface/resources"

// export type Procedure = p_ci.Command_Procedure<
//     resources_pareto.resources.commands.main,
//     null,
//     {
//         'read directory': resources_pareto.filesystem_unrestricted.queries.read_directory
//         'read file': resources_pareto.filesystem_unrestricted.queries.read_file
//         'read directory content': resources_pareto.resources.queries.read_directory_content
//     },
//     {
//         'write to stdout': resources_pareto_stream.commands.write_to_stdout
//         'log error': resources_pareto_stream.commands.log_error
//         'log': resources_pareto_stream.commands.log
//         'write directory content': resources_pareto.resources.commands.write_directory_content,
//     }
// >


// export type My_Error =
//     | ['command line', null]
//     | ['writing to stdout', null]
//     | ['read directory content', d_read_directory_content.Error]
//     | ['write directory content', d_write_directory_content.Error]
//     | ['failed tests', {
//         'path': string
//         'tests': d_test_result.Test_Collection_Result
//     }]


// export const $$ = (
//     $x: {
//         'astn to astn': p_ti.Transformer<d_generic_testset.Directory, d_test_result.Test_Collection_Result>
//         'text to astn': p_ti.Transformer<d_generic_testset.Directory, d_test_result.Test_Collection_Result>
//         'astn to text': p_ti.Transformer<d_generic_testset.Directory, d_test_result.Test_Collection_Result>
//     }
// ): Procedure => _pc.command_procedure(
//     ($d, $s, $q, $c) => [

//         _pc.handle_error<d_main.Error, My_Error>(
//             [

//                 _pc.refine_without_error_transformation(
//                     (abort) => r_test_command_refiner.Parameters(
//                         $d,
//                         ($) => abort(['command line', null])
//                     ),
//                     ($) => [

//                         //write the path to stdout
//                         $c['write to stdout'].execute(
//                             {
//                                 'data': `Testing with data from: ${t_path_to_text.Context_Path($['path to test data'])}\n`
//                             },
//                             ($): My_Error => ['writing to stdout', null]
//                         ),

//                         p_change_context($, ($parent) =>
//                             //read input dir
//                             _pc.query(
//                                 $q['read directory content'](
//                                     {
//                                         'path': t_path_to_path.extend_context_path_with_single_step(
//                                             $['path to test data'],
//                                             { 'addition': "input" },
//                                         ),
//                                     },
//                                     ($): My_Error => ['read directory content', $]
//                                 ),
//                                 ($) => $,
//                                 ($) => {
//                                     const path_to_test_data = $parent['path to test data']
//                                     return [


//                                         //read expected dir
//                                         _pc.query_stacked(
//                                             $q['read directory content'](
//                                                 {
//                                                     'path': t_path_to_path.extend_context_path_with_single_step(
//                                                         $parent['path to test data'],
//                                                         { 'addition': "expected" },
//                                                     ),
//                                                 },
//                                                 ($): My_Error => ['read directory content', $]
//                                             ),
//                                             $,
//                                             ($v, $parent) => {

//                                                 const test_results: d_test_result.Test_Collection_Result = p_.dictionary.literal<{ 'suffix': t_directory_content_to_generic_testset.Suffix_Settings, transformer: p_ti.Transformer<d_generic_testset.Directory, d_test_result.Test_Collection_Result> }>({
//                                                     'astn_to_astn': {
//                                                         'transformer': $x['astn to astn'],
//                                                         'suffix': {
//                                                             'to be appended to expected': p_.literal.not_set(),
//                                                             'to be removed from input': p_.literal.not_set(),
//                                                         }
//                                                     },
//                                                     'text_to_astn': {
//                                                         'transformer': $x['text to astn'],
//                                                         'suffix': {
//                                                             'to be appended to expected': p_.literal.set(".astn"),
//                                                             'to be removed from input': p_.literal.not_set(),
//                                                         }
//                                                     },
//                                                     'astn_to_text': {
//                                                         'transformer': $x['astn to text'],
//                                                         'suffix': {
//                                                             'to be appended to expected': p_.literal.not_set(),
//                                                             'to be removed from input': p_.literal.set(".astn"),
//                                                         }
//                                                     },
//                                                 }).__d_map_deprecated(($, id): d_test_result.Test_Node_Result => {
//                                                     const the_func = ($x: {
//                                                         'input': d_directory_content.Directory,
//                                                         'expected': d_directory_content.Directory,
//                                                     }) => $.transformer(t_directory_content_to_generic_testset.Directory(
//                                                         $x.input,
//                                                         {
//                                                             'expected': $x.expected,
//                                                             'suffix settings': $.suffix,
//                                                         }
//                                                     ))
//                                                     const expected_node = $v.__ get_possible_entry_deprecated(id)
//                                                     const input_node = $parent.__ get_possible_entry_deprecated(id)
//                                                     return ['collection', {
//                                                         'type': ['group', null],
//                                                         'result': input_node.__ decide(
//                                                             ($): d_test_result.Test_Node_Result__collection__result => p_.from.state($).decide(($): d_test_result.Test_Node_Result__collection__result => {
//                                                                 switch ($[0]) {
//                                                                     case 'directory': return p_.ss($, ($) => {
//                                                                         const input_dir = $
//                                                                         return expected_node.__ decide(
//                                                                             ($): d_test_result.Test_Node_Result__collection__result => {
//                                                                                 return p_.from.state($).decide(($): d_test_result.Test_Node_Result__collection__result => {
//                                                                                     switch ($[0]) {
//                                                                                         case 'directory': return p_.ss($, ($) => {
//                                                                                             const expected_dir = $
//                                                                                             return ['source valid', the_func(
//                                                                                                 {
//                                                                                                     'input': input_dir,
//                                                                                                     'expected': expected_dir,
//                                                                                                 }
//                                                                                             )]
//                                                                                         })
//                                                                                         default: return ['source invalid', ['problem with expected', ['node for expected is not a directory', null]]]
//                                                                                     }
//                                                                                 })
//                                                                             },
//                                                                             (): d_test_result.Test_Node_Result__collection__result => ['source invalid', ['problem with expected', ['directory for expected does not exist', null]]]
//                                                                         )
//                                                                     })
//                                                                     default: return ['source invalid', ['not a collection', null]]
//                                                                 }
//                                                             }),
//                                                             (): d_test_result.Test_Node_Result__collection__result => ['source invalid', ['missing', null]]
//                                                         )
//                                                     }]
//                                                 })

//                                                 const number_of_failed_tests = t_test_result_to_summary.Test_Group_Result(
//                                                     test_results,
//                                                     {
//                                                         'include passed tests': false,
//                                                         'include structural problems': true,
//                                                     }
//                                                 )



//                                                 return [

//                                                     _pc.if_.direct(
//                                                         number_of_failed_tests === 0,
//                                                         [
//                                                             $c['log'].execute(
//                                                                 {
//                                                                     'message': sh.pg.composed([
//                                                                         t_test_result_to_fountain_pen.Test_Collection_Result(
//                                                                             test_results,
//                                                                             {
//                                                                                 'path to test data': t_path_to_text.Context_Path(path_to_test_data),
//                                                                                 'path to test': ""
//                                                                             }
//                                                                         ),
//                                                                         sh.pg.sentences([

//                                                                             sh.sentence([]),
//                                                                             sh.sentence([
//                                                                                 sh.ph.literal(GREEN),
//                                                                                 sh.ph.literal("All tests passed!"),
//                                                                                 sh.ph.literal(ENDCOLOR),
//                                                                             ])
//                                                                         ])
//                                                                     ])

//                                                                 },
//                                                                 ($): My_Error => ['writing to stdout', null]
//                                                             )
//                                                         ],
//                                                         [
//                                                             $c['write directory content'].execute(
//                                                                 {
//                                                                     'directory': t_test_result_to_actual_tree.Test_Group_Result(
//                                                                         test_results,
//                                                                     ),
//                                                                     'path': t_path_to_path.extend_context_path_with_single_step(
//                                                                         path_to_test_data,
//                                                                         {
//                                                                             'addition': "actual",
//                                                                         },
//                                                                     ),
//                                                                 },
//                                                                 ($): My_Error => ['write directory content', $],
//                                                             ),
//                                                             _pc.fail(['failed tests', {
//                                                                 'path': t_path_to_text.Context_Path(path_to_test_data),
//                                                                 'tests': test_results
//                                                             }])
//                                                         ]
//                                                     ),
//                                                 ]
//                                             }
//                                         )

//                                     ]
//                                 }
//                             )),

//                     ]
//                 )

//             ],
//             ($) => [
//                 $c['log error'].execute(
//                     {
//                         'message': p_.from.state($).decide(($) => {
//                             switch ($[0]) {
//                                 case 'command line': return p_.ss($, ($) => sh.pg.sentences([
//                                     sh.sentence([
//                                         sh.ph.literal("command line error")
//                                     ])
//                                 ]))
//                                 case 'writing to stdout': return p_.ss($, ($) => sh.pg.sentences([
//                                     sh.sentence([
//                                         sh.ph.literal("error writing to stdout")
//                                     ])
//                                 ]))
//                                 case 'read directory content': return p_.ss($, ($) => sh.pg.sentences([
//                                     sh.sentence([
//                                         sh.ph.literal("read dir error")
//                                     ]),
//                                     sh.sentence([
//                                         t_read_directory_content_to_fountain_pen.Error($)
//                                     ])
//                                 ]))
//                                 case 'write directory content': return p_.ss($, ($) => sh.pg.sentences([
//                                     sh.sentence([
//                                         sh.ph.literal("write dir error")
//                                     ]),
//                                     sh.sentence([
//                                         t_write_directory_content_to_fountain_pen.Error($)
//                                     ])
//                                 ]))
//                                 case 'failed tests': return p_.ss($, ($) => sh.pg.composed([
//                                     t_test_result_to_fountain_pen.Test_Collection_Result(
//                                         $.tests,
//                                         {
//                                             'path to test data': $.path,
//                                             'path to test': ""
//                                         }
//                                     ),
//                                     sh.pg.sentences([
//                                         sh.sentence([
//                                             sh.ph.literal(RED),
//                                             sh.ph.decimal(t_test_result_to_summary.Test_Group_Result(
//                                                 $.tests,
//                                                 {
//                                                     'include passed tests': false,
//                                                     'include structural problems': true,
//                                                 }
//                                             )),
//                                             sh.ph.literal(" test(s) failed"),
//                                             sh.ph.literal(ENDCOLOR),
//                                         ])
//                                     ])
//                                 ]))
//                                 default: return p_.au($[0])
//                             }
//                         })
//                     },
//                     ($): d_main.Error => ({
//                         'exit code': 2
//                     })
//                 )
//             ],
//             () => ({
//                 'exit code': 1
//             })
//         ),
//     ]
// )