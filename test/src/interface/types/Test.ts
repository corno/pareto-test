import { TTestStringParameters } from "./TestStringParameters";

export type Test = {
    readonly "testSetName": string,
    readonly "stringTest": TTestStringParameters,
    readonly "expectedLog": string[],
    readonly "expectEqual": boolean,
}
