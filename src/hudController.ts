import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import {zeroPad} from './PNXMath';
import IPNXController from './PNXController';
import PNXTextSprite from './PNXTextSprite';
import PNXEventManager from './PNXEventManager';

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
  private levelCompleteAnim: PNXTextSprite;

  private destructionSequence: boolean = false;
  private destructionInterval: number = 40;
  private destructionDelay: number = -1;
  private eventManager: PNXEventManager;
  private eventID: string = '';

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXScene) {
    this.scene = scene;
    this.eventManager = this.scene.app.getEventManager();
    this.anim = <PNXAnim>scene.getAnim(name);
    this.heroAnim = <PNXAnim>scene.getAnim('hero');
    this.healthAnim = <PNXAnim>scene.getAnim('health');
    this.scoreAnim = <PNXTextSprite>scene.getAnim('score');
    this.gameoverAnim = <PNXTextSprite>scene.getAnim('gameover');
    this.gameoverAnim.visible = false;
    this.levelCompleteAnim = <PNXTextSprite>scene.getAnim('levelcomplete');
    this.levelCompleteAnim.visible = false;

    this.anim.attachTouchHandler('hudTouchEvent', this.eventManager);
    this.eventID = this.eventManager.addEventHandler('hudTouchEvent', (anim: PNXAnim) => {
      anim.visible = false;
    });
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
   * @name levelComplete
   * @description handle level complete
   * @return {void}
   */
  levelComplete(): void {
    this.anim.setFrame(1);
    this.levelCompleteAnim.visible = true;
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
        this.scene.end('gameover');
        this.anim.setFrame(3);
        this.gameoverAnim.visible = true;
        this.levelCompleteAnim.visible = false;
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

  /**
   * @name destroy
   * @description hud controller cleanup
   */
  destroy() {
    this.eventManager.removeEventHandler(this.eventID);
  }
}
