import * as PIXI from 'pixi.js';
import {Anim} from './Anim';

/**
 * @name AnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export class AnimatedSprite extends PIXI.extras.AnimatedSprite {
  public anim: Anim | undefined;
  constructor(textures: [], autoUpdate?: boolean | undefined) {
    super(textures, autoUpdate);
  }

  /**
   * @name type
   * @description type getter
   * @return {string} type position
   */
  get type(): string {
    if (this.anim) {
      return this.anim.type;
    }
    return '';
  }

  /**
   * @name type
   * @description type setter
   * @param {string} value - anim type
   */
  set type(value: string) {
    if (this.anim) {
      this.anim.type = value;
    }
  }
};
