import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {PNXProjectileManager} from './PNXProjectileManager';
import PNXSoundManager from './PNXSoundManager';
import {pcap, PNXRandom} from './PNXMath';
import IPNXController from './PNXController';

/**
 * @name BeetleController
 * @description Beetle Controller
 */
export default class SquidController implements IPNXController{
  private scene: PNXScene;
  private anim: PNXAnim;
  private firingInterval: number = 0;
  private firingDelay: number;
  private active: boolean = true;
  private soundManager: PNXSoundManager | undefined;


  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.anim = <PNXAnim>scene.getAnim(name);
    this.anim.attachController(this);
    this.anim.collisionDetection = true;
    this.firingInterval = (new PNXRandom()).getRandomIntInclusive(200, 400);
    this.firingDelay = this.firingInterval;
    this.soundManager = this.scene.getSoundManager();
  }

  /**
   * @name hitBy
   * @description hit by anim (collision event handler)
   * @param {PNXAnim} anim
   * @return {void}
   */
  hitBy(anim: PNXAnim): void {
    if (anim.type === 'bullet') {
      return;
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
        animSpeed: 0.3,
        rotation: this.anim.rotation,
        scale: 1
      });
      if (this.soundManager) {
        this.soundManager.play('exp1');
      }
      this.active = false;
      this.anim.visible = false;
      if (anim.type === 'hero-bullet') {
        this.scene.app.score += this.anim.strength;
      }
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
      let vLen = (this.anim.height * 0.5) - 2;
      let rotation = 0;
      projectileManager.createProjectile({
        name: 'bullet',
        type: 'bullet',
        strength: 10,
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
      if (this.soundManager) {
        this.soundManager.play('enemyfire');
      }
    }
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    if (this.active) {
      this.firingDelay -= deltaTime;
      if (this.firingDelay < 0) {
        this.firingDelay = this.firingInterval;
        this.fire();
      }
      if ((this.anim.y - this.anim.height) > this.scene.width) {
        this.active = false;
        this.anim.visible = false;
      }
    }
  }
}
