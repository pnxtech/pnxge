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
var Anim_1 = require("./Anim");
var TilingSprite_1 = require("./TilingSprite");
/**
 * @name BackgroundTile
 * @description uses a texture to tile a background
 * @note: uses PIXI.extras.TilingSprite, image resource should
 * have an image size of a power of two for use with WebGL
 */
var BackgroundTile = /** @class */ (function (_super) {
    __extends(BackgroundTile, _super);
    /**
     * @name constructor
     * @description init class
     * @param {Scene} parent scene
     * @param {string} assetPath - path to image resource
     * @note image resource should have an image size of a power of two for use with WebGL
     */
    function BackgroundTile(scene, assetPath) {
        var _this = _super.call(this, scene) || this;
        _this._subType = '';
        _this.scene = scene;
        _this.texture = PIXI.Texture.fromImage(assetPath);
        _this.tilingSprite = new TilingSprite_1.TilingSprite(_this.scene, _this.texture, scene.app.screen.width, scene.app.screen.height);
        _this.tilingSprite.anchor.x = 0.5;
        _this.tilingSprite.anchor.y = 0.5;
        _this.tilingSprite.x = _this.tilingSprite.width / 2;
        _this.tilingSprite.y = _this.tilingSprite.height / 2;
        _this.tilingSprite.cacheAsBitmap = true;
        scene.stage.addChild(_this.tilingSprite);
        return _this;
    }
    /**
     * @name flip
     * @description flip tile
     * @param {state} boolean - true flip, else don't
     * @return {void}
     */
    BackgroundTile.prototype.flip = function (state) {
        this.tilingSprite.anchor.x = 0.5;
        this.tilingSprite.anchor.y = 0.5;
        if (state) {
            this.tilingSprite.scale.x *= -1;
        }
        else {
            this.tilingSprite.scale.y *= -1;
        }
    };
    /**
     * @name setTint
     * @description set tint
     * @param {number} color - color tint
     * @return {void}
     */
    BackgroundTile.prototype.setTint = function (color) {
        this.tilingSprite.tint = color;
    };
    Object.defineProperty(BackgroundTile.prototype, "subType", {
        /**
         * @name subType
         * @description subType getter
         * @return {string} subType
         */
        get: function () {
            return this._subType;
        },
        /**
         * @name subType
         * @description subType setter
         * @return {void}
         */
        set: function (value) {
            this._subType = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name destroy
     * @description cleanup
     * @return {void}
     */
    BackgroundTile.prototype.destroy = function () {
        this.tilingSprite.visible = false;
        this.scene.stage.removeChild(this.tilingSprite);
        this.tilingSprite.destroy({
            children: true,
            texture: false,
            baseTexture: false
        });
    };
    return BackgroundTile;
}(Anim_1.Anim));
exports.BackgroundTile = BackgroundTile;
//# sourceMappingURL=BackgroundTile.js.map