import * as PIXI from 'pixi.js';
import PNXAnimatedSprite from './PNXAnimatedSprite';
import PNXScene from './PNXScene';

interface ICallback { (): void };
interface IHash { [key: string]: {
  name: string,
  sequence: PNXAnimatedSprite
}};

export enum AnimType {
  HERO = 'hero',
  BULLET = 'bullet',
  EXPLOSION = 'explosion',
  BACKGROUND = 'background',
  TEXT = 'text'
};

/**
 * @name PNXAnim
 * @description Phoenix Game Engine Anim class
 */
export default class PNXAnim {
  private animationSequence: IHash = {};
  private lastSequenceName: string = '';
  private currentSequenceName: string = '';
  private currentX: number = 0;
  private currentY: number = 0;
  private currentZ: number = 0;
  private currentRotation: number = 0;
  private animSpeed: number = 1;
  private animAnchor: number = .5;
  private directionX: number = 0;
  private directionY: number = 0;
  private velocityX: number = 0;
  private velocityY: number = 0;
  private animType: string = '';
  private currentCollisionDetection: boolean = false;
  private scene: PNXScene;
  private stage: PIXI.Container;
  private currentSequence: PNXAnimatedSprite | undefined;

  /**
   * @name constructor
   * @description binds Anim to Scene
   */
  constructor(scene: PNXScene) {
    this.scene = scene;
    this.stage = scene.stage;
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
    if (this.currentSequence) {
      this.currentSequence.x = this.currentX;
    }
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
    if (this.currentSequence) {
      this.currentSequence.y = this.currentY;
    }
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
    if (this.currentSequence) {
      this.scene.sortAnims();
    }
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
    if (this.currentSequence) {
      this.currentSequence.rotation = this.currentRotation;
    }
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
    if (this.currentSequence) {
      this.currentSequence.animationSpeed = this.animSpeed;
    }
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
    if (this.currentSequence) {
      this.currentSequence.anchor.set(this.animAnchor);
    }
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
    if (this.currentSequence) {
      this.currentSequence.dx = value;
    }
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
    if (this.currentSequence) {
      this.currentSequence.dy = value;
    }
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
    if (this.currentSequence) {
      this.currentSequence.vx = value;
    }
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
    if (this.currentSequence) {
      this.currentSequence.vy = value;
    }
  }

  /**
   * @name type
   * @description type getter
   * @return {string} vy position
   */
  get type() : string {
    return this.animType;
  }

  /**
   * @name type
   * @description type setter
   * @param {string} value - anim type
   */
  set type(value: string) {
    this.animType = value;
    if (this.currentSequence) {
      this.currentSequence.type = value;
    }
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
    if (this.currentSequence) {
      this.currentSequence.collisionDetection = value;
    }
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
      let sequence = new PNXAnimatedSprite(sheet.animations[name]);
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
   * @param {boolean} loop - whether animation sequence loops
   * @return {void}
   */
  play(sequenceName: string, loop: boolean = false): void {
    if (this.lastSequenceName) {
      this.animationSequence[this.lastSequenceName].sequence.visible = false;
    }
    this.lastSequenceName = sequenceName;
    this.currentSequenceName = sequenceName;
    this.currentSequence = <PNXAnimatedSprite>this.animationSequence[this.currentSequenceName].sequence;
    this.currentSequence.visible = true;
    this.currentSequence.loop = loop;
    this.currentSequence.x = this.currentX;
    this.currentSequence.y = this.currentY;
    this.currentSequence.dx = this.directionX;
    this.currentSequence.dy = this.directionY;
    this.currentSequence.vx = this.velocityX;
    this.currentSequence.vy = this.velocityY;
    this.currentSequence.zOrder = this.currentZ;
    this.currentSequence.type = this.animType;
    this.currentSequence.rotation = this.rotation;
    this.currentSequence.animationSpeed = this.animSpeed;
    this.currentSequence.anchor.set(this.animAnchor);
    this.currentSequence.collisionDetection = this.currentCollisionDetection;
    this.currentSequence.gotoAndPlay(0);
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
   * @name update
   * @description update anim position based on velocity
   * @param {number} delta - delta time offset
   * @return {void}
   */
  update(delta: number = 0): void {
    if (this.currentSequence) {
      this.currentSequence.x += this.currentSequence.dx * this.currentSequence.vx;
      this.currentSequence.y += this.currentSequence.dy * this.currentSequence.vy;
      this.currentX = this.currentSequence.x;
      this.currentY = this.currentSequence.y;
    }
  }

  /**
   * @name onCollision
   * @description trigged when this anim collides with another anim
   * @param {PNXAnim} anim - anim with which collision has occured
   * @return {void}
   */
  onCollision(anim: PNXAnim): void {
    console.log(`anim:${this.type} collided with anim:${anim.type}`);
  }

  /**
   * @name destroy
   * @description destroys anim and all sequences
   * @return {void}
   */
  destroy(): void {
    for (let animSequence of <any>this.animationSequence) {
      animSequence.sequence.visible = false;
      animSequence.sequence.destroy({
        children: true,
        texture: false,
        baseTexture: false
      });
    }
  }
}
