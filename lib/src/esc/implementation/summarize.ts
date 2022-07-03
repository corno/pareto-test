import * as pl from "pareto-lang-lib"
import * as api from "pareto-test-api"

export function summarize(
    $: api.TTestResult
): api.TSummary {
    type SSummary = {
        "numberOfErrors": number
        "numberOfTests": number
    }
    const summary: SSummary = {
        numberOfErrors: 0,
        numberOfTests: 0,
    }
    function summarizeTestSet(
        $: api.TTestSet
    ): void {
        $.elements.forEach(($) => {
            switch ($.type[0]) {
                case "assert":
                    pl.cc($.type[1], ($) => {
                        summary.numberOfTests += 1
                        if ($.failed) {
                            summary.numberOfErrors += 1
                        }
                    })
                    break
                case "subset":
                    pl.cc($.type[1], ($) => {
                        summarizeTestSet($)
                    })
                    break
                case "testString":
                    pl.cc($.type[1], ($) => {
                        summary.numberOfTests += 1
                        if ($.result[0] === "failed") {
                            summary.numberOfErrors += 1
                        }
                        
                    })
                    break
                default: pl.au($.type[0])
            }
        })
    }
    summarizeTestSet(
        $.root,
    )
    return summary
}