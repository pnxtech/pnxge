/**
 * @name ColorSpace
 * @description functions for color manipulation
 */
export declare class ColorSpace {
    /**
     * @name shadeColor
     * @description generate a color shade based percent
     * @note use negative percent to lighten or position percent to darken
     * https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
     * @param {number} color - color as int
     * @param {number} percent - percent of lighting or darkening
     * @return {number} new color
     */
    static shadeColor(color: number, percent: number): number;
    /**
     * @name toHexString
     * @description convert color int to hex string
     * @param {number} color value
     * @return {string} color as hex string
     */
    static toHexString(color: number): string;
}
//# sourceMappingURL=ColorSpace.d.ts.map