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
        _this.subType = '';
        _this.id = Utils_1.Utils.createID();
        _this.vx = 0;
        _this.vy = 0;
        _this.dx = 0;
        _this.dy = 0;
        _this.z = 0;
        _this.health = 0;
        _this.strength = 0;
        _this.cacheAsBitmap = true;
        _this.collisionDetection = false;
        _this.collisionWith = undefined;
        _this.attribs = new Attribs_1.Attribs();
        _this.scene = scene;
        _this.scene.stage.addChild(_this);
        return _this;
    }
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    TextSprite.prototype.attachController = function (controller) {
        this.controller = controller;
    };
    /**
     * @name attachTouchHandler
     * @description attach a touch (click, press, touch) handler for this anim
     * @param {string} name - name of event
     * @param {EventManager} - instance of event eventManager
     * @return {void}
     */
    TextSprite.prototype.attachTouchHandler = function (name, eventManager) {
        var _this = this;
        this.interactive = true;
        this.on('click', function () {
            eventManager.triggerEvent(name, _this);
        });
        this.on('touchend', function () {
            eventManager.triggerEvent(name, _this);
        });
    };
    /**
     * @name onCollision
     * @description trigged when this anim collides with another anim
     * @param {SpriteAnim | undefined} sprite - anim with which collision has occured
     * @return {void}
     */
    TextSprite.prototype.onCollision = function (sprite) {
        this.collisionWith = sprite;
        // this.scene.app.debugLog(`${this.subType} was hit by ${anim.subType}`);
        this.controller && (this.controller.hitBy(sprite));
    };
    /**
     * @name clearCollision
     * @description clear collision event
     * @return {void}
     */
    TextSprite.prototype.clearCollision = function () {
        this.collisionWith = undefined;
    };
    /**
     * @name updateSpriteAnim
     * @description update anim position based on velocity
     * @param {number} deltaTime - delta time offset
     * @return {void}
     */
    TextSprite.prototype.updateSpriteAnim = function (deltaTime) {
        this.x += this.dx * (this.vx || 1) * deltaTime;
        this.y += this.dy * (this.vy || 1) * deltaTime;
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