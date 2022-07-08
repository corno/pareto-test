import * as api from "pareto-test-api"
import { createValidateFile } from "./esc/implementation/createValidateFile"
import { serializeTestResult } from "./esc/implementation/serializeTestResult"
import { summarize } from "./esc/implementation/summarize"
import * as fs from "pareto-filesystem-api"
import * as diff from "pareto-diff-api"
import * as asyncLib from "pareto-async-functions-api"
import { createHandledFilesystem } from "./modules/fs/HandledFilesystem"

export function init(
    fs: fs.API,
    diff: diff.API,
    async: asyncLib.API,
): api.API {
    const x = createHandledFilesystem(
        ($, path) => {
            throw new Error("!!!!")
        },
        fs
    )
    return {
        serializeTestResult: serializeTestResult,
        summarize: summarize,
        validateFile: createValidateFile(
            x.file,
            x.writeFile,
            x.unlink,
            diff.diffLines,
            async.value,
        )
    }
}