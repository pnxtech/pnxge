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
export class TextSprite extends PIXI.extras.BitmapText implements IAnimCompatible {
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
   * @name text
   * @description get text
   * @return {string} text
   */
  get text(): string {
    return this.text;
  }

  /**
   * @name text
   * @description text setter
   * @param {string} text
   */
  set text(value: string) {
    this.text = value;
  }

  /**
   * @name visible
   * @description visible getter
   * @return {boolean} visible
   */
  get visible(): boolean {
    return this.visible;
  }

  /**
   * @name visible
   * @description visible setter
   * @param {boolean} value
   */
  set visible(value: boolean) {
    this.visible = value;
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
    this.anim.z = z;
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
