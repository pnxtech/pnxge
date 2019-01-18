import * as PIXI from 'pixi.js';
import {Application} from './Application';
import {Anim} from './Anim';
import {Image} from './Image';
import {IAnimCompatible} from './AnimCompatible';
import {ProjectileManager} from './ProjectileManager';
import {SoundManager} from './SoundManager';
import {TextSprite} from './TextSprite';
import {IRecorderHash} from './Recorder';
import {pcap} from './Math';
import {Benchmark} from './Benchmark';

interface IAnimHash { [key: string]: Anim | Image | TextSprite};
interface IAnimCallback { (anim: Anim | Image | TextSprite): void };
interface IAnimDoneCallback { (): void };

interface ITextsHash { [key: string]: string[]};

/**
 * @name Scene
 * @description Phoenix Game Engine Scene class
 */
export class Scene {
  public app: Application;
  protected sceneWidth: number;
  protected sceneHeight: number;
  protected benchmark: Benchmark = new Benchmark();
  public stage: PIXI.Container;
  public anims: IAnimHash;
  protected internalTick: number = 0;
  protected projectileManager: ProjectileManager | undefined;
  protected soundManager: SoundManager | undefined;
  protected texts: ITextsHash = {};
  protected actionList: IRecorderHash = {};
  private sceneStarted: boolean = false;
  private benchmarkUpdate: boolean = false;

  /**
   * @name constructor
   * @description initialize scene
   * @param {Application} application
   */
  constructor(app: Application) {
    this.app = app;
    this.sceneWidth = app.width;
    this.sceneHeight = app.height;
    this.stage = app.stage;
    this.anims = {};
  }

  /**
   * @name attachProjectileManager
   * @description attach a projectile manager
   * @return {void}
   */
  attachProjectileManager(projectileManager: ProjectileManager): void {
    this.projectileManager = projectileManager;
  }

  /**
   * @name getProjectileManager
   * @description retrieve a projectile manager instance or undefined
   * @return {ProjectileManager | undefined}
   */
  getProjectileManager(): ProjectileManager | undefined {
    return this.projectileManager;
  }

  /**
   * @name attachSoundManager
   * @description attach sound manager
   * @return {void}
   */
  attachSoundManager(soundManager: SoundManager): void {
    this.soundManager = soundManager;
  }

  /**
   * @name attachTexts
   * @description attach asset texts data
   * @param {ITextsHash} texts - texts object
   * @return {void}
   */
  attachTexts(texts: ITextsHash): void {
    this.texts = texts;
  }

  /**
   * @name attachActions
   * @description attach actions
   * @param {IRecorderHash} actionList - output from PNXRecorder
   * @return {void}
   */
  attachActions(actionList: IRecorderHash): void {
    this.actionList = actionList;
  }

  /**
   * @name getSoundManager
   * @description retrieve a sound manager instance or undefined
   * @return {SoundManager | undefined}
   */
  getSoundManager(): SoundManager | undefined {
    return this.soundManager;
  }

  /**
   * @name start
   * @description start scene updates
   * @param {object} resources - loaded asset resources
   * @return {void}
   */
  start(resources: {}): void {
    this.sceneStarted = true;
  }

  /**
   * @name end
   * @description scene end handler
   * @param {string} outcome - result of scene ending
   * @return {void}
   */
  end(outcome: string): void {
    this.sceneStarted = false;
  }

  /**
   * @name hasSceneStarted
   * @description determine whether the scene has been started
   */
  hasSceneStarted(): boolean {
    return this.sceneStarted;
  }

  /**
   * @name benchmarking
   * @description turn benchmarking on or off
   * @note displays via console.log
   * @return {void}
   */
  benchmarking(state: boolean): void {
    this.benchmarkUpdate = state;
  }

  /**
   * @name tick
   * @description get internal tick count
   */
  get tick() {
    return this.internalTick;
  }

