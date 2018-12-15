import * as PIXI from 'pixi.js';

/**
 * @name PNXAnimatedSprite
 * @description extends the PIXI AnimatedSprite to include a zOrder field
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export default class PNXAnimatedSprite extends PIXI.extras.AnimatedSprite {
  public zOrder: number = -1;
  constructor(textures: {}, autoUpdate?: boolean | undefined) {
    super(textures, autoUpdate);
  }
};
