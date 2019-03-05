import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { SpriteAnim, ISprite } from './ISprite';
import { Controller } from './Controller';
import { EventManager } from './EventManager';
import { Attribs } from './Attribs';
/**
 * @name TextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 * @todo: Uses anim simply to hold z value - cleanup later
 */
export declare class TextSprite extends PIXI.extras.BitmapText implements ISprite {
    subType: string;
    id: string;
    vx: number;
    vy: number;
    dx: number;
    dy: number;
    z: number;
    health: number;
    strength: number;
    collisionDetection: boolean;
    collisionWith: SpriteAnim | undefined;
    attribs: Attribs;
    scene: Scene;
    controller: Controller | undefined;
    /**
     * @name constructor
     * @description constructor pass throught to BitmapText
     * @param {Scene} scene - referene to parent scene
     * @param {string} text - text to display
     * @param {PIXI.extras.BitmapTextStyle} style - bitmap text styles
     */
    constructor(scene: Scene, text: string, style?: PIXI.extras.BitmapTextStyle | undefined);
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    attachController(controller: Controller): void;
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
     * @name onCollision
     * @description trigged when this anim collides with another anim
     * @param {SpriteAnim | undefined} sprite - anim with which collision has occured
     * @return {void}
     */
    onCollision(sprite: SpriteAnim | undefined): void;
    /**
     * @name clearCollision
     * @description clear collision event
     * @return {void}
     */
    clearCollision(): void;
    /**
     * @name destroy
     * @description cleanup
     */
    destroy(): void;
}
//# sourceMappingURL=TextSprite.d.ts.map