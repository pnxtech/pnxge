import * as PIXI from 'pixi.js';
import { SpriteAnim, ISprite } from './ISprite';
import { EventManager } from './EventManager';
import { Controller } from './Controller';
import { Scene } from './Scene';
import { Attribs } from './Attribs';
/**
 * @name AnimatedSprite
 * @description Animated Sprite
 */
export declare class AnimatedSprite extends PIXI.extras.AnimatedSprite implements ISprite {
    subType: string;
    id: string;
    dx: number;
    dy: number;
    vx: number;
    vy: number;
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
     * @description binds Anim to Scene
     */
    constructor(scene: Scene, sequenceName: string, atlas: string, resources: any);
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
     * @description update anim position based on velocity
     * @param {number} deltaTime - delta time offset
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
     * @description destroys anim and all sequences
     * @return {void}
     */
    destroy(): void;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map