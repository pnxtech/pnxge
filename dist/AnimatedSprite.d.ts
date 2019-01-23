import * as PIXI from 'pixi.js';
import { Anim } from './Anim';
import { Attribs } from './Attribs';
/**
 * @name AnimatedSprite
 * @description extends the PIXI AnimatedSprite to include additional anim fields
 * @note: uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
 */
export declare class AnimatedSprite extends PIXI.extras.AnimatedSprite {
    anim: Anim | undefined;
    private _attribs;
    constructor(textures: [], autoUpdate?: boolean | undefined);
    /**
     * @name getAttribs
     * @description get attributes
     * @return {Attribs} attributes
     */
    readonly attribs: Attribs;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map