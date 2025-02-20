import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {SpriteAnim, ISprite} from './ISprite';
import {Controller} from './Controller';
import {EventManager} from './EventManager';
import {Utils} from './Utils';
import {Attribs} from './Attribs';

/**
 * @name TextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 * @todo: Uses anim simply to hold z value - cleanup later
 */
export class TextSprite extends PIXI.extras.BitmapText implements ISprite {
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
  public collisionWith: SpriteAnim | undefined;
  public attribs: Attribs;
  public scene: Scene;
  public controller: Controller | undefined;
  //#endregion

  /**
   * @name constructor
   * @description constructor pass throught to BitmapText
   * @param {Scene} scene - referene to parent scene
   * @param {string} text - text to display
   * @param {PIXI.extras.BitmapTextStyle} style - bitmap text styles
   */
  constructor(scene: Scene, text: string, style?: PIXI.extras.BitmapTextStyle | undefined) {
    super(text, style);
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
    this.scene = scene;
    this.scene.stage.addChild(this);
  }

  /**
   * @name attachController
   * @description attach a Controller
   * @return {void}
   */
  public attachController(controller: Controller): void {
    this.controller = controller;
  }

  /**
   * @name attachTouchHandler
   * @description attach a touch (click, press, touch) handler for this anim
   * @param {string} name - name of event
   * @param {EventManager} - instance of event eventManager
   * @return {void}
   */
  public attachTouchHandler(name: string, eventManager: EventManager): void {
    this.interactive = true;
    this.on('click', () => {
      eventManager.triggerEvent(name, this);
    });
    this.on('touchend', () => {
      eventManager.triggerEvent(name, this);
    });
  }

  /**
   * @name onCollision
   * @description trigged when this anim collides with another anim
   * @param {SpriteAnim | undefined} sprite - anim with which collision has occured
   * @return {void}
   */
  public onCollision(sprite: SpriteAnim | undefined): void {
    this.collisionWith = sprite;
    this.controller && (this.controller.hitBy(sprite));
  }

  /**
   * @name clearCollision
   * @description clear collision event
   * @return {void}
   */
  public clearCollision(): void {
    this.collisionWith = undefined;
  }

  /**
   * @name updateSpriteAnim
   * @description update anim position based on velocity
   * @param {number} deltaTime - delta time offset
   * @return {void}
   */
  public updateSpriteAnim(deltaTime: number): void {
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
};
