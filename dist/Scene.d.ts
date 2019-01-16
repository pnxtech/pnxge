import * as PIXI from 'pixi.js';
import { Application } from './Application';
import { Anim } from './Anim';
import { Image } from './Image';
import { ProjectileManager } from './ProjectileManager';
import { SoundManager } from './SoundManager';
import { TextSprite } from './TextSprite';
import { IRecorderHash } from './Recorder';
interface IAnimHash {
    [key: string]: Anim | Image | TextSprite;
}
interface IAnimCallback {
    (anim: Anim | Image | TextSprite): void;
}
interface IAnimDoneCallback {
    (): void;
}
interface ITextsHash {
    [key: string]: string[];
}
/**
 * @name Scene
 * @description Phoenix Game Engine Scene class
 */
export declare class Scene {
    app: Application;
    protected sceneWidth: number;
    protected sceneHeight: number;
    stage: PIXI.Container;
    anims: IAnimHash;
    protected internalTick: number;
    protected projectileManager: ProjectileManager | undefined;
    protected soundManager: SoundManager | undefined;
    protected texts: ITextsHash;
    protected actionList: IRecorderHash;
    private sceneStarted;
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
     * @name attachTexts
     * @description attach asset texts data
     * @param {ITextsHash} texts - texts object
     * @return {void}
     */
    attachTexts(texts: ITextsHash): void;
    /**
     * @name attachActions
     * @description attach actions
     * @param {IRecorderHash} actionList - output from PNXRecorder
     * @return {void}
     */
    attachActions(actionList: IRecorderHash): void;
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
     * @name hitTestRectangle
     * @description check whether two anim objects have collided
     * @note this algorithm relies on the fact that sprites are by default setup with an anchor of 0.5
     * @param {Anim} a1 - first anim
     * @param {Anim} a2 - second anim
     * @return {boolean} bool - true if collision else false
     */
    hitTestRectangle(a1: Anim, a2: Anim): boolean;
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
     * @return {Anim | Image | undefined} of potential collision
     */
    lookAhead(anim: Anim, steps: number): Anim | Image | undefined;
    /**
     * @name destroy
     * @description remove Anim objects from scene
     * @return {void}
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=Scene.d.ts.map