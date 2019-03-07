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
var EventManager_1 = require("./EventManager");
var Utils_1 = require("./Utils");
var State_1 = require("./State");
PIXI.utils.skipHello();
/**
 * @name Application
 * @description  Application - top level game object
 */
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    //#endregion
    /**
     * @name constructor
     * @description class constructor
     * @param {number} width - screen width
     * @param {number} height - screen height
     */
    function Application(width, height) {
        var _this = _super.call(this, {
            view: document.getElementById('canvas'),
            width: width,
            height: height,
            transparent: true,
            forceFXAA: false,
            antialias: false
        }) || this;
        //#region variables
        _this.appWidth = 0;
        _this.appHeight = 0;
        _this.appEventManager = new EventManager_1.EventManager();
        _this._demo = false;
        _this._debug = false;
        _this._tickCount = 0;
        _this.frames = 0;
        _this.FPS = 0;
        _this._state = new State_1.State();
        _this.WebGL = PIXI.utils.isWebGLSupported();
        document.body.appendChild(_this.view);
        _this.appWidth = width;
        _this.appHeight = height;
        PIXI.ticker.shared.autoStart = false;
        _this.ticker.add(function (deltaTime) {
            _this.update(deltaTime);
        });
        return _this;
    }
    Object.defineProperty(Application.prototype, "demo", {
        /**
         * @name demo
         * @description demo flag getter
         * @return {boolean} true if demo
         */
        get: function () {
            return this._demo;
        },
        /**
         * @name demo
         * @description demo setter
         * @param {boolean} value if demo
         */
        set: function (value) {
            this._demo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "debug", {
        /**
         * @name debug
         * @description debug flag getter
         * @return {boolean} true if debug
         */
        get: function () {
            return this._debug;
        },
        /**
         * @name debug
         * @description debug setter
         * @param {boolean} value if debug
         */
        set: function (value) {
            var _this = this;
            this._debug = value;
            if (this._debug) {
                setInterval(function () {
                    _this.FPS = _this.frames;
                    _this.frames = 0;
                }, 1000);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name debugLog
     * @param {string} message - message to log
     * @return {void}
     */
    Application.prototype.debugLog = function (message) {
        console.log(new Date().getTime() + " (" + Utils_1.Utils.zeroPad(this._tickCount, 6) + "): " + message);
    };
    Object.defineProperty(Application.prototype, "tickCount", {
        /**
         * @name tickCount
         * @description tickCount getter
         * @return {number} tickCount - internal application update counter
         */
        get: function () {
            return this._tickCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "state", {
        /**
         * @name state
         * @description state getter
         * @return {object}
         */
        get: function () {
            return this._state.state;
        },
        /**
         * @name state
         * @description state setter
         * @param {any} data - object to be merged with state
         */
        set: function (data) {
            this._state.state = data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name setState
     * @description merges object entries in to application state
     * @param {object} data - object to be merged with state
     * @return {object} new application state
     */
    Application.prototype.setState = function (data) {
        this._state.setState(data);
        return this._state.state;
    };
    Object.defineProperty(Application.prototype, "usingWebGL", {
        /**
         * @name usingWebGL
         * @description reports on whether WebGL is supported
         * @return {boolean} true if WebGL, else false
         */
        get: function () {
            return this.WebGL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "speed", {
        /**
         * @name speed
         * @description get the underlying game speed. 1 = 60 FPS
         * @return {number} speed factor
         */
        get: function () {
            return this.ticker.speed;
        },
        /**
         * @name speed
         * @description set the underlying game speed. 1 = 60 FPS, 2 = 120 FPS etc...
         * @note affects only the delta value sent to update()
         * @param {number} value - speed factor
         */
        set: function (value) {
            this.ticker.speed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "width", {
        /**
         * @name width
         * @description width getter
         * @return {number} width
         */
        get: function () {
            return this.appWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "height", {
        /**
         * @name height
         * @description height getter
         * @return {number} height
         */
        get: function () {
            return this.appHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name getEventManager
     * @description get event manager instance
     * @return {EventManager}
     */
    Application.prototype.getEventManager = function () {
        return this.appEventManager;
    };
    /**
     * @name startTimer
     * @description start timer loop
     * @return {void}
     */
    Application.prototype.startTimer = function () {
        this.ticker.start();
    };
    /**
     * @name stopTimer
     * @description stop timer loop
     * @return {void}
     */
    Application.prototype.stopTimer = function () {
        this.ticker.stop();
    };
    Object.defineProperty(Application.prototype, "fps", {
        /**
         * @name fps
         * @description get current frames per second. requires that the ftpTick() call be made after a frame update
         * @return {number} fps
         */
        get: function () {
            return this.FPS;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name ftpTick
     * @description called to update the internal FPS. Should be called in top level application render loop
     * @return {void}
     */
    Application.prototype.fpsTick = function () {
        this.frames++;
    };
    /**
     * @name sceneEnd
     * @description scene end handler
     * @param {string} outcome - result of level ending
     */
    Application.prototype.sceneEnd = function (outcome) {
    };
    /**
     * @name update
     * @description update the scene
     * @param {number} deltaTime
     * @return {void}
     */
    Application.prototype.update = function (deltaTime) {
        this._tickCount++;
    };
    /**
     * @name destroy
     * @description application cleanup
     */
    Application.prototype.destroy = function () {
        for (var texture in PIXI.utils.TextureCache) {
            PIXI.utils.TextureCache[texture].destroy(true);
        }
        ;
        PIXI.loader.reset();
        this.ticker.stop();
    };
    return Application;
}(PIXI.Application));
exports.Application = Application;
//# sourceMappingURL=Application.js.map