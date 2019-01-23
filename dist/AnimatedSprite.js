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
var Attribs_1 = require("./Attribs");
/**
 * @name AnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
var AnimatedSprite = /** @class */ (function (_super) {
    __extends(AnimatedSprite, _super);
    function AnimatedSprite(textures, autoUpdate) {
        var _this = _super.call(this, textures, autoUpdate) || this;
        _this._attribs = new Attribs_1.Attribs();
        return _this;
    }
    Object.defineProperty(AnimatedSprite.prototype, "attribs", {
        /**
         * @name getAttribs
         * @description get attributes
         * @return {Attribs} attributes
         */
        get: function () {
            return this._attribs;
        },
        enumerable: true,
        configurable: true
    });
    return AnimatedSprite;
}(PIXI.extras.AnimatedSprite));
exports.AnimatedSprite = AnimatedSprite;
;
//# sourceMappingURL=AnimatedSprite.js.map