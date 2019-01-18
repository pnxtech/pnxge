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
var Utils_1 = require("./Utils");
var Anim_1 = require("./Anim");
var Attribs_1 = require("./Attribs");
/**
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
var TilingSprite = /** @class */ (function (_super) {
    __extends(TilingSprite, _super);
    function TilingSprite(scene, texture, width, height) {
        var _this = _super.call(this, texture, width, height) || this;
        _this.id = (new Utils_1.Utils()).createID();
        _this.vx = 0; // velocityX
        _this.vy = 0; // velocityY
        _this.collisionDetection = false;
        _this.anim = new Anim_1.Anim(scene);
        _this.anim.z = -1;
        _this.attributes = new Attribs_1.Attribs();
        _this.attributes.add('background');
        return _this;
    }
    Object.defineProperty(TilingSprite.prototype, "attribs", {
        /**
         * @name get Attribs
         * @description get attributes
         * @return {Attribs} attributes
         */
        get: function () {
            return this.attributes;
        },
        enumerable: true,
        configurable: true
    });
    return TilingSprite;
}(PIXI.extras.TilingSprite));
exports.TilingSprite = TilingSprite;
;
//# sourceMappingURL=TilingSprite.js.map