  /**
   * @name addAnim
   * @description add an anim to the scene
   * @param {string} name - name of anim
   * @param {Anim | Image | TextSprite} anim - anim objec
   */
  addAnim(name: string, anim: Anim | Image | TextSprite): void {
    this.anims[name] = anim;
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  moveLeft(): void {
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
  }

  /**
   * @name getAnim
   * @description get anim by name
   * @return {TextSprite} anim
   */
  getAnim(name: string): Anim | Image | TextSprite {
    return this.anims[name];
  }

  /**
   * @name width
   * @description get the width of the scene
   * @return {number} width
   */
  get width() : number {
    return this.sceneWidth;
  }

  /**
   * @name height
   * @description get the height of the scene
   * @return {number} height
   */
  get height() : number {
    return this.sceneHeight;
  }

  /**
   * @name forEachAnim
   * @description enumerate anims
   * @param {IAnimCallback} callback - called for each anim
   * @param {IAnimDoneCallback} done - called when done
   * @return {void}
   */
  forEachAnim(callback: IAnimCallback, done: IAnimDoneCallback): void {
    Object.keys(this.anims).forEach((key) => {
      callback(this.anims[key]);
    });
    done();
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    this.benchmark.begin();
    this.internalTick++;
    switch (this.actionList[this.internalTick]) {
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
    }
    if (!this.sceneStarted) {
      return;
    }
    if (this.anims) {
      Object.keys(this.anims).forEach((key) => {
        if (this.anims[key]) {
          this.anims[key].update(deltaTime);
        }
      });
      if (this.projectileManager) {
        this.projectileManager.update(deltaTime);
      }
      this.sortAnims();
      this.collisionDetection();
    }
    if (this.benchmarkUpdate) {
      console.log(`scene benchmark: ${pcap(this.benchmark.elapsed())} ms`);
    }
  }

  /**
   * @name sortAnims
   * @description sort dislay list based on anim z order
   * @return {void}
   */
  sortAnims(): void {
    let objectList: any = this.stage.children;
    objectList.sort((a: IAnimCompatible, b: IAnimCompatible) => {
      if (!a.anim || !b.anim) {
        return 0;
      }
      let first: IAnimCompatible = <IAnimCompatible>a.anim;
      let second: IAnimCompatible = <IAnimCompatible>b.anim;
      return first.z - second.z;
    });
  }

  /**
   * @name collisionDetection
   * @description collision detection system. notifies anim object when they collide with other objects
   * @return {void}
   */
  collisionDetection(): void {
    let objectList: any = this.stage.children;
    for (let obj1 of objectList) {
      if (!obj1.anim || !obj1.anim.collisionDetection || !obj1.anim.visible) {
        continue;
      }
      for (let obj2 of objectList) {
        if (!obj2.anim || !obj2.anim.collisionDetection || !obj2.anim.visible) {
          continue;
        }
        if (obj1.anim.id === obj2.anim.id) {
          continue;
        }
        if (obj1.anim.rect.intersect(obj2.anim.rect)) {
          obj1.anim.onCollision(obj2.anim);
          obj2.anim.onCollision(obj1.anim);
        }
      }
    }
  }

  /**
   * @name lookAhead
   * @description looks ahead for current anim to
   * determine whether it will collide with another
   * anim within the number of steps specified.
   * @note uses the specified anim's direction and velocity vectors
   * @param {Anim} anim - animation object
   * @param {number} steps - number of steps to look ahead
   * @param {number} padding - padding to increase or decrease anim rect
   * @return {Anim | Image | undefined} of potential collision
   */
  lookAhead(anim: Anim, steps: number, padding: number = 0): Anim | Image | undefined {
    let animRect = anim.rect;
    animRect.x = anim.x;
    animRect.y = anim.y;
    if (padding < 0) {
      animRect.deflate(padding);
    } else if (padding > 0) {
      animRect.inflate(padding);
    }
    for (let i = 0; i < steps; i++) {
      animRect.x += (anim.dx * (anim.vx || 1));
      animRect.y += (anim.dy * (anim.vy || 1));
      let objectList: any = this.stage.children;
      for (let obj of objectList) {
        if (!obj.anim || !obj.anim.collisionDetection || !obj.anim.visible) {
          continue;
        }
        if (anim.id === obj.anim.id) {
          continue;
        }
        if (animRect.intersect(obj.anim.rect)) {
          return obj.anim;
        }
      }
    }
    return undefined;
  }

  /**
   * @name destroy
   * @description remove Anim objects from scene
   * @return {void}
   */
  destroy(): void {
    Object.keys(this.anims).forEach((key) => {
      this.anims[key].destroy();
    });
    for (let child of this.stage.children) {
      this.stage.removeChild(child);
    }
  }
}


