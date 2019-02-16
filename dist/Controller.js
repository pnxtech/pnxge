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
        this.pathCache = {};
        this.currentPath = '';
        this.currentPathIndex = 0;
        this.isPathComplete = true;
        this.anim = scene.getAnim(name);
        this.anim.attachController(this);
    }
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
     * @param {Anim} anim - which hit this controller
     */
    Controller.prototype.hitBy = function (anim) {
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
     * @param {[]} pathArray - path data in array form
     * @param {number} rotationCorrection - optional correction in radian
     * @return {void}
     */
    Controller.prototype.addPathArray = function (pathName, pathArray, rotationCorrection) {
        if (rotationCorrection === void 0) { rotationCorrection = 0; }
        this.pathCache[pathName] = pathArray.slice();
        for (var i = 0; i < pathArray.length; i++) {
            this.pathCache[pathName].r += rotationCorrection;
        }
    };
    /**
     * @name triggerPath
     * @description trigger the execution of a path
     * @param {string} pathName - path to execute
     */
    Controller.prototype.triggerPath = function (pathName) {
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
            if (this.anim) {
                this.anim.x = this.pathCache[this.currentPath][this.currentPathIndex].x;
                this.anim.y = this.pathCache[this.currentPath][this.currentPathIndex].y;
                this.anim.rotation = this.pathCache[this.currentPath][this.currentPathIndex].r;
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
    };
    /**
     * @name destroy
     * @description cleanup
     * @return {void}
     */
    Controller.prototype.destroy = function () {
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map