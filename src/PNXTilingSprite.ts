import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';
import {createID} from './PNXMath';
import PNXAnim, {AnimType} from './PNXAnim';

/**
 * @name PNXTilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export default class PNXTilingSprite extends PIXI.extras.TilingSprite {
  public id: string = createID();
  public vx: number = 0; // velocityX
  public vy: number = 0; // velocityY
  public collisionDetection: boolean = false;
  public type: string = AnimType.BACKGROUND;
  public anim: PNXAnim;

  constructor(scene: PNXScene, texture: PIXI.Texture, width: number, height: number) {
    super(texture, width, height);
    this.anim = new PNXAnim(scene);
    this.anim.z = -1;
  }
};
