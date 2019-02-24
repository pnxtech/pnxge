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
 * @description Phoenix Game Engine Scene class
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
        this.app = app;
        this._state = new State_1.State();
        this.sceneWidth = app.width;
        this.sceneHeight = app.height;
        this.stage = app.stage;
        this.anims = {};
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
     * @name addAnim
     * @description add an anim to the scene
     * @param {string} name - name of anim
     * @param {Anim | Image | TextSprite} anim - anim objec
     */
    Scene.prototype.addAnim = function (name, anim) {
        this.anims[name] = anim;
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
    /**
     * @name getAnim
     * @description get anim by name
     * @return {TextSprite} anim
     */
    Scene.prototype.getAnim = function (name) {
        return this.anims[name];
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
     * @name forEachAnim
     * @description enumerate anims
     * @param {IAnimCallback} callback - called for each anim
     * @param {IAnimDoneCallback} done - called when done
     * @return {void}
     */
    Scene.prototype.forEachAnim = function (callback, done) {
        var _this = this;
        Object.keys(this.anims).forEach(function (key) {
            callback(_this.anims[key]);
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
        if (this.anims) {
            Object.keys(this.anims).forEach(function (key) {
                if (_this.anims[key]) {
                    _this.anims[key].update(deltaTime);
                }
            });
            if (this.projectileManager) {
                this.projectileManager.update(deltaTime);
            }
            this.sortAnims();
            this.collisionDetection();
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
            if (!a.anim || !b.anim) {
                return 0;
            }
            var first = a.anim;
            var second = b.anim;
            return first.z - second.z;
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
            if (!obj1.anim || !obj1.anim.collisionDetection || !obj1.anim.visible) {
                continue;
            }
            for (var _a = 0, objectList_2 = objectList; _a < objectList_2.length; _a++) {
                var obj2 = objectList_2[_a];
                if (obj2.anim && obj1.anim.id !== obj2.anim.id) {
                    if (!obj2.anim.collisionDetection || !obj2.anim.visible) {
                        continue;
                    }
                    if (obj1.anim.rect.intersect(obj2.anim.rect)) {
                        console.log("Collision: " + obj1.anim.rect + " " + obj2.anim.rect);
                        // console.log(`anim ${obj1.anim.currentSequenceName} collided with ${obj2.anim.currentSequenceName}`);
                        obj1.anim.onCollision(obj2.anim);
                        obj2.anim.onCollision(obj1.anim);
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
     * @param {Anim} anim - animation object
     * @param {number} steps - number of steps to look ahead
     * @param {number} padding - padding to increase or decrease anim rect
     * @return {Anim | Image | undefined} of potential collision
     */
    Scene.prototype.lookAhead = function (anim, steps, padding) {
        if (padding === void 0) { padding = 0; }
        var animRect = anim.rect;
        animRect.x = anim.x;
        animRect.y = anim.y;
        if (padding < 0) {
            animRect.deflate(padding);
        }
        else if (padding > 0) {
            animRect.inflate(padding);
        }
        for (var i = 0; i < steps; i++) {
            animRect.x += (anim.dx * (anim.vx || 1));
            animRect.y += (anim.dy * (anim.vy || 1)) + (anim.height * 0.5);
            var objectList = this.stage.children;
            for (var _i = 0, objectList_3 = objectList; _i < objectList_3.length; _i++) {
                var obj = objectList_3[_i];
                if (!obj.anim || !obj.anim.visible) {
                    continue;
                }
                else if (!obj.anim.collisionDetection) {
                    continue;
                }
                else if (anim.id === obj.anim.id) {
                    continue;
                }
                if (animRect.intersect(obj.anim.rect)) {
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
        Object.keys(this.anims).forEach(function (key) {
            _this.anims[key].destroy();
        });
        for (var _i = 0, _a = this.stage.children; _i < _a.length; _i++) {
            var child = _a[_i];
            this.stage.removeChild(child);
        }
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