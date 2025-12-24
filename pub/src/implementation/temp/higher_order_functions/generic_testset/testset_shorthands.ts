import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'

import * as d_out from "../../../../interface/to_be_generated/test_result"

import * as d_astn_target from "../../../../interface/generated/pareto/core/astn_target"
import * as d_astn_source from "../../../../interface/generated/pareto/core/astn_source"
import * as d_parse_result from "../../../../interface/generated/pareto/core/parse_result"


import * as temp from "./temp"

import * as s_serialize from "../../../generated/pareto/generic/serialize"
import * as p_parse from "../../../generated/pareto/generic/parse/parse"
import * as p_authoring_parse from "astn/dist/implementation/algorithms/refiners/authoring_parse_tree/text/refiners"

export const test_group = ($: { [key: string]: temp.Directory_to_Test_Group_Result_Transformer }): temp.Directory_to_Test_Group_Result_Transformer => {
    return temp.create_group_transformer(_ea.dictionary_literal($).map(($2) => _ea.cc($2, ($): temp.Directory_to_Test_Group_Result_Transformer => {
        return $
    })))
}

export const parse = ($: string): _et.Refinement_Result<d_astn_source._T_Document, d_parse_result._T_Parse_Error> => p_parse.parse($, { 'tab size': 4 })
export const serialize = s_serialize.Document

export const transformer = (
    transformer: (
        $: string,
        abort: ($: string) => never
    ) => string
): temp.Directory_to_Test_Group_Result_Transformer => {
    return ($) => $.nodes.map(($, key): d_out.Test_Node_Result => {
        return temp.create_individual_test_transformer(
            ($p) => _ea.create_refinement_context<d_out.Tested, string>(
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
            ).transform<d_out.Tested>(
                ($) => $,
                ($): d_out.Tested => ['failed', ['transform', ['initialization', $]]],
            )
        )($)
    })
}

export const refiner = (
    refiner: (
        $: string,
        abort: {
            'setup': ($: string) => never
            'refine': ($: string) => never
        }
    ) => string
): temp.Directory_to_Test_Group_Result_Transformer => {

    const x = (expect_error: boolean): temp.Directory_to_Test_Group_Result_Transformer => ($) => $.nodes.map(($, key): d_out.Test_Node_Result => {
        return temp.create_individual_test_transformer(
            ($p) => _ea.create_refinement_context<d_out.Tested, string>(
                (initialize_abort) => {
                    return _ea.create_refinement_context<string, string>(
                        (refine_abort) => refiner(
                            $p.input,
                            {
                                'setup': initialize_abort,
                                'refine': refine_abort,
                            }
                        )
                    ).transform<d_out.Tested>(
                        ($): d_out.Tested => {
                            return expect_error
                                ? ['failed', ['refine', ['should have failed but succeeded', $]]]
                                : $ === $p.expected
                                    ? ['passed', null]
                                    : ['failed', ['refine', ['unexpected output', {
                                        'expected': $p.expected,
                                        'actual': $,
                                    }]]]
                        },
                        ($): d_out.Tested => {
                            return expect_error
                                ? $ === $p.expected
                                    ? ['passed', null]
                                    : ['failed', ['refine', ['unexpected output', {
                                        'expected': $p.expected,
                                        'actual': $,
                                    }]]]
                                : ['failed', ['refine', ['should have succeeded but failed', $]]]
                        },
                    )
                }
            ).transform<d_out.Tested>(
                ($) => $,
                ($): d_out.Tested => ['failed', ['refine', ['initialization', $]]],
            )
        )($)
    })
    return temp.create_group_transformer(_ea.dictionary_literal<temp.Directory_to_Test_Group_Result_Transformer>({
        "error": x(true),
        "success": x(false)
    }))
}