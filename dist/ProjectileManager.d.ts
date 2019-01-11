import { Anim } from "./Anim";
import { Scene } from "./Scene";
interface IProjectileObject {
    active?: boolean;
    anim?: Anim;
    animSpeed?: number;
    name: string;
    type: string;
    strength: number;
    frame?: number;
    rotation: number;
    rotationType?: string;
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
/**
 * @name ProjectileManager
 * @description Create and manages projectiles
 */
export declare class ProjectileManager {
    private projectiles;
    private scene;
    private atlas;
    private resources;
    /**
     * @name constructor
     * @description class constructor
     */
    constructor(scene: Scene, atlas: string, resources: {});
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