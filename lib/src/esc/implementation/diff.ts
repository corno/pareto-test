import * as diff from "diff"

export type LinesOptions = {
    newlineIsToken: boolean
}


export interface Change {
    count?: number | undefined;
    /**
     * Text content.
     */
    value: string;
    /**
     * `true` if the value was inserted into the new string.
     */
    added?: boolean | undefined;
    /**
     * `true` if the value was removed from the old string.
     */
    removed?: boolean | undefined;
}

export function diffLines(oldStr: string, newStr: string, options?: LinesOptions): Change[] {
    return diffLines(oldStr, newStr, options)
}