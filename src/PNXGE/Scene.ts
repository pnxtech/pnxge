import * as PIXI from 'pixi.js';
import {Application} from './Application';
import {Anim} from './Anim';
import {Image} from './Image';
import {IAnimCompatible} from './AnimCompatible';
import {ProjectileManager} from './ProjectileManager';
import {SoundManager} from './SoundManager';
import {TextSprite} from './TextSprite';

interface IAnimHash { [key: string]: Anim};
interface IAnimCallback { (anim: Anim): void };
interface IAnimDoneCallback { (): void };

/**
 * @name Scene
 * @description Phoenix Game Engine Scene class
 */
export class Scene {
  public app: Application;
  protected sceneWidth: number;
  protected sceneHeight: number;

  public stage: PIXI.Container;
  public ticker: PIXI.ticker.Ticker;
  public anims: IAnimHash;
  protected projectileManager: ProjectileManager | undefined;
  protected soundManager: SoundManager | undefined;
  protected spashScreen: Image | undefined;

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
    this.ticker = app.ticker;
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
   * @name getSoundManager
   * @description retrieve a sound manager instance or undefined
   * @return {SoundManager | undefined}
   */
  getSoundManager(): SoundManager | undefined {
    return this.soundManager;
  }

  /**
   * @name loadSplashScreen
   * @description load the scene's splash screen
   * @param {string} name - of anim from GameLoader
   * @return {void}
   */
  loadSplashScreen(name: string): void {
    this.spashScreen = <Image>this.getAnim(name);
    this.spashScreen.visible = true;
  }

  /**
   * @name closeSplashScreen
   * @description close the scene's splash screen if any
   * @return {void}
   */
  closeSplashScreen(): void {
    if (this.spashScreen) {
      this.spashScreen.visible = false;
    }
  }

  /**
   * @name start
   * @description start scene updates
   * @param {object} resources - loaded asset resources
   * @return {void}
   */
  start(resources: {}): void {
    this.ticker.add((deltaTime) => {
      this.update(deltaTime);
    });
  }

  /**
   * @name end
   * @description scene end handler
   * @param {string} outcome - result of scene ending
   * @return {void}
   */
  end(outcome: string): void {
    this.ticker.stop();
  }

  /**
   * @name addAnim
   * @description add an anim to the scene
   * @param {string} name - name of anim
   * @param {Anim} anim - anim objec
   */
  addAnim(name: string, anim: Anim): void {
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
   * return {void}
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
    Object.keys(this.anims).forEach((key) => {
      this.anims[key].update(deltaTime);
    });
    if (this.projectileManager) {
      this.projectileManager.update(deltaTime);
    }
    this.sortAnims();
    this.collisionDetection();
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
   * @name hitTestRectangle
   * @description check whether two anim objects have collided
   * @note this algorithm relies on the fact that sprites are by default setup with an anchor of 0.5
   * @param {Anim} a1 - first anim
   * @param {Anim} a2 - second anim
   * @return {boolean} bool - true if collision else false
   */
  hitTestRectangle(a1: Anim, a2: Anim): boolean {
    // Find the half-widths and half-heights of each sprite
    let a1_halfWidth = 0;
    let a1_halfHeight = 0;
    let a2_halfWidth = 0;
    let a2_halfHeight = 0;

    if (a1 && a2) {
      a1_halfWidth = a1.width * 0.5;
      a1_halfHeight = a1.height * 0.5;
      a2_halfWidth = a2.width * 0.5;
      a2_halfHeight = a2.height * 0.5;
    }

    // Calculate the distance vector between the sprites
    let dx = Math.abs(a1.x - a2.x) * 2;
    let dy = Math.abs(a1.y - a2.y) * 2;

    // Figure out the combined half-widths and half-heights
    let combinedHalfWidths = a1_halfWidth + a2_halfWidth;
    let combinedHalfHeights = a1_halfHeight + a2_halfHeight;

    return ((Math.abs(dx) < combinedHalfWidths) && (Math.abs(dy) < combinedHalfHeights)) ? true : false;
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
        if (this.hitTestRectangle(obj1, obj2)) {
          obj1.anim.onCollision(obj2.anim);
          obj2.anim.onCollision(obj1.anim);
        }
      }
    }
  }

  /**
   * @name destroy
   * @description remove Anim objects from scene and stage container
   * @return {void}
   */
  destroy(): void {
    for (let child of this.stage.children) {
      child.renderable = false;
    }

    let interval = setInterval(() => {
      clearInterval(interval);

      this.ticker.stop();

      for (let child of this.stage.children) {
        this.stage.removeChild(child);
      }

      for (let texture in PIXI.utils.TextureCache) {
        PIXI.utils.TextureCache[texture].destroy(true);
      };

      PIXI.loader.reset();

      Object.keys(this.anims).forEach((key) => {
        this.anims[key].destroy();
      });
    }, 2000);
  }
}


