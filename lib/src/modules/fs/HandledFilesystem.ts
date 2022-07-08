import * as pa from "pareto-lang-api"
import * as fsAPI from "pareto-filesystem-api"
import * as asyncAPI from "pareto-async-api"

export type File = <T>(
    path: string[],
    callback: (data: string) => asyncAPI.IAsync<T>,
) => asyncAPI.IAsync<T>

export type Directory = <T>(
    path: string[],
    callback: (data: fsAPI.DirNodeData) => null | asyncAPI.IAsync<T>,
) => asyncAPI.IAsync<pa.IReadonlyDictionary<T>>

export type WriteFile = (
    path: string[],
    data: string,
) => void

export type Unlink = (
    path: string[],
) => void

export type WriteFileAndWait = (
    path: string[],
    data: string,
) => asyncAPI.IAsync<null>

export type IHandledFilesystem = {
    file: File
    optionalFile: <T>(
        path: string[],
        callback: (data: string) => asyncAPI.IAsync<T>,
        notExists: () => asyncAPI.IAsync<T>,
    ) => asyncAPI.IAsync<T>
    directory: Directory
    writeFile: WriteFile
    writeFileAndWait: WriteFileAndWait,
    unlink: Unlink,
}

export type Error =
    | ["file read", fsAPI.TReadFileError]
    | ["file write", fsAPI.TWriteFileError]
    | ["directory read", fsAPI.TReadDirError]

export function createHandledFilesystem(
    onError: ($: Error, path: string) => void,
    fs: fsAPI.API,
): IHandledFilesystem {
    return {
        file: (
            path,
            callback,
        ) => {
            return fs.file(
                path,
                callback,
                (err, path) => {
                    onError(["file read", err], path)
                    return null
                }
            )
        },
        optionalFile: (
            path,
            callback,
            notExists,
        ) => {
            return fs.file(
                path,
                callback,
                (err, path) => {
                    if (err[0] === "no entity") {
                        return notExists()
                    } else {
                        onError(["file read", err], path)
                        return null
                    }
                }
            )
        },
        directory: (
            path,
            callback,
        ) => {
            return fs.directory(
                path,
                callback,
                (err, path) => {
                    onError(["directory read", err], path)
                    return null
                }
            )

        },
        writeFile: (path, data) => {
            fs.writeFile(
                path,
                data,
                (err, path) => {
                    onError(["file write", err], path)
                }
            )

        },
        writeFileAndWait: (path, data) => {
            return fs.writeFileAndWait(
                path,
                data,
                (err, path) => {
                    //         if (err[0] === "no entity") {
                    //         } else {
                    //         }
                    throw new Error("IMPLEMENT ME")
                }
            )
        },
        unlink: (path) => {
            fs.unlink(
                path,
                (err, path) => {

                }
            )
        }
    }
}
