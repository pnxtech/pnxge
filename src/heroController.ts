import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import { PNXAngle } from './PNXMath';

/**
 * @name HeroController
 * @description Hero HeroController
 */
export default class HeroController {
  private scene: PNXScene;
  private heroAnim: PNXAnim;
  private extremeLeft: number = 1.53;
  private extremeRight: number = 4.73;

  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.heroAnim = scene.getAnim(name);
    let explode1 = scene.getAnim('explode1');
    let vLen = this.heroAnim.height / 2;
    explode1.x = this.heroAnim.x - Math.sin(this.heroAnim.rotation) * vLen;
    explode1.y = this.heroAnim.y + Math.cos(this.heroAnim.rotation) * vLen;
    explode1.dx = -Math.sin(this.heroAnim.rotation);
    explode1.dy = Math.cos(this.heroAnim.rotation);
    explode1.vx = 2;
    explode1.vy = 2;
  }

  updateFire() {
    let explode1 = this.scene.getAnim('explode1');
    let vLen = this.heroAnim.height / 2;
    explode1.x = this.heroAnim.x - Math.sin(this.heroAnim.rotation) * vLen;
    explode1.y = this.heroAnim.y + Math.cos(this.heroAnim.rotation) * vLen;
    explode1.dx = -Math.sin(this.heroAnim.rotation);
    explode1.dy = Math.cos(this.heroAnim.rotation);
    explode1.vx = 4;
    explode1.vy = 4;
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  moveLeft(): void {
    this.heroAnim.rotation -= 0.2;
    if (this.heroAnim.rotation < this.extremeLeft) {
      this.heroAnim.rotation = this.extremeLeft;
    }
    this.updateFire();
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    this.heroAnim.rotation += 0.2;
    if (this.heroAnim.rotation > this.extremeRight) {
      this.heroAnim.rotation = this.extremeRight;
    }
    this.updateFire();
  }


  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
  }
}
