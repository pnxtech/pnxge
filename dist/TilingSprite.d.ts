import * as PIXI from 'pixi.js';
import { ISprite } from './ISprite';
import { Controller } from './Controller';
import { Scene } from './Scene';
import { Attribs } from './Attribs';
/**
 * @name TilingSprite
 * @description extends the PIXI TilingSprite to include additional fields
 * @note: uses PIXI TilingSprite
 */
export declare class TilingSprite extends PIXI.extras.TilingSprite implements ISprite {
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
    collisionWith: ISprite | undefined;
    attribs: Attribs;
    protected scene: Scene;
    constructor(scene: Scene, texture: PIXI.Texture, width: number, height: number);
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    attachController(controller: Controller): void;
    /**
     * @name onCollision
     * @description trigged when this anim collides with another anim
     * @param {ISprite} sprite - anim with which collision has occured
     * @return {void}
     */
    onCollision(sprite: ISprite): void;
    /**
     * @name clearCollision
     * @description clear collision event
     * @return {void}
     */
    clearCollision(): void;
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
//# sourceMappingURL=TilingSprite.d.ts.map