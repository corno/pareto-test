import { ITestContext } from "./TestContext";

export type ICreateTestContext = (
    $: {},
    callback: ($: ITestContext) => void
) => void