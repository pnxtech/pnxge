import * as PIXI from 'pixi.js';
import Scene from './Scene';
import Anim from './Anim';

export default class TestScene extends Scene {
  private turetAnim: Anim;
  private explosionAnim: Anim;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    super(app);

    this.turetAnim = new Anim(this);
    this.turetAnim.loadSequence('turet', 'turet.json', () => {
      this.turetAnim.x = 400;
      this.turetAnim.y = 400;
      this.turetAnim.anchor = 0.5;
      this.turetAnim.animationSpeed = 0.1;
      this.turetAnim.play('turet', false);

      this.explosionAnim = new Anim(this);
      this.explosionAnim.loadSequence('explode', 'explode.json', () => {
        this.explosionAnim.x = 300;
        this.explosionAnim.y = 300;
        this.explosionAnim.anchor = 0.5;
        this.explosionAnim.animationSpeed = 0.4;
        this.explosionAnim.play('explode', true);
      });
    });
  }

  /**
   * @name update
   * @description update the scene
   *
   */
  update(deltaTime: number): void {
    this.turetAnim.rotation = this.turetAnim.rotation + (0.1 * deltaTime);
  }
}


