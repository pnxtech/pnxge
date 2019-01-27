/**
 * @name Utils
 * @description common utility methods
 */
export declare class Utils {
    /**
     * @name createID
     * @description create short alpha-numeric ID
     */
    createID(): string;
    /**
     * @name zeroPad
     * @description left zero pad a number
     * @param {number} num - number to format
     * @param {number} size - size of return string
     * @return {string} zero padded number string
     */
    zeroPad(num: number, size: number): string;
    /**
     * @name mergeObjects
     * @description merge objects. used as an ES5 replacement for the unavailable Object.assign
     * @return {object} returns merged object
     */
    mergeObjects(arg1: {}, arg2: {}, arg3?: {}): object;
    /**
     * @name fastStringReplace
     * @description fast string replace
     * @param {string} subject - string to be sub/searched and replaced
     * @param {string} search - string to search for
     * @param {string} replace - string to replace with
     * @return {string} transformed string
     */
    fastStringReplace(subject: string, search: string, replace: string): string;
}
//# sourceMappingURL=Utils.d.ts.map