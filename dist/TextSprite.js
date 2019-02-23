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
var Utils_1 = require("./Utils");
var Attribs_1 = require("./Attribs");
/**
 * @name TextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 * @todo: Uses anim simply to hold z value - cleanup later
 */
var TextSprite = /** @class */ (function (_super) {
    __extends(TextSprite, _super);
    //#endregion
    /**
     * @name constructor
     * @description constructor pass throught to BitmapText
     * @param {Scene} scene - referene to parent scene
     * @param {string} text - text to display
     * @param {PIXI.extras.BitmapTextStyle} style - bitmap text styles
     */
    function TextSprite(scene, text, style) {
        var _this = _super.call(this, text, style) || this;
        //#region variables
        _this.id = (new Utils_1.Utils()).createID();
        _this.zOrder = -1;
        _this.collisionDetection = false;
        _this.scene = scene;
        _this.anim = new Anim_1.Anim(_this.scene);
        _this.scene.stage.addChild(_this);
        _this.attributes = new Attribs_1.Attribs();
        _this.attributes.add('text');
        return _this;
    }
    Object.defineProperty(TextSprite.prototype, "z", {
        /**
         * @name z
         * @description z position getter
         * @return {number} z position
         */
        get: function () {
            return this.anim.z;
        },
        /**
         * @name z
         * @description z position setter
         */
        set: function (z) {
            this.zOrder = z;
            this.anim.z = z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextSprite.prototype, "attribs", {
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
    /**
     * @name setTint
     * @description set tint
     * @param {number} color - color tint
     * @return {void}
     */
    TextSprite.prototype.setTint = function (color) {
        this.tint = color;
    };
    /**
     * @name update
     * @description update handler
     * @param {number} deltaTime - delta time
     * @return {void}
     */
    TextSprite.prototype.update = function (deltaTime) {
    };
    /**
     * @name destroy
     * @description cleanup
     */
    TextSprite.prototype.destroy = function () {
        this.scene.stage.removeChild(this);
    };
    return TextSprite;
}(PIXI.extras.BitmapText));
exports.TextSprite = TextSprite;
;
//# sourceMappingURL=TextSprite.js.map