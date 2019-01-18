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
    anim: Image | undefined;
    protected scene: Scene;
    private zOrder;
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