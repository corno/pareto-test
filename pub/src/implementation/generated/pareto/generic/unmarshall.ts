import * as _pi from 'pareto-core-interface'
import * as _pr from 'pareto-core-refiner'
import * as _pinternals from 'pareto-core-internals'

import * as t from "../../../../interface/generated/pareto/core/astn_source"
import * as unconstrained from "../../../../interface/generated/pareto/core/unconstrained"
import * as unresolved from "../../../../interface/generated/pareto/core/unresolved"

export const process_unconstrained_state_group = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'states': _pi.Dictionary<($: t._T_Value) => Mapped_Value>,
    }

): Mapped_Value => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'tagged value': return _pr.ss($, ($) => {
                const data = $.value
                return $p.states.get_entry(
                    $.state.value
                ).transform(
                    ($) => $(data),
                    () => _pr.fixme_abort(`Unexpected state: ${$.state.value}`)
                )
            })
            default: return _pr.fixme_abort(`Unexpected type for state group: ${$[0]}`)
        }
    })
}

export const process_unresolved_state_group = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'states': _pi.Dictionary<($: t._T_Value) => Mapped_Value>,
    }

): unresolved.State_Group<t._T_Range, Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'tagged value': return _pr.ss($, ($) => {
                const data = $.value
                return {
                    'location': $["|"].range,
                    'state group': $p.states.get_entry(
                        $.state.value
                    ).transform(
                        ($) => $(data),
                        () => _pr.fixme_abort(`Unexpected state: ${$.state.value}`)
                    )
                }
            })
            default: return _pr.fixme_abort(`Unexpected type for state group: ${$[0]}`)
        }
    })
}

export const process_group = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'properties': ($: _pi.Dictionary<t._T_Value>) => Mapped_Value,
    }

): Mapped_Value => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'indexed collection': return _pr.ss($, ($) => _pr.cc($, ($) => {
                switch ($[0]) {
                    case 'verbose group': return _pr.ss($, ($) => {
                        return $p.properties(_pr.deprecated_build_dictionary(($i) => {
                            $.entries.__for_each(($) => {
                                $i['add entry']($.key.value, $.value.transform(
                                    ($) => $.value,
                                    () => _pr.fixme_abort(`no value for property: ${$.key.value}`)
                                ))
                            })
                        }))
                    })
                    default: return _pr.fixme_abort(`Unexpected type for group: ${$[0]}`)
                }
            }))
            default: return _pr.fixme_abort(`Unexpected type for group: ${$[0]}`)
        }
    })
}

export const get_entry = (
    $: _pi.Dictionary<t._T_Value>,
    $p: {
        'key': string,
    }

): t._T_Value => {
    return $.get_entry($p.key).transform(
        ($) => $,
        () => _pr.fixme_abort(`no such entry: ${$p.key}`)
    )
}

export const process_unresolved_dictionary = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'value': ($: t._T_Value) => Mapped_Value
    }
): unresolved.Dictionary<t._T_Range, Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'indexed collection': return _pr.ss($, ($) => _pr.cc($, ($) => {
                switch ($[0]) {
                    case 'dictionary': return _pr.ss($, ($) => {
                        return {
                            'location': {
                                'start': $["{"].range.start,
                                'end': $["}"].range.end,
                            },
                            'dictionary': _pr.deprecated_build_dictionary(($i) => {
                                $.entries.__for_each(($) => {
                                    const key_location = $.key.range
                                    $i['add entry']($.key.value, $.value.transform(
                                        ($) => ({
                                            'location': key_location,
                                            'entry': $p.value($.value),
                                        }),
                                        () => _pr.fixme_abort(`no value for property: ${$.key.value}`)
                                    ))
                                })
                            })
                        }
                    })
                    default: return _pr.fixme_abort(`Unexpected type for dictionary: ${$[0]}`)
                }
            }))
            default: return _pr.fixme_abort(`Unexpected type for dictionary: ${$[0]}`)
        }
    })
}

export const process_unconstrained_dictionary = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'value': ($: t._T_Value) => Mapped_Value
    }
): unconstrained.Dictionary<null, Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'indexed collection': return _pr.ss($, ($) => _pr.cc($, ($) => {
                switch ($[0]) {
                    case 'dictionary': return _pr.ss($, ($) => {
                        return _pr.deprecated_build_dictionary(($i) => {
                            $.entries.__for_each(($) => {
                                $i['add entry']($.key.value, $.value.transform(
                                    ($) => $p.value($.value),
                                    () => _pr.fixme_abort(`no value for property: ${$.key.value}`)
                                ))
                            })
                        })
                    })
                    default: return _pr.fixme_abort(`Unexpected type for dictionary: ${$[0]}`)
                }
            }))
            default: return _pr.fixme_abort(`Unexpected type for dictionary: ${$[0]}`)
        }
    })
}


