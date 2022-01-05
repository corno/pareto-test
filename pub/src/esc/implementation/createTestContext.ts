import * as diff from "diff"

import { TestContext, TestSet } from "../../interface/interfaces/TestContext"
import { TTestString, TTestResult, TTestSet, TTestStringResult, TMultiline, TMultilinePart } from "../../interface/types"

export function createTestContext(
    $: {
        numberOfFirstLine: number, //should line numbering start at 0 or at 1?
    },
    $i: {
        callback: ($i: TestContext) => void,
        onEnd: ($: {
            result: TTestResult,
        }) => void,
    },
): void {
    const testResult: TTestResult = {
        testSets: []
    }
    const lineOffset = $.numberOfFirstLine
    let numberOfOpenAsyncTests = 0
    function incrementNumberOfOpenAsyncTests() {
        numberOfOpenAsyncTests += 1
    }
    function decrementNumberOfOpenAsyncTests() {
        numberOfOpenAsyncTests -= 1
        if (numberOfOpenAsyncTests === 0) {
            $i.onEnd({
                result: testResult
            })
        }
    }
    $i.callback({
        testset: (
            testSetName,
            testSetCallback,
        ) => {
            const red = "\x1b[31m"
            const green = "\x1b[32m"
            const reset = "\x1b[0m"
            function createTestSet(
                name: string,
                indentation: string,
                addTestSet: (name: string, $: TTestSet) => void,
            ): TestSet {
                const ts: TTestSet = {
                    elements: []
                }
                addTestSet(name, ts)

                return {
                    async: ($i) => {
                        incrementNumberOfOpenAsyncTests()
                        $i.registerListener(
                            {
                                done: () => {
                                    decrementNumberOfOpenAsyncTests()
                                }
                            }
                        )
                    },
                    subset: ($, $i) => {
                        $i(createTestSet(
                            $,
                            indentation + `  `,
                            (name, $) => {
                                ts.elements.push({
                                    name: name,
                                    type: ["subset", $],
                                })
                            }
                        ))
                    },
                    assert: ($) => {
                        ts.elements.push({
                            name: $.testName,
                            type: ["assert", {
                                failed: !$.condition,
                            }]
                        })
                    },
                    testString: ($) => {
                        ts.elements.push({
                            name: $.testName,
                            type: ["testString", {
                                result: ((): TTestStringResult => {

                                    if ($.actual === $.expected) {
                                        return ["success", {}]
                                    } else {
                                        return ["failed", {
                                            multiline: ((): TMultiline => {
                                                if ($.expected.indexOf("\n") === -1) {
                                                    return ["no", {
                                                        expected: $.expected,
                                                        actual: $.actual,
                                                    }]
                                                } else {
                                                    const parts: TMultilinePart[] = []

                                                    let lineCountOfExpected = lineOffset
                                                    let lineCountOfActual = lineOffset
                                                    const writeLine = (
                                                    ) => {
                                                        if ($.fileLocation !== undefined) {
                                                            //$i.log(`${indentation}    ${$.fileLocation}[${lineCountOfExpected}]`)
                                                        } else {
                                                            //$i.log(`${indentation}    line ${lineCountOfExpected}|${lineCountOfActual}`)
                                                        }
                                                    }
                                                    diff.diffLines(
                                                        $.expected,
                                                        $.actual,
                                                        {
                                                            newlineIsToken: false,
                                                        }
                                                    ).forEach((part) => {
                                                        if (part.count === undefined) {
                                                            throw new Error("unexpected: no line count")
                                                        }
                                                        if (part.added) {
                                                            if (part.removed) {
                                                                //added and removed???
                                                                throw new Error("unexpected: added and removed")
                                                            } else {
                                                                parts.push({
                                                                    startLineInExpected: lineCountOfExpected,
                                                                    startLineInActual: lineCountOfActual,
                                                                    lines: part.value.split(`\n`),
                                                                    type: ["added", {}],
                                                                })
                                                            }
                                                            lineCountOfActual += part.count
                                                        } else {
                                                            if (part.removed) {
                                                                parts.push({
                                                                    startLineInExpected: lineCountOfExpected,
                                                                    startLineInActual: lineCountOfActual,
                                                                    lines: part.value.split(`\n`),
                                                                    type: ["removed", {}],
                                                                })
                                                            } else {
                                                                lineCountOfActual += part.count
                                                            }
                                                            lineCountOfExpected += part.count
                                                        }
                                                    })
                                                    return ["yes", {
                                                        fileLocation: $.fileLocation,
                                                        parts: parts,
                                                    }]
                                                }
                                            })()
                                        }]
                                    }
                                })()
                            }]
                        })

                    },
                }
            }
            testSetCallback(createTestSet(
                testSetName,
                ``,
                (name, $) => {
                    testResult.testSets.push({
                        name: name,
                        testSet: $,
                    })
                },
            ))
        },
    })
    if (numberOfOpenAsyncTests === 0) {
        $i.onEnd({
            result: testResult
        })
    }
}