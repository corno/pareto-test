import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'

import * as d_in from "../../../../../interface/to_be_generated/test_result"
import * as d_out from "pareto-resources/dist/interface/to_be_generated/directory_content"


const op_cast_to_non_empty_dictionary = <T>($: _pi.Dictionary<T>): _pi.Optional_Value<_pi.Dictionary<T>> => {
    return $.is_empty() ? _pt.not_set() : _pt.set($)
}

export const Test_Node_Result: _pi.Transformer<d_in.Test_Node_Result, _pi.Optional_Value<d_out.Node>> = ($) => {
    return _pt.cc($, ($): _pi.Optional_Value<d_out.Node> => {
        switch ($[0]) {
            case 'group': return _pt.ss($, ($) => _pt.cc($, ($) => _pt.cc($.result, ($) => {
                switch ($[0]) {
                    case 'source invalid': return _pt.ss($, ($) => _pt.not_set())
                    case 'source valid': return _pt.ss($, ($): _pi.Optional_Value<d_out.Node> => op_cast_to_non_empty_dictionary(Test_Group_Result($)).map(($) => ['directory', $]))
                    default: return _pt.au($[0])
                }
            })))
            case 'individual test': return _pt.ss($, ($) => _pt.cc($.result, ($): _pi.Optional_Value<d_out.Node> => {
                switch ($[0]) {
                    case 'source invalid': return _pt.ss($, ($) => _pt.not_set())
                    case 'tested': return _pt.ss($, ($) => _pt.cc($, ($) => {
                        switch ($[0]) {
                            case 'passed': return _pt.ss($, ($) => _pt.not_set())
                            case 'failed': return _pt.ss($, ($) => _pt.cc($, ($) => {
                                switch ($[0]) {
                                    case 'transform': return _pt.ss($, ($) => _pt.cc($, ($) => {
                                        switch ($[0]) {
                                            case 'initialization': return _pt.ss($, ($) => _pt.not_set())
                                            case 'unexpected output': return _pt.ss($, ($) => _pt.set(['file', $.actual]))
                                            default: return _pt.au($[0])
                                        }
                                    }))
                                    case 'refine': return _pt.ss($, ($) => _pt.cc($, ($) => {
                                        switch ($[0]) {
                                            case 'initialization': return _pt.ss($, ($) => _pt.not_set())
                                            case 'unexpected output': return _pt.ss($, ($) => _pt.set(['file', $.actual]))
                                            case 'unexpected error': return _pt.ss($, ($) => _pt.set(['file', $.actual]))
                                            case 'should have failed but succeeded': return _pt.ss($, ($) => _pt.not_set())
                                            case 'should have succeeded but failed': return _pt.ss($, ($) => _pt.not_set())
                                            default: return _pt.au($[0])
                                        }
                                    }))
                                    default: return _pt.au($[0])
                                }
                            }))
                            default: return _pt.au($[0])
                        }
                    }))
                    default: return _pt.au($[0])
                }
            }))
            default: return _pt.au($[0])
        }
    })
}

export const Test_Group_Result: _pi.Transformer<d_in.Test_Group_Result, d_out.Directory> = ($) => {
    return $.filter(($) => Test_Node_Result($))
}
