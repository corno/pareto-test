import * as pr from "pareto-runtime"
import { TTestResult, TTestSet } from "../../interface/types";

export function hasErrors(
    $: TTestResult
) {
    function testSetHasErrors(
        $: TTestSet
    ): boolean {
        let foundErrors = false
        $.elements.forEach(($) => {
            switch ($.type[0]) {
                case "assert":
                    return pr.cc($.type[1], ($) => {
                        return $.failed
                    })
                case "subset":
                    return pr.cc($.type[1], ($) => {
                        return testSetHasErrors($)
                    })
                case "testString":
                    return pr.cc($.type[1], ($) => {
                        return $.result[0] === "failed"
                    })
                default: return pr.au($.type[0])
            }
        })
        return foundErrors
    }
    return testSetHasErrors($.root)
}