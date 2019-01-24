"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
/**
 * @name State
 * @description State management
 */
var State = /** @class */ (function () {
    /**
     * @name constructor
     * @description state initializer
     */
    function State() {
        this._state = {};
        this.utils = new Utils_1.Utils();
    }
    Object.defineProperty(State.prototype, "state", {
        /**
         * @name state
         * @description state getter
         * @return {object}
         */
        get: function () {
            return this._state;
        },
        /**
         * @name state
         * @description state setter
         * @param {any} data - object to be merged with state
         */
        set: function (data) {
            this._state = data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name setState
     * @description merges object entries in to application state
     * @param {object} data - object to be merged with state
     * @return {object} new application state
     */
    State.prototype.setState = function (data) {
        var newState = this.utils.mergeObjects(this._state, data);
        this._state = newState;
        return this._state;
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=State.js.map