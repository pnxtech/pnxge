import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {PNXProjectileManager} from './PNXProjectileManager';
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
  private active: boolean = true;
  private collisionClearInterval: number = 100;
  private collisionClearCountdown: number = -1;

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
   * @param {PNXAnim} anim
   * @return {void}
   */
  hitBy(anim: PNXAnim): void {
    let explosionScale = 0.5;
    this.collisionClearCountdown = this.collisionClearInterval;
    this.anim.health -= anim.strength;
    console.log(`hero health: ${this.anim.health}`);
    if (!this.anim.health) {
      explosionScale = 2;
      this.anim.setFrame(18);
      this.active = false;
    }
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
        scale: explosionScale
      });
    }
  }

  /**
   * @name fire
   * @description file projectile
   * @return {void}
   */
  fire(): void {
    if (!this.active) {
      return;
    }
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
    if (!this.active) {
      return;
    }
    this.frameIndex--;
    if (this.frameIndex < 1) {
      this.frameIndex = 0;
    }
    this.anim.setFrame(this.frames[this.frameIndex]);
    this.fire();
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    if (!this.active) {
      return;
    }
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
    if (this.collisionClearCountdown !== -1) {
      this.collisionClearCountdown--;
      if (this.collisionClearCountdown < 0) {
        this.collisionClearCountdown = -1;
        this.anim.clearCollision();
      }
    }
  }
}
