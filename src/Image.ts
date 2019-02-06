import * as PIXI from 'pixi.js';
import {IAnimCompatible} from './AnimCompatible';
import {Scene} from './Scene';
import {EventManager} from './EventManager';
import {Rect} from './Math';
import {Utils} from './Utils';
import {Attribs} from './Attribs';


/**
 * @name Image
 * @description  image sprite
 */
export class Image extends PIXI.Sprite implements IAnimCompatible {
  public id: string = (new Utils).createID();
  public attributes: Attribs;
  public collisionDetection: boolean = false;
  public anim: Image;
  protected scene: Scene;
  private _z: number = 0;
  private _dx: number = 0;
  private _dy: number = 0;
  private _vx: number = 0;
  private _vy: number = 0;

  private internalRect: Rect;

  /**
   * @name constructor
   * @description constructor
   * @param {Scene} scene - reference to parent scene
   * @param {string} name - name of sequence
   * @param {object} resources - loaded resources
   */
  constructor(scene: Scene, name: string, resources: any) {
    super(resources.textures[name]);
    this.anim = this;
    this.anim.anchor.x = 0.5;
    this.anim.anchor.y = 0.5;
    this.anim.pivot.x = 0.5;
    this.anim.pivot.y = 0.5;
    this.scene = scene;
    scene.stage.addChild(this);
    this.internalRect = new Rect(this.x, this.y, this.width, this.height);
    this.attributes = new Attribs();
    this.attributes.add('image');
    this.cacheAsBitmap = true;
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  get z(): number {
    return this._z;
  }

  /**
   * @name z
   * @description z position setter
   */
  set z(z: number) {
    this._z = z;
  }

  /**
   * @name dx
   * @description direction X getter
   * @return {number} dx - direction X
   */
  get dx() : number {
    return this._dx;
  }

  /**
   * @name dx
   * @description direction X setter
   * @param {number} value - direction X
   */
  set dx(value: number) {
    this._dx = value;
  }

  /**
   * @name dy
   * @description direction Y getter
   * @return {number} dy - direction Y
   */
  get dy() : number {
    return this._dy;
  }

  /**
   * @name dy
   * @description direction Y setter
   * @param {number} value - direction Y
   */
  set dy(value: number) {
    this._dy = value;
  }

  /**
   * @name vx
   * @description velocity X getter
   * @return {number} vx - velocity X
   */
  get vx() : number {
    return this._vx;
  }

  /**
   * @name vx
   * @description velocity X setter
   * @param {number} value - velocity X
   */
  set vx(value: number) {
    this._vx = value;
  }

  /**
   * @name vy
   * @description velocity Y getter
   * @return {number} vy - velocity Y
   */
  get vy() : number {
    return this._vy;
  }

  /**
   * @name vy
   * @description velocity Y setter
   * @param {number} value - velocity Y
   */
  set vy(value: number) {
    this._vy = value;
  }

  /**
   * @name setAnchor
   * @description set the anchor.x and .y value
   */
  setAnchor(value: number): void {
    this.anim.anchor.set(value);
  }

  /**
   * @name get attribs
   * @description get attributes
   * @return {Attribs} attributes
   */
  get attribs(): Attribs {
    return this.attributes;
  }

  /**
   * @name rect
   * @description rect getter
   * @return {Rect} rect object from anim
   */
  get rect(): Rect {
    this.internalRect.x = this.x;
    this.internalRect.y = this.y;
    this.internalRect.width = this.width;
    this.internalRect.height = this.height;
    return this.internalRect;
  }

  /**
   * @name attachTouchHandler
   * @description attach a touch (click, press, touch) handler for this anim
   * @param {string} name - name of event
   * @param {EventManager} - instance of event eventManager
   * @return {void}
   */
  attachTouchHandler(name: string, eventManager: EventManager): void {
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
  update(deltaTime: number): void {
    this.x += this.dx * (this.vx || 1) * deltaTime;
    this.y += this.dy * (this.vy || 1) * deltaTime;
  }

  /**
   * @name destroy
   * @description cleanup
   */
  destroy() {
    this.scene.stage.removeChild(this);
  }
}
