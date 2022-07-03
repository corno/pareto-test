import { ITestContext } from "./TestContext";

export type ICreateTestContext = (
    /**
     * no data needs to be set
     */
    $: {},
    /**
     * within this callback, the actual logic should be placed
     */
    callback: ($: ITestContext) => void
) => void