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
        $.elements.toArray().forEach(($) => {
            switch ($.value.type[0]) {
                case "subset":
                    pl.cc($.value.type[1], ($) => {
                        summarizeTestSet($)
                    })
                    break
                case "test":
                    pl.cc($.value.type[1], ($) => {
                        summary.numberOfTests += 1
                        if (!$.success) {
                            summary.numberOfErrors += 1
                        }

                    })
                    break
                default: pl.au($.value.type[0])
            }
        })
    }
    summarizeTestSet(
        $.root,
    )
    return summary
}