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
}
//# sourceMappingURL=Utils.d.ts.map