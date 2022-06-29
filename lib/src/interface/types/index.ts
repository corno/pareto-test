export type TTestResult = {
    readonly "root": TTestSet
}

export type TSummary = {
    readonly "numberOfErrors": number
    readonly "numberOfTests": number
}

export type TTestSet = {
    readonly "elements": TTestElement[]
}

export type TTestElement = {
    readonly "name": string
    readonly "type":
    | ["subset", TTestSet]
    | ["assert", {
        readonly "failed": boolean
    }]
    | ["testString", TTestString]
}

export type TTestString = {
    readonly "result": TTestStringResult
}

export type TTestStringResult =
    | ["success", {}]
    | ["failed", {
        readonly "multiline": TMultiline
    }]

export type TMultiline =
    | ["no", {
        readonly "expected": string,
        readonly "actual": string,
    }]
    | ["yes", {
        readonly "fileLocation"?: string,
        readonly "parts": TMultilinePart[]
    }]

export type TMultilinePart = {
    readonly "startLineInExpected": number,
    readonly "startLineInActual": number,
    readonly "lines": string[],
    readonly "type":
    | ["removed", {}]
    | ["added", {}]
}

export type TTestStringParameters = {
    readonly "testName": string,
    readonly "expected": string,
    readonly "actual": string,
    readonly "fileLocation"?: string,
}
