import * as pr from "pareto-runtime"
import * as pt from "../../../../pub"
import { TTestResult, TTestSet } from "../../../../pub/dist/interface/types"

type Test = {
    testSetName: string,
    stringTest: pt.TestStringParameters,
    expectedLog: string[],
}

function doTest(
    $: Test,
) {
    const expectedLog = $.expectedLog
    pt.createTestContext(
        {
            numberOfFirstLine: 1,
        },
        {
            callback: ($i) => {
                $i.subset(
                    $.testSetName,
                    ($i) => {
                        $i.testString(
                            $.stringTest,
                        )
                    }
                )
            },
            onEnd: ($) => {
                const out: string[] = []
                pt.serializeTestResult(
                    $.result,
                    (str) => {
                        out.push(str)
                    }
                )
                const serializedActual = JSON.stringify(out)
                const serializedExpected = JSON.stringify(expectedLog)
                if (serializedActual !== serializedExpected) {
                    console.error(serializedExpected)
                    console.error(serializedActual)
                    throw new Error("Not equal")
                }
            }
        },
    )
}

const out: string[] = []
pt.createTestContext(
    {
        numberOfFirstLine: 1,
    },
    {
        callback: ($i) => {
            $i.subset(
                "TEST",
                ($i) => {
                    const ts = $i
                    $i.assert({
                        testName: "FOO",
                        condition: false,
                    })
                    $i.async({
                        registerListener: ($i) => {
                            setTimeout(
                                () => {
                                    ts.assert({
                                        testName: "BAR",
                                        condition: false,
                                    })
                                    $i.done()
                                },
                                1000,
                            )

                        }
                    })
                }
            )
        },
        onEnd: ($) => {
            pt.serializeTestResult(
                $.result,
                (str) => {
                    out.push(str)
                }
            )
            const serializedActual = JSON.stringify(out)
            const serializedExpected = JSON.stringify(["TEST", "  \u001b[31mFOO\u001b[0m", "  \u001b[31mBAR\u001b[0m"])
            if (serializedActual !== serializedExpected) {
                console.error(serializedExpected)
                console.error(serializedActual)
                throw new Error("Async Not equal")
            }
        }
    },
)

doTest(
    {
        testSetName: "single line",
        stringTest: {
            testName: "x",
            expected: "expected",
            actual: "actual"
        },
        expectedLog: [
            "single line",
            "  \u001b[31mx\u001b[0m",
            "    expected: 'expected'",
            "    actual:   'actual'"
        ]
    }
)
doTest(
    {
        testSetName: "multiline",
        stringTest: {
            testName: "x",
            expected: "a\na2\nb\nc\nd\ne\n",
            actual: "a\na2\nb\nd\ne\nf"
        },
        expectedLog: [
            "multiline",
            "  \u001b[31mx\u001b[0m",
            "    line 4|4",
            "      -c",
            "      -",
            "    line 7|6",
            "      +f"
        ]
    }
)
doTest(
    {
        testSetName: "added",
        stringTest: {
            testName: "x",
            expected: "line1\nline2",
            actual: "line1\nlineAdded\nline2"
        },
        expectedLog: [
            "added",
            "  \u001b[31mx\u001b[0m",
            "    line 2|2",
            "      +lineAdded",
            "      +"
        ]
    }
)
doTest(
    {
        testSetName: "replace",
        stringTest: {
            testName: "x",
            expected: "line1\noriginal\nline2",
            actual: "line1\nreplacement\nline2"
        },
        expectedLog: [
            "replace",
            "  \u001b[31mx\u001b[0m",
            "    line 2|2",
            "      -original",
            "      -",
            "    line 3|2",
            "      +replacement",
            "      +"
        ]
    }
)

doTest(
    {
        testSetName: "withFileLocation",
        stringTest: {
            testName: "x",
            expected: "foo\nfoo",
            actual: "bar",
            fileLocation: "/foo/bar",
        },
        expectedLog: [
            "withFileLocation",
            "  \u001b[31mx\u001b[0m",
            "    /foo/bar[1]",
            "      -foo",
            "      -foo",
            "    /foo/bar[3]",
            "      +bar"
        ]
    }
)



let catched = false
try {

    doTest(
        {
            testSetName: "must fail",
            stringTest: {
                testName: "x",
                expected: "",
                actual: ""
            },
            expectedLog: ["not the right log"]
        }
    )
} catch (e) {
    catched = true
}
if (!catched) {
    throw new Error("should have thrown")
}