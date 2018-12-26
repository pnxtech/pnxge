import * as PIXI from 'pixi.js';
import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import HeroController from './heroController';

/**
 * @name TestScene
 * @description Sample test scene using the PNX Game Engine
 */
export default class TestScene extends PNXScene {
  private app: PIXI.Application;
  private timer: any;
  private heroController: HeroController | undefined;
  private explode2: PNXAnim | undefined;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    super(app);
    this.app = app;
  }

  /**
   * @name start
   * @description start scene updates
   * @param {object} resources - loaded asset resources
   * @return {void}
   */
  start(resources: {}): void {
    this.explode2 = new PNXAnim(this);
    this.explode2.loadSequence('explode', 'sprites.json', resources);
    this.explode2.x = 120;
    this.explode2.y = 120;
    this.explode2.z = 8000;
    this.explode2.loop = true;
    this.explode2.collisionDetection = true;
    this.explode2.play('explode', true);
    this.addAnim('explode2', this.explode2);

    this.heroController = new HeroController('hero', this);
    super.start();
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  moveLeft(): void {
    super.moveLeft();
    if (this.heroController) {
      this.heroController.moveLeft();
    }
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    super.moveRight();
    if (this.heroController) {
      this.heroController.moveRight();
    }
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
