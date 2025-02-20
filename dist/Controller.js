"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name Controller
 * @description  Controller base class
 */
var Controller = /** @class */ (function () {
    //#endregion
    /**
     * @name constructor
     * @description class contructor
     * @param {string} name - of anim which will be controlled
     * @param {Scene} scene - where anim was loaded
     */
    function Controller(name, scene) {
        this.isActive = true;
        this.pathCache = {};
        this.currentPath = '';
        this.currentPathIndex = 0;
        this.isPathComplete = true;
        this.sprite = scene.getSpriteAnim(name);
        this.sprite && (this.sprite.attachController(this));
    }
    Object.defineProperty(Controller.prototype, "active", {
        /**
         * @name active
         * @description active getter
         * @return {boolean} is active
         */
        get: function () {
            return this.isActive;
        },
        /**
         * @name active
         * @description active setter
         * @return {void}
         */
        set: function (value) {
            this.isActive = value;
            if (this.isActive === false) {
                this.currentPath = '';
                this.currentPathIndex = 0;
                this.isPathComplete = true;
                this.sprite && (this.sprite.visible = false);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name moveLeft
     * @description handle movement left
     * @return {void}
     */
    Controller.prototype.moveLeft = function () {
    };
    /**
     * @name moveRight
     * @description handle movement right
     * @return {void}
     */
    Controller.prototype.moveRight = function () {
    };
    /**
     * @name hitBy
     * @description handle when this anim controller is hit by an anim
     * @param {SpriteAnim | undefined} sprite - what hit this controller
     * @return {void}
     */
    Controller.prototype.hitBy = function (sprite) {
    };
    /**
     * @name fire
     * @description handler to fire a projectile
     * @return {void}
     */
    Controller.prototype.fire = function () {
    };
    /**
     * @name addPathString
     * @description register a path
     * @param {string} pathName - name of path
     * @param {string} pathString - path data in string form
     * @param {number} rotationCorrection - optional correction in radian
     * @return {void}
     */
    Controller.prototype.addPathString = function (pathName, pathString, rotationCorrection) {
        if (rotationCorrection === void 0) { rotationCorrection = 0; }
        var pathArray = pathString.split('|');
        this.pathCache[pathName] = [];
        for (var i = 0; i < pathArray.length; i += 3) {
            this.pathCache[pathName].push({
                x: Number(pathArray[i]),
                y: Number(pathArray[i + 1]),
                r: Number(pathArray[i + 2] + rotationCorrection)
            });
        }
    };
    /**
     * @name addPathArray
     * @description register a path
     * @param {string} pathName - name of path
     * @param {PathElement[]} pathArray[] - path data in array form
     * @param {number} rotationCorrection - optional correction in radian
     * @return {void}
     */
    Controller.prototype.addPathArray = function (pathName, pathArray, rotationCorrection) {
        if (rotationCorrection === void 0) { rotationCorrection = 0; }
        this.pathCache[pathName] = pathArray.slice();
        for (var i = 0; i < pathArray.length; i++) {
            this.pathCache[pathName][i].r += rotationCorrection;
        }
    };
    /**
     * @name triggerPath
     * @description trigger the execution of a path
     * @param {string} pathName - path to execute
     */
    Controller.prototype.triggerPath = function (pathName) {
        this.isActive = true;
        this.currentPath = pathName;
        this.currentPathIndex = 0;
        this.isPathComplete = false;
    };
    Object.defineProperty(Controller.prototype, "pathIndex", {
        /**
         * @name pathIndex
         * @description index within path
         * @return {number} index - will return -1 if a path isn't active
         */
        get: function () {
            return (!this.isPathComplete) ? this.currentPathIndex : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "pathComplete", {
        /***
         * @name pathComplete
         * @description Returns true of path traversal is complete
         * @return {boolean} is path complete?
         */
        get: function () {
            return this.isPathComplete;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name pathCompleted
     * @description called when path is completed
     * @return {void}
     */
    Controller.prototype.pathCompleted = function () {
    };
    /**
     * @name update
     * @description update anim based on path
     * @param {number} deltaTime - delta time offset
     * @return {void}
     */
    Controller.prototype.update = function (deltaTime) {
        if (this.currentPath !== '') {
            if (this.sprite) {
                this.sprite.x = this.pathCache[this.currentPath][this.currentPathIndex].x;
                this.sprite.y = this.pathCache[this.currentPath][this.currentPathIndex].y;
                this.sprite.rotation = this.pathCache[this.currentPath][this.currentPathIndex].r;
                if (this.currentPathIndex + 1 === this.pathCache[this.currentPath].length) {
                    this.currentPath = '';
                    this.currentPathIndex = 0;
                    this.isPathComplete = true;
                    this.pathCompleted();
                }
                else {
                    this.currentPathIndex++;
                }
            }
        }
        else {
            this.sprite.x += this.sprite.dx * (this.sprite.vx || 1) * deltaTime;
            this.sprite.y += this.sprite.dy * (this.sprite.vy || 1) * deltaTime;
        }
    };
    /**
     * @name destroy
     * @description cleanup
     * @return {void}
     */
    Controller.prototype.destroy = function () {
        this.sprite && (this.sprite.destroy());
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map