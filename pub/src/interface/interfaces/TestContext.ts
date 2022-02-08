import { TTestStringParameters } from "../types"

export type IAsyncTestSet = {
    readonly "testSet": ITestSet
    readonly "done": ($: {}) => void
}

export type ITestSet = {
    readonly "subset": (
        $: string,
        $i: ($i: ITestSet) => void
    ) => void
    readonly "testString": (
        $: TTestStringParameters
    ) => void
    readonly "assert": ($: {
        readonly "testName": string,
        readonly "condition": boolean,
    }) => void
    readonly "asyncSubset": (
        $: {
            readonly "name": string,
        },
        $i: ($i: IAsyncTestSet) => void,
    ) => void
}

export type ITestContext = ITestSet