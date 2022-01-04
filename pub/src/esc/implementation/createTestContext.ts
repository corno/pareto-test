import * as diff from "diff"

import { TestContext } from "../../interface/interfaces/TestContext"

// console.log('\x1b[31m', 'sometext');
// console.log('sometext2' ,'\x1b[0m');
// console.log('sometext3');

export function createTestContext(
    $i: {
        callback: ($i: TestContext) => void,
        log: (str: string) => void,
        onEnd: ($: {
            errorCount: number,
        }) => void,
    },
): void {
    let errorCount = 0
    $i.callback({
        testset: (
            testSetName,
            testSetCallback,
        ) => {
            $i.log(testSetName)
            testSetCallback({
                testString: ($) => {
                    if ($.actual !== $.expected) {
                        errorCount += 1
                        const red = "\x1b[31m"
                        const reset = "\x1b[0m"
                        $i.log(`  ${red}${$.testName}${reset}`)
                        if ($.expected.indexOf("\n") === -1) {
                            $i.log(`    expected: '${$.expected}'`)
                            $i.log(`    actual:   '${$.actual}'`)
                            //no newlines expected
                        } else {
                            let lineCountOfExpected = 0
                            let lineCountOfActual = 0
                            const writeLine = (
                            ) => {
                                if ($.fileLocation !== undefined) {
                                    $i.log(`    ${$.fileLocation}[${lineCountOfExpected}]`)
                                } else {
                                    $i.log(`    line ${lineCountOfExpected}|${lineCountOfActual}`)
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
                                            $i.log(`      +${$}`)
                                        })
                                    }
                                    lineCountOfActual += part.count
                                } else {
                                    if (part.removed) {
                                        writeLine()
                                        part.value.split(`\n`).forEach(($) => {
                                            $i.log(`      -${$}`)
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
                        $i.log(`  \x1b[32m${$.testName}\x1b[0m`)
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
            })
        },
    })
    $i.onEnd({
        errorCount: errorCount
    })
}