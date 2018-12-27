import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {IProjectileObject, PNXProjectileManager} from './PNXProjectileManager';
import {pcap} from './PNXMath';

/**
 * @name HeroController
 * @description Hero HeroController
 */
export default class HeroController {
  private scene: PNXScene;
  private heroAnim: PNXAnim;
  private extremeLeft: number = 1.53;
  private extremeRight: number = 4.73;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.heroAnim = scene.getAnim(name);
    this.heroAnim.collisionDetection = true;
  }

  /**
   * @name fire
   * @description file projectile
   * @return {void}
   */
  fire(): void {
    let projectileManager: PNXProjectileManager = <PNXProjectileManager>this.scene.getProjectileManager();
    if (projectileManager) {
      let vLen = this.heroAnim.height * 0.5;
      projectileManager.createProjectile({
        name: 'bullet',
        type: 'hero-bullet',
        strength: 100,
        collisionDetection: true,
        frame: 2,
        x: pcap(this.heroAnim.x - Math.sin(this.heroAnim.rotation) * vLen),
        y: pcap(this.heroAnim.y + Math.cos(this.heroAnim.rotation) * vLen),
        z: 9000,
        dx: pcap(-Math.sin(this.heroAnim.rotation)),
        dy: pcap(Math.cos(this.heroAnim.rotation)),
        vx: 4,
        vy: 4,
        rotation: this.heroAnim.rotation,
        scale: 1
      });
    }
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
    this.fire();
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
    this.fire();
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
