"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js"));
var Image_1 = require("./Image");
var Anim_1 = require("./Anim");
var BackgroundTile_1 = require("./BackgroundTile");
var TextSprite_1 = require("./TextSprite");
var SoundManager_1 = require("./SoundManager");
;
var AssetManager = /** @class */ (function () {
    /**
     * @name constructor
     * @description asset manager init
     */
    function AssetManager() {
        this.gameConfig = {};
        this.loader = new PIXI.loaders.Loader();
        this.soundManager = undefined;
    }
    /**
     * @name init
     * @description initialize loader
     */
    AssetManager.prototype.init = function (filename, initComplete) {
        var _this = this;
        this.loader.add(filename);
        this.loader.load(function (_loader, resources) {
            _this.gameConfig = resources[filename].data;
            for (var _i = 0, _a = _this.gameConfig.assets; _i < _a.length; _i++) {
                var asset = _a[_i];
                _this.loader.add(asset);
            }
            _this.loader.load(function (_loader, resources) {
                _this.resources = resources;
                initComplete(_this.resources);
            });
        });
    };
    /**
     * @name getSoundEngine
     * @description get sound engine
     * @return {SoundManager | undefined}
     */
    AssetManager.prototype.getSoundEngine = function () {
        if (this.soundManager) {
            return this.soundManager;
        }
        return undefined;
    };
    /**
     * @name populateScene
     * @description populate Scene with resources
     * @param {Scene} scene - scene reference
     * @param {string} sceneName - name of scene
     * @param {ICallback} postPopulateHandler - completion callback
     * @return {void}
     */
    AssetManager.prototype.populateScene = function (scene, sceneName, postPopulateHandler) {
        scene.attachTexts(this.gameConfig.texts);
        var sceneData = this.gameConfig.scenes[sceneName];
        var objectList = sceneData.objects;
        for (var _i = 0, _a = objectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.extends) {
                obj = this.mergeObjects(this.gameConfig.refs[obj.extends], obj);
            }
            switch (obj.type) {
                case 'sounds':
                    if (!this.soundManager) {
                        this.soundManager = new SoundManager_1.SoundManager(this.resources[obj.atlas].data);
                        this.soundManager.volume = obj.volume;
                    }
                    scene.attachSoundManager(this.soundManager);
                    break;
                case 'image':
                    {
                        var image = new Image_1.Image(scene, obj.name, this.resources[obj.atlas]);
                        image.type = obj.type;
                        image.x = obj.x;
                        image.y = obj.y;
                        image.z = obj.z;
                        image.visible = obj.visible || false;
                        if (obj.tint) {
                            image.tint = parseInt(obj.tint, 16);
                        }
                        scene.addAnim(obj.name, image);
                    }
                    break;
                case 'tile':
                    {
                        var backgroundTile = new BackgroundTile_1.BackgroundTile(scene, obj.file);
                        backgroundTile.type = obj.type;
                        backgroundTile.flip(obj.flip || false);
                        if (obj.tint) {
                            backgroundTile.setTint(parseInt(obj.tint, 16));
                        }
                        backgroundTile.sx = obj.sx || 1;
                        backgroundTile.sy = obj.sy || 1;
                        scene.addAnim(obj.name, backgroundTile);
                    }
                    break;
                case 'text':
                    {
                        var textSprite = new TextSprite_1.TextSprite(scene, obj.text, obj.fontInfo);
                        textSprite.type = obj.type;
                        textSprite.x = obj.x;
                        textSprite.y = obj.y;
                        textSprite.z = obj.z;
                        if (obj.tint) {
                            textSprite.setTint(parseInt(obj.tint, 16));
                        }
                        scene.addAnim(obj.name, textSprite);
                    }
                    break;
                case 'character':
                    {
                        var anim = new Anim_1.Anim(scene);
                        anim.loadSequence(obj.sequence, obj.atlas, this.resources);
                        anim.type = obj.type;
                        anim.x = obj.x;
                        anim.y = obj.y;
                        anim.z = obj.z;
                        anim.vx = obj.vx || 0;
                        anim.vy = obj.vy || 0;
                        anim.dx = obj.dx || 0;
                        anim.dy = obj.dy || 0;
                        anim.sx = obj.sx || 1;
                        anim.sy = obj.sy || 1;
                        anim.loop = obj.loop;
                        anim.rotation = obj.rotation || 0;
                        anim.visible = obj.visible || false;
                        anim.health = obj.health;
                        anim.strength = obj.strength;
                        anim.collisionDetection = obj.collisionDetection;
                        anim.play(obj.sequence);
                        if (obj.frame !== undefined) {
                            anim.setFrame(obj.frame);
                        }
                        if (obj.animationSpeed !== undefined) {
                            anim.animationSpeed = obj.animationSpeed;
                        }
                        if (obj.tint) {
                            anim.setTint(parseInt(obj.tint, 16));
                        }
                        scene.addAnim(obj.name, anim);
                    }
                    break;
                case 'ground':
                    {
                        var anim = new Anim_1.Anim(scene);
                        anim.loadSequence(obj.sequence, obj.atlas, this.resources);
                        anim.type = obj.type;
                        anim.x = obj.x;
                        anim.y = obj.y;
                        anim.z = obj.z;
                        anim.sx = obj.sx || 1;
                        anim.sy = obj.sy || 1;
                        anim.rotation = obj.rotation;
                        anim.collisionDetection = obj.collisionDetection;
                        anim.loop = obj.loop;
                        if (obj.tint) {
                            anim.setTint(parseInt(obj.tint, 16));
                        }
                        anim.play(obj.sequence);
                        anim.setFrame(obj.frame);
                        scene.addAnim(obj.name, anim);
                    }
                    break;
            }
        }
        scene.sortAnims();
        postPopulateHandler(this.resources);
    };
    /**
     * @name mergeObjects
     * @description merge objects. used as an ES5 replacement for the unavailable Object.assign
     * @return {object} returns merged object
     */
    AssetManager.prototype.mergeObjects = function (arg1, arg2, arg3) {
        var resObj = {};
        for (var i = 0; i < arguments.length; i += 1) {
            var obj = arguments[i];
            var keys = Object.keys(obj);
            for (var j = 0; j < keys.length; j += 1) {
                resObj[keys[j]] = obj[keys[j]];
            }
        }
        return resObj;
    };
    return AssetManager;
}());
exports.AssetManager = AssetManager;
//# sourceMappingURL=AssetManager.js.map