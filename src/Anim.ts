import * as PIXI from 'pixi.js';
import {IAnimCompatible} from './AnimCompatible';
import {EventManager} from './EventManager';
import {AnimatedSprite} from './AnimatedSprite';
import {Controller} from './Controller';
import {Scene} from './Scene';
import {Rect} from './Math';
import {Attribs} from './Attribs';
import {Utils} from './Utils';

interface ICallback { (): void };
interface IHash { [key: string]: {
  name: string,
  sequence: AnimatedSprite
}};

/**
 * @name Anim
 * @description Phoenix Game Engine Anim class
 */
export class Anim implements IAnimCompatible {
  public attributes: Attribs;
  private _id: string = (new Utils()).createID();
  private animationSequence: IHash = {};
  private lastSequenceName: string = '';
  private currentSequenceName: string = '';
  protected controller: Controller | undefined;
  private _x: number = 0;
  private _y: number = 0;
  private _z: number = 0;
  private _loop: boolean = false;
  private _rotation: number = 0;
  private _visible: boolean = true;
  private _health: number = 0;
  private _strength: number = 0;
  private _speed: number = 1;
  private _anchor: number = .5;
  private _dx: number = 0;
  private _dy: number = 0;
  private _vx: number = 0;
  private _vy: number = 0;
  private _sx: number = 1;
  private _sy: number = 1;
  private internalRect: Rect;
  private emptyRect: Rect;
  private tint: number = 0;
  private currentCollisionDetection: boolean = false;
  private animCollisionWith: Anim | undefined;
  protected scene: Scene;
  protected stage: PIXI.Container;
  private currentSequence: AnimatedSprite | undefined;

  /**
   * @name constructor
   * @description binds Anim to Scene
   */
  constructor(scene: Scene) {
    this.scene = scene;
    this.stage = scene.stage;
    this.attributes = new Attribs();
    this.emptyRect = new Rect(0,0,0,0);
    this.internalRect = new Rect(0,0,0,0);
  }

  /**
   * @name id
   * @description get anin id
   */
  get id(): string {
    return this._id;
  }

  /**
   * @name reset
   * @description reset anim - in cases where this anim is reused
   * @return {void}
   */
  reset(): void {
    this._id = (new Utils()).createID();
    this._x = 0;
    this._y= 0;
    this._z = 0;
    this._loop = false;
    this._rotation = 0;
    this._visible = true;
    this._speed = 1;
    this._anchor = .5;
    this._dx = 0;
    this._dy = 0;
    this._vx = 0;
    this._vy = 0;
    this._sx = 1;
    this._sy = 1;
    this.tint = 0;
    this.attributes.flush();
    this.internalRect = new Rect(0,0,0,0);
    this.currentCollisionDetection = false;
    this.animCollisionWith = undefined;
  }

  /**
   * @name attachController
   * @description attach a Controller
   * @return {void}
   */
  attachController(controller: Controller): void {
    this.controller = controller;
  }

  /**
   * @name setCacheAsBitmap
   * @description set cache as bitmap optimization. Should not be used when animation is intended.
   * @param {boolean} cache - true if yes cache, else false
   * @return {void}
   */
  setCacheAsBitmap(cache: boolean): void {
    if (this.currentSequence) {
      this.currentSequence.cacheAsBitmap = cache;
    }
  }

  /**
   * @name x
   * @description x position getter
   * @return {number} x position
   */
  get x(): number {
    return this._x;
  }

  /**
   * @name x
   * @description x position setter
   */
  set x(x: number) {
    this._x = x;
  }

  /**
   * @name y
   * @description y position getter
   * @return {number} y position
   */
  get y(): number {
    return this._y;
  }