export const process_number = (
    $: t._T_Value,
    $p: {
        'deserializer': ($: string, $p: null) => number
    }
): number => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'string': return _pr.ss($, ($) => $p.deserializer($.value, null))
            default: return _pr.fixme_abort(`Unexpected type for number: ${$[0]}`)

        }
    })
}

export const process_boolean = (
    $: t._T_Value,
    $p: {
        'deserializer': ($: string, $p: null) => boolean
    }

): boolean => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'string': return _pr.ss($, ($) => $p.deserializer($.value, null))
            default: return _pr.fixme_abort(`Unexpected type for boolean: ${$[0]}`)
        }
    })
}

export const process_text = (
    $: t._T_Value,
    $p: null

): string => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'string': return _pr.ss($, ($) => $.value)
            default: return _pr.fixme_abort(`Unexpected type for text: ${$[0]}`)
        }
    })
}

export const process_unresolved_list = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'value': ($: t._T_Value) => Mapped_Value
    }
): unresolved.List<t._T_Range, Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'ordered collection': return _pr.ss($, ($) => _pr.cc($, ($) => {
                switch ($[0]) {
                    case 'list': return _pr.ss($, ($) => {
                        const temp = $["["]
                        return {
                            'location': $["["].range,
                            'list': $["elements"].map(($) => ({
                                'location': temp.range,
                                'element': $p.value($.value)
                            }))
                        }
                    })
                    default: return _pr.fixme_abort(`Unexpected type for list: ${$[0]}`)
                }
            }))
            default: return _pr.fixme_abort(`Unexpected type for list: ${$[0]}`)
        }
    })
}

export const process_unconstrained_list = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'value': ($: t._T_Value) => Mapped_Value
    }

): unconstrained.List<null, Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'ordered collection': return _pr.ss($, ($) => _pr.cc($, ($) => {
                switch ($[0]) {
                    case 'list': return _pr.ss($, ($) => {
                        return $["elements"].map(($) => $p.value($.value))
                    })
                    default: return _pr.fixme_abort(`Unexpected type for list: ${$[0]}`)
                }
            }))
            default: return _pr.fixme_abort(`Unexpected type for list: ${$[0]}`)
        }
    })
}

export const process_optional = <Mapped_Value>(
    $: t._T_Value,
    $p: {
        'value': ($: t._T_Value) => Mapped_Value
    }

): _pi.Optional_Value<Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'not set': return _pr.ss($, ($) => _pr.not_set())
            case 'set optional value': return _pr.ss($, ($) => _pr.set($p.value($.value)))
            default: return _pr.fixme_abort(`Unexpected type for nothing: ${$[0]}`)

        }
    })
}

export const process_nothing = (
    $: t._T_Value,
    $p: null
): null => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'not set': return _pr.ss($, ($) => null)
            default: return _pr.fixme_abort(`Unexpected type for nothing: ${$[0]}`)

        }
    })
}

export const process_selected_reference = <Mapped_Value>(
    $: t._T_Value,
    $p: null
): unresolved.Reference_To_Normal_Dictionary_Entry<t._T_Range, Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'string': return _pr.ss($, ($) => ({
                'key': $.value,
                'location': $.range,
            }))
            default: return _pr.fixme_abort(`Unexpected type for selected reference key: ${$[0]}`)
        }
    })
}

export const process_stack_reference = <Mapped_Value>(
    $: t._T_Value,
    $p: null
): unresolved.Reference_To_Stacked_Dictionary_Entry<t._T_Range, Mapped_Value> => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'string': return _pr.ss($, ($) => ({
                'key': $.value,
                'location': $.range,
            }))
            default: return _pr.fixme_abort(`Unexpected type for selected reference key: ${$[0]}`)
        }
    })
}

export const process_derived_reference = (
    $: t._T_Value,
    $p: null
): null => {
    return _pr.cc($, ($) => {
        switch ($[0]) {
            case 'not set': return _pr.ss($, ($) => null)
            default: return _pr.fixme_abort(`Unexpected type for derived reference: ${$[0]}`)

        }
    })
}