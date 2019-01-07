import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {createID} from './Math';
import {Anim, AnimType} from './Anim';

/**
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export class TilingSprite extends PIXI.extras.TilingSprite {
  public id: string = createID();
  public vx: number = 0; // velocityX
  public vy: number = 0; // velocityY
  public collisionDetection: boolean = false;
  public type: string = AnimType.BACKGROUND;
  public anim: Anim;

  constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number) {
    super(texture, width, height);
    this.anim = new Anim(scene);
    this.anim.z = -1;
  }
};
