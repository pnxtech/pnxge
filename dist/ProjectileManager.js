"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatedSprite_1 = require("./AnimatedSprite");
var Utils_1 = require("./Utils");
var Math_1 = require("./Math");
;
;
;
/**
 * @name ProjectileManager
 * @description Create and manages projectiles
 */
var ProjectileManager = /** @class */ (function () {
    /**
     * @name constructor
     * @description class constructor
     */
    function ProjectileManager(scene, atlas, resources) {
        this.projectiles = [];
        this.scene = scene;
        this.atlas = atlas;
        this.resources = resources;
        this.collisionResolutionHandler = undefined;
        this.sceneRect = new Math_1.Rect(0, 0, this.scene.width, this.scene.height);
    }
    Object.defineProperty(ProjectileManager.prototype, "fence", {
        /**
         * @name fence
         * @description GEO fence getter for projectiles
         * @return {Rect | undefined}
         */
        get: function () {
            return this._fence;
        },
        /**
         * @name fence
         * @description GEO fence setter for projectiles
         * @param {Rect} input rect
         * @return {void}
         */
        set: function (rect) {
            if (rect) {
                this._fence = new Math_1.Rect(rect.x, rect.y, rect.width, rect.height);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name registerCollisionResolutionHandler
     * @description register a collision resolution callback handler
     * @param {ICollisionResolutionCallback} callback
     * @return {void}
     */
    ProjectileManager.prototype.registerCollisionResolutionHandler = function (callback) {
        this.collisionResolutionHandler = callback;
    };
    /**
     * @name createProjectile
     * @description creates a projectile
     * @note projectile.name is the same name as the anim sequence, projectile.type is a generic type
     * @param {IProjectileObject} projectile - data
     * @return {void}
     */
    ProjectileManager.prototype.createProjectile = function (projectileInfo) {
        var animatedSprite = undefined;
        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].active === false && (this.projectiles[i].type === projectileInfo.type)) {
                this.projectiles[i].active = true;
                this.projectiles[i].rotationType = projectileInfo.rotationType || '';
                this.projectiles[i].rotationAmount = projectileInfo.rotationAmount || 0;
                animatedSprite = this.projectiles[i].animatedSprite;
                break;
            }
        }
        if (!animatedSprite) {
            animatedSprite = new AnimatedSprite_1.AnimatedSprite(this.scene, projectileInfo.name, this.atlas, this.resources);
            projectileInfo.animatedSprite = animatedSprite;
            projectileInfo.active = true;
            this.projectiles.push({
                active: projectileInfo.active,
                animatedSprite: projectileInfo.animatedSprite,
                type: projectileInfo.type,
                rotationType: projectileInfo.rotationType || '',
                rotationAmount: projectileInfo.rotationAmount || 0
            });
            animatedSprite.cacheAsBitmap = projectileInfo.cacheFrame;
            this.scene.addSpriteAnim(Utils_1.Utils.createID(), animatedSprite);
        }
        if (animatedSprite) {
            animatedSprite.visible = true;
            animatedSprite.attribs.clone(projectileInfo.attribs),
                animatedSprite.strength = projectileInfo.strength,
                animatedSprite.subType = projectileInfo.subType;
            animatedSprite.x = projectileInfo.x;
            animatedSprite.y = projectileInfo.y;
            animatedSprite.z = projectileInfo.z;
            animatedSprite.dx = projectileInfo.dx;
            animatedSprite.dy = projectileInfo.dy;
            animatedSprite.vx = projectileInfo.vx;
            animatedSprite.vy = projectileInfo.vy;
            animatedSprite.loop = (projectileInfo.loop !== undefined) ? projectileInfo.loop : false;
            animatedSprite.animationSpeed = (projectileInfo.animSpeed) ? projectileInfo.animSpeed : 1;
            animatedSprite.rotation = projectileInfo.rotation;
            animatedSprite.anchor.x = 0.5;
            animatedSprite.anchor.y = 0.5;
            animatedSprite.scale.x = projectileInfo.scale;
            animatedSprite.scale.y = projectileInfo.scale;
            animatedSprite.collisionDetection = projectileInfo.collisionDetection;
            if (projectileInfo.frame !== undefined) {
                animatedSprite.gotoAndStop(projectileInfo.frame);
            }
            else {
                animatedSprite.gotoAndPlay(0);
            }
        }
    };
    /**
     * @name update
     * @description update projectiles
     * @param {number} deltaTime
     * @return {void}
     */
    ProjectileManager.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].active === false) {
                continue;
            }
            var animatedSprite = this.projectiles[i].animatedSprite;
            if (animatedSprite) {
                if (this.projectiles[i].rotationType && this.projectiles[i].rotationType !== '') {
                    var rotAmount = 0;
                    var rotSpeedAmount = this.projectiles[i].rotationAmount || 0.01;
                    switch (this.projectiles[i].rotationType) {
                        case 'cw':
                            rotAmount = animatedSprite.rotation;
                            rotAmount += rotSpeedAmount;
                            if (rotAmount > 6.28) {
                                rotAmount = 0;
                            }
                            animatedSprite.rotation = rotAmount;
                            break;
                        case 'ccw':
                            rotAmount = animatedSprite.rotation;
                            rotAmount -= rotSpeedAmount;
                            if (rotAmount < 0) {
                                rotAmount = 6.28;
                            }
                            animatedSprite.rotation = rotAmount;
                            break;
                    }
                }
                var hide = false;
                if (this._fence) {
                    hide = !this._fence.pointInRect(animatedSprite.x, animatedSprite.y);
                }
                else {
                    hide = !this.sceneRect.pointInRect(animatedSprite.x, animatedSprite.y);
                }
                if (hide && animatedSprite.loop === true &&
                    animatedSprite.currentFrame === animatedSprite.totalFrames - 1) {
                    hide = true;
                }
                var cwith = animatedSprite.collisionWith;
                if (!hide && cwith && cwith.id !== animatedSprite.id) {
                    if (this.collisionResolutionHandler) {
                        hide = this.collisionResolutionHandler(animatedSprite, cwith);
                    }
                    else {
                        hide = true;
                    }
                }
                if (hide) {
                    this.projectiles[i].active = false;
                    animatedSprite.visible = false;
                    animatedSprite.clearCollision();
                }
            }
        }
    };
    return ProjectileManager;
}());
exports.ProjectileManager = ProjectileManager;
//# sourceMappingURL=ProjectileManager.js.map