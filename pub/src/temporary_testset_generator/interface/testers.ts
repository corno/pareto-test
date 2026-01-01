
import { Directory_to_Test_Collection_Result_Transformer } from "../../implementation/temp/higher_order_functions/generic_testset/temp"

export type Package = {
    'schemas': { [key: string]: Schema }
}

export type Testset_for_set_of_algorithms = undefined | {
    [key: string]: Directory_to_Test_Collection_Result_Transformer
}

export type Schema = {
    'deserializers'?: Testset_for_set_of_algorithms
    'refiners'?: {
        [key: string]: Testset_for_set_of_algorithms
    }
    'transformers'?: {
        [key: string]: Testset_for_set_of_algorithms
    }
    'serializers'?: Testset_for_set_of_algorithms
}