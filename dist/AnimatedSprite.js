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
var Utils_1 = require("./Utils");
;
/**
 * @name AnimatedSprite
 * @description Animated Sprite
 */
var AnimatedSprite = /** @class */ (function (_super) {
    __extends(AnimatedSprite, _super);
    //#endregion
    /**
     * @name constructor
     * @description binds Anim to Scene
     */
    function AnimatedSprite(scene, sequenceName, atlas, resources) {
        var _this = _super.call(this, resources[atlas].spritesheet.animations[sequenceName], false) || this;
        _this.subType = '';
        _this.id = Utils_1.Utils.createID();
        _this.dx = 0;
        _this.dy = 0;
        _this.vx = 0;
        _this.vy = 0;
        _this.z = 0;
        _this.health = 0;
        _this.strength = 0;
        _this.collisionDetection = false;
        _this.loop = false;
        _this.collisionWith = undefined;
        _this.animationSpeed = 1;
        _this.attribs = new Attribs_1.Attribs();
        _this.attribs.add('animatedsprite');
        _this.scene = scene;
        _this.scene.stage.addChild(_this);
        return _this;
    }
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    AnimatedSprite.prototype.attachController = function (controller) {
        this.controller = controller;
    };
    /**
     * @name attachTouchHandler
     * @description attach a touch (click, press, touch) handler for this anim
     * @param {string} name - name of event
     * @param {EventManager} - instance of event eventManager
     * @return {void}
     */
    AnimatedSprite.prototype.attachTouchHandler = function (name, eventManager) {
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
     * @name update
     * @description update anim position based on velocity
     * @param {number} deltaTime - delta time offset
     * @return {void}
     */
    AnimatedSprite.prototype.update = function (deltaTime) {
        if (this.controller) { // if controller then that will handle movement.
            this.controller.update(deltaTime);
        }
        else {
            this.x += this.dx * (this.vx || 1) * deltaTime;
            this.y += this.dy * (this.vy || 1) * deltaTime;
        }
        _super.prototype.update.call(this, deltaTime);
    };
    /**
     * @name onCollision
     * @description trigged when this anim collides with another anim
     * @param {SpriteAnim | undefined} sprite - anim with which collision has occured
     * @return {void}
     */
    AnimatedSprite.prototype.onCollision = function (sprite) {
        this.collisionWith = sprite;
        // this.scene.app.debugLog(`${this.subType} was hit by ${anim.subType}`);
        this.controller && (this.controller.hitBy(sprite));
    };
    /**
     * @name clearCollision
     * @description clear collision event
     * @return {void}
     */
    AnimatedSprite.prototype.clearCollision = function () {
        this.collisionWith = undefined;
    };
    /**
     * @name destroy
     * @description destroys anim and all sequences
     * @return {void}
     */
    AnimatedSprite.prototype.destroy = function () {
        this.controller && (this.controller.destroy());
        // TODO remove touch events if any!
        _super.prototype.destroy.call(this, {
            children: true,
            texture: false,
            baseTexture: false
        });
        this.scene.stage.removeChild(this);
    };
    return AnimatedSprite;
}(PIXI.extras.AnimatedSprite));
exports.AnimatedSprite = AnimatedSprite;
//# sourceMappingURL=AnimatedSprite.js.map