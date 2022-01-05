export type TTestResult = {
    root: TTestSet
}

export type TTestSet = {
    elements: TTestElement[]
}

export type TTestElement = {
    name: string
    type:
    | ["subset", TTestSet]
    | ["assert", {
        failed: boolean
    }]
    | ["testString", TTestString]
}

export type TTestString = {
    result: TTestStringResult
}

export type TTestStringResult =
    | ["success", {}]
    | ["failed", {
        "multiline": TMultiline
    }]

export type TMultiline =
    | ["no", {
        expected: string,
        actual: string,
    }]
    | ["yes", {
        fileLocation?: string,
        parts: TMultilinePart[]
    }]

export type TMultilinePart = {
    startLineInExpected: number,
    startLineInActual: number,
    lines: string[],
    type:
    | ["removed", {}]
    | ["added", {}]
}