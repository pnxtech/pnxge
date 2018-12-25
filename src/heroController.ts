import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import { PNXAngle } from './PNXMath';

/**
 * @name HeroController
 * @description Hero HeroController
 */
export default class HeroController {
  private heroAnim: PNXAnim;

  constructor(name: string, scene: PNXScene) {
    let angle = (new PNXAngle()).randomAngleTop();
    this.heroAnim = scene.getAnim(name);
    this.heroAnim.rotation = angle;
    let explode1 = scene.getAnim('explode1');
    let vLen = this.heroAnim.height / 2;
    explode1.x = this.heroAnim.x - Math.sin(this.heroAnim.rotation) * vLen;
    explode1.y = this.heroAnim.y + Math.cos(this.heroAnim.rotation) * vLen;
    explode1.dx = -Math.sin(this.heroAnim.rotation);
    explode1.dy = Math.cos(this.heroAnim.rotation);
    explode1.vx = 0.1;
    explode1.vy = 0.1;
  }

  update(deltaTime: number): void {
  }
}
