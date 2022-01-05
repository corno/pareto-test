import * as pr from "pareto-runtime"
import { Summary, TTestResult, TTestSet } from "../../interface/types";

export function summarize(
    $: TTestResult
): Summary {
    const summary: Summary = {
        numberOfErrors: 0,
        numberOfTests: 0,
    }
    function summarizeTestSet(
        $: TTestSet
    ): void {
        $.elements.forEach(($) => {
            switch ($.type[0]) {
                case "assert":
                    pr.cc($.type[1], ($) => {
                        summary.numberOfTests += 1
                        if ($.failed) {
                            summary.numberOfErrors += 1
                        }
                    })
                    break
                case "subset":
                    pr.cc($.type[1], ($) => {
                        summarizeTestSet($)
                    })
                    break
                case "testString":
                    pr.cc($.type[1], ($) => {
                        summary.numberOfTests += 1
                        if ($.result[0] === "failed") {
                            summary.numberOfErrors += 1
                        }
                        
                    })
                    break
                default: pr.au($.type[0])
            }
        })
    }
    summarizeTestSet(
        $.root,
    )
    return summary
}