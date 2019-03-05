import * as PIXI from 'pixi.js';
import { ISprite } from './ISprite';
import { AnimatedSprite } from './AnimatedSprite';
import { TextSprite } from './TextSprite';
import { Scene } from './Scene';
import { Controller } from './Controller';
import { EventManager } from './EventManager';
import { Attribs } from './Attribs';
/**
 * @name Sprite
 * @description sprite object
 */
export declare class Sprite extends PIXI.Sprite implements ISprite {
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
    collisionWith: Sprite | AnimatedSprite | TextSprite | undefined;
    attribs: Attribs;
    scene: Scene;
    controller: Controller | undefined;
    /**
     * @name constructor
     * @description constructor
     * @param {Scene} scene - reference to parent scene
     * @param {string} name - name of sequence
     * @param {object} resources - loaded resources
     */
    constructor(scene: Scene, name: string, resources: any);
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
     * @param {Sprite | AnimatedSprite | TextSprite | undefined} sprite - anim with which collision has occured
     * @return {void}
     */
    onCollision(sprite: Sprite | AnimatedSprite | TextSprite | undefined): void;
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
//# sourceMappingURL=Sprite.d.ts.map