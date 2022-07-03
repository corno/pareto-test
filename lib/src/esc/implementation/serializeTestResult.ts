import * as pl from "pareto-lang-lib"
import * as api from "pareto-test-api"
import { summarize } from "./summarize"

export function serializeTestResult(
    $: {
        testResult: api.TTestResult,
        showSummary: boolean,
    },
    log: (str: string) => void,
) {
    const red = "\x1b[31m"
    const green = "\x1b[32m"
    const yellow = "\x1b[33m"
    const cyan = "\x1b[36m"
    const reset = "\x1b[0m"

    function serializeTestSet(
        $: api.TTestSet,
        indentation: string,
    ) {
        $.elements.forEach(($) => {
            const name = $.name
            switch ($.type[0]) {
                case "assert":
                    pl.cc($.type[1], ($) => {
                        log(`${indentation}${$.failed ? red : green}${name}${reset}`)
                    })
                    break
                case "subset":
                    pl.cc($.type[1], ($) => {
                        log(`${indentation}${name}`)
                        serializeTestSet(
                            $,
                            `${indentation}  `,
                        )
                    })
                    break
                case "testString":
                    pl.cc($.type[1], ($) => {
                        switch ($.result[0]) {
                            case "failed":
                                pl.cc($.result[1], ($) => {
                                    log(`${indentation}${red}${name}${reset}`)
                                    switch ($.multiline[0]) {
                                        case "no":
                                            pl.cc($.multiline[1], ($) => {
                                                log(`${indentation}  expected: '${$.expected}'`)
                                                log(`${indentation}  actual:   '${$.actual}'`)
                                            })
                                            break
                                        case "yes":
                                            pl.cc($.multiline[1], ($) => {
                                                const fileLocation = $.fileLocation
                                                $.parts.forEach(($) => {
                                                    const added = $.type[0] === "added"

                                                    if (fileLocation !== undefined) {
                                                        log(`${indentation}  ${cyan}${fileLocation}${reset}:${yellow}${$.startLineInExpected}${reset}`)
                                                    } else {
                                                        log(`${indentation}  line ${$.startLineInExpected}|${$.startLineInActual}`)
                                                    }
                                                    $.lines.forEach(($) => {
                                                        log(`${indentation}    ${added ? "+" : "-"}${$}`)
                                                    })
                                                })
                                            })
                                            break
                                        default: pl.au($.multiline[0])
                                    }
                                })
                                break
                            case "success":
                                pl.cc($.result[1], ($) => {
                                    log(`${indentation}${green}${name}${reset}`)
                                })
                                break
                            default: pl.au($.result[0])
                        }
                    })
                    break
                default: pl.au($.type[0])
            }
        })
    }
    serializeTestSet(
        $.testResult.root,
        ``
    )
    if ($.showSummary) {
        log(``)
        const summary = summarize($.testResult)
        log(`${green}${summary.numberOfTests - summary.numberOfErrors} tests${reset}`)
        log(`${summary.numberOfErrors > 0 ? red : reset}${summary.numberOfErrors} errors${reset}`)
    }
}
