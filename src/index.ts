import {
    describe as mdesc,
    it as mit,
} from "mocha"
import * as chai from "chai"
import * as assert from "assert"

export function describe(
    name: string,
    callback: () => void
) {
    mdesc(
        name,
        callback,
    )
}

export function assertEqual<T>(a: T, b: T) {
    chai.assert.equal(a, b)
}

export function it(
    name: string,
    callback: () => void,
) {
    mit(name, callback)
}

export function pit<T>(
    name: string,
    callback: () => Promise<T>,
): void {
    mit(name, callback)
}

export function ok($: {
    condition: boolean,
    message: string
}) {
    assert.ok($.condition, $.message)
}