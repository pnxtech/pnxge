/**
 * @name Utils
 * @description common utility methods
 */
export class Utils {
  /**
   * @name createID
   * @description create short alpha-numeric ID
   */
  static createID(): string {
    return (Math.floor(Math.random() * (new Date()).getTime()).toString(36));
  }

  /**
   * @name zeroPad
   * @description left zero pad a number
   * @param {number} num - number to format
   * @param {number} size - size of return string
   * @return {string} zero padded number string
   */
  static zeroPad(num: number, size: number): string {
    let s = '000000000' + num;
    return s.substr(s.length-size);
  }

  /**
   * @name mergeObjects
   * @description merge objects. used as an ES5 replacement for the unavailable Object.assign
   * @return {object} returns merged object
   */
  static mergeObjects(arg1: {}, arg2: {}, arg3?: {}): object {
    let resObj: any = {};
    for (let i=0; i < arguments.length; i += 1) {
      let obj = arguments[i];
      let keys = Object.keys(obj);
      for (let j = 0; j < keys.length; j += 1) {
        resObj[keys[j]] = obj[keys[j]];
      }
    }
    return resObj;
  }
}
