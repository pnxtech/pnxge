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
  public vx: number = 0; // velocityX
  public vy: number = 0; // velocityY
  public collisionDetection: boolean = false;
  public anim: Anim;
  private _attribs: Attribs;

  constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number) {
    super(texture, width, height);
    this.anim = new Anim(scene);
    this.anim.z = -1;
    this._attribs = new Attribs();
    this._attribs.add('background');
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
