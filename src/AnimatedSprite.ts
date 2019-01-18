import * as PIXI from 'pixi.js';
import {Anim} from './Anim';
import {Attribs} from './Attribs';

/**
 * @name AnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export class AnimatedSprite extends PIXI.extras.AnimatedSprite {
  public anim: Anim | undefined;
  public attributes: Attribs;

  constructor(textures: [], autoUpdate?: boolean | undefined) {
    super(textures, autoUpdate);
    this.attributes = new Attribs();
  }

  /**
   * @name getAttribs
   * @description get attributes
   * @return {Attribs} attributes
   */
  get attribs(): Attribs {
    return this.attributes;
  }
};
