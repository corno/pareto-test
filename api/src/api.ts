import * as pa from "pareto-api-core"
import { TSummary } from "./interface/types/Summary"
import { TTestElement, TTestResult } from "./interface/types/TestResult"

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


export type ValidateFile = (
    path: string,
    fileName: string,
    extension: string,
    actualData: string,
) => pa.IAsync<TTestElement>

export type API = {
    serializeTestResult: SerializeTestResult
    summarize: Summarize
    validateFile: ValidateFile
}