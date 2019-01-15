import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {Image} from './Image';
import {Anim} from './Anim';
import {BackgroundTile} from './BackgroundTile';
import {TextSprite} from './TextSprite';
import {SoundManager} from './SoundManager';

interface ICallback { (resources: {}): void };

export class AssetManager {
  private loader: PIXI.loaders.Loader;
  private gameConfig: any = {};
  private resources: any;
  private soundManager: SoundManager | undefined;

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
  init(filename: string, initComplete: ICallback): void {
    this.loader.add(filename);
    this.loader.load((_loader: PIXI.loaders.Loader, resources: any) => {
      this.gameConfig = resources[filename].data;
      for (let asset of this.gameConfig.assets) {
        this.loader.add(asset);
      }
      this.loader.load((_loader: PIXI.loaders.Loader, resources: any) => {
        this.resources = resources;
        initComplete(this.resources);
      });
    });
  }

  /**
   * @name getSoundEngine
   * @description get sound engine
   * @return {SoundManager | undefined}
   */
  getSoundEngine(): SoundManager | undefined {
    if (this.soundManager) {
      return this.soundManager;
    }
    return undefined;
  }

  /**
   * @name populateScene
   * @description populate Scene with resources
   * @param {Scene} scene - scene reference
   * @param {string} sceneName - name of scene
   * @param {ICallback} postPopulateHandler - completion callback
   * @return {void}
   */
  populateScene(scene: Scene, sceneName: string, postPopulateHandler: ICallback): void {
    scene.attachTexts(this.gameConfig.texts);
    let sceneData = this.gameConfig.scenes[sceneName];
    let objectList = sceneData.objects;
    for (let obj of <any>objectList) {
      if (obj.extends) {
        obj = this.mergeObjects(this.gameConfig.refs[obj.extends], obj);
      }
      switch (obj.type) {
        case 'actions':
          scene.attachActions(obj.actions);
          break;
        case 'sounds':
          if (!this.soundManager) {
            this.soundManager = new SoundManager(this.resources[obj.atlas].data);
            this.soundManager.volume = obj.volume;
          }
          scene.attachSoundManager(this.soundManager);
          break;
        case 'image': {
            let image = new Image(scene, obj.name, this.resources[obj.atlas]);
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
        case 'tile':{
            let backgroundTile = new BackgroundTile(scene, obj.file);
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
        case 'text': {
            let textSprite = new TextSprite(scene, obj.text, obj.fontInfo);
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
          this.createCharacter(scene, obj);
          break;
        case 'ground': {
            let anim = new Anim(scene);
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
  }

  /**
   * @name mergeObjects
   * @description merge objects. used as an ES5 replacement for the unavailable Object.assign
   * @return {object} returns merged object
   */
  mergeObjects(arg1: {}, arg2: {}, arg3?: {}): object {
    let resObj: any = {};
    for (let i=0; i < arguments.length; i += 1) {
      let obj = arguments[i];
      let keys = Object.keys(obj);
      for (let j = 0; j < keys.length; j += 1) {
          resObj[keys[j]] = obj[keys[j]];
      }
    }
    return resObj;
  }

  /**
   * @name createCharacter
   * @description create an anim character
   * @param {Scene} scene
   * @param {object} obj
   * @return {void}
   */
  createCharacter(scene: Scene, obj: any): void {
    let count = (obj.count) ? obj.count : 1;
    for (let i = 0; i < count; i++) {
      let newName = (count === 1) ? `${obj.name}` : `${obj.name}${i}`;
      let anim = new Anim(scene);
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
      scene.addAnim(newName, anim);
    }
  }
}
