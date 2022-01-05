import * as pr from "pareto-runtime"
import { TTestResult, TTestSet } from "../../interface/types"

export function serializeTestResult(
    $: TTestResult,
    log: (str: string) => void,
) {
    const red = "\x1b[31m"
    const green = "\x1b[32m"
    const reset = "\x1b[0m"

    function serializeTestSet(
        $: TTestSet,
        indentation: string,
    ) {
        $.elements.forEach(($) => {
            const name = $.name
            switch ($.type[0]) {
                case "assert":
                    pr.cc($.type[1], ($) => {
                        log(`${indentation}${$.failed ? red : green}${name}${reset}`)
                    })
                    break
                case "subset":
                    pr.cc($.type[1], ($) => {
                        log(`${indentation}${name}`)
                        serializeTestSet(
                            $,
                            `${indentation}  `,
                        )
                    })
                    break
                case "testString":
                    pr.cc($.type[1], ($) => {
                        switch ($.result[0]) {
                            case "failed":
                                pr.cc($.result[1], ($) => {
                                    log(`${indentation}${red}${name}${reset}`)
                                    switch ($.multiline[0]) {
                                        case "no":
                                            pr.cc($.multiline[1], ($) => {
                                                log(`${indentation}  expected: '${$.expected}'`)
                                                log(`${indentation}  actual:   '${$.actual}'`)
                                            })
                                            break
                                        case "yes":
                                            pr.cc($.multiline[1], ($) => {
                                                const fileLocation = $.fileLocation
                                                $.parts.forEach(($) => {
                                                    const added = $.type[0] === "added"

                                                    if (fileLocation !== undefined) {
                                                        log(`${indentation}  ${fileLocation}[${$.startLineInExpected}]`)
                                                    } else {
                                                        log(`${indentation}  line ${$.startLineInExpected}|${$.startLineInActual}`)
                                                    }
                                                    $.lines.forEach(($) => {
                                                        log(`${indentation}    ${added ? "+" : "-"}${$}`)
                                                    })
                                                })
                                            })
                                            break
                                        default: pr.au($.multiline[0])
                                    }
                                })
                                break
                            case "success":
                                pr.cc($.result[1], ($) => {
                                    log(`${indentation}${green}${name}${reset}`)
                                })
                                break
                            default: pr.au($.result[0])
                        }
                    })
                    break
                default: pr.au($.type[0])
            }
        })
    }
    serializeTestSet(
        $.root,
        ``
    )
}
