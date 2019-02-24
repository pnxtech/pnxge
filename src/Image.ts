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
  //#region variables
  protected _subType: string = '';
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
    this.anim = this;
    this.scene = scene;
    scene.stage.addChild(this);
    this.internalRect = new Rect(this.x, this.y, this.width, this.height);
    this.attributes = new Attribs();
    this.attributes.add('image');
    this.cacheAsBitmap = true;
  }

  /**
   * @name subType
   * @description subType getter
   * @return {string} subType
   */
  public get subType(): string {
    return this._subType;
  }

  /**
   * @name subType
   * @description subType setter
   * @return {void}
   */
  public set subType(value: string) {
    this._subType = value;
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  public get z(): number {
    return this._z;
  }

  /**
   * @name z
   * @description z position setter
   */
  public set z(z: number) {
    this._z = z;
  }

  /**
   * @name dx
   * @description direction X getter
   * @return {number} dx - direction X
   */
  public get dx() : number {
    return this._dx;
  }

  /**
   * @name dx
   * @description direction X setter
   * @param {number} value - direction X
   */
  public set dx(value: number) {
    this._dx = value;
  }

  /**
   * @name dy
   * @description direction Y getter
   * @return {number} dy - direction Y
   */
  public get dy() : number {
    return this._dy;
  }

  /**
   * @name dy
   * @description direction Y setter
   * @param {number} value - direction Y
   */
  public set dy(value: number) {
    this._dy = value;
  }

  /**
   * @name vx
   * @description velocity X getter
   * @return {number} vx - velocity X
   */
  public get vx() : number {
    return this._vx;
  }

  /**
   * @name vx
   * @description velocity X setter
   * @param {number} value - velocity X
   */
  public set vx(value: number) {
    this._vx = value;
  }

  /**
   * @name vy
   * @description velocity Y getter
   * @return {number} vy - velocity Y
   */
  public get vy() : number {
    return this._vy;
  }

  /**
   * @name vy
   * @description velocity Y setter
   * @param {number} value - velocity Y
   */
  public set vy(value: number) {
    this._vy = value;
  }

  /**
   * @name setAnchor
   * @description set the anchor.x and .y value
   */
  public setAnchor(value: number): void {
    this.anim.anchor.set(value);
  }

  /**
   * @name get attribs
   * @description get attributes
   * @return {Attribs} attributes
   */
  public get attribs(): Attribs {
    return this.attributes;
  }

  /**
   * @name rect
   * @description rect getter
   * @return {Rect} rect object from anim
   */
  public get rect(): Rect {
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
   * @name destroy
   * @description cleanup
   */
  public destroy() {
    this.scene.stage.removeChild(this);
  }
}
