import * as PIXI from 'pixi.js';
import {ISprite} from './ISprite';
import {Scene} from './Scene';
import {Controller} from './Controller';
import {EventManager} from './EventManager';
import {Utils} from './Utils';
import {Attribs} from './Attribs';


/**
 * @name Sprite
 * @description sprite object
 */
export class Sprite extends PIXI.Sprite implements ISprite {
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
  protected controller: Controller | undefined;
  //#endregion

  /**
   * @name constructor
   * @description constructor
   * @param {Scene} scene - reference to parent scene
   * @param {string} name - name of sequence
   * @param {object} resources - loaded resources
   */
  constructor(scene: Scene, name: string, resources: any) {
    super(resources.textures[name]);
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
    this.attribs.add('sprite');
    this.scene = scene;
    scene.stage.addChild(this);
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
   * @name onCollision
   * @description trigged when this anim collides with another anim
   * @param {ISprite} sprite - anim with which collision has occured
   * @return {void}
   */
  public onCollision(sprite: ISprite): void {
    this.collisionWith = sprite;
    // this.scene.app.debugLog(`${this.subType} was hit by ${anim.subType}`);
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
   * @name destroy
   * @description cleanup
   */
  public destroy() {
    this.scene.stage.removeChild(this);
  }
}
