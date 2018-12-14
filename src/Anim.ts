import * as PIXI from 'pixi.js';
import Scene from './Scene';
import AnimatedSprite = PIXI.extras.AnimatedSprite;

interface ICallback { (): void };
interface IHash { [key: string]: {
  name: string,
  sequence: PIXI.extras.AnimatedSprite
}};

// uses PIXI AnimatedSprite https://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html
export default class Anim {
  private animationSequence: IHash = {};
  private lastSequenceName: string = '';
  private currentSequenceName: string = '';
  private currentX: number = 0;
  private currentY: number = 0;
  private currentRotation: number = 0;
  private animSpeed: number = 1;
  private animAnchor: number = .5;
  private animPivot: number = .5;
  private stage: PIXI.Container;
  private currentSequence: PIXI.extras.AnimatedSprite | undefined;

  /**
   * @name constructor
   * @description binds Anim to Scene
   */
  constructor(scene: Scene) {
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
   * @name s
   * @description x position setter
   */
  set y(y: number) {
    this.currentY = y;
    if (this.currentSequence) {
      this.currentSequence.y = this.currentY;
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
   * @param {string} path - path to sequence asset
   * @param {ICallback} postLoadHandler - callback on load
   * @return {void}
   */
  loadSequence(name: string, path: string, postLoadHandler: ICallback): void {
    PIXI.loader.add(path).load();
    PIXI.loader.once('complete', () => {
      let sheet = PIXI.loader.resources[path].spritesheet;
      if (sheet) {
        let sequence = new AnimatedSprite(sheet.animations[name]);
        sequence.renderable = false;
        this.animationSequence[name] = {
          name,
          sequence
        };
        this.stage.addChild(sequence);
      }
      postLoadHandler();
    });
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
      this.animationSequence[this.lastSequenceName].sequence.renderable = false;
    }
    this.lastSequenceName = sequenceName;
    this.currentSequenceName = sequenceName;
    this.currentSequence = this.animationSequence[this.currentSequenceName].sequence;
    this.currentSequence.renderable = true;
    this.currentSequence.loop = loop;
    this.currentSequence.play();
  }
}
