import { SpriteAnim } from './ISprite';
import { AnimatedSprite } from './AnimatedSprite';
import { Scene } from "./Scene";
import { Attribs } from './Attribs';
interface IProjectileObject {
    active?: boolean;
    animatedSprite?: AnimatedSprite;
    animSpeed?: number;
    name: string;
    type: string;
    subType: string;
    attribs: Attribs;
    strength: number;
    frame?: number;
    cacheFrame: boolean;
    rotation: number;
    rotationType?: string;
    rotationAmount?: number;
    scale: number;
    collisionDetection: boolean;
    x: number;
    y: number;
    z: number;
    dx: number;
    dy: number;
    vx: number;
    vy: number;
}
export interface ICollisionResolutionCallback {
    (projectileSprite: SpriteAnim | undefined, collisionSprite: SpriteAnim | undefined): boolean;
}
/**
 * @name ProjectileManager
 * @description Create and manages projectiles
 */
export declare class ProjectileManager {
    private projectiles;
    private scene;
    private atlas;
    private resources;
    private collisionResolutionHandler;
    /**
     * @name constructor
     * @description class constructor
     */
    constructor(scene: Scene, atlas: string, resources: {});
    /**
     * @name registerCollisionResolutionHandler
     * @description register a collision resolution callback handler
     * @param {ICollisionResolutionCallback} callback
     * @return {void}
     */
    registerCollisionResolutionHandler(callback: ICollisionResolutionCallback): void;
    /**
     * @name createProjectile
     * @description creates a projectile
     * @note projectile.name is the same name as the anim sequence, projectile.type is a generic type
     * @param {IProjectileObject} projectile - data
     * @return {void}
     */
    createProjectile(projectileInfo: IProjectileObject): void;
    /**
     * @name update
     * @description update projectiles
     * @param {number} deltaTime
     * @return {void}
     */
    update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=ProjectileManager.d.ts.map