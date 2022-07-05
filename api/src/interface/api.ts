import { TSummary } from "./types/Summary"
import { TTestResult } from "./types/TestResult"

export type SerializeTestResult = (
    $: {
        testResult: TTestResult,
        showSummary: boolean,
    },
    log: (str: string) => void,
) => void

export type Summarize = (
    $: TTestResult
) => TSummary

export type API = {
    serializeTestResult: SerializeTestResult
    summarize: Summarize
}