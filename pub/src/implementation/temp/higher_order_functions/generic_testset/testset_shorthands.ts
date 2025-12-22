import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'

import * as d_out from "../../../../interface/data/test_result"

import * as temp from "./temp"

export type Test_Group_Shorthand = { [key: string]: temp.Directory_to_Test_Group_Result_Transformer }


export const transformer = (
    transformer: (
        $: string,
        abort: ($: string) => never
    ) => string
): temp.Directory_to_Test_Group_Result_Transformer => {
    return ($) => $.map(($, key): d_out.Test_Node_Result => {
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



export const test_group = ($: Test_Group_Shorthand): temp.Directory_to_Test_Group_Result_Transformer => {
    const x: _et.Dictionary<temp.Directory_to_Test_Group_Result_Transformer> = _ea.dictionary_literal($).map(($2) => _ea.cc($2, ($): temp.Directory_to_Test_Group_Result_Transformer => {
        return $
    }))
    return temp.create_group_transformer(x)
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

    const x = (expect_error: boolean): temp.Directory_to_Test_Group_Result_Transformer => ($) => $.map(($, key): d_out.Test_Node_Result => {
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

export const example = test_group(
    {
        "static-html": test_group(
            {
                "fountain-pen": refiner(
                    ($, abort) => _ea.deprecated_panic(),
                ),
                "fountain-pen2": transformer(
                    ($, abort) => _ea.deprecated_panic(),
                ),
            }
        )
    },
)
