
export type TestStringParameters = {
    testName: string,
    expected: string,
    actual: string,
    fileLocation?: string,
}

export type AsyncDoneListener = {
    done: () => void
}

export type AsyncHandler = {
    registerListener: (
        $i: AsyncDoneListener
    ) => void,
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
    async: (
        $i: AsyncHandler
    ) => void
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