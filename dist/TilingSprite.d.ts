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
    collisionDetection: boolean;
    anim: Anim;
    private _attribs;
    private _z;
    private _internalAnchor;
    private _dx;
    private _dy;
    private _vx;
    private _vy;
    constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number);
    /**
     * @name x
     * @description x position getter
     * @return {number} x position
     */
    /**
    * @name x
    * @description x position setter
    */
    x: number;
    /**
     * @name y
     * @description y position getter
     * @return {number} y position
     */
    /**
    * @name y
    * @description y position setter
    */
    y: number;
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
     * @name visible
     * @description get visibility
     * @return {boolean} true if visible
     */
    /**
    * @name visible
    * @description set visibility
    */
    visible: boolean;
    /**
     * @name width
     * @description get the anim width
     * @return {number} anim width
     */
    readonly width: number;
    /**
     * @name height
     * @description get the anim height
     * @return {number} anim height
     */
    readonly height: number;
    /**
     * @name setAnchor
     * @description set the anchor.x and .y value
     */
    setAnchor(value: number): void;
    /**
     * @name rotation
     * @description rotation getter
     * @return {number} rotation position
     */
    /**
    * @name rotation
    * @description rotation setter
    */
    rotation: number;
    /**
     * @name sx
     * @description get anim scale x
     * @return {number} scale x
     */
    /**
    * @name sx
    * @description set anim scale x
    */
    sx: number;
    /**
     * @name sy
     * @description get anim scale y
     * @return {number} scale y
     */
    /**
    * @name sy
    * @description set anim scale y
    */
    sy: number;
    /**
     * @name dx
     * @description direction X getter
     * @return {number} dx - direction X
     */
    /**
    * @name dx
    * @description direction X setter
    * @param {number} value - direction X
    */
    dx: number;
    /**
     * @name dy
     * @description direction Y getter
     * @return {number} dy - direction Y
     */
    /**
    * @name dy
    * @description direction Y setter
    * @param {number} value - direction Y
    */
    dy: number;
    /**
     * @name vx
     * @description velocity X getter
     * @return {number} vx - velocity X
     */
    /**
    * @name vx
    * @description velocity X setter
    * @param {number} value - velocity X
    */
    vx: number;
    /**
     * @name vy
     * @description velocity Y getter
     * @return {number} vy - velocity Y
     */
    /**
    * @name vy
    * @description velocity Y setter
    * @param {number} value - velocity Y
    */
    vy: number;
    /**
     * @name get Attribs
     * @description get attributes
     * @return {Attribs} attributes
     */
    readonly attribs: Attribs;
}
//# sourceMappingURL=TilingSprite.d.ts.map