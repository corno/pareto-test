import { TTestStringParameters } from "../types/TestResult"

export type IAsyncTestSet = {
    readonly "testSet": ITestSet
    readonly "done": ($: {}) => void
}

export type ITestSet = {
    /**
     * create a named subset
     */
    readonly "subset": (
        $: string,
        $i: ($i: ITestSet) => void
    ) => void
    /**
     * test a string for equality
     */
    readonly "testString": (
        $: TTestStringParameters
    ) => void
    /**
     * assert a named condition
     */
    readonly "assert": (
        /*the data*/
        $: {
            readonly "testName": string,
            readonly "condition": boolean,
        }
    ) => void
    /**
     * create an async subset.
     * An async subset has to be ended by calling $.done()
     */
    readonly "asyncSubset": (
        $: {
            readonly "name": string,
        },
        $i: (
            /**
             * interface
             */
            $i: IAsyncTestSet
        ) => void,
    ) => void
}

export type ITestContext = ITestSet