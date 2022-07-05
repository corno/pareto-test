
import * as pr from "pareto-runtime"
import * as pt from "../../../../lib"
import { Test } from "../../interface/types/Test"
import * as diffLib from "pareto-diff-lib"

pr.runProgram(
    () => {

        // const stdout = pr.createStdOut()
        // const stderr = pr.createStdErr()

        // function log(msg: string) {
        //     stdout.write(msg)
        //     stdout.write("\n")
        // }
        // function error(msg: string) {
        //     stderr.write(msg)
        //     stderr.write("\n")
        // }
        
        // function doTest(
        //     $: Test,
        // ) {
        //     const test = $
        //     pt.createTestContext(
        //         {
        //             numberOfFirstLine: 1,
        //         },
        //         {
        //             callback: ($i) => {
        //                 $i.subset(
        //                     $.testSetName,
        //                     ($i) => {
        //                         $i.testString(
        //                             $.stringTest,
        //                         )
        //                     }
        //                 )
        //             },
        //             onEnd: ($) => {
        //                 const out: string[] = []
        //                 pt.serializeTestResult(
        //                     {
        //                         testResult: $.result,
        //                         showSummary: false,
        //                     },
        //                     (str) => {
        //                         out.push(str)
        //                     }
        //                 )
        //                 const serializedActual = pr.JSONstringify(out)
        //                 const serializedExpected = pr.JSONstringify(test.expectedLog)
        //                 log(`${test.testSetName}`)
        //                 if (test.expectEqual) {
        //                     if (serializedActual !== serializedExpected) {
        //                         error(serializedExpected)
        //                         error(serializedActual)
        //                         throw new Error("Not equal")
        //                     }
        //                 } else {
        //                     if (serializedActual === serializedExpected) {
        //                         error(serializedExpected)
        //                         error(serializedActual)
        //                         throw new Error("Not equal")
        //                     }
        //                 }
        //             }
        //         },
        //         diffLib.init(),
        //     )
        // }

        // const out: string[] = []
        // pt.createTestContext(
        //     {
        //         numberOfFirstLine: 1,
        //     },
        //     {
        //         callback: ($i) => {
        //             $i.subset(
        //                 "TEST",
        //                 ($i) => {
        //                     $i.assert({
        //                         testName: "FOO",
        //                         condition: false,
        //                     })
        //                     $i.asyncSubset(
        //                         {
        //                             name: "XXX",
        //                         },
        //                         ($i) => {
        //                             setTimeout(
        //                                 () => {
        //                                     $i.testSet.assert({
        //                                         testName: "BAR",
        //                                         condition: false,
        //                                     })
        //                                     $i.done({})
        //                                 },
        //                                 1000,
        //                             )
        //                         })
        //                 }
        //             )
        //         },
        //         onEnd: ($) => {
        //             pt.serializeTestResult(
        //                 {
        //                     testResult: $.result,
        //                     showSummary: false,
        //                 },
        //                 (str) => {
        //                     out.push(str)
        //                 }
        //             )
        //             const serializedActual = pr.JSONstringify(out)
        //             const serializedExpected = pr.JSONstringify(["TEST", "  \u001b[31mFOO\u001b[0m", "  XXX", "    \u001b[31mBAR\u001b[0m"])
        //             if (serializedActual !== serializedExpected) {
        //                 error(serializedExpected)
        //                 error(serializedActual)
        //                 throw new Error("Async Not equal")
        //             }
        //         }
        //     },
        //     diffLib.init()
        // )

        // doTest(
        //     {
        //         testSetName: "single line",
        //         stringTest: {
        //             testName: "x",
        //             expected: "expected",
        //             actual: "actual"
        //         },
        //         expectedLog: [
        //             "single line",
        //             "  \u001b[31mx\u001b[0m",
        //             "    expected: 'expected'",
        //             "    actual:   'actual'"
        //         ],
        //         expectEqual: true,
        //     }
        // )
        // doTest(
        //     {
        //         testSetName: "multiline",
        //         stringTest: {
        //             testName: "x",
        //             expected: "a\na2\nb\nc\nd\ne\n",
        //             actual: "a\na2\nb\nd\ne\nf"
        //         },
        //         expectedLog: [
        //             "multiline",
        //             "  \u001b[31mx\u001b[0m",
        //             "    line 4|4",
        //             "      -c",
        //             "      -",
        //             "    line 7|6",
        //             "      +f"
        //         ],
        //         expectEqual: true,
        //     }
        // )
        // doTest(
        //     {
        //         testSetName: "added",
        //         stringTest: {
        //             testName: "x",
        //             expected: "line1\nline2",
        //             actual: "line1\nlineAdded\nline2"
        //         },
        //         expectedLog: [
        //             "added",
        //             "  \u001b[31mx\u001b[0m",
        //             "    line 2|2",
        //             "      +lineAdded",
        //             "      +"
        //         ],
        //         expectEqual: true,
        //     }
        // )
        // doTest(
        //     {
        //         testSetName: "replace",
        //         stringTest: {
        //             testName: "x",
        //             expected: "line1\noriginal\nline2",
        //             actual: "line1\nreplacement\nline2"
        //         },
        //         expectedLog: [
        //             "replace",
        //             "  \u001b[31mx\u001b[0m",
        //             "    line 2|2",
        //             "      -original",
        //             "      -",
        //             "    line 3|2",
        //             "      +replacement",
        //             "      +"
        //         ],
        //         expectEqual: true,
        //     }
        // )

        // doTest(
        //     {
        //         testSetName: "withFileLocation",
        //         stringTest: {
        //             testName: "x",
        //             expected: "foo\nfoo",
        //             actual: "bar",
        //             fileLocation: "/foo/bar",
        //         },
        //         expectedLog: [
        //             "withFileLocation",
        //             "  \u001b[31mx\u001b[0m",
        //             "    \u001b[36m/foo/bar\u001b[0m:\u001b[33m1\u001b[0m",
        //             "      -foo",
        //             "      -foo",
        //             "    \u001b[36m/foo/bar\u001b[0m:\u001b[33m3\u001b[0m",
        //             "      +bar"
        //         ],
        //         expectEqual: true,
        //     }
        // )

        // doTest(
        //     {
        //         testSetName: "must fail",
        //         stringTest: {
        //             testName: "x",
        //             expected: "",
        //             actual: ""
        //         },
        //         expectedLog: ["not the right log"],
        //         expectEqual: false,
        //     }
        // )
    }
)
