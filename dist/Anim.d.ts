import * as PIXI from 'pixi.js';
import { IAnimCompatible } from './AnimCompatible';
import { EventManager } from './EventManager';
import { Controller } from './Controller';
import { Scene } from './Scene';
import { Rect } from './Math';
import { Attribs } from './Attribs';
/**
 * @name Anim
 * @description Phoenix Game Engine Anim class
 */
export declare class Anim implements IAnimCompatible {
    attributes: Attribs;
    private _id;
    private animationSequence;
    private lastSequenceName;
    private currentSequenceName;
    protected controller: Controller | undefined;
    private _x;
    private _y;
    private _z;
    private _loop;
    private _rotation;
    private _visible;
    private _health;
    private _strength;
    private _speed;
    private _alpha;
    private _anchor;
    private _dx;
    private _dy;
    private _vx;
    private _vy;
    private _sx;
    private _sy;
    private internalRect;
    private emptyRect;
    private tint;
    private currentCollisionDetection;
    private animCollisionWith;
    protected scene: Scene;
    protected stage: PIXI.Container;
    private currentSequence;
    /**
     * @name constructor
     * @description binds Anim to Scene
     */
    constructor(scene: Scene);
    /**
     * @name id
     * @description get anin id
     */
    readonly id: string;
    /**
     * @name reset
     * @description reset anim - in cases where this anim is reused
     * @return {void}
     */
    reset(): void;
    /**
     * @name attachController
     * @description attach a Controller
     * @return {void}
     */
    attachController(controller: Controller): void;
    /**
     * @name setCacheAsBitmap
     * @description set cache as bitmap optimization. Should not be used when animation is intended.
     * @param {boolean} cache - true if yes cache, else false
     * @return {void}
     */
    setCacheAsBitmap(cache: boolean): void;
    /**
     * @name x
     * @description x position getter
     * @return {number} x position
     */
    /**
    * @name x
    * @description x position setter
    */
    x: number;
    /**
     * @name y
     * @description y position getter
     * @return {number} y position
     */
    /**
    * @name y
    * @description y position setter
    */
    y: number;
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
     * @name rect
     * @description rect getter
     * @return {Rect} rect object from anim
     */
    readonly rect: Rect;
    /**
     * @name visible
     * @description get visibility
     * @return {boolean} true if visible
     */
    /**
    * @name visible
    * @description set visibility
    */
    visible: boolean;
    /**
     * @name width
     * @description get the anim width
     * @return {number} anim width
     */
    readonly width: number;
    /**
     * @name height
     * @description get the anim height
     * @return {number} anim height
     */
    readonly height: number;
    /**
     * @name rotation
     * @description rotation getter
     * @return {number} rotation position
     */
    /**
    * @name rotation
    * @description rotation setter
    */
    rotation: number;
    /**
     * @name animationSpeed
     * @description animationSpeed getter
     * @return {number} animation speed
     */
    /**
    * @name animationSpeed
    * @description animationSpeed setter
    */
    animationSpeed: number;
    /**
     * @name strength
     * @description get current strength
     * @return {number} strength
     */
    /**
    * @name strength
    * @description set current strength
    * @param {number} value - strength
    */
    strength: number;
    /**
     * @name health
     * @description get current health
     * @return {number} health
     */
    /**
    * @name health
    * @description set current health
    * @param {number} value - health
    */
    health: number;
    /**
     * @name sx
     * @description get anim scale x
     * @return {number} scale x
     */
    /**
    * @name sx
    * @description set anim scale x
    */
    sx: number;
    /**
     * @name sy
     * @description get anim scale y
     * @return {number} scale y
     */
    /**
    * @name sy
    * @description set anim scale y
    */
    sy: number;
    /**
     * @name alpha
     * @description alpha getter
     * @return {number} alpha value
     */
    /**
    * @name alpha
    * @description alpha setter
    */
    alpha: number;
    /**
     * @name anchor
     * @description anchor getter
     * @return {number} anchor position
     */
    /**
    * @name anchor
    * @description anchor setter
    */
    anchor: number;
    /**
     * @name dx
     * @description direction X getter
     * @return {number} dx - direction X
     */
    /**
    * @name dx
    * @description direction X setter
    * @param {number} value - direction X
    */
    dx: number;
    /**
     * @name dy
     * @description direction Y getter
     * @return {number} dy - direction Y
     */
    /**
    * @name dy
    * @description direction Y setter
    * @param {number} value - direction Y
    */
    dy: number;
    /**
     * @name vx
     * @description velocity X getter
     * @return {number} vx - velocity X
     */
    /**
    * @name vx
    * @description velocity X setter
    * @param {number} value - velocity X
    */
    vx: number;
    /**
     * @name vy
     * @description velocity Y getter
     * @return {number} vy - velocity Y
     */
    /**
    * @name vy
    * @description velocity Y setter
    * @param {number} value - velocity Y
    */
    vy: number;
    /**
     * @name loop
     * @description get animation loop state
     * @return {boolean}
     */
    /**
    * @name loop
    * @description set animation loop state
    */
    loop: boolean;
    /**
     * @name get Attribs
     * @description get attribs bag
     * @return {Attribs} attribs bag
     */
    readonly attribs: Attribs;
    /**
     * @name collisionDetection
     * @description collisionDetection getter
     * @return {boolean} collisionDetection position
     */
    /**
    * @name collisionDetection
    * @description collisionDetection setter
    * @param {string} value - collisionDetection setting
    */
    collisionDetection: boolean;
    /**
     * @name collisionWith
     * @description return Anim if collision else undefined
     * @return {Anim | undefined}
     */
    collisionWith(): Anim | undefined;
    /**
     * @name setTint
     * @description set tint
     * @param {number} color - color tint
     * @return {void}
     */
    setTint(color: number): void;
    /**
     * @name loadSequence
     * @description load a new animation sequence
     * @param {string} name - name of sequence
     * @param {string} atlas - sprite atlas name
     * @param {object} resources - loaded resources
     * @return {void}
     */
    loadSequence(name: string, atlas: string, resources: any): void;
    /**
     * @name play
     * @description play an animation sequence
     * @param {string} sequenceName - name of sequence
     * @return {void}
     */
    play(sequenceName: string): void;
    /**
     * @name setFrame
     * @description set the frame of the current animation sequence
     * @param {number} frameNumber - frame number
     * @return {void}
     */
    setFrame(frameNumber: number): void;
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
     * @param {Anim} anim - anim with which collision has occured
     * @return {void}
     */
    onCollision(anim: Anim): void;
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
//# sourceMappingURL=Anim.d.ts.map