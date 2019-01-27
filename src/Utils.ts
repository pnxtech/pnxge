/**
 * @name Utils
 * @description common utility methods
 */
export class Utils {
  /**
   * @name createID
   * @description create short alpha-numeric ID
   */
  createID(): string {
    return (Math.floor(Math.random() * (new Date()).getTime()).toString(36));
  }

  /**
   * @name zeroPad
   * @description left zero pad a number
   * @param {number} num - number to format
   * @param {number} size - size of return string
   * @return {string} zero padded number string
   */
  zeroPad(num: number, size: number): string {
    let s = "000000000" + num;
    return s.substr(s.length-size);
  }

  /**
   * @name mergeObjects
   * @description merge objects. used as an ES5 replacement for the unavailable Object.assign
   * @return {object} returns merged object
   */
  mergeObjects(arg1: {}, arg2: {}, arg3?: {}): object {
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

  /**
   * @name fastStringReplace
   * @description fast string replace
   * @param {string} subject - string to be sub/searched and replaced
   * @param {string} search - string to search for
   * @param {string} replace - string to replace with
   * @return {string} transformed string
   */
  fastStringReplace(subject: string, search: string, replace: string): string {
    return subject.split(search).join(replace);
  }
}
