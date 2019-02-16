import { Anim } from './Anim';
import { Scene } from './Scene';
import { PathElement } from './Path';
/**
 * @name Controller
 * @description  Controller base class
 */
export declare class Controller {
    protected anim: Anim | undefined;
    private pathCache;
    private currentPath;
    private currentPathIndex;
    private isPathComplete;
    /**
     * @name constructor
     * @description class contructor
     * @param {string} name - of anim which will be controlled
     * @param {Scene} scene - where anim was loaded
     */
    constructor(name: string, scene: Scene);
    /**
     * @name moveLeft
     * @description handle movement left
     * @return {void}
     */
    moveLeft(): void;
    /**
     * @name moveRight
     * @description handle movement right
     * @return {void}
     */
    moveRight(): void;
    /**
     * @name hitBy
     * @description handle when this anim controller is hit by an anim
     * @param {Anim} anim - which hit this controller
     */
    hitBy(anim: Anim): void;
    /**
     * @name fire
     * @description handler to fire a projectile
     * @return {void}
     */
    fire(): void;
    /**
     * @name addPathString
     * @description register a path
     * @param {string} pathName - name of path
     * @param {string} pathString - path data in string form
     * @param {number} rotationCorrection - optional correction in radian
     * @return {void}
     */
    addPathString(pathName: string, pathString: string, rotationCorrection?: number): void;
    /**
     * @name addPathArray
     * @description register a path
     * @param {string} pathName - name of path
     * @param {PathElement[]} pathArray[] - path data in array form
     * @param {number} rotationCorrection - optional correction in radian
     * @return {void}
     */
    addPathArray(pathName: string, pathArray: PathElement[], rotationCorrection?: number): void;
    /**
     * @name triggerPath
     * @description trigger the execution of a path
     * @param {string} pathName - path to execute
     */
    triggerPath(pathName: string): void;
    /**
     * @name pathIndex
     * @description index within path
     * @return {number} index - will return -1 if a path isn't active
     */
    readonly pathIndex: number;
    /***
     * @name pathComplete
     * @description Returns true of path traversal is complete
     * @return {boolean} is path complete?
     */
    readonly pathComplete: boolean;
    /**
     * @name pathCompleted
     * @description called when path is completed
     * @return {void}
     */
    protected pathCompleted(): void;
    /**
     * @name update
     * @description update anim based on path
     * @param {number} deltaTime - delta time offset
     * @return {void}
     */
    update(deltaTime: number): void;
    /**
     * @name destroy
     * @description cleanup
     * @return {void}
     */
    destroy(): void;
}
//# sourceMappingURL=Controller.d.ts.map