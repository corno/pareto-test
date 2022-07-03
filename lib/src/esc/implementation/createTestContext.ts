import * as diffAPI from "pareto-diff-api"

import api from "pareto-test-api"
import { createCounter } from "../../modules/counter"



export function createTestContext(
    $: {
        /**
         * when reporting differences in multiline strings,
         * should line numbering start at 0 or at 1?
         */
        numberOfFirstLine: number,
    },
    $i: {
        callback: ($i: api.ITestContext) => void,
        onEnd: ($: {
            result: api.TTestResult,
        }) => void,
    },
    diff: diffAPI.API,
): void {
    const testResult: api.TTestResult = {
        root: {
            elements: []
        }
    }
    const lineOffset = $.numberOfFirstLine
    createCounter(
        (counter) => {

            function createTestSet(
                ts: api.TTestSet,
            ): api.ITestSet {
                return {
                    asyncSubset: ($, $i) => {
                        counter.increment({})
                        let closed = false
        
        
                        const ss: api.TTestSet = {
                            elements: []
                        }
        
                        $i({
                            testSet: createTestSet(
                                ss,
                            ),
                            done: () => {
                                if (closed) {
                                    throw new Error("Unexpected; async is closed twice")
                                }
                                closed = true
                                counter.decrement({})
                            },
                        })
                        ts.elements.push({
                            name: $.name,
                            type: ["subset", ss],
                        })
                    },
                    subset: ($, $i) => {
                        const ss: api.TTestSet = {
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
                                result: ((): api.TTestStringResult => {
        
                                    if ($.actual === $.expected) {
                                        return ["success", {}]
                                    } else {
                                        return ["failed", {
                                            multiline: ((): api.TMultiline => {
                                                if ($.expected.indexOf("\n") === -1) {
                                                    return ["no", {
                                                        expected: $.expected,
                                                        actual: $.actual,
                                                    }]
                                                } else {
                                                    const parts: api.TMultilinePart[] = []
        
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