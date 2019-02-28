"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Anim_1 = require("./Anim");
var Utils_1 = require("./Utils");
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
        this.utils = new Utils_1.Utils();
        this.collisionResolutionHandler = undefined;
    }
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
        var projectile;
        for (var i = 0; i < this.projectiles.length; i++) {
            if (!this.projectiles[i].active && (this.projectiles[i].type === projectileInfo.type)) {
                this.projectiles[i].active = true;
                projectile = this.projectiles[i];
                break;
            }
        }
        if (!projectile) {
            var anim_1 = new Anim_1.Anim(this.scene);
            projectileInfo.anim = anim_1;
            projectileInfo.active = true;
            this.projectiles.push(projectileInfo);
            anim_1.loadSequence(projectileInfo.name, this.atlas, this.resources);
            anim_1.setCacheAsBitmap(projectileInfo.cacheFrame);
            this.scene.addAnim(this.utils.createID(), anim_1);
        }
        var anim = projectileInfo.anim;
        if (anim) {
            anim.visible = true;
            anim.attribs.clone(projectileInfo.attribs),
                anim.strength = projectileInfo.strength,
                anim.subType = projectileInfo.subType;
            anim.x = projectileInfo.x;
            anim.y = projectileInfo.y;
            anim.z = projectileInfo.z;
            anim.dx = projectileInfo.dx;
            anim.dy = projectileInfo.dy;
            anim.vx = projectileInfo.vx;
            anim.vy = projectileInfo.vy;
            anim.animationSpeed = (projectileInfo.animSpeed) ? projectileInfo.animSpeed : 1;
            anim.rotation = projectileInfo.rotation;
            anim.sx = projectileInfo.scale;
            anim.sy = projectileInfo.scale;
            anim.collisionDetection = projectileInfo.collisionDetection;
            if (projectileInfo.frame !== undefined) {
                anim.setFrame(projectileInfo.frame);
            }
            else {
                anim.play(projectileInfo.name);
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
            if (this.projectiles[i].active) {
                var anim = this.projectiles[i].anim;
                if (anim) {
                    if (this.projectiles[i].rotationType) {
                        var rotAmount = 0;
                        var rotSpeedAmount = this.projectiles[i].rotationAmount || 0.01;
                        switch (this.projectiles[i].rotationType) {
                            case 'cw':
                                rotAmount = anim.rotation;
                                rotAmount += rotSpeedAmount;
                                if (rotAmount > 6.28) {
                                    rotAmount = 0;
                                }
                                anim.rotation = rotAmount;
                                break;
                            case 'ccw':
                                rotAmount = anim.rotation;
                                rotAmount -= rotSpeedAmount;
                                if (rotAmount < 0) {
                                    rotAmount = 6.28;
                                }
                                anim.rotation = rotAmount;
                                break;
                        }
                    }
                    var hide = false;
                    if ((anim.x + anim.width) < 0 ||
                        (anim.y + anim.height) < 0 ||
                        (anim.x - anim.width) > this.scene.width ||
                        (anim.y - anim.height) > this.scene.height) {
                        hide = true;
                    }
                    var cwith = anim.collisionWith();
                    if (!hide && cwith && cwith.id !== anim.id) {
                        if (this.collisionResolutionHandler) {
                            hide = this.collisionResolutionHandler(anim, cwith);
                        }
                        else {
                            hide = true;
                        }
                    }
                    if (hide) {
                        this.projectiles[i].active = false;
                        anim.visible = false;
                        // anim.clearCollision();
                        // anim.reset();
                    }
                }
            }
        }
    };
    return ProjectileManager;
}());
exports.ProjectileManager = ProjectileManager;
//# sourceMappingURL=ProjectileManager.js.map