import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {Sprite} from './Sprite';
import {AnimatedSprite} from './AnimatedSprite';
import {TextSprite} from './TextSprite';
import {SoundManager} from './SoundManager';
import {Angle} from './Math';
import {Utils} from './Utils';

interface ICallback { (resources: {}): void };

export class AssetManager {
  //#region variables
  private loader: PIXI.loaders.Loader;
  private gameConfig: any = {};
  private resources: any;
  private soundManager: SoundManager | undefined;
  //#endregion

  /**
   * @name constructor
   * @description asset manager init
   */
  constructor() {
    this.loader = new PIXI.loaders.Loader();
    this.soundManager = undefined;
  }

  /**
   * @name init
   * @description initialize loader
   */
  public init(filename: string, initComplete: ICallback): void {
    this.loader.add(filename);
    this.loader.load((_loader: PIXI.loaders.Loader, resources: any) => {
      this.gameConfig = resources[filename].data;
      if (this.gameConfig._dict) {
        this.gameConfig = this.unpack(this.gameConfig);
        resources[filename].data = this.gameConfig;
      }
      for (let asset of this.gameConfig.assets) {
        this.loader.add(asset);
      }
      this.loader.use((resource: any, next: any) => {
        if (resource.extension === 'json' && resource.data._dict) {
          resource.data = this.unpack(resource.data);
        }
        next();
      });
      this.loader.load((_loader: PIXI.loaders.Loader, resources: any) => {
        this.resources = resources;
        initComplete(this.resources);
      });
    });
  }

  /**
   * @name unpack
   * @description uncompresses stringified JSON that was compressed with the compress method.
   * @note see https://github.com/cjus/simple-json-pack#readme string replace implementation
   * is faster than the array/split/join method: https://jsperf.com/fastest-string-replace
   * @param {any} data - JS object
   * @return {any} uncompressed JS object
   */
  public unpack(data: any): any {
    let strData: string = '';
    if (data._dict) {
      let _dict: any = Utils.mergeObjects({}, data._dict);
      delete data._dict;
      strData = JSON.stringify(data);
      Object.keys(_dict).forEach((key) => {
        let searchPattern = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        strData = strData.replace(new RegExp(`"${searchPattern}"`, 'g'), `"${_dict[key]}"`);
      });
    }
    return (strData.length) ? JSON.parse(strData) : data;
  }

  /**
   * @name getSoundEngine
   * @description get sound engine
   * @return {SoundManager | undefined}
   */
  public getSoundEngine(): SoundManager | undefined {
    if (this.soundManager) {
      return this.soundManager;
    }
    return undefined;
  }

  /**
   * @name setValues
   * @description set multiple values on target object
   * @param {any} target - target object
   * @param {any} source - source object
   * @return {void}
   */
  protected setValues(target: any, source: any): void {
    target.attribs.add([source.type, source.subType, source.name]);
    target.x = (source.x !== undefined) ? source.x : 0;
    target.y = (source.y !== undefined) ? source.y : 0;
    target.z = (source.z !== undefined) ? source.z : 0;
    target.dx = (source.dx !== undefined) ? source.dx : 0;
    target.dy = (source.dy !== undefined) ? source.dy : 0;
    target.vx = (source.vx !== undefined) ? source.vx : 0;
    target.vy = (source.vy !== undefined) ? source.vy : 0;
    (source.subType !== undefined) && (target.subType = source.subType);
    target.visible = (source.visible !== undefined) ? source.visible : true;
    target.health = (source.health !== undefined) ? source.health : 100;
    target.strength = (source.strength !== undefined) ? source.strength : 0;
    target.collisionDetection = (source.collisionDetection !== undefined) ? source.collisionDetection : false;
    (source.alpha !== undefined) && (target.alpha = source.alpha);
    (source.tint !== undefined) && (target.tint = parseInt(source.tint, 16));
    if (source.rotation) {
      if (source.rotation === 'random') {
        target.rotation = Angle.randomAngle();
      } else {
        target.rotation = source.rotation || 0;
      }
    }
  }

