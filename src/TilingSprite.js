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
var Math_1 = require("./Math");
var Anim_1 = require("./Anim");
/**
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
var TilingSprite = /** @class */ (function (_super) {
    __extends(TilingSprite, _super);
    function TilingSprite(scene, texture, width, height) {
        var _this = _super.call(this, texture, width, height) || this;
        _this.id = Math_1.createID();
        _this.vx = 0; // velocityX
        _this.vy = 0; // velocityY
        _this.collisionDetection = false;
        _this.type = Anim_1.AnimType.BACKGROUND;
        _this.anim = new Anim_1.Anim(scene);
        _this.anim.z = -1;
        return _this;
    }
    return TilingSprite;
}(PIXI.extras.TilingSprite));
exports.TilingSprite = TilingSprite;
;
