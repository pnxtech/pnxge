import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { Anim } from './Anim';
import { Attribs } from './Attribs';
/**
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export declare class TilingSprite extends PIXI.extras.TilingSprite {
    id: string;
    vx: number;
    vy: number;
    collisionDetection: boolean;
    attributes: Attribs;
    anim: Anim;
    constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number);
    /**
     * @name get Attribs
     * @description get attributes
     * @return {Attribs} attributes
     */
    readonly attribs: Attribs;
}
//# sourceMappingURL=TilingSprite.d.ts.map