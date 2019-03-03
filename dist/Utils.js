"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name Utils
 * @description common utility methods
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * @name createID
     * @description create short alpha-numeric ID
     */
    Utils.createID = function () {
        return (Math.floor(Math.random() * (new Date()).getTime()).toString(36));
    };
    /**
     * @name zeroPad
     * @description left zero pad a number
     * @param {number} num - number to format
     * @param {number} size - size of return string
     * @return {string} zero padded number string
     */
    Utils.zeroPad = function (num, size) {
        var s = '000000000' + num;
        return s.substr(s.length - size);
    };
    /**
     * @name mergeObjects
     * @description merge objects. used as an ES5 replacement for the unavailable Object.assign
     * @return {object} returns merged object
     */
    Utils.mergeObjects = function (arg1, arg2, arg3) {
        var resObj = {};
        for (var i = 0; i < arguments.length; i += 1) {
            var obj = arguments[i];
            var keys = Object.keys(obj);
            for (var j = 0; j < keys.length; j += 1) {
                resObj[keys[j]] = obj[keys[j]];
            }
        }
        return resObj;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map