"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Math_1 = require("./Math");
var Benchmark_1 = require("./Benchmark");
var State_1 = require("./State");
;
;
;
/**
 * @name Scene
 * @description Scene class
 */
var Scene = /** @class */ (function () {
    //#endregion
    /**
     * @name constructor
     * @description initialize scene
     * @param {Application} application
     */
    function Scene(app) {
        this.benchmark = new Benchmark_1.Benchmark();
        this.internalTick = 0;
        this.sceneStarted = false;
        this.benchmarkUpdate = false;
        this.collisionRect1 = new Math_1.Rect();
        this.collisionRect2 = new Math_1.Rect();
        this.app = app;
        this._state = new State_1.State();
        this.sceneWidth = app.width;
        this.sceneHeight = app.height;
        this.stage = app.stage;
        this.sprites = {};
    }
    /**
     * @name attachProjectileManager
     * @description attach a projectile manager
     * @return {void}
     */
    Scene.prototype.attachProjectileManager = function (projectileManager) {
        this.projectileManager = projectileManager;
    };
    /**
     * @name getProjectileManager
     * @description retrieve a projectile manager instance or undefined
     * @return {ProjectileManager | undefined}
     */
    Scene.prototype.getProjectileManager = function () {
        return this.projectileManager;
    };
    /**
     * @name attachSoundManager
     * @description attach sound manager
     * @return {void}
     */
    Scene.prototype.attachSoundManager = function (soundManager) {
        this.soundManager = soundManager;
    };
    Object.defineProperty(Scene.prototype, "state", {
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
    Scene.prototype.setState = function (data) {
        this._state.setState(data);
        return this._state.state;
    };
    /**
     * @name getSoundManager
     * @description retrieve a sound manager instance or undefined
     * @return {SoundManager | undefined}
     */
    Scene.prototype.getSoundManager = function () {
        return this.soundManager;
    };
    /**
     * @name start
     * @description start scene updates
     * @param {object} resources - loaded asset resources
     * @return {void}
     */
    Scene.prototype.start = function (resources) {
        this.sceneStarted = true;
    };
    /**
     * @name end
     * @description scene end handler
     * @param {string} outcome - result of scene ending
     * @return {void}
     */
    Scene.prototype.end = function (outcome) {
        this.sceneStarted = false;
    };
    /**
     * @name hasSceneStarted
     * @description determine whether the scene has been started
     */
    Scene.prototype.hasSceneStarted = function () {
        return this.sceneStarted;
    };
    /**
     * @name benchmarking
     * @description turn benchmarking on or off
     * @note displays via console.log
     * @return {void}
     */
    Scene.prototype.benchmarking = function (state) {
        this.benchmarkUpdate = state;
    };
    Object.defineProperty(Scene.prototype, "tick", {
        /**
         * @name tick
         * @description get internal tick count
         */
        get: function () {
            return this.internalTick;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name addSpriteAnim
     * @description add a sprite to the scene
     * @param {string} name - name of sprite
     * @param {SpriteAnim} sprite - sprite object
     * @return {void}
     */
    Scene.prototype.addSpriteAnim = function (name, sprite) {
        this.sprites[name] = sprite;
    };
    /**
     * @name getSpriteAnim
     * @description get sprite by name
     * @return {SpriteAnim | undefined} sprite
     */
    Scene.prototype.getSpriteAnim = function (name) {
        return this.sprites[name];
    };
    /**
     * @name moveLeft
     * @description handle movement left
     * @return {void}
     */
    Scene.prototype.moveLeft = function () {
    };
    /**
     * @name moveRight
     * @description handle movement right
     * @return {void}
     */
    Scene.prototype.moveRight = function () {
    };
    Object.defineProperty(Scene.prototype, "width", {
        /**
         * @name width
         * @description get the width of the scene
         * @return {number} width
         */
        get: function () {
            return this.sceneWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "height", {
        /**
         * @name height
         * @description get the height of the scene
         * @return {number} height
         */
        get: function () {
            return this.sceneHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name forEachSpriteAnim
     * @description enumerate sprites
     * @param {ISpriteCallback} callback - called for each sprite
     * @param {ISpriteDoneCallback} done - called when done
     * @return {void}
     */
    Scene.prototype.forEachSpriteAnim = function (callback, done) {
        var _this = this;
        Object.keys(this.sprites).forEach(function (key) {
            callback(_this.sprites[key]);
        });
        done();
    };
    /**
     * @name update
     * @description update the scene
     * @param {number} deltaTime
     * @return {void}
     */
    Scene.prototype.update = function (deltaTime) {
        var _this = this;
        this.benchmarkUpdate && this.benchmark.begin();
        this.internalTick++;
        if (this._state.state.actionList) {
            switch (this._state.state.actionList[this.internalTick]) {
                case 'left':
                    this.moveLeft();
                    break;
                case 'right':
                    this.moveRight();
                    break;
            }
        }
        if (!this.sceneStarted) {
            return;
        }
        if (this.sprites) {
            Object.keys(this.sprites).forEach(function (key) {
                if (_this.sprites[key] && _this.sprites[key].visible) {
                    _this.sprites[key].updateSpriteAnim(deltaTime);
                }
            });
            this.collisionDetection(); // must happen before projectile update because latter requires it
            if (this.projectileManager) {
                this.projectileManager.update(deltaTime);
            }
            this.sortAnims();
        }
        this.benchmarkUpdate && console.log("scene benchmark: " + Math_1.pcap(this.benchmark.elapsed()) + " ms");
    };
    /**
     * @name sortAnims
     * @description sort dislay list based on anim z order
     * @return {void}
     */
    Scene.prototype.sortAnims = function () {
        var objectList = this.stage.children;
        objectList.sort(function (a, b) {
            if (!a.id || !b.id) {
                return 0;
            }
            return a.z - b.z;
        });
    };
    /**
     * @name collisionDetection
     * @description collision detection system. notifies anim object when they collide with other objects
     * @return {void}
     */
    Scene.prototype.collisionDetection = function () {
        var objectList = this.stage.children;
        for (var _i = 0, objectList_1 = objectList; _i < objectList_1.length; _i++) {
            var obj1 = objectList_1[_i];
            if (!obj1.collisionDetection || !obj1.visible) {
                continue;
            }
            this.collisionRect1.x = obj1.x;
            this.collisionRect1.y = obj1.y;
            this.collisionRect1.width = obj1.width;
            this.collisionRect1.height = obj1.height;
            for (var _a = 0, objectList_2 = objectList; _a < objectList_2.length; _a++) {
                var obj2 = objectList_2[_a];
                if (obj1.subType === obj2.subType) {
                    continue;
                }
                if (obj1.id !== obj2.id) {
                    if (!obj2.collisionDetection || !obj2.visible) {
                        continue;
                    }
                    this.collisionRect2.x = obj2.x;
                    this.collisionRect2.y = obj2.y;
                    this.collisionRect2.width = obj2.width;
                    this.collisionRect2.height = obj2.height;
                    if (this.collisionRect1.intersect(this.collisionRect2)) {
                        obj1.onCollision(obj2);
                        obj2.onCollision(obj1);
                    }
                }
            }
        }
    };
    /**
     * @name lookAhead
     * @description looks ahead for current anim to
     * determine whether it will collide with another
     * anim within the number of steps specified.
     * @note uses the specified anim's direction and velocity vectors
     * @param {ISprite} sprite - sprite object
     * @param {number} steps - number of steps to look ahead
     * @param {number} padding - padding to increase or decrease anim rect
     * @return {ISprite | undefined} of potential collision
     */
    Scene.prototype.lookAhead = function (sprite, steps, padding) {
        if (padding === void 0) { padding = 0; }
        this.collisionRect1.x = sprite.x;
        this.collisionRect1.y = sprite.y;
        this.collisionRect1.width = sprite.width;
        this.collisionRect1.height = sprite.height;
        if (padding < 0) {
            this.collisionRect1.deflate(padding);
        }
        else if (padding > 0) {
            this.collisionRect1.inflate(padding);
        }
        for (var i = 0; i < steps; i++) {
            this.collisionRect1.x += (sprite.dx * (sprite.vx || 1));
            this.collisionRect1.y += (sprite.dy * (sprite.vy || 1)) + (sprite.height * 0.5);
            var objectList = this.stage.children;
            for (var _i = 0, objectList_3 = objectList; _i < objectList_3.length; _i++) {
                var obj = objectList_3[_i];
                if (!obj.anim.visible) {
                    continue;
                }
                else if (!obj.collisionDetection) {
                    continue;
                }
                else if (sprite.id === obj.sprite.id) {
                    continue;
                }
                this.collisionRect2.x = obj.x;
                this.collisionRect2.y = obj.y;
                this.collisionRect2.width = obj.width;
                this.collisionRect2.height = obj.height;
                if (this.collisionRect1.intersect(this.collisionRect2)) {
                    return obj.anim;
                }
            }
        }
        return undefined;
    };
    /**
     * @name destroy
     * @description remove Anim objects from scene
     * @return {void}
     */
    Scene.prototype.destroy = function () {
        var _this = this;
        Object.keys(this.sprites).forEach(function (key) {
            _this.sprites[key].destroy();
        });
        if (this.app.usingWebGL) {
            var renderer = this.app.renderer;
            if (renderer.textureGC) {
                renderer.textureGC.run();
            }
        }
    };
    return Scene;
}());
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map