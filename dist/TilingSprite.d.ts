import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { Anim } from './Anim';
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
    type: string;
    anim: Anim;
    constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number);
}
//# sourceMappingURL=TilingSprite.d.ts.map