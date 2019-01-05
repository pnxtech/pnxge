import * as PNXGE from './PNXGE';

/**
 * @name SquidController
 * @description Squid Controller
 */
export default class SquidController implements PNXGE.IController{
  private scene: PNXGE.Scene;
  private anim: PNXGE.Anim;
  private firingInterval: number = 0;
  private firingDelay: number;
  private active: boolean = true;
  private soundManager: PNXGE.SoundManager | undefined;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXGE.Scene) {
    this.scene = scene;
    this.anim = <PNXGE.Anim>scene.getAnim(name);
    this.anim.attachController(this);
    this.anim.type = 'enemy';
    this.anim.collisionDetection = true;
    this.firingInterval = (new PNXGE.Random()).getRandomIntInclusive(200, 400);
    this.firingDelay = this.firingInterval;
    this.soundManager = this.scene.getSoundManager();
  }

  /**
   * @name hitBy
   * @description hit by anim (collision event handler)
   * @param {Anim} anim
   * @return {void}
   */
  hitBy(anim: PNXGE.Anim): void {
    if (anim.type === 'bullet') {
      return;
    }
    let projectileManager: PNXGE.ProjectileManager = <PNXGE.ProjectileManager>this.scene.getProjectileManager();
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
    let projectileManager: PNXGE.ProjectileManager = <PNXGE.ProjectileManager>this.scene.getProjectileManager();
    if (projectileManager) {
      let vLen = (this.anim.height * 0.5) - 8;
      let rotation = 0;
      projectileManager.createProjectile({
        name: 'bullet',
        type: 'bullet',
        strength: 10,
        collisionDetection: true,
        frame: 1,
        x: PNXGE.pcap(this.anim.x - Math.sin(rotation) * vLen),
        y: PNXGE.pcap(this.anim.y + Math.cos(rotation) * vLen),
        z: 9000,
        dx: PNXGE.pcap(Math.sin(rotation)),
        dy: PNXGE.pcap(Math.cos(rotation)),
        vx: this.anim.vx * 2,
        vy: this.anim.vy * 2,
        rotation,
        scale: 1
      });
      if (this.soundManager) {
        this.soundManager.play('enemyfire2');
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
      if ((this.anim.y - this.anim.height) > this.scene.height) {
        this.active = false;
        this.anim.visible = false;
      }
    }
  }

  /**
   * @name destroy
   * @description controller cleanup
   */
  destroy() {
  }
}
