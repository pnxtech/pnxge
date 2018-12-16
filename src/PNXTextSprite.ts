import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';

/**
 * @name PNXTextSprite
 * @description extends the PIXI BitmapText to include additional fields
 * @note: uses PIXI BitmapText
 */
export default class PNXTextSprite extends PIXI.extras.BitmapText {
  public id: string;
  public zOrder: number = -1;
  public vx: number = 0; // velocityX
  public vy: number = 0; // velocityY
  public collisionDetection: boolean = false;
  public type: string = 'text';
  protected scene: PNXScene;

  /**
   * @name constructor
   * @description constructor pass throught to BitmapText
   * @param {PNXScene} scene - referene to parent scene
   * @param {string} text - text to display
   * @param {PIXI.extras.BitmapTextStyle} style - bitmap text styles
   */
  constructor(scene: PNXScene, text: string, style?: PIXI.extras.BitmapTextStyle | undefined) {
    super(text, style);
    this.scene = scene;
    this.id = (Math.floor(Math.random() * (new Date()).getTime()).toString(36));
    this.scene.stage.addChild(this);
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  get z(): number {
    return this.zOrder;
  }

  /**
   * @name z
   * @description z position setter
   */
  set z(z: number) {
    this.zOrder = z;
  }

  /**
   * @name destroy
   * @description cleanup
   */
  destroy() {
    this.scene.stage.removeChild(this);
  }
};
