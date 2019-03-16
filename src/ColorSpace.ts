/**
 * @name ColorSpace
 * @description functions for color manipulation
 */
export class ColorSpace {
  /**
   * @name shadeColor
   * @description generate a color shade based percent
   * @note use negative percent to lighten or position percent to darken
   * https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
   * @param {number} color - color as int
   * @param {number} percent - percent of lighting or darkening
   * @return {number} new color
   */
  static shadeColor(color: number, percent: number): number {
    let amt = Math.round(2.55 * percent);
    let R = (color >> 16) + amt;
    let G = (color >> 8 & 0x00FF) + amt;
    let B = (color & 0x0000FF) + amt;
    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0: G: 255) * 0x100 + (B < 255 ? B < 1 ? 0: B: 255));
  }

  /**
   * @name toHexString
   * @description convert color int to hex string
   * @param {number} color value
   * @return {string} color as hex string
   */
  static toHexString(color: number): string {
    return color.toString(16).slice(1);
  }
}
