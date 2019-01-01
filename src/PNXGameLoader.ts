import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';
import PNXAnim, { AnimType } from './PNXAnim';
import PNXBackgroundTile from './PNXBackgroundTile';
import PNXTextSprite from './PNXTextSprite';
import PNXSoundManager from './PNXSoundManager';

interface ICallback { (resources: {}): void };
interface ISceneDataHash { [key: string]: {
  type: string,
  objects: []
}};

interface ISceneObjectHash { [key: string]: PNXAnim};

export default class PNXGameLoader {
  private loader: PIXI.loaders.Loader;
  private gameConfig: any = {};
  private parentScene: PNXScene;
  private resources: any;
  private sceneName: string;
  private sceneData: ISceneDataHash = {};
  private sceneObjects: ISceneObjectHash = {};
  private soundManager: PNXSoundManager | undefined;

  /**
   * @name constructor
   * @description game loader
   */
  constructor(scene: PNXScene, sceneName: string) {
    this.loader = new PIXI.loaders.Loader();
    this.sceneName = sceneName;
    this.parentScene = scene;
    this.soundManager = undefined;
  }

 /**
   * @name preload
   * @description preload game assets
   * @param {string} filename - game file name
   * @param {ICallback} postPreLoaderHandler - handler to call on post preload
   * @return {void}
   */
  preload(filename: string, postPreLoaderHandler: ICallback): void {
    this.loader.add(filename);
    this.loader.load((_loader: PIXI.loaders.Loader, resources: any) => {
      this.gameConfig = resources[filename].data;
      this.sceneData = this.gameConfig.scenes[this.sceneName];
      for (let asset of this.gameConfig.assets) {
        this.loader.add(asset);
      }
      this.loader.load((_loader: PIXI.loaders.Loader, resources: any) => {
        this.resources = resources;
        let objectList = this.sceneData.objects;
        for (let obj of <any>objectList) {
          switch (obj.type) {
            case 'sounds':
              if (!this.soundManager) {
                this.soundManager = new PNXSoundManager(this.resources[obj.atlas].data);
                this.soundManager.volume = obj.volume;
              }
              this.parentScene.attachSoundManager(this.soundManager);
              break;
          }
        }
        postPreLoaderHandler(this.resources);
      });
    });
  }

  /**
   * @name load
   * @description load game assets
   * @param {ICallback} postLoaderHandler - handler to call on post load
   * @return {void}
   */
  load(postLoaderHandler: ICallback): void {
    let objectList = this.sceneData.objects;
    for (let obj of <any>objectList) {
      switch (obj.type) {
        case 'tile':
          this.sceneObjects[obj.name] = new PNXBackgroundTile(this.parentScene, obj.file);
          this.sceneObjects[obj.name].type = obj.type;
          this.sceneObjects[obj.name].flip(obj.flip || false);
          if (obj.tint) {
            this.sceneObjects[obj.name].setTint(parseInt(obj.tint, 16));
          }
          this.sceneObjects[obj.name].sx = obj.sx || 1;
          this.sceneObjects[obj.name].sy = obj.sy || 1;
          this.parentScene.addAnim(obj.name, this.sceneObjects[obj.name]);
          break;
        case 'text':
          this.sceneObjects[obj.name] = new PNXTextSprite(this.parentScene, obj.text, obj.fontInfo);
          this.sceneObjects[obj.name].type = obj.type;
          this.sceneObjects[obj.name].x = obj.x;
          this.sceneObjects[obj.name].y = obj.y;
          this.sceneObjects[obj.name].z = obj.z;
          this.parentScene.addAnim(obj.name, this.sceneObjects[obj.name]);
          break;
        case 'character':
          this.sceneObjects[obj.name] = new PNXAnim(this.parentScene);
          this.sceneObjects[obj.name].loadSequence(obj.sequence, obj.atlas, this.resources);
          this.sceneObjects[obj.name].type = obj.type;
          this.sceneObjects[obj.name].x = obj.x;
          this.sceneObjects[obj.name].y = obj.y;
          this.sceneObjects[obj.name].z = obj.z;
          this.sceneObjects[obj.name].vx = obj.vx || 0;
          this.sceneObjects[obj.name].vy = obj.vy || 0;
          this.sceneObjects[obj.name].dx = obj.dx || 0;
          this.sceneObjects[obj.name].dy = obj.dy || 0;
          this.sceneObjects[obj.name].sx = obj.sx || 1;
          this.sceneObjects[obj.name].sy = obj.sy || 1;
          this.sceneObjects[obj.name].loop = obj.loop;
          this.sceneObjects[obj.name].rotation = obj.rotation || 0;
          this.sceneObjects[obj.name].health = obj.health;
          this.sceneObjects[obj.name].strength = obj.strength;
          this.sceneObjects[obj.name].collisionDetection = obj.collisionDetection;
          this.sceneObjects[obj.name].play(obj.sequence);
          if (obj.frame !== undefined) {
            this.sceneObjects[obj.name].setFrame(obj.frame);
          }
          if (obj.animationSpeed !== undefined) {
            this.sceneObjects[obj.name].animationSpeed = obj.animationSpeed;
          }
          if (obj.tint) {
            this.sceneObjects[obj.name].setTint(parseInt(obj.tint, 16));
          }
          this.parentScene.addAnim(obj.name, this.sceneObjects[obj.name]);
          break;
        case 'ground':
          this.sceneObjects[obj.name] = new PNXAnim(this.parentScene);
          this.sceneObjects[obj.name].loadSequence(obj.sequence, obj.atlas, this.resources);
          this.sceneObjects[obj.name].type = obj.type;
          this.sceneObjects[obj.name].x = obj.x;
          this.sceneObjects[obj.name].y = obj.y;
          this.sceneObjects[obj.name].z = obj.z;
          this.sceneObjects[obj.name].sx = obj.sx || 1;
          this.sceneObjects[obj.name].sy = obj.sy || 1;
          this.sceneObjects[obj.name].rotation = obj.rotation;
          this.sceneObjects[obj.name].collisionDetection = obj.collisionDetection;
          this.sceneObjects[obj.name].loop = obj.loop;
          this.sceneObjects[obj.name].play(obj.sequence);
          this.sceneObjects[obj.name].setFrame(obj.frame);
          this.parentScene.addAnim(obj.name, this.sceneObjects[obj.name]);
          break;
      }
    }
    postLoaderHandler(this.resources);
  }
}
