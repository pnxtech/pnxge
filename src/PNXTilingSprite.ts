import * as PIXI from 'pixi.js';
import {createID} from './PNXMath';
import {AnimType} from './PNXAnim';

/**
 * @name PNXTilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export default class PNXTilingSprite extends PIXI.extras.TilingSprite {
  public id: string = createID();
  public zOrder: number = -1;
  public vx: number = 0; // velocityX
  public vy: number = 0; // velocityY
  public collisionDetection: boolean = false;
  public type: string = AnimType.BACKGROUND;

  constructor(texture: PIXI.Texture, width: number, height: number) {
    super(texture, width, height);
  }
};
