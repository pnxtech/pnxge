"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
;
/**
 * @name Attribs
 * @description attributes
 */
var Attribs = /** @class */ (function () {
    /**
     * @name constructor
     * @description class initializer
     */
    function Attribs() {
        this.hash = {};
        this.utils = new Utils_1.Utils();
    }
    /**
     * @name add
     * @description add an attribute
     * @param {string | string[]} attrib - attribute name(s)
     * @return {void}
     */
    Attribs.prototype.add = function (attribs) {
        var _this = this;
        if (typeof attribs !== 'string') {
            attribs.forEach(function (value) {
                _this.hash[value] = true;
            });
        }
        else {
            this.hash[attribs] = true;
        }
    };
    /**
     * @name remove
     * @description remove an attribute
     * @param {string} attrib - attribute name
     * @return {void}
     */
    Attribs.prototype.remove = function (attrib) {
        delete this.hash[attrib];
    };
    /**
     * @name has
     * @description determines whether an attribute exists in the bag
     * @param {string} attrib - attribute name
     * @return {boolean} true if attribute exists, false if not
     */
    Attribs.prototype.has = function (attrib) {
        return (this.hash[attrib]) ? true : false;
    };
    /**
     * @name all
     * @description return an array containing all attributes names
     * @return {string[]} list of string attribute names
     */
    Attribs.prototype.all = function () {
        return Object.keys(this.hash);
    };
    /**
     * @name flush
     * @description flush all attributes
     * @return {void}
     */
    Attribs.prototype.flush = function () {
        this.hash = {};
    };
    /**
     * @name clone
     * @description clone attributes into this attribute bag
     * @param {Attribs} attribs
     * @return {void}
     */
    Attribs.prototype.clone = function (attribs) {
        this.hash = this.utils.mergeObjects({}, attribs.hash);
    };
    return Attribs;
}());
exports.Attribs = Attribs;
//# sourceMappingURL=Attribs.js.map