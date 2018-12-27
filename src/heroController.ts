import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {IProjectileObject, PNXProjectileManager} from './PNXProjectileManager';
import {pcap} from './PNXMath';
import IPNXController from './PNXController';

/**
 * @name HeroController
 * @description Hero HeroController
 */
export default class HeroController implements IPNXController {
  private scene: PNXScene;
  private anim: PNXAnim;
  private extremeLeft: number = 1.53;
  private extremeRight: number = 4.73;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.anim = scene.getAnim(name);
    this.anim.attachController(this);
    this.anim.collisionDetection = true;
  }

  /**
   * @name hitBy
   * @description hit by anim (collision event handler)
   */
  hitBy(anim: PNXAnim): void {
    let projectileManager: PNXProjectileManager = <PNXProjectileManager>this.scene.getProjectileManager();
    if (projectileManager) {
      projectileManager.createProjectile({
        name: 'explode',
        type: 'explode',
        strength: 0,
        collisionDetection: false,
        x: anim.x,
        y: anim.y,
        z: 9900,
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
        animSpeed: 0.3,
        rotation: this.anim.rotation,
        scale: 1
      });
    }
  }

  /**
   * @name fire
   * @description file projectile
   * @return {void}
   */
  fire(): void {
    let projectileManager: PNXProjectileManager = <PNXProjectileManager>this.scene.getProjectileManager();
    if (projectileManager) {
      let vLen = this.anim.height * 0.5;
      projectileManager.createProjectile({
        name: 'bullet',
        type: 'hero-bullet',
        strength: 100,
        collisionDetection: true,
        frame: 2,
        x: pcap(this.anim.x - Math.sin(this.anim.rotation) * vLen),
        y: pcap(this.anim.y + Math.cos(this.anim.rotation) * vLen),
        z: 9000,
        dx: pcap(-Math.sin(this.anim.rotation)),
        dy: pcap(Math.cos(this.anim.rotation)),
        vx: 4,
        vy: 4,
        rotation: this.anim.rotation,
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
    this.anim.rotation -= 0.2;
    if (this.anim.rotation < this.extremeLeft) {
      this.anim.rotation = this.extremeLeft;
    }
    this.fire();
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    this.anim.rotation += 0.2;
    if (this.anim.rotation > this.extremeRight) {
      this.anim.rotation = this.extremeRight;
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
