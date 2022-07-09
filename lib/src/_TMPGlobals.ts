interface Array<T> {
    //pop: () => T
    //includes(v: T): boolean
    length: number
    push(v: T): void

    //join(separator: string): string
    //pop(): undefined | T
    //concat(array: T[]): T[]
    //slice(position: number): T[]
    //sort(): T[]

}
interface String {
    //readonly length: number
    //substring(begin: number, end: number): string
    //substr(begin: number): string
    //charCodeAt(index: number): number
    split(splitter: string): string[]
    indexOf(str: string): number
    // startsWith(str: string): boolean
    // replace(str: RegExp, rv: string): string
    //toUpperCase(): string
    //padStart():
}
