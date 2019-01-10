"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
;
;
/**
 * @name Scene
 * @description Phoenix Game Engine Scene class
 */
var Scene = /** @class */ (function () {
    /**
     * @name constructor
     * @description initialize scene
     * @param {Application} application
     */
    function Scene(app) {
        this.texts = {};
        this.sceneStarted = false;
        this.app = app;
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
    /**
     * @name attachTexts
     * @description attach asset texts data
     * @param {ITextsHash} texts - texts object
     * @return {void}
     */
    Scene.prototype.attachTexts = function (texts) {
        this.texts = texts;
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
     * return {void}
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
     * @name hitTestRectangle
     * @description check whether two anim objects have collided
     * @note this algorithm relies on the fact that sprites are by default setup with an anchor of 0.5
     * @param {Anim} a1 - first anim
     * @param {Anim} a2 - second anim
     * @return {boolean} bool - true if collision else false
     */
    Scene.prototype.hitTestRectangle = function (a1, a2) {
        // Find the half-widths and half-heights of each sprite
        var a1_halfWidth = 0;
        var a1_halfHeight = 0;
        var a2_halfWidth = 0;
        var a2_halfHeight = 0;
        if (a1 && a2) {
            a1_halfWidth = a1.width * 0.5;
            a1_halfHeight = a1.height * 0.5;
            a2_halfWidth = a2.width * 0.5;
            a2_halfHeight = a2.height * 0.5;
        }
        // Calculate the distance vector between the sprites
        var dx = Math.abs(a1.x - a2.x) * 2;
        var dy = Math.abs(a1.y - a2.y) * 2;
        // Figure out the combined half-widths and half-heights
        var combinedHalfWidths = a1_halfWidth + a2_halfWidth;
        var combinedHalfHeights = a1_halfHeight + a2_halfHeight;
        return ((Math.abs(dx) < combinedHalfWidths) && (Math.abs(dy) < combinedHalfHeights)) ? true : false;
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
                if (!obj2.anim || !obj2.anim.collisionDetection || !obj2.anim.visible) {
                    continue;
                }
                if (obj1.anim.id === obj2.anim.id) {
                    continue;
                }
                if (this.hitTestRectangle(obj1, obj2)) {
                    obj1.anim.onCollision(obj2.anim);
                    obj2.anim.onCollision(obj1.anim);
                }
            }
        }
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
    };
    return Scene;
}());
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map