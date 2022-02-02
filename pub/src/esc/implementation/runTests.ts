import * as pr from "pareto-runtime"

import { createTestContext } from "./createTestContext";
import { serializeTestResult } from "./serializeTestResult";

export function runTests(
    $i: ($: string) => void,
) {
    let isEnded = false
    pr.subscribeToProcessBeforeExit(($) => {
        if (!isEnded) {
            throw new Error("NOT ENDED")
        }
    })

    createTestContext(
        {
            numberOfFirstLine: 1,
        },
        {
            callback: ($i) => {

            },
            onEnd: ($) => {

                isEnded = true

                serializeTestResult(
                    {
                        testResult: $.result,
                        showSummary: true,
                    },
                    $i,
                )
            }
        }
    )
}