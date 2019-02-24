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
var Math_1 = require("./Math");
var Anim_1 = require("./Anim");
var BackgroundTile_1 = require("./BackgroundTile");
var TextSprite_1 = require("./TextSprite");
var SoundManager_1 = require("./SoundManager");
var Utils_1 = require("./Utils");
;
var AssetManager = /** @class */ (function () {
    //#endregion
    /**
     * @name constructor
     * @description asset manager init
     */
    function AssetManager() {
        this.gameConfig = {};
        this.loader = new PIXI.loaders.Loader();
        this.soundManager = undefined;
        this.utils = new Utils_1.Utils();
        this.angle = new Math_1.Angle();
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
            if (_this.gameConfig._dict) {
                _this.gameConfig = _this.unpack(_this.gameConfig);
                resources[filename].data = _this.gameConfig;
            }
            for (var _i = 0, _a = _this.gameConfig.assets; _i < _a.length; _i++) {
                var asset = _a[_i];
                _this.loader.add(asset);
            }
            _this.loader.use(function (resource, next) {
                if (resource.extension === 'json' && resource.data._dict) {
                    resource.data = _this.unpack(resource.data);
                }
                next();
            });
            _this.loader.load(function (_loader, resources) {
                _this.resources = resources;
                initComplete(_this.resources);
            });
        });
    };
    /**
     * @name unpack
     * @description uncompresses stringified JSON that was compressed with the compress method.
     * @note see https://github.com/cjus/simple-json-pack#readme string replace implementation
     * is faster than the array/split/join method: https://jsperf.com/fastest-string-replace
     * @param {any} data - JS object
     * @return {any} uncompressed JS object
     */
    AssetManager.prototype.unpack = function (data) {
        var strData = '';
        if (data._dict) {
            var _dict_1 = this.utils.mergeObjects({}, data._dict);
            delete data._dict;
            strData = JSON.stringify(data);
            Object.keys(_dict_1).forEach(function (key) {
                var searchPattern = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                strData = strData.replace(new RegExp("\"" + searchPattern + "\"", 'g'), "\"" + _dict_1[key] + "\"");
            });
        }
        return (strData.length) ? JSON.parse(strData) : data;
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
        if (this.gameConfig.texts) {
            scene.setState({
                texts: this.gameConfig.texts
            });
        }
        var sceneData = this.gameConfig.scenes[sceneName];
        var objectList = sceneData.objects;
        for (var _i = 0, _a = objectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.extends) {
                obj = this.utils.mergeObjects(this.gameConfig.refs[obj.extends], obj);
            }
            switch (obj.type) {
                case 'data':
                    delete obj.type;
                    scene.setState(obj);
                    break;
                case 'actions':
                    scene.setState({
                        actions: obj.actions
                    });
                    break;
                case 'sounds':
                    if (!this.soundManager) {
                        this.soundManager = new SoundManager_1.SoundManager(this.resources[obj.atlas].data);
                        this.soundManager.volume = obj.volume;
                    }
                    scene.attachSoundManager(this.soundManager);
                    break;
                case 'image':
                    this.createImage(scene, obj);
                    break;
                case 'tile':
                    {
                        var backgroundTile = new BackgroundTile_1.BackgroundTile(scene, obj.file);
                        backgroundTile.attribs.add(obj.type);
                        backgroundTile.flip(obj.flip || false);
                        if (obj.tint) {
                            backgroundTile.setTint(parseInt(obj.tint, 16));
                        }
                        if (obj.visible === true || obj.visible === false) {
                            backgroundTile.visible = obj.visible;
                        }
                        else {
                            backgroundTile.visible = true;
                        }
                        backgroundTile.sx = obj.sx || 1;
                        backgroundTile.sy = obj.sy || 1;
                        backgroundTile.visible = obj.visible || true;
                        if (obj.subType) {
                            backgroundTile.subType = obj.subType;
                        }
                        if (obj.attribs) {
                            backgroundTile.attribs.add(obj.attribs);
                        }
                        scene.addAnim(obj.name, backgroundTile);
                    }
                    break;
                case 'text':
                    {
                        var textSprite = new TextSprite_1.TextSprite(scene, obj.text, obj.fontInfo);
                        textSprite.attribs.add(obj.type);
                        textSprite.x = obj.x;
                        textSprite.y = obj.y;
                        textSprite.z = obj.z;
                        if (obj.subType) {
                            textSprite.subType = obj.subType;
                        }
                        if (obj.visible === true || obj.visible === false) {
                            textSprite.visible = obj.visible;
                        }
                        else {
                            textSprite.visible = true;
                        }
                        if (obj.attribs) {
                            textSprite.attribs.add(obj.attribs);
                        }
                        if (obj.alpha) {
                            textSprite.alpha = obj.alpha;
                        }
                        if (obj.tint) {
                            textSprite.setTint(parseInt(obj.tint, 16));
                        }
                        scene.addAnim(obj.name, textSprite);
                    }
                    break;
                case 'character':
                    this.createCharacter(scene, obj);
                    break;
                case 'ground':
                    {
                        var anim = new Anim_1.Anim(scene);
                        anim.loadSequence(obj.sequence, obj.atlas, this.resources);
                        anim.attribs.add(obj.type);
                        anim.x = obj.x;
                        anim.y = obj.y;
                        anim.z = obj.z;
                        anim.vx = obj.vx || 0;
                        anim.vy = obj.vy || 0;
                        anim.dx = obj.dx || 0;
                        anim.dy = obj.dy || 0;
                        anim.sx = obj.sx || 1;
                        anim.sy = obj.sy || 1;
                        if (obj.subType) {
                            anim.subType = obj.subType;
                        }
                        if (obj.attribs) {
                            anim.attribs.add(obj.attribs);
                        }
                        if (obj.alpha) {
                            anim.alpha = obj.alpha;
                        }
                        anim.health = obj.health;
                        anim.strength = obj.strength;
                        if (obj.rotation) {
                            if (obj.rotation === 'random') {
                                anim.rotation = this.angle.randomAngle();
                            }
                            else {
                                anim.rotation = obj.rotation || 0;
                            }
                        }
                        anim.collisionDetection = obj.collisionDetection;
                        if (obj.visible === true || obj.visible === false) {
                            anim.visible = obj.visible;
                        }
                        else {
                            anim.visible = true;
                        }
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
     * @name createCharacter
     * @description create an anim character
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    AssetManager.prototype.createCharacter = function (scene, obj) {
        var count = (obj.count) ? obj.count : 1;
        for (var i = 0; i < count; i++) {
            var newName = (count === 1) ? "" + obj.name : "" + obj.name + i;
            var anim = new Anim_1.Anim(scene);
            anim.loadSequence(obj.sequence, obj.atlas, this.resources);
            anim.attribs.add(obj.type);
            anim.x = obj.x;
            anim.y = obj.y;
            anim.z = obj.z;
            anim.vx = obj.vx || 0;
            anim.vy = obj.vy || 0;
            anim.dx = obj.dx || 0;
            anim.dy = obj.dy || 0;
            anim.sx = obj.sx || 1;
            anim.sy = obj.sy || 1;
            if (obj.subType) {
                anim.subType = obj.subType;
            }
            if (obj.attribs) {
                anim.attribs.add(obj.attribs);
            }
            if (obj.alpha) {
                anim.alpha = obj.alpha;
            }
            anim.loop = obj.loop;
            if (obj.rotation) {
                if (obj.rotation === 'random') {
                    anim.rotation = this.angle.randomAngle();
                }
                else {
                    anim.rotation = obj.rotation || 0;
                }
            }
            if (obj.visible === true || obj.visible === false) {
                anim.visible = obj.visible;
            }
            else {
                anim.visible = true;
            }
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
            scene.addAnim(newName, anim);
        }
    };
    /**
     * @name createImage
     * @description create an image
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    AssetManager.prototype.createImage = function (scene, obj) {
        var count = (obj.count) ? obj.count : 1;
        for (var i = 0; i < count; i++) {
            var newName = (count === 1) ? "" + obj.name : "" + obj.name + i;
            var image = new Image_1.Image(scene, obj.name, this.resources[obj.atlas]);
            image.attribs.add(obj.type);
            image.x = obj.x;
            image.y = obj.y;
            image.z = obj.z;
            if (obj.rotation) {
                if (obj.rotation === 'random') {
                    image.rotation = this.angle.randomAngle();
                }
                else {
                    image.rotation = obj.rotation || 0;
                }
            }
            if (obj.subType) {
                image.subType = obj.subType;
            }
            if (obj.alpha) {
                image.alpha = obj.alpha;
            }
            if (obj.anchor) {
                image.setAnchor(obj.anchor);
            }
            if (obj.attribs) {
                image.attribs.add(obj.attribs);
            }
            if (obj.visible === true || obj.visible === false) {
                image.visible = obj.visible;
            }
            else {
                image.visible = true;
            }
            if (obj.tint) {
                image.tint = parseInt(obj.tint, 16);
            }
            scene.addAnim(newName, image);
        }
    };
    return AssetManager;
}());
exports.AssetManager = AssetManager;
//# sourceMappingURL=AssetManager.js.map