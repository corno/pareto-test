import * as _et from 'exupery-core-types'
import * as _ea from 'exupery-core-alg'
import * as _ed from 'exupery-core-dev'

import * as d_in from "../../../interface/data/test_result"
import * as d_out from "exupery-resources/dist/interface/algorithms/queries/directory_content"

import { $$ as op_filter_dictionary } from "pareto-standard-operations/dist/implementation/algorithms/operations/pure/dictionary/filter"
import { $$ as op_dictionary_is_empty } from "pareto-standard-operations/dist/implementation/algorithms/operations/impure/dictionary/is_empty"

const op_cast_to_non_empty_dictionary = <T>($: _et.Dictionary<T>): _et.Optional_Value<_et.Dictionary<T>> => {
    return op_dictionary_is_empty($) ? _ea.not_set() : _ea.set($)
}

export const Test_Node_Result: _et.Transformer<_et.Optional_Value<d_out.Node>, d_in.Test_Node_Result> = ($) => {
    return _ea.cc($, ($): _et.Optional_Value<d_out.Node> => {
        switch ($[0]) {
            case 'group': return _ea.ss($, ($) => _ea.cc($, ($) => _ea.cc($.result, ($) => {
                switch ($[0]) {
                    case 'source invalid': return _ea.ss($, ($) => _ea.not_set())
                    case 'source valid': return _ea.ss($, ($): _et.Optional_Value<d_out.Node> => op_cast_to_non_empty_dictionary(Test_Group_Result($)).map(($) => ['directory', $]))
                    default: return _ea.au($[0])
                }
            })))
            case 'individual test': return _ea.ss($, ($) => _ea.cc($.result, ($): _et.Optional_Value<d_out.Node> => {
                switch ($[0]) {
                    case 'source invalid': return _ea.ss($, ($) => _ea.not_set())
                    case 'tested': return _ea.ss($, ($) => _ea.cc($, ($) => {
                        switch ($[0]) {
                            case 'passed': return _ea.ss($, ($) => _ea.not_set())
                            case 'failed': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                switch ($[0]) {
                                    case 'transform': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                        switch ($[0]) {
                                            case 'initialization': return _ea.ss($, ($) => _ea.not_set())
                                            case 'unexpected output': return _ea.ss($, ($) => _ea.set(['file', $.actual]))
                                            default: return _ea.au($[0])
                                        }
                                    }))
                                    case 'refine': return _ea.ss($, ($) => _ea.cc($, ($) => {
                                        switch ($[0]) {
                                            case 'initialization': return _ea.ss($, ($) => _ea.not_set())
                                            case 'unexpected output': return _ea.ss($, ($) => _ea.set(['file', $.actual]))
                                            case 'unexpected error': return _ea.ss($, ($) => _ea.set(['file', $.actual]))
                                            case 'should have failed but succeeded': return _ea.ss($, ($) => _ea.not_set())
                                            case 'should have succeeded but failed': return _ea.ss($, ($) => _ea.not_set())
                                            default: return _ea.au($[0])
                                        }
                                    }))
                                    default: return _ea.au($[0])
                                }
                            }))
                            default: return _ea.au($[0])
                        }
                    }))
                    default: return _ea.au($[0])
                }
            }))
            default: return _ea.au($[0])
        }
    })
}

export const Test_Group_Result: _et.Transformer<d_out.Directory, d_in.Test_Group_Result> = ($) => {
    return op_filter_dictionary($.map(($) => Test_Node_Result($)))
}
