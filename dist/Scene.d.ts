import * as PIXI from 'pixi.js';
import { Application } from './Application';
import { Anim } from './Anim';
import { Image } from './Image';
import { ProjectileManager } from './ProjectileManager';
import { SoundManager } from './SoundManager';
import { TextSprite } from './TextSprite';
import { Benchmark } from './Benchmark';
interface IAnimHash {
    [key: string]: Anim | Image | TextSprite;
}
interface IAnimCallback {
    (anim: Anim | Image | TextSprite): void;
}
interface IAnimDoneCallback {
    (): void;
}
/**
 * @name Scene
 * @description Phoenix Game Engine Scene class
 */
export declare class Scene {
    app: Application;
    private _state;
    protected sceneWidth: number;
    protected sceneHeight: number;
    protected benchmark: Benchmark;
    stage: PIXI.Container;
    anims: IAnimHash;
    protected internalTick: number;
    protected projectileManager: ProjectileManager | undefined;
    protected soundManager: SoundManager | undefined;
    private sceneStarted;
    private benchmarkUpdate;
    /**
     * @name constructor
     * @description initialize scene
     * @param {Application} application
     */
    constructor(app: Application);
    /**
     * @name attachProjectileManager
     * @description attach a projectile manager
     * @return {void}
     */
    attachProjectileManager(projectileManager: ProjectileManager): void;
    /**
     * @name getProjectileManager
     * @description retrieve a projectile manager instance or undefined
     * @return {ProjectileManager | undefined}
     */
    getProjectileManager(): ProjectileManager | undefined;
    /**
     * @name attachSoundManager
     * @description attach sound manager
     * @return {void}
     */
    attachSoundManager(soundManager: SoundManager): void;
    /**
     * @name state
     * @description state getter
     * @return {object}
     */
    /**
    * @name state
    * @description state setter
    * @param {any} data - object to be merged with state
    */
    state: any;
    /**
     * @name setState
     * @description merges object entries in to application state
     * @param {object} data - object to be merged with state
     * @return {object} new application state
     */
    setState(data: any): any;
    /**
     * @name getSoundManager
     * @description retrieve a sound manager instance or undefined
     * @return {SoundManager | undefined}
     */
    getSoundManager(): SoundManager | undefined;
    /**
     * @name start
     * @description start scene updates
     * @param {object} resources - loaded asset resources
     * @return {void}
     */
    start(resources: {}): void;
    /**
     * @name end
     * @description scene end handler
     * @param {string} outcome - result of scene ending
     * @return {void}
     */
    end(outcome: string): void;
    /**
     * @name hasSceneStarted
     * @description determine whether the scene has been started
     */
    hasSceneStarted(): boolean;
    /**
     * @name benchmarking
     * @description turn benchmarking on or off
     * @note displays via console.log
     * @return {void}
     */
    benchmarking(state: boolean): void;
    /**
     * @name tick
     * @description get internal tick count
     */
    readonly tick: number;
    /**
     * @name addAnim
     * @description add an anim to the scene
     * @param {string} name - name of anim
     * @param {Anim | Image | TextSprite} anim - anim objec
     */
    addAnim(name: string, anim: Anim | Image | TextSprite): void;
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
     * @name getAnim
     * @description get anim by name
     * @return {TextSprite} anim
     */
    getAnim(name: string): Anim | Image | TextSprite;
    /**
     * @name width
     * @description get the width of the scene
     * @return {number} width
     */
    readonly width: number;
    /**
     * @name height
     * @description get the height of the scene
     * @return {number} height
     */
    readonly height: number;
    /**
     * @name forEachAnim
     * @description enumerate anims
     * @param {IAnimCallback} callback - called for each anim
     * @param {IAnimDoneCallback} done - called when done
     * @return {void}
     */
    forEachAnim(callback: IAnimCallback, done: IAnimDoneCallback): void;
    /**
     * @name update
     * @description update the scene
     * @param {number} deltaTime
     * @return {void}
     */
    update(deltaTime: number): void;
    /**
     * @name sortAnims
     * @description sort dislay list based on anim z order
     * @return {void}
     */
    sortAnims(): void;
    /**
     * @name collisionDetection
     * @description collision detection system. notifies anim object when they collide with other objects
     * @return {void}
     */
    collisionDetection(): void;
    /**
     * @name lookAhead
     * @description looks ahead for current anim to
     * determine whether it will collide with another
     * anim within the number of steps specified.
     * @note uses the specified anim's direction and velocity vectors
     * @param {Anim} anim - animation object
     * @param {number} steps - number of steps to look ahead
     * @param {number} padding - padding to increase or decrease anim rect
     * @return {Anim | Image | undefined} of potential collision
     */
    lookAhead(anim: Anim, steps: number, padding?: number): Anim | Image | undefined;
    /**
     * @name destroy
     * @description remove Anim objects from scene
     * @return {void}
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=Scene.d.ts.map