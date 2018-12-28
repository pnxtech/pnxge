import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {PNXProjectileManager} from './PNXProjectileManager';
import {PNXVector, PNXAngle} from './PNXMath';
import IPNXController from './PNXController';

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

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.anim = scene.getAnim(name);
    this.heroAnim = scene.getAnim('hero');
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
      this.active = false;
      this.anim.visible = false;
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
      if ((this.anim.y - this.anim.height) > this.scene.width) {
        this.active = false;
        this.anim.visible = false;
      }
    }
  }
}
