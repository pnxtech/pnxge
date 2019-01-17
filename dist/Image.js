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
var Math_1 = require("./Math");
/**
 * @name Image
 * @description  image sprite
 */
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    /**
     * @name constructor
     * @description constructor
     * @param {Scene} scene - reference to parent scene
     * @param {string} name - name of sequence
     * @param {object} resources - loaded resources
     */
    function Image(scene, name, resources) {
        var _this = _super.call(this, resources.textures[name]) || this;
        _this.id = Math_1.createID();
        _this.collisionDetection = false;
        _this.type = Anim_1.AnimType.IMAGE;
        _this.zOrder = 0;
        _this.anim = _this;
        _this.scene = scene;
        scene.stage.addChild(_this);
        _this.internalRect = new Math_1.Rect(_this.x, _this.y, _this.width, _this.height);
        return _this;
    }
    Object.defineProperty(Image.prototype, "z", {
        /**
         * @name z
         * @description z position getter
         * @return {number} z position
         */
        get: function () {
            return this.zOrder;
        },
        /**
         * @name z
         * @description z position setter
         */
        set: function (z) {
            this.zOrder = z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "visible", {
        /**
         * @name visible
         * @description get visibility
         * @return {boolean} true if visible
         */
        get: function () {
            return (this.anim) ? this.anim.visible : false;
        },
        /**
         * @name visible
         * @description set visibility
         */
        set: function (value) {
            if (this.anim) {
                this.anim.visible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "rect", {
        /**
         * @name rect
         * @description rect getter
         * @return {Rect} rect object from anim
         */
        get: function () {
            this.internalRect.x = this.x;
            this.internalRect.y = this.y;
            this.internalRect.width = this.width;
            this.internalRect.height = this.height;
            return this.internalRect;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name attachTouchHandler
     * @description attach a touch (click, press, touch) handler for this anim
     * @param {string} name - name of event
     * @param {EventManager} - instance of event eventManager
     * @return {void}
     */
    Image.prototype.attachTouchHandler = function (name, eventManager) {
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
     * @description update handler
     * @param {number} deltaTime - delta time
     * @return {void}
     */
    Image.prototype.update = function (deltaTime) {
    };
    /**
     * @name destroy
     * @description cleanup
     */
    Image.prototype.destroy = function () {
        this.scene.stage.removeChild(this);
    };
    return Image;
}(PIXI.Sprite));
exports.Image = Image;
//# sourceMappingURL=Image.js.map