  /**
   * @name y
   * @description y position setter
   */
  set y(y: number) {
    this._y = y;
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  get z(): number {
    return this._z;
  }

  /**
   * @name z
   * @description z position setter
   */
  set z(z: number) {
    this._z = z;
  }

  /**
   * @name rect
   * @description rect getter
   * @return {Rect} rect object from anim
   */
  get rect(): Rect {
    if (this.currentSequence) {
      this.internalRect.x = this.currentSequence.x;
      this.internalRect.y = this.currentSequence.y;
      this.internalRect.width = this.currentSequence.width;
      this.internalRect.height = this.currentSequence.height;
      return this.internalRect;
    }
    return this.emptyRect;
  }

  /**
   * @name visible
   * @description get visibility
   * @return {boolean} true if visible
   */
  get visible(): boolean {
    return this._visible;
  }

  /**
   * @name visible
   * @description set visibility
   */
  set visible(value: boolean) {
    this._visible = value;
  }

  /**
   * @name width
   * @description get the anim width
   * @return {number} anim width
   */
  get width(): number {
    let ret;
    if (this.currentSequence) {
      ret = this.currentSequence.width;
    } else {
      ret = 0;
    }
    return ret;
  }

  /**
   * @name height
   * @description get the anim height
   * @return {number} anim height
   */
  get height(): number {
    let ret;
    if (this.currentSequence) {
      ret = this.currentSequence.height;
    } else {
      ret = 0;
    }
    return ret;
  }

  /**
   * @name rotation
   * @description rotation getter
   * @return {number} rotation position
   */
  get rotation(): number {
    return this._rotation;
  }

  /**
   * @name rotation
   * @description rotation setter
   */
  set rotation(value: number) {
    this._rotation = value;
  }

  /**
   * @name animationSpeed
   * @description animationSpeed getter
   * @return {number} animation speed
   */
  get animationSpeed() : number {
    return this._speed;
  }

  /**
   * @name animationSpeed
   * @description animationSpeed setter
   */
  set animationSpeed(speed: number) {
    this._speed = speed;
  }

  /**
   * @name strength
   * @description get current strength
   * @return {number} strength
   */
  get strength(): number {
    return this._strength;
  }

  /**
   * @name strength
   * @description set current strength
   * @param {number} value - strength
   */
  set strength(value: number) {
    this._strength = value;
  }

  /**
   * @name health
   * @description get current health
   * @return {number} health
   */
  get health(): number {
    return this._health;
  }

  /**
   * @name health
   * @description set current health
   * @param {number} value - health
   */
  set health(value: number) {
    this._health = value;;
  }

  /**
   * @name sx
   * @description get anim scale x
   * @return {number} scale x
   */
  get sx(): number {
    return this._sx;
  }

  /**
   * @name sy
   * @description get anim scale y
   * @return {number} scale y
   */
  get sy(): number {
    return this._sy;
  }

  /**
   * @name sx
   * @description set anim scale x
   */
  set sx(value: number) {
    this._sx = value;
  }

  /**
   * @name sy
   * @description set anim scale y
   */
  set sy(value: number) {
    this._sy = value;
  }

  /**
   * @name anchor
   * @description anchor getter
   * @return {number} anchor position
   */
  get anchor(): number {
    return this._anchor;
  }

  /**
   * @name anchor
   * @description anchor setter
   */
  set anchor(value: number) {
    this._anchor = value;
  }

  /**
   * @name dx
   * @description direction X getter
   * @return {number} dx - direction X
   */
  get dx() : number {
    return this._dx;
  }

  /**
   * @name dx
   * @description direction X setter
   * @param {number} value - direction X
   */
  set dx(value: number) {
    this._dx = value;
  }

  /**
   * @name dy
   * @description direction Y getter
   * @return {number} dy - direction Y
   */
  get dy() : number {
    return this._dy;
  }

  /**
   * @name dy
   * @description direction Y setter
   * @param {number} value - direction Y
   */
  set dy(value: number) {
    this._dy = value;
  }

  /**
   * @name vx
   * @description velocity X getter
   * @return {number} vx - velocity X
   */
  get vx() : number {
    return this._vx;
  }

  /**
   * @name vx
   * @description velocity X setter
   * @param {number} value - velocity X
   */
  set vx(value: number) {
    this._vx = value;
  }

  /**
   * @name vy
   * @description velocity Y getter
   * @return {number} vy - velocity Y
   */
  get vy() : number {
    return this._vy;
  }

  /**
   * @name vy
   * @description velocity Y setter
   * @param {number} value - velocity Y
   */
  set vy(value: number) {
    this._vy = value;
  }

  /**
   * @name loop
   * @description get animation loop state
   * @return {boolean}
   */
  get loop(): boolean {
    return this._loop;
  }

  /**
   * @name loop
   * @description set animation loop state
   */
  set loop(value: boolean) {
    this._loop = value;
  }

  /**
   * @name get Attribs
   * @description get attribs bag
   * @return {Attribs} attribs bag
   */
  get attribs(): Attribs {
    return this.attributes;
  }

  /**
   * @name collisionDetection
   * @description collisionDetection getter
   * @return {boolean} collisionDetection position
   */
  get collisionDetection() : boolean {
    return this.currentCollisionDetection;
  }

  /**
   * @name collisionDetection
   * @description collisionDetection setter
   * @param {string} value - collisionDetection setting
   */
  set collisionDetection(value: boolean) {
    this.currentCollisionDetection = value;
  }

  /**
   * @name collisionWith
   * @description return Anim if collision else undefined
   * @return {Anim | undefined}
   */
  collisionWith(): Anim | undefined {
    return this.animCollisionWith;
  }

  /**
   * @name setTint
   * @description set tint
   * @param {number} color - color tint
   * @return {void}
   */
  setTint(color: number): void {
    this.tint = color;
  }

  /**
   * @name loadSequence
   * @description load a new animation sequence
   * @param {string} name - name of sequence
   * @param {string} atlas - sprite atlas name
   * @param {object} resources - loaded resources
   * @return {void}
   */
  loadSequence(name: string, atlas: string, resources: any): void {
    let sheet = resources[atlas].spritesheet;
    if (sheet) {
      let sequence = new AnimatedSprite(sheet.animations[name]);
      sequence.anim = this;
      sequence.visible = false;
      this.animationSequence[name] = {
        name,
        sequence
      };
      this.stage.addChild(sequence);
    }
  }

  /**
   * @name play
   * @description play an animation sequence
   * @param {string} sequenceName - name of sequence
   * @return {void}
   */
  play(sequenceName: string): void {
    if (this.lastSequenceName && sequenceName !== this.lastSequenceName) {
      this.animationSequence[this.lastSequenceName].sequence.visible = false;
    }
    this.lastSequenceName = sequenceName;
    this.currentSequenceName = sequenceName;
    this.currentSequence = <AnimatedSprite>this.animationSequence[this.currentSequenceName].sequence;
    if (this.currentSequence) {
      this.currentSequence.gotoAndPlay(0);
    }
  }

  /**
   * @name setFrame
   * @description set the frame of the current animation sequence
   * @param {number} frameNumber - frame number
   * @return {void}
   */
  setFrame(frameNumber: number): void {
    if (this.currentSequence) {
      this.currentSequence.gotoAndStop(frameNumber);
    }
  }

  /**
   * @name attachTouchHandler
   * @description attach a touch (click, press, touch) handler for this anim
   * @param {string} name - name of event
   * @param {EventManager} - instance of event eventManager
   * @return {void}
   */
  attachTouchHandler(name: string, eventManager: EventManager): void {
    if (this.currentSequence) {
      this.currentSequence.interactive = true;
      this.currentSequence.on('click', () => {
        eventManager.triggerEvent(name, this);
      });
      this.currentSequence.on('touchend', () => {
        eventManager.triggerEvent(name, this);
      });
    }
  }

  /**
   * @name update
   * @description update anim position based on velocity
   * @param {number} deltaTime - delta time offset
   * @return {void}
   */
  update(deltaTime: number): void {
    if (!this.currentSequenceName || this.currentSequenceName === '') {
      return;
    }

    if (this.controller) {
      this.controller.update(deltaTime);
    }
    let animSequenceEntry = this.animationSequence[this.currentSequenceName];
    if (animSequenceEntry && animSequenceEntry.sequence) {
      this.currentSequence = <AnimatedSprite>animSequenceEntry.sequence;
      this._x += this._dx * (this._vx || 1) * deltaTime;
      this._y += this._dy * (this._vy || 1) * deltaTime;
      this.currentSequence.visible = this._visible;
      this.currentSequence.loop = this._loop;
      this.currentSequence.x = this._x;
      this.currentSequence.y = this._y;
      this.currentSequence.scale.x = this._sx;
      this.currentSequence.scale.y = this._sy;
      this.currentSequence.rotation = this.rotation;
      this.currentSequence.animationSpeed = this._speed;
      this.currentSequence.anchor.set(this._anchor);
      if (this.tint !== 0) {
        this.currentSequence.tint = this.tint;
      }
    }
  }

  /**
   * @name onCollision
   * @description trigged when this anim collides with another anim
   * @param {Anim} anim - anim with which collision has occured
   * @return {void}
   */
  onCollision(anim: Anim): void {
    this.animCollisionWith = anim;
    if (this.controller) {
      this.controller.hitBy(anim);
    }
  }

  /**
   * @name clearCollision
   * @description clear collision event
   * @return {void}
   */
  clearCollision(): void {
    this.animCollisionWith = undefined;
  }

  /**
   * @name destroy
   * @description destroys anim and all sequences
   * @return {void}
   */
  destroy(): void {
    if (this.controller) {
      this.controller.destroy();
    }

    Object.keys(this.animationSequence).forEach((name) => {
      let sequence = this.animationSequence[name].sequence;
      sequence.visible = false;
      sequence.destroy({
        children: true,
        texture: false,
        baseTexture: false
      });
    });

    this.currentSequenceName = '';
  }
}
