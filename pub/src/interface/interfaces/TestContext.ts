
export type TestStringParameters = {
    testName: string,
    expected: string,
    actual: string,
    fileLocation?: string,
}

export type AsyncTestSet = {
    testSet: TestSet
    done: () => void
}

export type AsyncHandler = {
    registerListener: (
        $i: AsyncTestSet
    ) => void,
}

export type TestSet = {
    subset: (
        $: string,
        $i: ($i: TestSet) => void
    ) => void
    testString: (
        $: TestStringParameters
    ) => void
    assert: ($: {
        testName: string,
        condition: boolean,
    }) => void
    asyncSubset: (
        $: {
            name: string,
        },
        $i: AsyncHandler
    ) => void
}

export type TestContext = TestSet