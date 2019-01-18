import * as PIXI from 'pixi.js';
import { Anim } from './Anim';
import { Scene } from './Scene';
import { TilingSprite } from './TilingSprite';
/**
 * @name BackgroundTile
 * @description uses a texture to tile a background
 * @note: uses PIXI.extras.TilingSprite, image resource should
 * have an image size of a power of two for use with WebGL
 */
export declare class BackgroundTile extends Anim {
    protected scene: Scene;
    protected texture: PIXI.Texture;
    protected tilingSprite: TilingSprite;
    /**
     * @name constructor
     * @description init class
     * @param {Scene} parent scene
     * @param {string} assetPath - path to image resource
     * @note image resource should have an image size of a power of two for use with WebGL
     */
    constructor(scene: Scene, assetPath: string);
    /**
     * @name flip
     * @description flip tile
     * @param {state} boolean - true flip, else don't
     * @return {void}
     */
    flip(state: boolean): void;
    /**
     * @name setTint
     * @description set tint
     * @param {number} color - color tint
     * @return {void}
     */
    setTint(color: number): void;
    /**
     * @name destroy
     * @description cleanup
     * @return {void}
     */
    destroy(): void;
}
//# sourceMappingURL=BackgroundTile.d.ts.map