
export type TestStringParameters = {
    testName: string,
    expected: string,
    actual: string,
    fileLocation?: string,
}

export type TestSet = {

    testString: ($: TestStringParameters) => void
    // testSync: (
    //     name: string,
    //     callback: ($: Test) => void
    // ) => void
}

export type TestContext = {
    testset(
        name: string,
        callback: ($: TestSet) => void
    ): void
}