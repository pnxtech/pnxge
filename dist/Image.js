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
var Utils_1 = require("./Utils");
var Attribs_1 = require("./Attribs");
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
        _this.id = (new Utils_1.Utils).createID();
        _this.collisionDetection = false;
        _this._z = 0;
        _this._dx = 0;
        _this._dy = 0;
        _this._vx = 0;
        _this._vy = 0;
        _this.anim = _this;
        _this.scene = scene;
        // scene.stage.addChild(this);
        _this.internalRect = new Math_1.Rect(_this.x, _this.y, _this.width, _this.height);
        _this.attributes = new Attribs_1.Attribs();
        _this.attributes.add('image');
        _this.cacheAsBitmap = true;
        return _this;
    }
    Object.defineProperty(Image.prototype, "x", {
        /**
         * @name x
         * @description x position getter
         * @return {number} x position
         */
        get: function () {
            return this.anim.x;
        },
        /**
         * @name x
         * @description x position setter
         */
        set: function (x) {
            this.anim.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "y", {
        /**
         * @name y
         * @description y position getter
         * @return {number} y position
         */
        get: function () {
            return this.anim.y;
        },
        /**
         * @name y
         * @description y position setter
         */
        set: function (y) {
            this.anim.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "z", {
        /**
         * @name z
         * @description z position getter
         * @return {number} z position
         */
        get: function () {
            return this._z;
        },
        /**
         * @name z
         * @description z position setter
         */
        set: function (z) {
            this._z = z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "dx", {
        /**
         * @name dx
         * @description direction X getter
         * @return {number} dx - direction X
         */
        get: function () {
            return this._dx;
        },
        /**
         * @name dx
         * @description direction X setter
         * @param {number} value - direction X
         */
        set: function (value) {
            this._dx = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "dy", {
        /**
         * @name dy
         * @description direction Y getter
         * @return {number} dy - direction Y
         */
        get: function () {
            return this._dy;
        },
        /**
         * @name dy
         * @description direction Y setter
         * @param {number} value - direction Y
         */
        set: function (value) {
            this._dy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "vx", {
        /**
         * @name vx
         * @description velocity X getter
         * @return {number} vx - velocity X
         */
        get: function () {
            return this._vx;
        },
        /**
         * @name vx
         * @description velocity X setter
         * @param {number} value - velocity X
         */
        set: function (value) {
            this._vx = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "vy", {
        /**
         * @name vy
         * @description velocity Y getter
         * @return {number} vy - velocity Y
         */
        get: function () {
            return this._vy;
        },
        /**
         * @name vy
         * @description velocity Y setter
         * @param {number} value - velocity Y
         */
        set: function (value) {
            this._vy = value;
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
            return this.anim.visible;
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
    Object.defineProperty(Image.prototype, "width", {
        /**
         * @name width
         * @description get the anim width
         * @return {number} anim width
         */
        get: function () {
            return this.anim.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "height", {
        /**
         * @name height
         * @description get the anim height
         * @return {number} anim height
         */
        get: function () {
            return this.anim.height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name setAnchor
     * @description set the anchor.x and .y value
     */
    Image.prototype.setAnchor = function (value) {
        this.anim.anchor.set(value);
    };
    Object.defineProperty(Image.prototype, "rotation", {
        /**
         * @name rotation
         * @description rotation getter
         * @return {number} rotation position
         */
        get: function () {
            return this.anim.rotation;
        },
        /**
         * @name rotation
         * @description rotation setter
         */
        set: function (value) {
            this.anim.rotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "sx", {
        /**
         * @name sx
         * @description get anim scale x
         * @return {number} scale x
         */
        get: function () {
            return this.anim.sx;
        },
        /**
         * @name sx
         * @description set anim scale x
         */
        set: function (value) {
            this.anim.sx = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "sy", {
        /**
         * @name sy
         * @description get anim scale y
         * @return {number} scale y
         */
        get: function () {
            return this.anim.sy;
        },
        /**
         * @name sy
         * @description set anim scale y
         */
        set: function (value) {
            this.anim.sy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "attribs", {
        /**
         * @name get attribs
         * @description get attributes
         * @return {Attribs} attributes
         */
        get: function () {
            return this.attributes;
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
        this.x += this.dx * (this.vx || 1) * deltaTime;
        this.y += this.dy * (this.vy || 1) * deltaTime;
    };
    /**
     * @name destroy
     * @description cleanup
     */
    Image.prototype.destroy = function () {
        // this.scene.stage.removeChild(this);
    };
    return Image;
}(PIXI.Sprite));
exports.Image = Image;
//# sourceMappingURL=Image.js.map