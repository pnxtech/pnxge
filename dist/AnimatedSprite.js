"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js"));
/**
 * @name AnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
var AnimatedSprite = /** @class */ (function (_super) {
    __extends(AnimatedSprite, _super);
    function AnimatedSprite(textures, autoUpdate) {
        return _super.call(this, textures, autoUpdate) || this;
    }
    Object.defineProperty(AnimatedSprite.prototype, "type", {
        /**
         * @name type
         * @description type getter
         * @return {string} type position
         */
        get: function () {
            if (this.anim) {
                return this.anim.type;
            }
            return '';
        },
        /**
         * @name type
         * @description type setter
         * @param {string} value - anim type
         */
        set: function (value) {
            if (this.anim) {
                this.anim.type = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return AnimatedSprite;
}(PIXI.extras.AnimatedSprite));
exports.AnimatedSprite = AnimatedSprite;
;
//# sourceMappingURL=AnimatedSprite.js.map