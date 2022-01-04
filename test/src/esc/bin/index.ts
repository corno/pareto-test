import * as pt from "../../../../pub"

// pt.createTestContext(
//     {
//         log: console.log,
//         foundError: () => {
//             //
//         }
//     }
// ).testset(
//     "MyTest",
//     ($) => {
//         $.testString({
//             testName: "multiline",
//             expected: "a\na2\nb\nc\nd\ne\n",
//             actual:   "a\na2\nb\nd\ne\nf"
//         })
//         $.testString({
//             testName: "addedInbetween",
//             expected: "line1\nline2",
//             actual:   "line1\nlineInbeween\nline2"
//         })


//         $.testString({
//             testName: "fail: string not equal",
//             expected: "Not Equal",
//             actual: "Like I said"
//         })
//         $.testString({
//             testName: "success: string equal",
//             expected: "Equal",
//             actual: "Equal"
//         })
//     }
// )

type Test = {
    testSetName: string,
    stringTest: pt.TestStringParameters,
    expectedLog: string[],
}

function doTest(
    $: Test,
) {
    const out: string[] = []
    const expectedLog = $.expectedLog
    pt.createTestContext(
        {
            log: ($) => {
                out.push($)
            },
            callback: ($i) => {
                $i.testset(
                    $.testSetName,
                    ($i) => {
                        $i.testString(
                            $.stringTest,
                        )
                    }
                )
            },
            onEnd: ($) => {
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
            "    line 3|3",
            "      -c",
            "      -",
            "    line 6|5",
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
            "    line 1|1",
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
            "    line 1|1",
            "      -original",
            "      -",
            "    line 2|1",
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
            "    /foo/bar[0]",
            "      -foo",
            "      -foo",
            "    /foo/bar[2]",
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