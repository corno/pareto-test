import * as api from "pareto-test-api"
import { serializeTestResult } from "./esc/implementation/serializeTestResult"
import { summarize } from "./esc/implementation/summarize"

export function init(): api.API {
    return {
        serializeTestResult: serializeTestResult,
        summarize: summarize
    }
}