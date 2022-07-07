import * as pa from "pareto-lang-api"

export type TTestSet = {
    readonly "elements": pa.IReadonlyDictionary<TTestElement>
}

export type TTestElement = {
    readonly "type":
    | ["subset", TTestSet]
    | ["test", {
        success: boolean
        type:
        | ["boolean", {
        }]
        | ["simple string", {
            readonly "expected": string,
            readonly "actual": string,
        }]
        | ["large string", {
            readonly "fileLocation"?: string,
            readonly "parts": TMultilinePart[]
        }]
    }]
}

export type TMultilinePart = {
    readonly "startLineInExpected": number,
    readonly "startLineInActual": number,
    readonly "lines": string[],
    readonly "type":
    | ["removed", {}]
    | ["added", {}]
}

export type TTestResult = {
    readonly "root": TTestSet
}