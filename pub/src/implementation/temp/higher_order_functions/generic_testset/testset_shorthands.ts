import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'
import { create_refinement_context } from 'pareto-core-internals/dist/async/create_refinement_context'

import * as d_out from "../../../../interface/to_be_generated/test_result"

import * as temp from "./temp"

import { transform_refinement_result } from '../../../temp_transform_refinement_result'

export const test_collection = (type: 'group' | 'dictionary', $: {
    [key: string]: temp.Directory_to_Test_Collection_Result_Transformer
}): temp.Directory_to_Test_Collection_Result_Transformer => temp.create_collection_transformer(
    type,
    _pt.dictionary.literal($).__d_map(
        ($2) => _pt.deprecated_cc($2, ($): temp.Directory_to_Test_Collection_Result_Transformer => $)
    )
)

// export const parse = ($: string): _pinternals.Refinement_Result<d_astn_source._T_Document, d_parse_result._T_Parse_Error> => p_parse.parse($, { 'tab size': 4 })

export const transformer = (
    transformer: (
        $: string,
        abort: ($: string) => never
    ) => string
): temp.Directory_to_Test_Collection_Result_Transformer => ($) => $.nodes.__d_map(($, key): d_out.Test_Node_Result => temp.create_individual_test_transformer(
    ($p) => transform_refinement_result(
        create_refinement_context<d_out.Tested, string>(
            (abort) => {

                const out = transformer(
                    $p.input,
                    abort
                )
                return out === $p.expected
                    ? ['passed', null]
                    : ['failed', ['transform', ['unexpected output', {
                        'expected': $p.expected,
                        'actual': out,
                    }]]]
            }
        ),
        ($) => $,
        ($): d_out.Tested => ['failed', ['transform', ['initialization', $]]],
    )
)($))

export const refiner = (
    refiner: (
        $: string,
        abort: {
            'setup': ($: string) => never
            'refine': ($: string) => never
        }
    ) => string
): temp.Directory_to_Test_Collection_Result_Transformer => {

    const x = (expect_error: boolean): temp.Directory_to_Test_Collection_Result_Transformer => ($) => $.nodes.__d_map(($, key): d_out.Test_Node_Result => temp.create_individual_test_transformer(
        ($p) => transform_refinement_result(
            create_refinement_context<d_out.Tested, string>(
                (initialize_abort) => {
                    return transform_refinement_result(
                        create_refinement_context<string, string>(
                            (refine_abort) => refiner(
                                $p.input,
                                {
                                    'setup': initialize_abort,
                                    'refine': refine_abort,
                                }
                            )
                        ),
                        ($): d_out.Tested => expect_error
                            ? ['failed', ['refine', ['should have failed but succeeded', $]]]
                            : $ === $p.expected
                                ? ['passed', null]
                                : ['failed', ['refine', ['unexpected output', {
                                    'expected': $p.expected,
                                    'actual': $,
                                }]]],
                        ($): d_out.Tested => expect_error
                            ? $ === $p.expected
                                ? ['passed', null]
                                : ['failed', ['refine', ['unexpected output', {
                                    'expected': $p.expected,
                                    'actual': $,
                                }]]]
                            : ['failed', ['refine', ['should have succeeded but failed', $]]],
                    )
                }
            ),
            ($) => $,
            ($): d_out.Tested => ['failed', ['refine', ['initialization', $]]],
        )
    )($))
    return temp.create_collection_transformer('dictionary', _pt.dictionary.literal<temp.Directory_to_Test_Collection_Result_Transformer>({
        "error": x(true),
        "success": x(false)
    }))
}