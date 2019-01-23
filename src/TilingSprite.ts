import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {Utils} from './Utils';
import {Anim} from './Anim';
import {Attribs} from './Attribs';

/**
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export class TilingSprite extends PIXI.extras.TilingSprite {
  public id: string = (new Utils()).createID();
  public collisionDetection: boolean = false;
  public anim: Anim;
  private _attribs: Attribs;

  private _z: number = 0;
  private _internalAnchor: number = .5;
  private _dx: number = 0;
  private _dy: number = 0;
  private _vx: number = 0;
  private _vy: number = 0;

  constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number) {
    super(texture, width, height);
    this.anim = new Anim(scene);
    this.anim.z = -1;
    this._attribs = new Attribs();
    this._attribs.add('background');
  }

  /**
   * @name x
   * @description x position getter
   * @return {number} x position
   */
  get x(): number {
    return this.anim.x;
  }

  /**
   * @name x
   * @description x position setter
   */
  set x(x: number) {
    this.anim.x = x;
  }

  /**
   * @name y
   * @description y position getter
   * @return {number} y position
   */
  get y(): number {
    return this.anim.y;
  }

  /**
   * @name y
   * @description y position setter
   */
  set y(y: number) {
    this.anim.y = y;
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
   * @name visible
   * @description get visibility
   * @return {boolean} true if visible
   */
  get visible(): boolean {
    return this.anim.visible;
  }

  /**
   * @name visible
   * @description set visibility
   */
  set visible(value: boolean) {
    this.anim.visible = value;
  }

  /**
   * @name width
   * @description get the anim width
   * @return {number} anim width
   */
  get width(): number {
    return this.anim.width;
  }

  /**
   * @name height
   * @description get the anim height
   * @return {number} anim height
   */
  get height(): number {
    return this.anim.height;
  }

  /**
   * @name setAnchor
   * @description set the anchor.x and .y value
   */
  setAnchor(value: number): void {
    this.anim.anchor = value;
  }

  /**
   * @name rotation
   * @description rotation getter
   * @return {number} rotation position
   */
  get rotation(): number {
    return this.anim.rotation;
  }

  /**
   * @name rotation
   * @description rotation setter
   */
  set rotation(value: number) {
    this.anim.rotation = value;
  }

  /**
   * @name sx
   * @description get anim scale x
   * @return {number} scale x
   */
  get sx(): number {
    return this.anim.sx;
  }

  /**
   * @name sy
   * @description get anim scale y
   * @return {number} scale y
   */
  get sy(): number {
    return this.anim.sy;
  }

  /**
   * @name sx
   * @description set anim scale x
   */
  set sx(value: number) {
    this.anim.sx = value;
  }

  /**
   * @name sy
   * @description set anim scale y
   */
  set sy(value: number) {
    this.anim.sy = value;
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
   * @name get Attribs
   * @description get attributes
   * @return {Attribs} attributes
   */
  get attribs(): Attribs {
    return this._attribs;
  }
};
