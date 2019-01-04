import * as PIXI from 'pixi.js';
import IPNXAnimCompatible from './PNXAnimCompatible';
import {AnimType} from './PNXAnim';
import PNXScene from './PNXScene';
import {createID} from './PNXMath';


/**
 * @name PNXImage
 * @description PNX image sprite
 */
export default class PNXImage extends PIXI.Sprite implements IPNXAnimCompatible {
  public id: string = createID();
  public collisionDetection: boolean = false;
  public type: string = AnimType.IMAGE;
  public anim: PNXImage;
  protected scene: PNXScene;
  private zOrder: number = 0;

  /**
   * @name constructor
   * @description constructor
   * @param {PNXScene} scene - reference to parent scene
   * @param {string} name - name of sequence
   * @param {object} resources - loaded resources
   */
  constructor(scene: PNXScene, name: string, resources: any) {
    super(resources.textures[name]);
    this.anim = this;
    this.scene = scene;
    scene.stage.addChild(this);
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
}
