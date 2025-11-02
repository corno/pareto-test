import * as _et from 'exupery-core-types'

export type Test_Runner = {
    'target_extension': string,  // e.g., 'json', 'txt', 'dot'
    'transformer': (input_content: string) => string,
}

export type Test_Runners = _et.Dictionary<Test_Runner>