  /**
   * @name populateScene
   * @description populate Scene with resources
   * @param {Scene} scene - scene reference
   * @param {string} sceneName - name of scene
   * @param {ICallback} postPopulateHandler - completion callback
   * @return {void}
   */
  public populateScene(scene: Scene, sceneName: string, postPopulateHandler: ICallback): void {
    if (this.gameConfig.texts) {
      scene.setState({
        texts: this.gameConfig.texts
      });
    }
    let sceneData = this.gameConfig.scenes[sceneName];
    let objectList = sceneData.objects;
    for (let obj of <any>objectList) {
      if (obj.extends) {
        obj = Utils.mergeObjects(this.gameConfig.refs[obj.extends], obj);
      }
      switch (obj.type) {
        case 'data':
          delete obj.type;
          scene.setState(obj);
          break;
        case 'actions':
          scene.setState({
            actions: obj.actions
          })
          break;
        case 'sounds':
          if (!this.soundManager) {
            this.soundManager = new SoundManager(this.resources[obj.atlas].data);
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
        case 'text': {
            let textSprite = new TextSprite(scene, obj.text, obj.fontInfo);
            this.setValues(textSprite, obj);
            scene.addSpriteAnim(obj.name, textSprite);
          }
          break;
        case 'ground': {
            let animatedSprite = new AnimatedSprite(scene, obj.sequence, obj.atlas, this.resources);
            animatedSprite.attribs.add(obj.type);
            this.setValues(animatedSprite, obj);
            animatedSprite.cacheAsBitmap = (obj.cacheAsBitmap !== undefined) ? obj.cacheAsBitmap : false;
            animatedSprite.scale.x = (obj.sx !== undefined) ? obj.sx : 1;
            animatedSprite.scale.y = (obj.sy !== undefined) ? obj.sy : 1;
            animatedSprite.anchor.x = (obj.ax !== undefined) ? obj.ax : 0.5;
            animatedSprite.anchor.y = (obj.ay !== undefined) ? obj.ay : 0.5;
            animatedSprite.loop = (obj.loop !== undefined) ? obj.loop : false;
            (obj.frame !== undefined) ? animatedSprite.gotoAndStop(obj.frame) : animatedSprite.play();
            scene.addSpriteAnim(obj.name, animatedSprite);
          }
          break;
      }
    }
    scene.sortAnims();
    postPopulateHandler(this.resources);
  }

  /**
   * @name createAnimatedSprite
   * @description create an animated sprite character
   * @param {Scene} scene
   * @param {object} obj
   * @return {void}
   */
  public createAnimatedSprite(scene: Scene, obj: any): void {
    let count = (obj.count) ? obj.count : 1;
    for (let i = 0; i < count; i++) {
      let newName = (count === 1) ? `${obj.name}` : `${obj.name}${i}`;
      let animatedSprite = new AnimatedSprite(scene, obj.sequence, obj.atlas, this.resources);
      this.setValues(animatedSprite, obj);
      animatedSprite.cacheAsBitmap = (obj.cacheAsBitmap !== undefined) ? obj.cacheAsBitmap : false;
      animatedSprite.animationSpeed = (obj.animationSpeed !== undefined) ? obj.animationSpeed : 1;
      animatedSprite.scale.x = (obj.sx !== undefined) ? obj.sx : 1;
      animatedSprite.scale.y = (obj.sy !== undefined) ? obj.sy : 1;
      animatedSprite.anchor.x = (obj.ax !== undefined) ? obj.ax : 0.5;
      animatedSprite.anchor.y = (obj.ay !== undefined) ? obj.ay : 0.5;
      animatedSprite.loop = (obj.loop !== undefined) ? obj.loop : false;
      (obj.frame !== undefined) ? animatedSprite.gotoAndStop(obj.frame) : animatedSprite.play();
      scene.addSpriteAnim(newName, animatedSprite);
    }
  }

  /**
   * @name createSprite
   * @description create a sprite
   * @param {Scene} scene
   * @param {object} obj
   * @return {void}
   */
  public createSprite(scene: Scene, obj: any) : void {
    let count = (obj.count) ? obj.count : 1;
    for (let i = 0; i < count; i++) {
      let newName = (count === 1) ? `${obj.name}` : `${obj.name}${i}`;
      let sprite = new Sprite(scene, obj.name, this.resources[obj.atlas]);
      this.setValues(sprite, obj);
      sprite.scale.x = (obj.sx !== undefined) ? obj.sx : 1;
      sprite.scale.y = (obj.sy !== undefined) ? obj.sy : 1;
      sprite.anchor.x = (obj.ax !== undefined) ? obj.ax : 0.5;
      sprite.anchor.y = (obj.ay !== undefined) ? obj.ay : 0.5;
      scene.addSpriteAnim(newName, sprite);
    }
  }
}
