import * as PIXI from 'pixi.js';
import {IAnimCompatible} from './AnimCompatible';
import {EventManager} from './EventManager';
import {AnimatedSprite} from './AnimatedSprite';
import {IController} from './Controller';
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
  private animID: string = (new Utils()).createID();
  private animationSequence: IHash = {};
  private lastSequenceName: string = '';
  private currentSequenceName: string = '';
  protected controller: IController | undefined;
  private currentX: number = 0;
  private currentY: number = 0;
  private currentZ: number = 0;
  private currentLoop: boolean = false;
  private currentRotation: number = 0;
  private currentVisible: boolean = true;
  private currentHealth: number = 0;
  private currentStrength: number = 0;
  private animSpeed: number = 1;
  private animAnchor: number = .5;
  private directionX: number = 0;
  private directionY: number = 0;
  private velocityX: number = 0;
  private velocityY: number = 0;
  private scaleX: number = 1;
  private scaleY: number = 1;
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
    return this.animID;
  }

  /**
   * @name reset
   * @description reset anim - in cases where this anim is reused
   * @return {void}
   */
  reset(): void {
    this.animID = (new Utils()).createID();
    this.currentX = 0;
    this.currentY= 0;
    this.currentZ = 0;
    this.currentLoop = false;
    this.currentRotation = 0;
    this.currentVisible = true;
    this.animSpeed = 1;
    this.animAnchor = .5;
    this.directionX = 0;
    this.directionY = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleX = 1;
    this.scaleY = 1;
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
  attachController(controller: IController): void {
    this.controller = controller;
  }

  /**
   * @name x
   * @description x position getter
   * @return {number} x position
   */
  get x(): number {
    return this.currentX;
  }

  /**
   * @name x
   * @description x position setter
   */
  set x(x: number) {
    this.currentX = x;
  }

  /**
   * @name y
   * @description y position getter
   * @return {number} y position
   */
  get y(): number {
    return this.currentY;
  }

  /**
   * @name y
   * @description y position setter
   */
  set y(y: number) {
    this.currentY = y;
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  get z(): number {
    return this.currentZ;
  }

  /**
   * @name z
   * @description z position setter
   */
  set z(z: number) {
    this.currentZ = z;
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
    return this.currentVisible;
  }

  /**
   * @name visible
   * @description set visibility
   */
  set visible(value: boolean) {
    this.currentVisible = value;
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
    return this.currentRotation;
  }

  /**
   * @name rotation
   * @description rotation setter
   */
  set rotation(value: number) {
    this.currentRotation = value;
  }

  /**
   * @name animationSpeed
   * @description animationSpeed getter
   * @return {number} animation speed
   */
  get animationSpeed() : number {
    return this.animSpeed;
  }

  /**
   * @name animationSpeed
   * @description animationSpeed setter
   */
  set animationSpeed(speed: number) {
    this.animSpeed = speed;
  }

  /**
   * @name strength
   * @description get current strength
   * @return {number} strength
   */
  get strength(): number {
    return this.currentStrength;
  }

  /**
   * @name strength
   * @description set current strength
   * @param {number} value - strength
   */
  set strength(value: number) {
    this.currentStrength = value;
  }

  /**
   * @name health
   * @description get current health
   * @return {number} health
   */
  get health(): number {
    return this.currentHealth;
  }

  /**
   * @name health
   * @description set current health
   * @param {number} value - health
   */
  set health(value: number) {
    this.currentHealth = value;;
  }

  /**
   * @name sx
   * @description get anim scale x
   * @return {number} scale x
   */
  get sx(): number {
    return this.scaleX;
  }

  /**
   * @name sy
   * @description get anim scale y
   * @return {number} scale y
   */
  get sy(): number {
    return this.scaleY;
  }

  /**
   * @name sx
   * @description set anim scale x
   */
  set sx(value: number) {
    this.scaleX = value;
  }

  /**
   * @name sy
   * @description set anim scale y
   */
  set sy(value: number) {
    this.scaleY = value;
  }

  /**
   * @name anchor
   * @description anchor getter
   * @return {number} anchor position
   */
  get anchor(): number {
    return this.animAnchor;
  }

  /**
   * @name anchor
   * @description anchor setter
   */
  set anchor(value: number) {
    this.animAnchor = value;
  }

  /**
   * @name dx
   * @description direction X getter
   * @return {number} dx - direction X
   */
  get dx() : number {
    return this.directionX;
  }

  /**
   * @name dx
   * @description direction X setter
   * @param {number} value - direction X
   */
  set dx(value: number) {
    this.directionX = value;
  }

  /**
   * @name dy
   * @description direction Y getter
   * @return {number} dy - direction Y
   */
  get dy() : number {
    return this.directionY;
  }

  /**
   * @name dy
   * @description direction Y setter
   * @param {number} value - direction Y
   */
  set dy(value: number) {
    this.directionY = value;
  }

  /**
   * @name vx
   * @description velocity X getter
   * @return {number} vx - velocity X
   */
  get vx() : number {
    return this.velocityX;
  }

  /**
   * @name vx
   * @description velocity X setter
   * @param {number} value - velocity X
   */
  set vx(value: number) {
    this.velocityX = value;
  }

  /**
   * @name vy
   * @description velocity Y getter
   * @return {number} vy - velocity Y
   */
  get vy() : number {
    return this.velocityY;
  }

  /**
   * @name vy
   * @description velocity Y setter
   * @param {number} value - velocity Y
   */
  set vy(value: number) {
    this.velocityY = value;
  }

  /**
   * @name loop
   * @description get animation loop state
   * @return {boolean}
   */
  get loop(): boolean {
    return this.currentLoop;
  }

  /**
   * @name loop
   * @description set animation loop state
   */
  set loop(value: boolean) {
    this.currentLoop = value;
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
      sequence.cacheAsBitmap = true;
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
      this.currentX += this.directionX * (this.velocityX || 1) * deltaTime;
      this.currentY += this.directionY * (this.velocityY || 1) * deltaTime;
      this.currentSequence.visible = this.currentVisible;
      this.currentSequence.loop = this.currentLoop;
      this.currentSequence.x = this.currentX;
      this.currentSequence.y = this.currentY;
      this.currentSequence.scale.x = this.scaleX;
      this.currentSequence.scale.y = this.scaleY;
      this.currentSequence.rotation = this.rotation;
      this.currentSequence.animationSpeed = this.animSpeed;
      this.currentSequence.anchor.set(this.animAnchor);
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
