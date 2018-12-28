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
  private frames: number[] = [6, 5, 4, 3, 2, 1, 0, 16, 15, 14, 13, 12, 11];
  private rotation: number[] = [1.33, 1.84, 2.24, 2.66, 2.90, 3.10, 3.18, 3.22, 3.42, 3.66, 4.04, 4.48, 4.95];
  private frameIndex:number = 6;

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
        animSpeed: 0.2,
        rotation: this.anim.rotation,
        scale: 2
      });

      this.anim.setFrame(18);
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
      let vLen = (this.anim.height * 0.5) - 8;
      let rotation = this.rotation[this.frameIndex];
      projectileManager.createProjectile({
        name: 'bullet',
        type: 'hero-bullet',
        strength: 100,
        collisionDetection: true,
        frame: 2,
        x: pcap(this.anim.x - Math.sin(rotation) * vLen),
        y: pcap(this.anim.y + Math.cos(rotation) * vLen),
        z: 9000,
        dx: pcap(-Math.sin(rotation)),
        dy: pcap(Math.cos(rotation)),
        vx: 2,
        vy: 2,
        rotation,
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
    this.frameIndex--;
    if (this.frameIndex < 1) {
      this.frameIndex = 0;
    }
    // console.log(`this.frameIndex: ${this.frameIndex}`);
    // console.log(`this.rotation[${this.frameIndex}]: ${this.rotation[this.frameIndex]}`);
    this.anim.setFrame(this.frames[this.frameIndex]);
    this.fire();
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    this.frameIndex++;
    if (this.frameIndex > 12) {
      this.frameIndex = 12;
    }
    this.anim.setFrame(this.frames[this.frameIndex]);
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
