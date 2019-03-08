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
     * @param {string | string[] | undefined} attribs - optional attributes for initilization
     */
    function Attribs(attribs) {
        if (attribs === void 0) { attribs = undefined; }
        this.hash = {};
        if (attribs !== undefined) {
            this.add(attribs);
        }
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
                if (value !== undefined) {
                    _this.hash[value] = true;
                }
            });
        }
        else if (attribs !== undefined) {
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
        this.hash = Utils_1.Utils.mergeObjects({}, attribs.hash);
    };
    /**
     * @name union
     * @description return a union of shared attributes between this and other Attrib
     * @param {Attribs} other Attribs object
     * @return {string[]} array of matching attribute strings if any
     */
    Attribs.prototype.union = function (attribs) {
        var matches = [];
        Object.keys(this.hash).forEach(function (name) {
            if (attribs.has(name)) {
                matches.push(name);
            }
        });
        return matches;
    };
    return Attribs;
}());
exports.Attribs = Attribs;
//# sourceMappingURL=Attribs.js.map