import * as pt from "pareto-test-api"

export type Test = {
    readonly "testSetName": string,
    readonly "stringTest": pt.TTestStringParameters,
    readonly "expectedLog": string[],
    readonly "expectEqual": boolean,
}
