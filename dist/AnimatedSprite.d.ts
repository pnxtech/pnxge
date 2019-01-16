import * as PIXI from 'pixi.js';
import { Anim } from './Anim';
/**
 * @name AnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export declare class AnimatedSprite extends PIXI.extras.AnimatedSprite {
    anim: Anim | undefined;
    constructor(textures: [], autoUpdate?: boolean | undefined);
    /**
     * @name type
     * @description type getter
     * @return {string} type position
     */
    /**
    * @name type
    * @description type setter
    * @param {string} value - anim type
    */
    type: string;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map