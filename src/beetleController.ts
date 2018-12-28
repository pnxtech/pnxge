import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {IProjectileObject, PNXProjectileManager} from './PNXProjectileManager';
import {pcap} from './PNXMath';
import IPNXController from './PNXController';

/**
 * @name BeetleController
 * @description Beetle Controller
 */
export default class SquidController implements IPNXController{
  private scene: PNXScene;
  private anim: PNXAnim;
  private firingInterval: number = 40;
  private firingDelay: number;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.anim = scene.getAnim(name);
    this.anim.attachController(this);
    this.anim.collisionDetection = true;
    this.firingDelay = this.firingInterval;
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
      let vLen = (this.anim.height * 0.5);
      let rotation = 0;
      projectileManager.createProjectile({
        name: 'bullet',
        type: 'bullet',
        strength: 100,
        collisionDetection: true,
        frame: 1,
        x: pcap(this.anim.x - Math.sin(rotation) * vLen),
        y: pcap(this.anim.y + Math.cos(rotation) * vLen),
        z: 9000,
        dx: pcap(Math.sin(rotation)),
        dy: pcap(Math.cos(rotation)),
        vx: 2,
        vy: 2,
        rotation,
        scale: 1
      });
    }
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    this.firingDelay -= deltaTime;
    if (this.firingDelay < 0) {
      this.firingDelay = this.firingInterval;
      this.fire();
    }
  }
}
