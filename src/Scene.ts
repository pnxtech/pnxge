import * as PIXI from 'pixi.js';
import {Application} from './Application';
import {SpriteAnim, ISprite} from './ISprite';
import {ProjectileManager} from './ProjectileManager';
import {SoundManager} from './SoundManager';
import {pcap, Rect} from './Math';
import {Benchmark} from './Benchmark';
import {State} from './State';
import {IRecorderHash} from './Recorder';

interface ISpriteHash { [key: string]: SpriteAnim };
interface ISpriteCallback { (sprite: SpriteAnim): void };
interface ISpriteDoneCallback { (): void };

/**
 * @name Scene
 * @description Phoenix Game Engine Scene class
 */
export class Scene {
  //#region variables
  public app: Application;
  private _state: State;
  protected sceneWidth: number;
  protected sceneHeight: number;
  protected benchmark: Benchmark = new Benchmark();
  public stage: PIXI.Container;
  public sprites: ISpriteHash;
  protected internalTick: number = 0;
  protected projectileManager: ProjectileManager | undefined;
  protected soundManager: SoundManager | undefined;
  private sceneStarted: boolean = false;
  private benchmarkUpdate: boolean = false;
  private collisionRect1: Rect = new Rect();
  private collisionRect2: Rect = new Rect();
  //#endregion

  /**
   * @name constructor
   * @description initialize scene
   * @param {Application} application
   */
  constructor(app: Application) {
    this.app = app;
    this._state = new State();
    this.sceneWidth = app.width;
    this.sceneHeight = app.height;
    this.stage = app.stage;
    this.sprites = {};
  }

  /**
   * @name attachProjectileManager
   * @description attach a projectile manager
   * @return {void}
   */
  public attachProjectileManager(projectileManager: ProjectileManager): void {
    this.projectileManager = projectileManager;
  }

  /**
   * @name getProjectileManager
   * @description retrieve a projectile manager instance or undefined
   * @return {ProjectileManager | undefined}
   */
  public getProjectileManager(): ProjectileManager | undefined {
    return this.projectileManager;
  }

  /**
   * @name attachSoundManager
   * @description attach sound manager
   * @return {void}
   */
  public attachSoundManager(soundManager: SoundManager): void {
    this.soundManager = soundManager;
  }

  /**
   * @name state
   * @description state getter
   * @return {object}
   */
  public get state(): any {
    return this._state.state;
  }

  /**
   * @name state
   * @description state setter
   * @param {any} data - object to be merged with state
   */
  public set state(data: any) {
    this._state.state = data;
  }

  /**
   * @name setState
   * @description merges object entries in to application state
   * @param {object} data - object to be merged with state
   * @return {object} new application state
   */
  public setState(data: any): any {
    this._state.setState(data);
    return this._state.state;
  }

  /**
   * @name getSoundManager
   * @description retrieve a sound manager instance or undefined
   * @return {SoundManager | undefined}
   */
  public getSoundManager(): SoundManager | undefined {
    return this.soundManager;
  }

  /**
   * @name start
   * @description start scene updates
   * @param {object} resources - loaded asset resources
   * @return {void}
   */
  public start(resources: {}): void {
    this.sceneStarted = true;
  }

  /**
   * @name end
   * @description scene end handler
   * @param {string} outcome - result of scene ending
   * @return {void}
   */
  public end(outcome: string): void {
    this.sceneStarted = false;
  }

  /**
   * @name hasSceneStarted
   * @description determine whether the scene has been started
   */
  public hasSceneStarted(): boolean {
    return this.sceneStarted;
  }

  /**
   * @name benchmarking
   * @description turn benchmarking on or off
   * @note displays via console.log
   * @return {void}
   */
  public benchmarking(state: boolean): void {
    this.benchmarkUpdate = state;
  }

  /**
   * @name tick
   * @description get internal tick count
   */
  public get tick() {
    return this.internalTick;
  }

  /**
   * @name addSpriteAnim
   * @description add a sprite to the scene
   * @param {string} name - name of sprite
   * @param {SpriteAnim} sprite - sprite object
   * @return {void}
   */
  public addSpriteAnim(name: string, sprite: SpriteAnim): void {
    this.sprites[name] = sprite;
  }

