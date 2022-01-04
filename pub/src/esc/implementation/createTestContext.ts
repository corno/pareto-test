import * as diff from "diff"

import { TestContext, TestSet } from "../../interface/interfaces/TestContext"

// console.log('\x1b[31m', 'sometext');
// console.log('sometext2' ,'\x1b[0m');
// console.log('sometext3');

export function createTestContext(
    $: {
        numberOfFirstLine: number, //should line numbering start at 0 or at 1?
    },
    $i: {
        callback: ($i: TestContext) => void,
        log: (str: string) => void,
        onEnd: ($: {
            errorCount: number,
        }) => void,
    },
): void {
    const lineOffset = $.numberOfFirstLine
    let errorCount = 0
    $i.callback({
        testset: (
            testSetName,
            testSetCallback,
        ) => {
            const log = $i.log
            const red = "\x1b[31m"
            const green = "\x1b[32m"
            const reset = "\x1b[0m"
            function createTestSet(
                name: string,
                indentation: string
            ): TestSet {
                log(`${indentation}${name}`)
                return {
                    subset: ($, $i) => {
                        $i(createTestSet(
                            $,
                            indentation + `  `
                        ))
                    },
                    assert: ($) => {
                        if (!$.condition) {
                            $i.log(`${indentation}${red}${$.testName}${reset}`)   
                            errorCount += 1
                        } else {
                            $i.log(`${indentation}${green}${$.testName}${reset}`)

                        }
                    },
                    testString: ($) => {
                        if ($.actual !== $.expected) {
                            errorCount += 1
                            $i.log(`${indentation}  ${red}${$.testName}${reset}`)
                            if ($.expected.indexOf("\n") === -1) {
                                $i.log(`${indentation}    expected: '${$.expected}'`)
                                $i.log(`${indentation}    actual:   '${$.actual}'`)
                                //no newlines expected
                            } else {
                                let lineCountOfExpected = lineOffset
                                let lineCountOfActual = lineOffset
                                const writeLine = (
                                ) => {
                                    if ($.fileLocation !== undefined) {
                                        $i.log(`${indentation}    ${$.fileLocation}[${lineCountOfExpected}]`)
                                    } else {
                                        $i.log(`${indentation}    line ${lineCountOfExpected}|${lineCountOfActual}`)
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
                                            writeLine()
                                            part.value.split(`\n`).forEach(($) => {
                                                $i.log(`${indentation}      +${$}`)
                                            })
                                        }
                                        lineCountOfActual += part.count
                                    } else {
                                        if (part.removed) {
                                            writeLine()
                                            part.value.split(`\n`).forEach(($) => {
                                                $i.log(`${indentation}      -${$}`)
                                            })
                                        } else {
                                            lineCountOfActual += part.count
                                        }
                                        lineCountOfExpected += part.count
                                    }
                                    //const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
                                    //console.error(part.value, part.added, part.count, part.removed);
                                })
                            }
                        } else {
                            $i.log(`${indentation}${green}${$.testName}${reset}`)
                        }
                    },
                    // testSync: (
                    //     testName,
                    //     testCallback,
                    // ) => {
                    //     testCallback({
                    //         testString: (
                    //             expected,
                    //             actual,
                    //         ) => {
                    //             if ()
                    //             pt.assertEqual(expected, actual)
                    //         },
                    //     })
                    // },
                }
            }
            testSetCallback(createTestSet(
                testSetName,
                ``
                ))
        },
    })
    $i.onEnd({
        errorCount: errorCount
    })
}