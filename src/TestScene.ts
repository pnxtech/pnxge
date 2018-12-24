import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';

/**
 * @name TestScene
 * @description Sample test scene using the PNX Game Engine
 */
export default class TestScene extends PNXScene {
  private timer: any;

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
    let hero = this.getAnim('hero');
    let explode1 = this.getAnim('explode1');
    let vLen = hero.height / 2;
    explode1.x = hero.x - Math.sin(hero.rotation) * vLen;
    explode1.y = hero.y + Math.cos(hero.rotation) * vLen;
    explode1.dx = -Math.sin(hero.rotation);
    explode1.dy = Math.cos(hero.rotation);
    explode1.vx = 0.1;
    explode1.vy = 0.1;
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
