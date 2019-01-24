import * as PIXI from 'pixi.js';
import { IAnimCompatible } from './AnimCompatible';
import { Scene } from './Scene';
import { EventManager } from './EventManager';
import { Rect } from './Math';
import { Attribs } from './Attribs';
/**
 * @name Image
 * @description  image sprite
 */
export declare class Image extends PIXI.Sprite implements IAnimCompatible {
    id: string;
    attributes: Attribs;
    collisionDetection: boolean;
    anim: Image;
    protected scene: Scene;
    private _z;
    private _dx;
    private _dy;
    private _vx;
    private _vy;
    private internalRect;
    /**
     * @name constructor
     * @description constructor
     * @param {Scene} scene - reference to parent scene
     * @param {string} name - name of sequence
     * @param {object} resources - loaded resources
     */
    constructor(scene: Scene, name: string, resources: any);
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
     * @name setAnchor
     * @description set the anchor.x and .y value
     */
    setAnchor(value: number): void;
    /**
     * @name get attribs
     * @description get attributes
     * @return {Attribs} attributes
     */
    readonly attribs: Attribs;
    /**
     * @name rect
     * @description rect getter
     * @return {Rect} rect object from anim
     */
    readonly rect: Rect;
    /**
     * @name attachTouchHandler
     * @description attach a touch (click, press, touch) handler for this anim
     * @param {string} name - name of event
     * @param {EventManager} - instance of event eventManager
     * @return {void}
     */
    attachTouchHandler(name: string, eventManager: EventManager): void;
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
//# sourceMappingURL=Image.d.ts.map