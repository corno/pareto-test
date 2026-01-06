import * as _pi from 'pareto-core-interface'
import * as _p from 'pareto-core-transformer'

import * as d_in from "../../../../../interface/to_be_generated/test_result"
import * as d_out from "pareto-resources/dist/interface/to_be_generated/directory_content"


const op_cast_to_non_empty_dictionary = <T>($: _pi.Dictionary<T>): _pi.Optional_Value<_pi.Dictionary<T>> => _p.boolean.dictionary_is_empty($) ? _p.optional.not_set() : _p.optional.set($)

export const Test_Node_Result: _pi.Transformer<d_in.Test_Node_Result, _pi.Optional_Value<d_out.Node>> = ($) => _p.sg($, ($): _pi.Optional_Value<d_out.Node> => {
    switch ($[0]) {
        case 'collection': return _p.ss($, ($) => _p.sg($.result, ($) => {
            switch ($[0]) {
                case 'source invalid': return _p.ss($, ($) => _p.optional.not_set())
                case 'source valid': return _p.ss($, ($): _pi.Optional_Value<d_out.Node> => op_cast_to_non_empty_dictionary(Test_Group_Result($)).map(($) => ['directory', $]))
                default: return _p.au($[0])
            }
        }))
        case 'individual test': return _p.ss($, ($) => _p.sg($.result, ($): _pi.Optional_Value<d_out.Node> => {
            switch ($[0]) {
                case 'source invalid': return _p.ss($, ($) => _p.optional.not_set())
                case 'tested': return _p.ss($, ($) => _p.sg($, ($) => {
                    switch ($[0]) {
                        case 'passed': return _p.ss($, ($) => _p.optional.not_set())
                        case 'failed': return _p.ss($, ($) => _p.sg($, ($) => {
                            switch ($[0]) {
                                case 'transform': return _p.ss($, ($) => _p.sg($, ($) => {
                                    switch ($[0]) {
                                        case 'initialization': return _p.ss($, ($) => _p.optional.not_set())
                                        case 'unexpected output': return _p.ss($, ($) => _p.optional.set(['file', $.actual]))
                                        default: return _p.au($[0])
                                    }
                                }))
                                case 'refine': return _p.ss($, ($) => _p.sg($, ($) => {
                                    switch ($[0]) {
                                        case 'initialization': return _p.ss($, ($) => _p.optional.not_set())
                                        case 'unexpected output': return _p.ss($, ($) => _p.optional.set(['file', $.actual]))
                                        case 'unexpected error': return _p.ss($, ($) => _p.optional.set(['file', $.actual]))
                                        case 'should have failed but succeeded': return _p.ss($, ($) => _p.optional.not_set())
                                        case 'should have succeeded but failed': return _p.ss($, ($) => _p.optional.not_set())
                                        default: return _p.au($[0])
                                    }
                                }))
                                default: return _p.au($[0])
                            }
                        }))
                        default: return _p.au($[0])
                    }
                }))
                default: return _p.au($[0])
            }
        }))
        default: return _p.au($[0])
    }
})

export const Test_Group_Result: _pi.Transformer<d_in.Test_Collection_Result, d_out.Directory> = ($) => _p.dictionary.filter(
    $,
    ($) => Test_Node_Result($)
)