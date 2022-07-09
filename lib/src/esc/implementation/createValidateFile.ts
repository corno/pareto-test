import * as pa from "pareto-api-core"
import { File, WriteFile, Unlink } from "pareto-handledfilesystem-api"
import * as afAPI from "pareto-async-functions-api"
import * as diffAPI from "pareto-diff-api"
import * as ta from "pareto-test-api"


export function createValidateFile(
    file: File,
    writeFile: WriteFile,
    unlink: Unlink,
    diffLines: diffAPI.DiffLines,
    asyncValue: afAPI.Value,
): ta.ValidateFile {
    return (
        path: string,
        fileName: string,
        extension: string,
        actualData: string,
    ): pa.IAsync<ta.TTestElement> => {
        return file(
            [path, `${fileName}.expected.${extension}`],
            (expectedData): pa.IAsync<ta.TTestElement> => {
                const actualFileName = `${fileName}.actual.${extension}`
                if (actualData !== expectedData) {
                    writeFile(
                        [path, actualFileName],
                        actualData
                    )
                } else {
                    unlink(
                        [path, actualFileName],
                    )
                }
                const lines =  diffLines(expectedData, actualData, { newlineIsToken: false })
                const parts: ta.TMultilinePart[] = []

                const lineOffset = 0

                let lineCountOfExpected = lineOffset
                let lineCountOfActual = lineOffset
                lines.forEach((part) => {
                    if (part.count === undefined) {
                        throw new Error("unexpected: no line count")
                    }
                    if (part.added) {
                        if (part.removed) {
                            //added and removed???
                            throw new Error("unexpected: added and removed")
                        } else {
                            parts.push({
                                startLineInExpected: lineCountOfExpected,
                                startLineInActual: lineCountOfActual,
                                lines: part.value.split(`\n`),
                                type: ["added", {}],
                            })
                        }
                        lineCountOfActual += part.count
                    } else {
                        if (part.removed) {
                            parts.push({
                                startLineInExpected: lineCountOfExpected,
                                startLineInActual: lineCountOfActual,
                                lines: part.value.split(`\n`),
                                type: ["removed", {}],
                            })
                        } else {
                            lineCountOfActual += part.count
                        }
                        lineCountOfExpected += part.count
                    }

                })
                return asyncValue(
                    {
                        type: ["test", {
                            success: parts.length === 0,
                            type: ["large string", {
                                parts: parts

                            }]
                        }]
                    }
                )
            }
        )
    }
}
