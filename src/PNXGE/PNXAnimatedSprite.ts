import * as PIXI from 'pixi.js';
import PNXAnim from './PNXAnim';

/**
 * @name PNXAnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export default class PNXAnimatedSprite extends PIXI.extras.AnimatedSprite {
  public anim: PNXAnim | undefined;
  constructor(textures: [], autoUpdate?: boolean | undefined) {
    super(textures, autoUpdate);
  }
};
