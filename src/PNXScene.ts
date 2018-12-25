import * as PIXI from 'pixi.js';
import PNXAnimatedSprite from './PNXAnimatedSprite';
import PNXAnim from './PNXAnim';

interface IAnimHash { [key: string]: PNXAnim};

/**
 * @name PNXScene
 * @description Phoenix Game Engine Scene class
 */
export default class PNXScene {
  public app: PIXI.Application;
  public stage: PIXI.Container;
  public ticker: PIXI.ticker.Ticker;
  public anims: IAnimHash;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    this.app = app;
    this.stage = app.stage;
    this.ticker = app.ticker;
    this.anims = {};
  }

  /**
   * @name start
   * @description start scene updates
   * @return {void}
   */
  start(): void {
    this.ticker.add((deltaTime) => {
      this.update(deltaTime);
    });
  }

  /**
   * @name addAnim
   * @description add an anim to the scene
   * @param {string} name - name of anim
   * @param {PNXAnim} anim - anim objec
   */
  addAnim(name: string, anim: PNXAnim): void {
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
   * @return {PNXAnim} anim
   */
  getAnim(name: string): PNXAnim {
    return this.anims[name];
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
  }

  /**
   * @name sortAnims
   * @description sort dislay list based on anim zOrder
   * @return {void}
   */
  sortAnims(): void {
    let objectList: any = this.stage.children;
    objectList.sort((a: PNXAnimatedSprite, b: PNXAnimatedSprite) => {
      return a.zOrder - b.zOrder;
    });
  }

  /**
   * @name hitTestRectangle
   * @description check whether two anim objects have collided
   * @note this algorithm relies on the fact that sprites are by default setup with an anchor of 0.5
   * @param {PNXAnimatedSprite} a1 - first anim
   * @param {PNXAnimatedSprite} a2 - second anim
   * @return {boolean} bool - true if collision else false
   */
  hitTestRectangle(a1: PNXAnimatedSprite, a2: PNXAnimatedSprite): boolean {
    // Find the half-widths and half-heights of each sprite
    let a1_halfWidth = 0;
    let a1_halfHeight = 0;
    let a2_halfWidth = 0;
    let a2_halfHeight = 0;

    if (a1.anim && a2.anim) {
      a1_halfWidth = a1.width * a1.anim.anchor;
      a1_halfHeight = a1.height * a1.anim.anchor;
      a2_halfWidth = a2.width * a2.anim.anchor;
      a2_halfHeight = a2.height * a2.anim.anchor;
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
      for (let obj2 of objectList) {
        if (obj1.collisionDetection === false || obj2.collisionDetection === false) {
          continue;
        }
        if (obj1.id !== obj2.id) {
          if (this.hitTestRectangle(obj1, obj2)) {
            obj1.anim.onCollision(obj2.anim);
            obj2.anim.onCollision(obj1.anim);
          }
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


