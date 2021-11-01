import {
    describe as mdesc,
    it as mit,
} from "mocha"
import * as chai from "chai"
import * as assert from "assert"

export function testset(
    name: string,
    callback: () => void
) {
    mdesc(
        name,
        callback,
    )
}

export function assertEqual<T>(a: T, b: T) {
    chai.assert.deepEqual(a, b)
}

export function testSync(
    name: string,
    callback: () => void,
) {
    mit(name, callback)
}

export function testAsync<T>(
    name: string,
    callback: (
        resolve: () => void
    ) => void,
): void {
    mit(name, () => {
        return new Promise<null>(resolve => {
            callback(() => {
                resolve(null)
            })
        })
    })
}

export function ok($: {
    condition: boolean,
    message: string
}) {
    assert.ok($.condition, $.message)
}