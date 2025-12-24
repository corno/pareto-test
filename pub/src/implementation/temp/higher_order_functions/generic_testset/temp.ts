import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'

import * as d_in from "../../../../interface/to_be_generated/generic_testset"
import * as d_out from "../../../../interface/to_be_generated/test_result"



export type Tester = (
    $p: {
        'input': string,
        'expected': string,
    }
) => d_out.Tested


export type Directory_to_Test_Group_Result_Transformer = ($: d_in.Directory) => d_out.Test_Group_Result
export type Node_to_Test_Node_Result_Transformer = ($: d_in.Node) => d_out.Test_Node_Result

export const create_individual_test_transformer = (
    tester: Tester
): Node_to_Test_Node_Result_Transformer => {
    return ($) => ['individual test', {
        'result': _ea.cc($, ($): d_out.Individual_Test_Result__result => {
            switch ($[0]) {
                case 'file': return _ea.ss($, ($): d_out.Individual_Test_Result__result => {
                    const input = $.input
                    return _ea.cc($['matching'], ($): d_out.Individual_Test_Result__result => {
                        switch ($[0]) {
                            case 'valid': return _ea.ss($, ($) => {
                                const expected_text = $
                                return ['tested', tester(
                                    {
                                        'input': input,
                                        'expected': expected_text,
                                    }
                                )]
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
}

export const create_group_transformer = ($: _et.Dictionary<Directory_to_Test_Group_Result_Transformer>): Directory_to_Test_Group_Result_Transformer => {
    return (dir_group) => $.map(($, key) => {
        const group_to_test_group_result = $
        return ['group', {
            'result': _ea.block(() => dir_group.nodes.__get_entry(key).transform(
                ($): d_out.Test_Node_Result__group__result => _ea.cc($, ($): d_out.Test_Node_Result__group__result => {
                    switch ($[0]) {
                        case 'directory': return _ea.ss($, ($) => _ea.cc($, ($) => {
                            switch ($[0]) {
                                case 'invalid': return _ea.ss($, ($): d_out.Test_Node_Result__group__result => ['source invalid', ['problem with expected', $]])
                                case 'valid': return _ea.ss($, ($): d_out.Test_Node_Result__group__result => {

                                    return ['source valid', group_to_test_group_result($)]
                                })
                                default: return _ea.au($[0])
                            }
                        }))
                        default: return ['source invalid', ['not a group', null]]
                    }
                }),
                (): d_out.Test_Node_Result__group__result => ['source invalid', ['missing', null]],
            ))
        }]
    })
}
