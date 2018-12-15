import * as PIXI from 'pixi.js';

/**
 * @name PNXAnimatedSprite
 * @description extends the PIXI AnimatedSprite to include a vx, vy and zOrder fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export default class PNXAnimatedSprite extends PIXI.extras.AnimatedSprite {
  public zOrder: number = -1;
  public vx: number = 0;
  public vy: number = 0;
  constructor(textures: {}, autoUpdate?: boolean | undefined) {
    super(textures, autoUpdate);
  }
};
