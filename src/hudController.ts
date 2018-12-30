import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {PNXProjectileManager} from './PNXProjectileManager';
import {pcap, zeroPad} from './PNXMath';
import IPNXController from './PNXController';
import PNXTextSprite from './PNXTextSprite';

/**
 * @name HudController
 * @description Hud Controller
 */
export default class HudController implements IPNXController{
  private scene: PNXScene;
  private anim: PNXAnim;
  private heroAnim: PNXAnim;
  private healthAnim: PNXAnim;
  private scoreAnim: PNXTextSprite;
  private gameoverAnim: PNXTextSprite;

  private destructionSequence: boolean = false;
  private destructionInterval: number = 40;
  private destructionDelay: number = -1;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.anim = <PNXAnim>scene.getAnim(name);
    this.heroAnim = <PNXAnim>scene.getAnim('hero');
    this.healthAnim = <PNXAnim>scene.getAnim('health');
    this.scoreAnim = <PNXTextSprite>scene.getAnim('score');
    this.gameoverAnim = <PNXTextSprite>scene.getAnim('gameover');
    this.gameoverAnim.visible = false;
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
        this.gameoverAnim.visible = true;
        this.destructionDelay = -1;
        this.destructionSequence = false;
      }
    }

    // console.log(`score: ${this.scene.app.score}`);
    this.scoreAnim.text = zeroPad(this.scene.app.score, 5);

    let healthScore = 20 - (((this.heroAnim.health / 5) | 0) || 0);
    if (healthScore >= 20) {
      healthScore = 19;
    }
    this.healthAnim.setFrame(healthScore);

    if (!this.destructionSequence && this.heroAnim.health < 1) {
      this.destructionSequence = true;
      this.destructionDelay = this.destructionInterval;
    }
  }
}
