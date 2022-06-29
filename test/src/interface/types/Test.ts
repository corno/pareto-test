import * as pt from "../../../../lib"

export type Test = {
    readonly "testSetName": string,
    readonly "stringTest": pt.TTestStringParameters,
    readonly "expectedLog": string[],
    readonly "expectEqual": boolean,
}
