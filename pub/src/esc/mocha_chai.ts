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


// console.log('\x1b[31m', 'sometext');
// console.log('sometext2' ,'\x1b[0m');
// console.log('sometext3');

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