import * as PIXI from 'pixi.js';

/**
 * @name PNXTilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export default class PNXTilingSprite extends PIXI.extras.TilingSprite {
  public id: string;
  public zOrder: number = -1;
  public vx: number = 0; // velocityX
  public vy: number = 0; // velocityY
  public collisionDetection: boolean = false;
  public type: string = 'background';

  constructor(texture: PIXI.Texture, width: number, height: number) {
    super(texture, width, height);
    this.id = (Math.floor(Math.random() * (new Date()).getTime()).toString(36));
  }
};
