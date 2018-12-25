import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';
import HeroController from './heroController';

/**
 * @name TestScene
 * @description Sample test scene using the PNX Game Engine
 */
export default class TestScene extends PNXScene {
  private timer: any;
  private heroController: HeroController | undefined;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    super(app);
  }

  /**
   * @name start
   * @description start scene updates
   * @return {void}
   */
  start(): void {
    this.heroController = new HeroController('hero', this);
    super.start();
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    super.update(deltaTime);
    if (this.heroController) {
      this.heroController.update(deltaTime);
    }
    this.collisionDetection();
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  destroy(): void {
    super.destroy();
    clearInterval(this.timer);
  }
}
