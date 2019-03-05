import * as PIXI from 'pixi.js';
import {ISprite} from './ISprite';
import {Sprite} from './Sprite';
import {TextSprite} from './TextSprite';
import {EventManager} from './EventManager';
import {Controller} from './Controller';
import {Scene} from './Scene';
import {Attribs} from './Attribs';
import {Utils} from './Utils';

interface ICallback { (): void };

/**
 * @name AnimatedSprite
 * @description Animated Sprite
 */
export class AnimatedSprite extends PIXI.extras.AnimatedSprite implements ISprite {
  //#region variables
  public subType: string;
  public id: string;
  public dx: number;
  public dy: number;
  public vx: number;
  public vy: number;
  public z: number;
  public health: number;
  public strength: number;
  public collisionDetection: boolean;
  public collisionWith: Sprite | AnimatedSprite | TextSprite | undefined;
  public animationSpeed: number;
  public attribs: Attribs;
  public scene: Scene;
  public controller: Controller | undefined;
  //#endregion

  /**
   * @name constructor
   * @description binds Anim to Scene
   */
  constructor(scene: Scene, sequenceName: string, atlas: string, resources: any, autoUpdate?: boolean | undefined) {
    super(resources[atlas].spritesheet.animations[sequenceName], autoUpdate);

    this.subType = '';
    this.id = Utils.createID();
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.z = 0;
    this.health = 0;
    this.strength = 0;
    this.cacheAsBitmap = true;
    this.collisionDetection = false;
    this.collisionWith = undefined;
    this.animationSpeed = 1;
    this.attribs = new Attribs();
    this.attribs.add('animatedsprite');
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
   * @name update
   * @description update anim position based on velocity
   * @param {number} deltaTime - delta time offset
   * @return {void}
   */
  public update(deltaTime: number): void {
    if (this.controller) { // if controller then that will handle movement.
      this.controller.update(deltaTime);
    } else {
      this.x += this.dx * (this.vx || 1) * deltaTime;
      this.y += this.dy * (this.vy || 1) * deltaTime;
    }
  }

  /**
   * @name onCollision
   * @description trigged when this anim collides with another anim
   * @param {Sprite | AnimatedSprite | TextSprite | undefined} sprite - anim with which collision has occured
   * @return {void}
   */
  public onCollision(sprite: Sprite | AnimatedSprite | TextSprite | undefined): void {
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
   * @description destroys anim and all sequences
   * @return {void}
   */
  public destroy(): void {
    this.controller && (this.controller.destroy());
    // TODO remove touch events if any!
    super.destroy({
      children: true,
      texture: false,
      baseTexture: false
    });
    this.scene.stage.removeChild(this);
  }
}
