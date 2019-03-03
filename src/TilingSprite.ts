import * as PIXI from 'pixi.js';
import {ISprite} from './ISprite';
import {Controller} from './Controller';
import {Scene} from './Scene';
import {Utils} from './Utils';
import {Attribs} from './Attribs';

/**
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export class TilingSprite extends PIXI.extras.TilingSprite implements ISprite {
  //#region variables
  public subType: string;
  public id: string;
  public vx: number;
  public vy: number;
  public dx: number;
  public dy: number;
  public z: number;
  public health: number;
  public strength: number;
  public collisionDetection: boolean;
  public collisionWith: ISprite | undefined;
  public attribs: Attribs;
  protected scene: Scene;
  // protected controller: Controller | undefined;
  //#endregion

  constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number) {
    super(texture, width, height);
    this.subType = '';
    this.id = Utils.createID();
    this.vx = 0;
    this.vy = 0;
    this.dx = 0;
    this.dy = 0;
    this.z = 0;
    this.health = 0;
    this.strength = 0;
    this.cacheAsBitmap = true;
    this.collisionDetection = false;
    this.collisionWith = undefined;
    this.attribs = new Attribs();
    this.attribs.add('background');
    this.scene = scene;
    scene.stage.addChild(this);
  }

  /**
   * @name attachController
   * @description attach a Controller
   * @return {void}
   */
  public attachController(controller: Controller): void {
  }

  /**
   * @name onCollision
   * @description trigged when this anim collides with another anim
   * @param {ISprite} sprite - anim with which collision has occured
   * @return {void}
   */
  public onCollision(sprite: ISprite): void {
  }

  /**
   * @name clearCollision
   * @description clear collision event
   * @return {void}
   */
  public clearCollision(): void {
  }

  /**
   * @name update
   * @description update handler
   * @param {number} deltaTime - delta time
   * @return {void}
   */
  public update(deltaTime: number): void {
    this.x += this.dx * (this.vx || 1) * deltaTime;
    this.y += this.dy * (this.vy || 1) * deltaTime;
  }

  /**
   * @name destroy
   * @description cleanup
   */
  public destroy() {
    this.scene.stage.removeChild(this);
  }
}
