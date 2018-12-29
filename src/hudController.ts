import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {PNXProjectileManager} from './PNXProjectileManager';
import {pcap} from './PNXMath';
import IPNXController from './PNXController';

/**
 * @name HudController
 * @description Hud Controller
 */
export default class HudController implements IPNXController{
  private scene: PNXScene;
  private anim: PNXAnim;
  private heroAnim: PNXAnim;
  private destructionSequence: boolean = false;
  private destructionInterval: number = 40;
  private destructionDelay: number = -1;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.anim = scene.getAnim(name);
    this.heroAnim = scene.getAnim('hero');
    this.anim.attachController(this);
  }

  /**
   * @name hitBy
   * @description hit by anim (collision event handler)
   * @param {PNXAnim} anim
   * @return {void}
   */
  hitBy(anim: PNXAnim): void {
  }

  /**
   * @name fire
   * @description file projectile
   * @return {void}
   */
  fire(): void {
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    if (this.destructionSequence) {
      this.destructionDelay--;
      if (this.destructionDelay < 0) {
        this.anim.setFrame(3);
        this.destructionDelay = -1;
        this.destructionSequence = false;
      }
    }
    if (!this.destructionSequence && this.heroAnim.health < 1) {
      this.destructionSequence = true;
      this.destructionDelay = this.destructionInterval;
    }
  }
}