  /**
   * @name getSpriteAnim
   * @description get sprite by name
   * @return {SpriteAnim | undefined} sprite
   */
  public getSpriteAnim(name: string): SpriteAnim | undefined {
    return this.sprites[name];
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  public moveLeft(): void {
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  public moveRight(): void {
  }

  /**
   * @name width
   * @description get the width of the scene
   * @return {number} width
   */
  public get width() : number {
    return this.sceneWidth;
  }

  /**
   * @name height
   * @description get the height of the scene
   * @return {number} height
   */
  public get height() : number {
    return this.sceneHeight;
  }

  /**
   * @name forEachSpriteAnim
   * @description enumerate sprites
   * @param {ISpriteCallback} callback - called for each sprite
   * @param {ISpriteDoneCallback} done - called when done
   * @return {void}
   */
  public forEachSpriteAnim(callback: ISpriteCallback, done: ISpriteDoneCallback): void {
    Object.keys(this.sprites).forEach((key) => {
      callback(this.sprites[key]);
    });
    done();
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  public update(deltaTime: number): void {
    this.benchmarkUpdate && this.benchmark.begin();
    this.internalTick++;
    if (this._state.state.actionList) {
      switch (this._state.state.actionList[this.internalTick]) {
        case 'left':
          this.moveLeft();
          break;
        case 'right':
          this.moveRight();
          break;
      }
    }
    if (!this.sceneStarted) {
      return;
    }
    if (this.sprites) {
      Object.keys(this.sprites).forEach((key) => {
        if (this.sprites[key] && this.sprites[key].visible) {
          this.sprites[key].update(deltaTime);
        }
      });
      this.collisionDetection(); // must happen before projectile update because latter requires it
      if (this.projectileManager) {
        this.projectileManager.update(deltaTime);
      }
      this.sortAnims();
    }
    this.benchmarkUpdate && console.log(`scene benchmark: ${pcap(this.benchmark.elapsed())} ms`);
  }

  /**
   * @name sortAnims
   * @description sort dislay list based on anim z order
   * @return {void}
   */
  public sortAnims(): void {
    let objectList: any = this.stage.children;
    objectList.sort((a: ISprite, b: ISprite) => {
      if (!a.id || !b.id) {
        return 0;
      }
      return a.z - b.z;
    });
  }

  /**
   * @name collisionDetection
   * @description collision detection system. notifies anim object when they collide with other objects
   * @return {void}
   */
  public collisionDetection(): void {
    let objectList: any = this.stage.children;
    for (let obj1 of objectList) {
      if (!obj1.collisionDetection || !obj1.visible) {
        continue;
      }
      this.collisionRect1.x = obj1.x;
      this.collisionRect1.y = obj1.y;
      this.collisionRect1.width = obj1.width;
      this.collisionRect1.height = obj1.height;
      for (let obj2 of objectList) {
        // if (obj1.subType === obj2.subType) {
        //   continue;
        // }
        if (obj1.id !== obj2.id) {
          if (!obj2.collisionDetection || !obj2.visible) {
            continue;
          }
          this.collisionRect2.x = obj2.x;
          this.collisionRect2.y = obj2.y;
          this.collisionRect2.width = obj2.width;
          this.collisionRect2.height = obj2.height;
          if (this.collisionRect1.intersect(this.collisionRect2)) {
            console.log('collision!');
            obj1.visible = false;
            obj2.visible = false;
            // obj1.onCollision(obj2);
            // obj2.onCollision(obj1);
          }
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
   * @param {ISprite} sprite - sprite object
   * @param {number} steps - number of steps to look ahead
   * @param {number} padding - padding to increase or decrease anim rect
   * @return {ISprite | undefined} of potential collision
   */
  public lookAhead(sprite: ISprite, steps: number, padding: number = 0): ISprite | undefined {
    this.collisionRect1.x = sprite.x;
    this.collisionRect1.y = sprite.y;
    this.collisionRect1.width = sprite.width;
    this.collisionRect1.height = sprite.height;
    if (padding < 0) {
      this.collisionRect1.deflate(padding);
    } else if (padding > 0) {
      this.collisionRect1.inflate(padding);
    }
    for (let i = 0; i < steps; i++) {
      this.collisionRect1.x += (sprite.dx * (sprite.vx || 1));
      this.collisionRect1.y += (sprite.dy * (sprite.vy || 1)) + (sprite.height * 0.5);
      let objectList: any = this.stage.children;
      for (let obj of objectList) {
        if (!obj.anim.visible) {
          continue;
        } else if (!obj.collisionDetection) {
          continue;
        } else if (sprite.id === obj.sprite.id) {
          continue;
        }
        this.collisionRect2.x = obj.x;
        this.collisionRect2.y = obj.y;
        this.collisionRect2.width = obj.width;
        this.collisionRect2.height = obj.height;
        if (this.collisionRect1.intersect(this.collisionRect2)) {
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
  public destroy(): void {
    Object.keys(this.sprites).forEach((key) => {
      this.sprites[key].destroy();
    });
    for (let child of this.stage.children) {
      this.stage.removeChild(child);
    }
    if (this.app.usingWebGL) {
      let renderer: PIXI.WebGLRenderer = <PIXI.WebGLRenderer>this.app.renderer;
      if (renderer.textureGC) {
        renderer.textureGC.run();
      }
    }
  }
}

