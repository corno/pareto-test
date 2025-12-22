import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'

import * as d_in from "../../../../interface/data/generic_testset"
import * as d_out from "../../../../interface/data/test_result"

export type Test_Group_Shorthand = { [key: string]: Test_Node_Shorthand }

export type Test_Node_Shorthand =
    | ['group', Test_Group_Shorthand]
    | ['test set', Test_Set]

export type Test_Set =
    | ['transformer', Transformer]
    | ['refiner', Refiner]

export type Transformer = (
    $: string,
    abort: ($: string) => never
) => string

export type Refiner = (
    $: string,
    abort: {
        'setup': ($: string) => never
        'refine': ($: string) => never
    }
) => string

export const group = ($: Test_Group_Shorthand): Test_Node_Shorthand => {
    return ['group', $]
}

export const transformer = (
    transformer: Transformer
): Test_Node_Shorthand => {
    return ['test set', ['transformer', transformer]]
}

export const refiner = (
    refiner: Refiner
): Test_Node_Shorthand => {
    return ['test set', ['refiner', refiner]]
}

export const test_group_shorthand = ($: Test_Group_Shorthand, dir_group: d_in.Group): d_out.Test_Group_Result => {
    return _ea.dictionary_literal($).map(($, key) => {
        return ['group', {
            'result': _ea.block(() => {

                //switching from shorthand context to testset context (to make sure the testset is correct)
                const current_test_node_shorthand = $

                return dir_group.__get_entry(key).transform(
                    ($): d_out.Test_Node_Result__group__result => _ea.cc($, ($): d_out.Test_Node_Result__group__result => {
                        switch ($[0]) {
                            case 'group': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                switch ($[0]) {
                                    case 'invalid': return _ea.ss($, ($): d_out.Test_Node_Result__group__result => ['source invalid', ['problem with expected', $]])
                                    case 'valid': return _ea.ss($, ($): d_out.Test_Node_Result__group__result => {

                                        //switching from testset context back to shorthand context 
                                        const current_group = $

                                        return ['tested', _ea.cc(current_test_node_shorthand, ($): d_out.Test_Group_Result => {
                                            switch ($[0]) {
                                                case 'group': return _ea.ss($, ($) => test_group_shorthand($, current_group))
                                                case 'test set': return _ea.ss($, ($) => {

                                                    //and again switching from shorthand context to testset context

                                                    const test_set = $
                                                    return current_group.map(($, key): d_out.Test_Node_Result => {
                                                        return ['individual test', {
                                                            'result': _ea.cc($, ($): d_out.Individual_Test_Result__result => {
                                                                switch ($[0]) {
                                                                    case 'test': return _ea.ss($, ($): d_out.Individual_Test_Result__result => {
                                                                        const input = $.input
                                                                        return _ea.cc($['matched expected output'], ($): d_out.Individual_Test_Result__result => {
                                                                            switch ($[0]) {
                                                                                case 'valid': return _ea.ss($, ($) => {
                                                                                    const expected_text = $
                                                                                    return ['tested', _ea.cc(test_set, ($): d_out.Tested => {
                                                                                        switch ($[0]) {
                                                                                            case 'transformer': return _ea.ss($, ($): d_out.Tested => {
                                                                                                return _ea.create_refinement_context<d_out.Tested, string>(
                                                                                                    (abort) => {

                                                                                                        const out = $(
                                                                                                            input,
                                                                                                            abort
                                                                                                        )
                                                                                                        return out === expected_text
                                                                                                            ? ['passed', null]
                                                                                                            : ['failed', ['transform', ['unexpected output', {
                                                                                                                'expected': expected_text,
                                                                                                                'actual': out,
                                                                                                            }]]]
                                                                                                    }
                                                                                                ).transform<d_out.Tested>(
                                                                                                    ($) => $,
                                                                                                    ($): d_out.Tested => ['failed', ['transform', ['initialization', $]]],
                                                                                                )

                                                                                            })
                                                                                            case 'refiner': return _ea.ss($, ($): d_out.Tested => {
                                                                                                return _ea.create_refinement_context<d_out.Tested, string>(
                                                                                                    (initialize_abort) => {
                                                                                                        return _ea.create_refinement_context<d_out.Tested, string>(
                                                                                                            (refine_abort) => {
                                                                                                                const out = $(
                                                                                                                    input,
                                                                                                                    {
                                                                                                                        'setup': initialize_abort,
                                                                                                                        'refine': refine_abort,
                                                                                                                    }
                                                                                                                )
                                                                                                                return (`result:` + out) === expected_text
                                                                                                                    ? ['passed', null]
                                                                                                                    : ['failed', ['refine', ['unexpected output', {
                                                                                                                        'expected': expected_text,
                                                                                                                        'actual': out,
                                                                                                                    }]]]
                                                                                                            }
                                                                                                        ).transform<d_out.Tested>(
                                                                                                            ($) => $,
                                                                                                            ($): d_out.Tested => {

                                                                                                                return (`error:` + $) === expected_text
                                                                                                                    ? ['passed', null]
                                                                                                                    : ['failed', ['refine', ['unexpected error', {
                                                                                                                        'expected': expected_text,
                                                                                                                        'actual': $,
                                                                                                                    }]]]
                                                                                                            },
                                                                                                        )
                                                                                                    }
                                                                                                ).transform<d_out.Tested>(
                                                                                                    ($) => $,
                                                                                                    ($): d_out.Tested => ['failed', ['refine', ['initialization', $]]],
                                                                                                )

                                                                                            })
                                                                                            default: return _ea.au($[0])
                                                                                        }
                                                                                    })]
                                                                                })
                                                                                case 'invalid': return _ea.ss($, ($): d_out.Individual_Test_Result__result => ['source invalid', ['problem with expected', $]])
                                                                                default: return _ea.au($[0])
                                                                            }
                                                                        })
                                                                    })
                                                                    default: return ['source invalid', ['not an individual test', null]]
                                                                }
                                                            })
                                                        }]
                                                    })
                                                })
                                                default: return _ea.au($[0])
                                            }
                                        })]
                                    })
                                    default: return _ea.au($[0])
                                }
                            }))
                            default: return ['source invalid', ['not a group', null]]
                        }
                    }),
                    (): d_out.Test_Node_Result__group__result => ['source invalid', ['missing', null]],
                )
            })
        }]
    })
}
