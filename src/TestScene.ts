import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';
import PNXAnim from './PNXAnim';
import { setInterval } from 'timers';

/**
 * @name TestScene
 * @description Sample test scene using the PNX Game Engine
 */
export default class TestScene extends PNXScene {
  private turetAnim: PNXAnim;
  private explosionAnim: PNXAnim;
  private timer: any;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    super(app);

    this.turetAnim = new PNXAnim(this);
    this.explosionAnim = new PNXAnim(this);

    this.assetLoader([
      'turet.json',
      'explode.json'
    ], (_loader, resources) => {
      this.explosionAnim.loadSequence('explode', resources);
      this.turetAnim.loadSequence('turet', resources);

      this.turetAnim.x = 500;
      this.turetAnim.y = 500;
      this.turetAnim.z = 1000;
      this.turetAnim.vx = 0;
      this.turetAnim.vy = 0;
      this.turetAnim.type = 'hero';
      this.turetAnim.collisionDetection = true;
      this.turetAnim.play('turet', false);

      this.explosionAnim.x = 100;
      this.explosionAnim.y = 100;
      this.explosionAnim.z = 2000;
      this.explosionAnim.vx = 5;
      this.explosionAnim.vy = 5;
      this.explosionAnim.type = 'bullet';
      this.explosionAnim.animationSpeed = 0.8;
      this.explosionAnim.collisionDetection = true;
      this.explosionAnim.play('explode', true);

      this.sortAnims();

      // this.timer = setInterval(() => {
      //   this.explosionAnim.z = 100;
      //   this.explosionAnim.play('explode', false);
      // }, 1000);
    });
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    this.turetAnim.update();
    this.explosionAnim.update();
    this.turetAnim.rotation = this.turetAnim.rotation + (0.02 * deltaTime);
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
    this.turetAnim.destroy();
    this.explosionAnim.destroy();
  }
}
