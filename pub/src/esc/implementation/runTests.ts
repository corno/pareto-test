import * as pr from "pareto-runtime"
import { TestSet } from "../..";

import { createTestContext } from "./createTestContext";
import { serializeTestResult } from "./serializeTestResult";
import { summarize } from "./summarize";

export function runTests(
    $i: {
        callback: (
            $i: TestSet,
        ) => void,
        log: ($: string) => void,
    },
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
            callback: $i.callback,
            onEnd: ($) => {

                isEnded = true

                serializeTestResult(
                    {
                        testResult: $.result,
                        showSummary: true,
                    },
                    $i.log,
                )
                if (summarize($.result).numberOfErrors > 0) {
                    pr.processExit(1)
                }
            }
        }
    )
}