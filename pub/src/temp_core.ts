import * as _pi from 'pareto-core-interface'
import * as _pt from 'pareto-core-transformer'
import * as _pinternals from 'pareto-core-internals'

export type Iterator<Element, State> = {
    'consume current': () => _pi.Optional_Value<Element>,
    'look ahead': (offset: number) => _pi.Optional_Value<Element>
    'consume': () => void,
    'get state': () => State,
}

class Refine_Guard_Abort_Error<Error> {
    constructor(
        public readonly error: Error,
    ) { }
}

export const create_refinement_context = <Result, Error, State>(
    callback: (abort: _pi.Abort<Error>) => Result,
): _pi.Deprecated_Refinement_Result<Result, Error> => {
    try {
        return _pinternals.__deprecated_create_success_refinement_result(callback(
            (error) => {
                throw new Refine_Guard_Abort_Error(error);
            },
        ))
    } catch (e) {
        if (e instanceof Refine_Guard_Abort_Error) {
            return _pinternals.__deprecated_create_failure_refinement_result(e.error)
        }
        //okay, this is unexpected, rethrow
        throw e
    }
}


export const create_array_iterator = <Element>($: _pi.List<Element>): Iterator<Element, number> => {
    const length = $.get_number_of_elements()
    let position = 0
    return {
        'consume current': () => {
            position += 1
            return $.__get_element_at(position - 1)
        },
        'look ahead': (offset: number) => {
            return $.__get_element_at(position + offset)
        },
        'get state': () => {
            return position
        },
        'consume': () => {
            position += 1
        },
    }
}


type Refiner<Output, Error, Input> = (
    $: Input,
) => _pi.Deprecated_Refinement_Result<Output, Error>

export const create_array_refiner = <Type, Error, Iterator_Element>(
    builder: (abort: _pi.Abort<Error>, iterator: Iterator<Iterator_Element, number>) => Type
): Refiner<Type, Error, _pi.List<Iterator_Element>> => {
    return ($: _pi.List<Iterator_Element>) => {
        const iter = create_array_iterator($)
        return create_refinement_context<Type, Error, Iterator<Iterator_Element, number>>(
            (abort) => {
                return builder(
                    abort,
                    iter
                )
            }
        )
    }
}