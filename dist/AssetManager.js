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
var Sprite_1 = require("./Sprite");
var AnimatedSprite_1 = require("./AnimatedSprite");
var TextSprite_1 = require("./TextSprite");
var SoundManager_1 = require("./SoundManager");
var Math_1 = require("./Math");
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
            var _dict_1 = Utils_1.Utils.mergeObjects({}, data._dict);
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
     * @name setValue
     * @description set the value of a field accounting for undefined and default value
     * @param {any} item - item to set
     * @param {any} value - value to set to
     * @param {any} defaultValue - default value
     * @return {void}
     */
    AssetManager.prototype.setValue = function (item, value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        if (value !== undefined) {
            item = value;
        }
        else if (defaultValue !== undefined) {
            item = defaultValue;
        }
    };
    /**
     * @name setValues
     * @description set multiple values on target object
     * @param {any} target - target object
     * @param {any} source - source object
     * @return {void}
     */
    AssetManager.prototype.setValues = function (target, source) {
        target.attribs.add(source.type);
        this.setValue(target.x, source.x);
        this.setValue(target.y, source.y);
        this.setValue(target.z, source.z, 0);
        this.setValue(target.dx, source.dx, 0);
        this.setValue(target.dy, source.dy, 0);
        this.setValue(target.vx, source.vx, 0);
        this.setValue(target.vy, source.vy, 0);
        this.setValue(target.subType, source.subType);
        this.setValue(target.visible, source.visible, true);
        this.setValue(target.visible, source.visible, true);
        this.setValue(target.health, source.health, 100);
        this.setValue(target.visible, source.visible, true);
        this.setValue(target.strength, source.strength, 0);
        this.setValue(target.visible, source.visible, true);
        this.setValue(target.collisionDetection, source.collisionDetection, false);
        this.setValue(target.alpha, source.alpha);
        if (source.tint) {
            target.tint = parseInt(source.tint, 16);
        }
        if (source.rotation) {
            if (source.rotation === 'random') {
                target.rotation = Math_1.Angle.randomAngle();
            }
            else {
                target.rotation = source.rotation || 0;
            }
        }
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
                obj = Utils_1.Utils.mergeObjects(this.gameConfig.refs[obj.extends], obj);
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
                case 'sprite':
                    this.createSprite(scene, obj);
                    break;
                case 'animatedsprite':
                    this.createAnimatedSprite(scene, obj);
                    break;
                case 'text':
                    {
                        var textSprite = new TextSprite_1.TextSprite(scene, obj.text, obj.fontInfo);
                        this.setValues(textSprite, obj);
                        scene.addSpriteAnim(obj.name, textSprite);
                    }
                    break;
                case 'ground':
                    {
                        var animatedSprite = new AnimatedSprite_1.AnimatedSprite(scene, obj.sequence, obj.atlas, this.resources);
                        animatedSprite.attribs.add(obj.type);
                        this.setValues(animatedSprite, obj);
                        this.setValue(animatedSprite.anchor.x, obj.ax, 0.5);
                        this.setValue(animatedSprite.anchor.y, obj.ay, 0.5);
                        this.setValue(animatedSprite.loop, obj.loop, false);
                        if (obj.frame !== undefined) {
                            animatedSprite.gotoAndPlay(obj.frame);
                        }
                        else {
                            animatedSprite.play();
                        }
                        scene.addSpriteAnim(obj.name, animatedSprite);
                    }
                    break;
            }
        }
        scene.sortAnims();
        postPopulateHandler(this.resources);
    };
    /**
     * @name createAnimatedSprite
     * @description create an animated sprite character
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    AssetManager.prototype.createAnimatedSprite = function (scene, obj) {
        var count = (obj.count) ? obj.count : 1;
        for (var i = 0; i < count; i++) {
            var newName = (count === 1) ? "" + obj.name : "" + obj.name + i;
            var animatedSprite = new AnimatedSprite_1.AnimatedSprite(scene, obj.sequence, obj.atlas, this.resources);
            animatedSprite.attribs.add(obj.type);
            this.setValues(animatedSprite, obj);
            this.setValue(animatedSprite.scale.x, obj.sx, 1);
            this.setValue(animatedSprite.scale.y, obj.sy, 1);
            this.setValue(animatedSprite.anchor.x, obj.ax, 0.5);
            this.setValue(animatedSprite.anchor.y, obj.ay, 0.5);
            this.setValue(animatedSprite.loop, obj.loop, false);
            if (obj.frame !== undefined) {
                animatedSprite.gotoAndPlay(obj.frame);
            }
            else {
                animatedSprite.play();
            }
            scene.addSpriteAnim(newName, animatedSprite);
        }
    };
    /**
     * @name createSprite
     * @description create a sprite
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    AssetManager.prototype.createSprite = function (scene, obj) {
        var count = (obj.count) ? obj.count : 1;
        for (var i = 0; i < count; i++) {
            var newName = (count === 1) ? "" + obj.name : "" + obj.name + i;
            var sprite = new Sprite_1.Sprite(scene, obj.name, this.resources[obj.atlas]);
            this.setValues(sprite, obj);
            this.setValue(sprite.scale.x, obj.sx, 1);
            this.setValue(sprite.scale.y, obj.sy, 1);
            this.setValue(sprite.anchor.x, obj.ax, 0.5);
            this.setValue(sprite.anchor.y, obj.ay, 0.5);
            scene.addSpriteAnim(newName, sprite);
        }
    };
    return AssetManager;
}());
exports.AssetManager = AssetManager;
//# sourceMappingURL=AssetManager.js.map