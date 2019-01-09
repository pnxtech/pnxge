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
}
//# sourceMappingURL=AnimatedSprite.d.ts.map