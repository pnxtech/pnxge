import PNXAnim from './PNXGE/PNXAnim';
import PNXScene from './PNXGE/PNXScene';
import PNXProjectileManager from './PNXGE/PNXProjectileManager';
import PNXSoundManager from './PNXGE/PNXSoundManager';
import IPNXController from './PNXGE/PNXController';
import {PNXVector, PNXAngle} from './PNXGE/PNXMath';

/**
 * @name SeekerController
 * @description Seeker Controller
 */
export default class SeekerController implements IPNXController{
  private scene: PNXScene;
  private anim: PNXAnim;
  private heroAnim: PNXAnim;
  private animVector: PNXVector = new PNXVector(0,0);
  private heroVector: PNXVector = new PNXVector(0,0);
  private changeCourse: boolean = false;
  private active: boolean = true;
  private soundManager: PNXSoundManager | undefined;
  private machineSoundDelay: number;
  private machineSoundCount: number = 200;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.anim = <PNXAnim>scene.getAnim(name);
    this.heroAnim = <PNXAnim>scene.getAnim('hero');
    this.anim.attachController(this);
    this.anim.type = 'enemy';
    this.anim.collisionDetection = true;
    this.soundManager = this.scene.getSoundManager();
    this.machineSoundDelay = 10;
  }

  /**
   * @name hitBy
   * @description hit by anim (collision event handler)
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
        this.soundManager.stop('seeker');
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
      this.animVector.x = this.anim.x;
      this.animVector.y = this.anim.y;
      this.heroVector.x = this.heroAnim.x;
      this.heroVector.y = this.heroAnim.y;
      let distance = this.animVector.distance(this.heroVector);
      if (!this.changeCourse && distance < 200) {
        this.changeCourse = true;
        let angle = new PNXAngle();
        let course = angle.angleFromVectors(this.heroVector, this.animVector);
        this.anim.rotation = -course;
        let directionVector = angle.vectorAngleFromRadians(course);
        this.anim.dx = -directionVector.x;
        this.anim.dy = -directionVector.y;
        this.anim.vx = 1;
        this.anim.vy = 1;
      }
      if ((this.anim.y - this.anim.height) > this.scene.height) {
        this.active = false;
        this.anim.visible = false;
        if (this.soundManager) {
          this.soundManager.stop('seeker');
        }
      }
      if (this.active && this.anim.y > 0) {
        this.machineSoundDelay--;
        if (this.soundManager && this.machineSoundDelay === 0) {
          this.soundManager.play('seeker');
          this.machineSoundDelay = this.machineSoundCount;
        }
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
