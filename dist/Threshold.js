"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name Threshold
 * @description threshold tracking and management
 */
var Threshold = /** @class */ (function () {
    //#endregion
    /**
     * @name construtor
     * @description initialize threshold
     * @param {number} max - maximum threshold value
     */
    function Threshold(max) {
        this._count = 0;
        this._threshold = max;
        this._triggered = false;
        this._disabled = false;
    }
    Object.defineProperty(Threshold.prototype, "threshold", {
        /**
         * @name threshold
         * @description threshold getter
         * @return {number} value of threshold
         */
        get: function () {
            return this._threshold;
        },
        /**
         * @name threshold
         * @description threshold setter. used if there's a need to change the threshold after construction
         * @param {number} value - value to set threshold
         * @return {void}
         */
        set: function (value) {
            this._threshold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Threshold.prototype, "disabled", {
        /**
         * @name disabled
         * @description disabled getter
         * @return {boolean} is disabled?
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @name disabled
         * @description disabled setter
         * @param {boolean} value - true to disable / false to enable
         * @return {void}
         */
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Threshold.prototype, "triggered", {
        /**
         * @name triggered
         * @description triggered getter
         * @return {number} value of trigger
         */
        get: function () {
            return this._triggered;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name increment
     * @description increment the internal count towards eventual threshold
     * @return {boolean} is triggered?
     */
    Threshold.prototype.increment = function () {
        if (!this._disabled) {
            this._count++;
            if (this._count === this._threshold) {
                this._triggered = true;
                this._count = 0;
            }
            else {
                this._triggered = false;
            }
            return this._triggered;
        }
        return false;
    };
    /**
     * @name reset
     * @description reset threshold
     * @return {void}
     */
    Threshold.prototype.reset = function () {
        this._triggered = false;
        this._count = 0;
        this._disabled = true;
    };
    return Threshold;
}());
exports.Threshold = Threshold;
//# sourceMappingURL=Threshold.js.map