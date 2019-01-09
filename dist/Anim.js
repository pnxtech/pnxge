"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatedSprite_1 = require("./AnimatedSprite");
var Math_1 = require("./Math");
;
;
var AnimType;
(function (AnimType) {
    AnimType["HERO"] = "hero";
    AnimType["ENEMY"] = "enemy";
    AnimType["BULLET"] = "bullet";
    AnimType["EXPLOSION"] = "explosion";
    AnimType["BACKGROUND"] = "background";
    AnimType["GROUND"] = "ground";
    AnimType["TEXT"] = "text";
    AnimType["IMAGE"] = "image";
})(AnimType = exports.AnimType || (exports.AnimType = {}));
;
/**
 * @name Anim
 * @description Phoenix Game Engine Anim class
 */
var Anim = /** @class */ (function () {
    /**
     * @name constructor
     * @description binds Anim to Scene
     */
    function Anim(scene) {
        this.animID = Math_1.createID();
        this.animationSequence = {};
        this.lastSequenceName = '';
        this.currentSequenceName = '';
        this.currentX = 0;
        this.currentY = 0;
        this.currentZ = 0;
        this.currentLoop = false;
        this.currentRotation = 0;
        this.currentVisible = true;
        this.currentHealth = 0;
        this.currentStrength = 0;
        this.animSpeed = 1;
        this.animAnchor = .5;
        this.directionX = 0;
        this.directionY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.flipState = false;
        this.tint = 0;
        this.animType = '';
        this.currentCollisionDetection = false;
        this.scene = scene;
        this.stage = scene.stage;
    }
    Object.defineProperty(Anim.prototype, "id", {
        /**
         * @name id
         * @description get anin id
         */
        get: function () {
            return this.animID;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name reset
     * @description reset anim - in cases where this anim is reused
     * @return {void}
     */
    Anim.prototype.reset = function () {
        this.animID = Math_1.createID();
        this.currentX = 0;
        this.currentY = 0;
        this.currentZ = 0;
        this.currentLoop = false;
        this.currentRotation = 0;
        this.currentVisible = true;
        this.animSpeed = 1;
        this.animAnchor = .5;
        this.directionX = 0;
        this.directionY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.flipState = false;
        this.tint = 0;
        this.animType = '';
        this.currentCollisionDetection = false;
        this.animCollisionWith = undefined;
    };
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    Anim.prototype.attachController = function (controller) {
        this.controller = controller;
    };
    Object.defineProperty(Anim.prototype, "x", {
        /**
         * @name x
         * @description x position getter
         * @return {number} x position
         */
        get: function () {
            return this.currentX;
        },
        /**
         * @name x
         * @description x position setter
         */
        set: function (x) {
            this.currentX = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "y", {
        /**
         * @name y
         * @description y position getter
         * @return {number} y position
         */
        get: function () {
            return this.currentY;
        },
        /**
         * @name y
         * @description y position setter
         */
        set: function (y) {
            this.currentY = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "z", {
        /**
         * @name z
         * @description z position getter
         * @return {number} z position
         */
        get: function () {
            return this.currentZ;
        },
        /**
         * @name z
         * @description z position setter
         */
        set: function (z) {
            this.currentZ = z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "visible", {
        /**
         * @name visible
         * @description get visibility
         * @return {boolean} true if visible
         */
        get: function () {
            return this.currentVisible;
        },
        /**
         * @name visible
         * @description set visibility
         */
        set: function (value) {
            this.currentVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "width", {
        /**
         * @name width
         * @description get the anim width
         * @return {number} anim width
         */
        get: function () {
            var ret;
            if (this.currentSequence) {
                ret = this.currentSequence.width;
            }
            else {
                ret = 0;
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "height", {
        /**
         * @name height
         * @description get the anim height
         * @return {number} anim height
         */
        get: function () {
            var ret;
            if (this.currentSequence) {
                ret = this.currentSequence.height;
            }
            else {
                ret = 0;
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "rotation", {
        /**
         * @name rotation
         * @description rotation getter
         * @return {number} rotation position
         */
        get: function () {
            return this.currentRotation;
        },
        /**
         * @name rotation
         * @description rotation setter
         */
        set: function (value) {
            this.currentRotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "animationSpeed", {
        /**
         * @name animationSpeed
         * @description animationSpeed getter
         * @return {number} animation speed
         */
        get: function () {
            return this.animSpeed;
        },
        /**
         * @name animationSpeed
         * @description animationSpeed setter
         */
        set: function (speed) {
            this.animSpeed = speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "strength", {
        /**
         * @name strength
         * @description get current strength
         * @return {number} strength
         */
        get: function () {
            return this.currentStrength;
        },
        /**
         * @name strength
         * @description set current strength
         * @param {number} value - strength
         */
        set: function (value) {
            this.currentStrength = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "health", {
        /**
         * @name health
         * @description get current health
         * @return {number} health
         */
        get: function () {
            return this.currentHealth;
        },
        /**
         * @name health
         * @description set current health
         * @param {number} value - health
         */
        set: function (value) {
            this.currentHealth = value;
            ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "sx", {
        /**
         * @name sx
         * @description get anim scale x
         * @return {number} scale x
         */
        get: function () {
            return this.scaleX;
        },
        /**
         * @name sx
         * @description set anim scale x
         */
        set: function (value) {
            this.scaleX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "sy", {
        /**
         * @name sy
         * @description get anim scale y
         * @return {number} scale y
         */
        get: function () {
            return this.scaleY;
        },
        /**
         * @name sy
         * @description set anim scale y
         */
        set: function (value) {
            this.scaleY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "anchor", {
        /**
         * @name anchor
         * @description anchor getter
         * @return {number} anchor position
         */
        get: function () {
            return this.animAnchor;
        },
        /**
         * @name anchor
         * @description anchor setter
         */
        set: function (value) {
            this.animAnchor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "dx", {
        /**
         * @name dx
         * @description direction X getter
         * @return {number} dx - direction X
         */
        get: function () {
            return this.directionX;
        },
        /**
         * @name dx
         * @description direction X setter
         * @param {number} value - direction X
         */
        set: function (value) {
            this.directionX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "dy", {
        /**
         * @name dy
         * @description direction Y getter
         * @return {number} dy - direction Y
         */
        get: function () {
            return this.directionY;
        },
        /**
         * @name dy
         * @description direction Y setter
         * @param {number} value - direction Y
         */
        set: function (value) {
            this.directionY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "vx", {
        /**
         * @name vx
         * @description velocity X getter
         * @return {number} vx - velocity X
         */
        get: function () {
            return this.velocityX;
        },
        /**
         * @name vx
         * @description velocity X setter
         * @param {number} value - velocity X
         */
        set: function (value) {
            this.velocityX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "vy", {
        /**
         * @name vy
         * @description velocity Y getter
         * @return {number} vy - velocity Y
         */
        get: function () {
            return this.velocityY;
        },
        /**
         * @name vy
         * @description velocity Y setter
         * @param {number} value - velocity Y
         */
        set: function (value) {
            this.velocityY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "loop", {
        /**
         * @name loop
         * @description get animation loop state
         * @return {boolean}
         */
        get: function () {
            return this.currentLoop;
        },
        /**
         * @name loop
         * @description set animation loop state
         */
        set: function (value) {
            this.currentLoop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "type", {
        /**
         * @name type
         * @description type getter
         * @return {string} vy position
         */
        get: function () {
            return this.animType;
        },
        /**
         * @name type
         * @description type setter
         * @param {string} value - anim type
         */
        set: function (value) {
            this.animType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "collisionDetection", {
        /**
         * @name collisionDetection
         * @description collisionDetection getter
         * @return {boolean} collisionDetection position
         */
        get: function () {
            return this.currentCollisionDetection;
        },
        /**
         * @name collisionDetection
         * @description collisionDetection setter
         * @param {string} value - collisionDetection setting
         */
        set: function (value) {
            this.currentCollisionDetection = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name collisionWith
     * @description return Anim if collision else undefined
     * @return {Anim | undefined}
     */
    Anim.prototype.collisionWith = function () {
        return this.animCollisionWith;
    };
    /**
     * @name flip
     * @description flip tile
     * @param {state} boolean - true flip, else don't
     * @return {void}
     */
    Anim.prototype.flip = function (state) {
        this.flipState = state;
    };
    /**
     * @name setTint
     * @description set tint
     * @param {number} color - color tint
     * @return {void}
     */
    Anim.prototype.setTint = function (color) {
        this.tint = color;
    };
    /**
     * @name loadSequence
     * @description load a new animation sequence
     * @param {string} name - name of sequence
     * @param {string} atlas - sprite atlas name
     * @param {object} resources - loaded resources
     * @return {void}
     */
    Anim.prototype.loadSequence = function (name, atlas, resources) {
        var sheet = resources[atlas].spritesheet;
        if (sheet) {
            var sequence = new AnimatedSprite_1.AnimatedSprite(sheet.animations[name]);
            sequence.anim = this;
            sequence.visible = false;
            this.animationSequence[name] = {
                name: name,
                sequence: sequence
            };
            this.stage.addChild(sequence);
        }
    };
    /**
     * @name play
     * @description play an animation sequence
     * @param {string} sequenceName - name of sequence
     * @return {void}
     */
    Anim.prototype.play = function (sequenceName) {
        if (this.lastSequenceName && sequenceName !== this.lastSequenceName) {
            this.animationSequence[this.lastSequenceName].sequence.visible = false;
        }
        this.lastSequenceName = sequenceName;
        this.currentSequenceName = sequenceName;
        this.currentSequence = this.animationSequence[this.currentSequenceName].sequence;
        if (this.currentSequence) {
            this.currentSequence.gotoAndPlay(0);
        }
    };
    /**
     * @name setFrame
     * @description set the frame of the current animation sequence
     * @param {number} frameNumber - frame number
     * @return {void}
     */
    Anim.prototype.setFrame = function (frameNumber) {
        if (this.currentSequence) {
            this.currentSequence.gotoAndStop(frameNumber);
        }
    };
    /**
     * @name attachTouchHandler
     * @description attach a touch (click, press, touch) handler for this anim
     * @param {string} name - name of event
     * @param {EventManager} - instance of event eventManager
     * @return {void}
     */
    Anim.prototype.attachTouchHandler = function (name, eventManager) {
        var _this = this;
        if (this.currentSequence) {
            this.currentSequence.interactive = true;
            this.currentSequence.on('click', function () {
                eventManager.triggerEvent(name, _this);
            });
            this.currentSequence.on('touchend', function () {
                eventManager.triggerEvent(name, _this);
            });
        }
    };
    /**
     * @name update
     * @description update anim position based on velocity
     * @param {number} deltaTime - delta time offset
     * @return {void}
     */
    Anim.prototype.update = function (deltaTime) {
        if (deltaTime === void 0) { deltaTime = 0; }
        if (!this.currentSequenceName || this.currentSequenceName === '') {
            return;
        }
        if (this.controller) {
            this.controller.update(deltaTime);
        }
        var animSequenceEntry = this.animationSequence[this.currentSequenceName];
        if (animSequenceEntry && animSequenceEntry.sequence) {
            this.currentSequence = animSequenceEntry.sequence;
            this.currentX += (this.directionX * this.velocityX) * deltaTime;
            this.currentY += (this.directionY * this.velocityY) * deltaTime;
            this.currentSequence.visible = this.currentVisible;
            this.currentSequence.loop = this.currentLoop;
            this.currentSequence.x = this.currentX;
            this.currentSequence.y = this.currentY;
            // this.currentSequence.scale.x = this.scaleX;
            // this.currentSequence.scale.y = this.scaleY;
            this.currentSequence.rotation = this.rotation;
            this.currentSequence.animationSpeed = this.animSpeed;
            this.currentSequence.anchor.set(this.animAnchor);
            if (this.flipState) {
                this.currentSequence.scale.x *= -1;
            }
            else {
                this.currentSequence.scale.y *= -1;
            }
            if (this.tint !== 0) {
                this.currentSequence.tint = this.tint;
            }
        }
    };
    /**
     * @name onCollision
     * @description trigged when this anim collides with another anim
     * @param {Anim} anim - anim with which collision has occured
     * @return {void}
     */
    Anim.prototype.onCollision = function (anim) {
        this.animCollisionWith = anim;
        if (this.controller) {
            this.controller.hitBy(anim);
        }
    };
    /**
     * @name clearCollision
     * @description clear collision event
     * @return {void}
     */
    Anim.prototype.clearCollision = function () {
        this.animCollisionWith = undefined;
    };
    /**
     * @name destroy
     * @description destroys anim and all sequences
     * @return {void}
     */
    Anim.prototype.destroy = function () {
        var _this = this;
        if (this.controller) {
            this.controller.destroy();
        }
        Object.keys(this.animationSequence).forEach(function (name) {
            var sequence = _this.animationSequence[name].sequence;
            sequence.visible = false;
            sequence.destroy({
                children: true,
                texture: false,
                baseTexture: false
            });
        });
        this.currentSequenceName = '';
    };
    return Anim;
}());
exports.Anim = Anim;
//# sourceMappingURL=Anim.js.map