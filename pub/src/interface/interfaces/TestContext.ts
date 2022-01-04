
export type TestStringParameters = {
    testName: string,
    expected: string,
    actual: string,
    fileLocation?: string,
}

export type TestSet = {

    subset: (
        $: string,
        $i: ($i: TestSet) => void
    ) => void
    testString: ($: TestStringParameters) => void
    assert: ($: {
        testName: string,
        condition: boolean,
    }) => void
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