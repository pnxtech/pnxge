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
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
var TilingSprite = /** @class */ (function (_super) {
    __extends(TilingSprite, _super);
    //#endregion
    function TilingSprite(scene, texture, width, height) {
        var _this = _super.call(this, texture, width, height) || this;
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
        _this.attribs.add('background');
        _this.scene = scene;
        scene.stage.addChild(_this);
        return _this;
    }
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    TilingSprite.prototype.attachController = function (controller) {
    };
    /**
     * @name attachTouchHandler
     * @description attach a touch (click, press, touch) handler for this anim
     * @param {string} name - name of event
     * @param {EventManager} - instance of event eventManager
     * @return {void}
     */
    TilingSprite.prototype.attachTouchHandler = function (name, eventManager) {
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
     * @param {Sprite | AnimatedSprite | TextSprite | undefined} sprite - anim with which collision has occured
     * @return {void}
     */
    TilingSprite.prototype.onCollision = function (sprite) {
    };
    /**
     * @name clearCollision
     * @description clear collision event
     * @return {void}
     */
    TilingSprite.prototype.clearCollision = function () {
    };
    /**
     * @name update
     * @description update handler
     * @param {number} deltaTime - delta time
     * @return {void}
     */
    TilingSprite.prototype.update = function (deltaTime) {
        this.x += this.dx * (this.vx || 1) * deltaTime;
        this.y += this.dy * (this.vy || 1) * deltaTime;
    };
    /**
     * @name destroy
     * @description cleanup
     */
    TilingSprite.prototype.destroy = function () {
        this.scene.stage.removeChild(this);
    };
    return TilingSprite;
}(PIXI.extras.TilingSprite));
exports.TilingSprite = TilingSprite;
//# sourceMappingURL=TilingSprite.js.map