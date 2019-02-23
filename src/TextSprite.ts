import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {Anim} from './Anim';
import {Utils} from './Utils';
import {Attribs} from './Attribs';

/**
 * @name TextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 */
export class TextSprite extends PIXI.extras.BitmapText {
  //#region variables
  public id: string = (new Utils()).createID();
  public zOrder: number = -1;
  public collisionDetection: boolean = false;
  protected scene: Scene;
  public anim: Anim;
  public attributes: Attribs;
  //#endregion

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
    this.attributes = new Attribs();
    this.attributes.add('text');
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  public get z(): number {
    return this.anim.z;
  }

  /**
   * @name z
   * @description z position setter
   */
  public set z(z: number) {
    this.zOrder = z;
    this.anim.z = z;
  }

  // /**
  //  * @name alpha
  //  * @description alpha getter
  //  * @return {number} alpha value
  //  */
  // public get alpha(): number {
  //   return (this.anim) ? this.anim.alpha : 1;
  // }

  // /**
  //  * @name alpha
  //  * @description alpha setter
  //  */
  // public set alpha(value: number) {
  //   if (this.anim) {
  //     this.anim.alpha = value;
  //   }
  // }

  /**
   * @name get Attribs
   * @description get attributes
   * @return {Attribs} attributes
   */
  public get attribs(): Attribs {
    return this.attributes;
  }

  // /**
  //  * @name visible
  //  * @description get visibility
  //  * @return {boolean} true if visible
  //  */
  // public get visible(): boolean {
  //   return (this.anim) ? this.anim.visible : false;
  // }

  // /**
  //  * @name visible
  //  * @description set visibility
  //  */
  // public set visible(value: boolean) {
  //   if (this.anim) {
  //     this.anim.visible = value;
  //   }
  // }

  /**
   * @name setTint
   * @description set tint
   * @param {number} color - color tint
   * @return {void}
   */
  public setTint(color: number):void {
    this.tint = color;
    // this.anim.setTint(color);
  }

  /**
   * @name update
   * @description update handler
   * @param {number} deltaTime - delta time
   * @return {void}
   */
  public update(deltaTime: number): void {
  }

  /**
   * @name destroy
   * @description cleanup
   */
  public destroy() {
    this.scene.stage.removeChild(this);
  }
};
