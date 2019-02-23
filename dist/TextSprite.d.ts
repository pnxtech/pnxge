import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { Anim } from './Anim';
import { Attribs } from './Attribs';
/**
 * @name TextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 */
export declare class TextSprite extends PIXI.extras.BitmapText {
    id: string;
    zOrder: number;
    collisionDetection: boolean;
    protected scene: Scene;
    anim: Anim;
    attributes: Attribs;
    /**
     * @name constructor
     * @description constructor pass throught to BitmapText
     * @param {Scene} scene - referene to parent scene
     * @param {string} text - text to display
     * @param {PIXI.extras.BitmapTextStyle} style - bitmap text styles
     */
    constructor(scene: Scene, text: string, style?: PIXI.extras.BitmapTextStyle | undefined);
    /**
     * @name z
     * @description z position getter
     * @return {number} z position
     */
    /**
    * @name z
    * @description z position setter
    */
    z: number;
    /**
     * @name get Attribs
     * @description get attributes
     * @return {Attribs} attributes
     */
    readonly attribs: Attribs;
    /**
     * @name setTint
     * @description set tint
     * @param {number} color - color tint
     * @return {void}
     */
    setTint(color: number): void;
    /**
     * @name update
     * @description update handler
     * @param {number} deltaTime - delta time
     * @return {void}
     */
    update(deltaTime: number): void;
    /**
     * @name destroy
     * @description cleanup
     */
    destroy(): void;
}
//# sourceMappingURL=TextSprite.d.ts.map