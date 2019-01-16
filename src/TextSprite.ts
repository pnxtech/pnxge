import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {IAnimCompatible} from './AnimCompatible';
import {Anim, AnimType} from './Anim';
import {createID} from './Math';

/**
 * @name TextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 */
export class TextSprite extends PIXI.extras.BitmapText {
  public id: string = createID();
  public zOrder: number = -1;
  public collisionDetection: boolean = false;
  public type: string = AnimType.TEXT;
  protected scene: Scene;
  public anim: Anim;

  /**
   * @name constructor
   * @description constructor pass throught to BitmapText
   * @param {Scene} scene - referene to parent scene
   * @param {string} text - text to display
   * @param {PIXI.extras.BitmapTextStyle} style - bitmap text styles
   */
  constructor(scene: Scene, text: string, style?: PIXI.extras.BitmapTextStyle | undefined) {
    super(text, style);
    this.scene = scene;
    this.anim = new Anim(this.scene);
    this.scene.stage.addChild(this);
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  get z(): number {
    return this.anim.z;
  }

  /**
   * @name z
   * @description z position setter
   */
  set z(z: number) {
    this.zOrder = z;
    this.anim.z = z;
  }

  /**
   * @name visible
   * @description get visibility
   * @return {boolean} true if visible
   */
  get visible(): boolean {
    return this.anim.visible;
  }

  /**
   * @name visible
   * @description set visibility
   */
  set visible(value: boolean) {
    this.anim.visible = value;
  }

  /**
   * @name setTint
   * @description set tint
   * @param {number} color - color tint
   * @return {void}
   */
  setTint(color: number):void {
    this.tint = color;
    this.anim.setTint(color);
  }

  /**
   * @name update
   * @description update handler
   * @param {number} deltaTime - delta time
   * @return {void}
   */
  update(deltaTime: number): void {
  }

  /**
   * @name destroy
   * @description cleanup
   */
  destroy() {
    this.scene.stage.removeChild(this);
  }
};
