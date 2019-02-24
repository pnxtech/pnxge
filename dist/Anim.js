"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatedSprite_1 = require("./AnimatedSprite");
var Math_1 = require("./Math");
var Attribs_1 = require("./Attribs");
var Utils_1 = require("./Utils");
;
;
/**
 * @name Anim
 * @description Phoenix Game Engine Anim class
 */
var Anim = /** @class */ (function () {
    //#endregion
    /**
     * @name constructor
     * @description binds Anim to Scene
     */
    function Anim(scene) {
        this._id = (new Utils_1.Utils()).createID();
        this._subType = '';
        this.animationSequence = {};
        this.lastSequenceName = '';
        this.currentSequenceName = '';
        this._z = 0;
        this._health = 0;
        this._strength = 0;
        this._dx = 0;
        this._dy = 0;
        this._vx = 0;
        this._vy = 0;
        this.currentCollisionDetection = false;
        this.scene = scene;
        this.stage = scene.stage;
        this.attributes = new Attribs_1.Attribs();
        this.internalRect = new Math_1.Rect(0, 0, 0, 0);
        this._id = (new Utils_1.Utils()).createID();
    }
    Object.defineProperty(Anim.prototype, "id", {
        /**
         * @name id
         * @description get anin id
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    Anim.prototype.attachController = function (controller) {
        this.controller = controller;
    };
    /**
     * @name setCacheAsBitmap
     * @description set cache as bitmap optimization. Should not be used when animation is intended.
     * @param {boolean} cache - true if yes cache, else false
     * @return {void}
     */
    Anim.prototype.setCacheAsBitmap = function (cache) {
        this.currentSequence && (this.currentSequence.cacheAsBitmap = cache);
    };
    Object.defineProperty(Anim.prototype, "x", {
        /**
         * @name x
         * @description x position getter
         * @return {number} x position
         */
        get: function () {
            return (this.currentSequence) ? this.currentSequence.x : 0;
        },
        /**
         * @name x
         * @description x position setter
         */
        set: function (x) {
            if (this.currentSequence) {
                this.currentSequence.x = x;
                this.internalRect.x = x;
            }
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
            return (this.currentSequence) ? this.currentSequence.y : 0;
        },
        /**
         * @name y
         * @description y position setter
         */
        set: function (y) {
            if (this.currentSequence) {
                this.currentSequence.y = y;
                this.internalRect.y = y;
            }
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
    Object.defineProperty(Anim.prototype, "rect", {
        /**
         * @name rect
         * @description rect getter
         * @return {Rect} rect object from anim
         */
        get: function () {
            return this.internalRect;
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
            return (this.currentSequence) ? this.currentSequence.visible : false;
        },
        /**
         * @name visible
         * @description set visibility
         */
        set: function (value) {
            this.currentSequence && (this.currentSequence.visible = value);
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
            return (this.currentSequence) ? this.currentSequence.width : 0;
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
            return (this.currentSequence) ? this.currentSequence.height : 0;
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
            return (this.currentSequence) ? this.currentSequence.rotation : 0;
        },
        /**
         * @name rotation
         * @description rotation setter
         */
        set: function (value) {
            this.currentSequence && (this.currentSequence.rotation = value);
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
            return this.currentSequence ? this.currentSequence.animationSpeed : 1;
        },
        /**
         * @name animationSpeed
         * @description animationSpeed setter
         */
        set: function (speed) {
            this.currentSequence && (this.currentSequence.animationSpeed = speed);
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
            return this._strength;
        },
        /**
         * @name strength
         * @description set current strength
         * @param {number} value - strength
         */
        set: function (value) {
            this._strength = value;
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
            return this._health;
        },
        /**
         * @name health
         * @description set current health
         * @param {number} value - health
         */
        set: function (value) {
            this._health = value;
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
            return (this.currentSequence) ? this.currentSequence.scale.x : 0;
        },
        /**
         * @name sx
         * @description set anim scale x
         */
        set: function (value) {
            if (this.currentSequence) {
                this.currentSequence.scale.x = value;
                this.internalRect.width = this.currentSequence.width;
            }
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
            return (this.currentSequence) ? this.currentSequence.scale.y : 0;
        },
        /**
         * @name sy
         * @description set anim scale y
         */
        set: function (value) {
            if (this.currentSequence) {
                this.currentSequence.scale.y = value;
                this.internalRect.height = this.currentSequence.height;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "alpha", {
        /**
         * @name alpha
         * @description alpha getter
         * @return {number} alpha value
         */
        get: function () {
            return (this.currentSequence) ? this.currentSequence.alpha : 0;
        },
        /**
         * @name alpha
         * @description alpha setter
         */
        set: function (value) {
            this.currentSequence && (this.currentSequence.alpha = value);
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
            return (this.currentSequence) ? this.currentSequence.anchor.x : 0;
        },
        /**
         * @name anchor
         * @description anchor setter
         */
        set: function (value) {
            this.currentSequence && (this.currentSequence.anchor.set(value));
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
    Object.defineProperty(Anim.prototype, "dy", {
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
    Object.defineProperty(Anim.prototype, "vx", {
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
    Object.defineProperty(Anim.prototype, "vy", {
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
    Object.defineProperty(Anim.prototype, "loop", {
        /**
         * @name loop
         * @description get animation loop state
         * @return {boolean}
         */
        get: function () {
            return (this.currentSequence) ? this.currentSequence.loop : false;
        },
        /**
         * @name loop
         * @description set animation loop state
         */
        set: function (value) {
            this.currentSequence && (this.currentSequence.loop = value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "attribs", {
        /**
         * @name get Attribs
         * @description get attribs bag
         * @return {Attribs} attribs bag
         */
        get: function () {
            return this.attributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Anim.prototype, "subType", {
        /**
         * @name subType
         * @description subType getter
         * @return {string} subType
         */
        get: function () {
            return this._subType;
        },
        /**
         * @name subType
         * @description subType setter
         * @return {void}
         */
        set: function (value) {
            this._subType = value;
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
     * @name setTint
     * @description set tint
     * @param {number} color - color tint
     * @return {void}
     */
    Anim.prototype.setTint = function (color) {
        this.currentSequence && (this.currentSequence.tint = color);
    };
    /**
     * @name reset
     * @description reset anim - in cases where this anim is reused
     * @return {void}
     */
    Anim.prototype.reset = function () {
        this._id = (new Utils_1.Utils()).createID();
        if (this.currentSequence) {
            this.currentSequence.loop = false;
            this.currentSequence.anchor.set(0.5);
        }
        this.currentCollisionDetection = false;
        this.animCollisionWith = undefined;
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
            this.currentSequenceName = name;
            this.currentSequence = sequence;
            this.reset();
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
        this.currentSequence && (this.currentSequence.gotoAndPlay(0));
    };
    /**
     * @name setFrame
     * @description set the frame of the current animation sequence
     * @param {number} frameNumber - frame number
     * @return {void}
     */
    Anim.prototype.setFrame = function (frameNumber) {
        this.currentSequence && (this.currentSequence.gotoAndStop(frameNumber));
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
        if (!this.currentSequenceName || this.currentSequenceName === '') {
            return;
        }
        if (this.controller) {
            this.controller.update(deltaTime);
        }
        if (this.currentSequence) {
            this.currentSequence.x += this._dx * (this._vx || 1) * deltaTime;
            this.currentSequence.y += this._dy * (this._vy || 1) * deltaTime;
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
        this.controller && (this.controller.hitBy(anim));
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
        this.controller && (this.controller.destroy());
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