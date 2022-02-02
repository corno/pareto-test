import * as diff from "diff"

import { TestContext, TestSet } from "../../interface/interfaces/TestContext"
import { TTestResult, TTestSet, TTestStringResult, TMultiline, TMultilinePart } from "../../interface/types"


type Counter = {
    increment: () => void,
    decrement: () => void,
}

function createCounter(
    callback: ($: Counter) => void,
    onEnd: () => void,
) {
    let counter = 0
    let ended = false
    function wrapup() {
        if (counter === 0) {
            ended = true
            onEnd()
        }
    }
    callback({
        increment: () => {
            if (ended) {
                console.error("async call done after context is ended")
            }
            counter += 1

        },
        decrement: () => {
            counter -= 1
            wrapup()
        },
    })
    wrapup()
}

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
        root: {
            elements: []
        }
    }
    const lineOffset = $.numberOfFirstLine
    createCounter(
        (counter) => {

            function createTestSet(
                ts: TTestSet,
            ): TestSet {
                return {
                    asyncSubset: ($, $i) => {
                        counter.increment()
                        let closed = false
        
        
                        const ss: TTestSet = {
                            elements: []
                        }
        
                        $i.registerListener({
                            testSet: createTestSet(
                                ss,
                            ),
                            done: () => {
                                if (closed) {
                                    throw new Error("Unexpected; async is closed twice")
                                }
                                closed = true
                                counter.decrement()
                            },
                        })
                        ts.elements.push({
                            name: $.name,
                            type: ["subset", ss],
                        })
                    },
                    subset: ($, $i) => {
                        const ss: TTestSet = {
                            elements: []
                        }
        
                        $i(createTestSet(
                            ss,
                        ))
                        ts.elements.push({
                            name: $,
                            type: ["subset", ss],
                        })
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
            $i.callback(createTestSet(
                testResult.root
            ))
        },
        () => {
            $i.onEnd({
                result: testResult
            })
        }
    )
}