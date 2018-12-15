import * as PIXI from 'pixi.js';
import Scene from './Scene';
import Anim from './Anim';
import { setInterval } from 'timers';

export default class TestScene extends Scene {
  private turetAnim: Anim;
  private explosionAnim: Anim;
  private timer: any;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    super(app);

    this.turetAnim = new Anim(this);
    this.explosionAnim = new Anim(this);

    this.assetLoader([
      'turet.json',
      'explode.json'
    ], (_loader, resources) => {
      this.turetAnim.loadSequence('turet', resources);
      this.explosionAnim.loadSequence('explode', resources);

      this.turetAnim.x = 400;
      this.turetAnim.y = 400;
      this.turetAnim.anchor = 0.5;
      this.turetAnim.play('turet', false);

      this.explosionAnim.x = 400;
      this.explosionAnim.y = 400;
      this.explosionAnim.anchor = 0.5;
      this.explosionAnim.animationSpeed = .5;
      this.explosionAnim.play('explode', false);

      this.timer = setInterval(() => {
        this.explosionAnim.play('explode', false);
      }, 2000);
    });
  }

  /**
   * @name update
   * @description update the scene
   *
   */
  update(deltaTime: number): void {
    this.turetAnim.rotation = this.turetAnim.rotation + (0.02 * deltaTime);
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
