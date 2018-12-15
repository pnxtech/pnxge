import * as PIXI from 'pixi.js';
import PNXAnimatedSprite from './PNXAnimatedSprite';
import PNXScene from './PNXScene';

interface ICallback { (): void };

interface IHash { [key: string]: {
  name: string,
  sequence: PNXAnimatedSprite
}};

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
  private animPivot: number = .5;
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
  get anchor() : number {
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
   * @name pivot
   * @description pivot getter
   * @return {number} pivot position
   */
  get pivot() : number {
    return this.animPivot;
  }

  /**
   * @name pivot
   * @description pivot setter
   */
  set pivot(value: number) {
    this.animPivot = value;
    if (this.currentSequence) {
      this.currentSequence.pivot.set(this.animPivot);
    }
  }

  /**
   * @name loadSequence
   * @description load a new animation sequence
   * @param {string} name - name of sequence
   * @param {object} resources - loaded resources
   * @return {void}
   */
  loadSequence(name: string, resources: any): void {
    let path: string = `${name}.json`;
    let sheet = resources[path].spritesheet;
    if (sheet) {
      let sequence = new PNXAnimatedSprite(sheet.animations[name]);
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
    this.currentSequence.zOrder = this.currentZ;

    this.currentSequence.rotation = this.rotation;
    this.currentSequence.animationSpeed = this.animSpeed;
    this.currentSequence.anchor.set(this.animAnchor);
    this.currentSequence.pivot.set(this.animPivot);
    this.currentSequence.gotoAndPlay(0);
  }

  /**
   * @name destroy
   * @description destroys anim and all sequences
   * @return {void}
   */
  destroy(): void {
    for (let animSequence of this.animationSequence) {
      animSequence.sequence.visible = false;
      animSequence.sequence.destroy({
        children: true,
        texture: false,
        baseTexture: false
      });
    }
  }
}
