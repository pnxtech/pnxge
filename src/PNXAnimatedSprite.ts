import * as PIXI from 'pixi.js';
import PNXAnim from './PNXAnim';
import {createID} from './PNXMath';

/**
 * @name PNXAnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export default class PNXAnimatedSprite extends PIXI.extras.AnimatedSprite {
  public id: string = createID();
  public zOrder: number = -1;
  public dx: number = 0; // directionX
  public dy: number = 0; // directionY
  public vx: number = 0; // velocityX
  public vy: number = 0; // velocityY
  public collisionDetection: boolean = false;
  public anim: PNXAnim | undefined;
  public type: string = '';

  constructor(textures: [], autoUpdate?: boolean | undefined) {
    super(textures, autoUpdate);
  }
};
