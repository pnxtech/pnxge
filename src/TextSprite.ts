import * as PIXI from 'pixi.js';
import {Scene} from './Scene';
import {Anim} from './Anim';
import {Utils} from './Utils';
import {Attribs} from './Attribs';

/**
 * @name TextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 * @todo: Uses anim simply to hold z value - cleanup later
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

  /**
   * @name setTint
   * @description set tint
   * @param {number} color - color tint
   * @return {void}
   */
  public setTint(color: number):void {
    this.tint = color;
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
