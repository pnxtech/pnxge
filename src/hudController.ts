import * as PNXGE from './PNXGE';

/**
 * @name HudController
 * @description Hud Controller
 */
export default class HudController implements PNXGE.IController{
  private scene: PNXGE.Scene;
  private anim: PNXGE.Anim;
  private titleAnim: PNXGE.Anim;
  private heroAnim: PNXGE.Anim;
  private healthAnim: PNXGE.Anim;
  private scoreAnim: PNXGE.TextSprite;
  private gameoverAnim: PNXGE.TextSprite;
  private levelCompleteAnim: PNXGE.TextSprite;

  private destructionSequence: boolean = false;
  private destructionInterval: number = 40;
  private destructionDelay: number = -1;
  private eventManager: PNXGE.EventManager;
  private eventID: string = '';
  private hudUp: boolean = true;


  /**
   * @name constructor
   * @description class constructor
   */
  constructor(name: string, scene: PNXGE.Scene) {
    this.scene = scene;
    this.eventManager = this.scene.app.getEventManager();
    this.anim = <PNXGE.Anim>scene.getAnim(name);
    this.heroAnim = <PNXGE.Anim>scene.getAnim('hero');
    this.titleAnim = <PNXGE.Anim>scene.getAnim('title');
    this.healthAnim = <PNXGE.Anim>scene.getAnim('health');
    this.scoreAnim = <PNXGE.TextSprite>scene.getAnim('score');
    this.gameoverAnim = <PNXGE.TextSprite>scene.getAnim('gameover');
    this.gameoverAnim.visible = false;
    this.levelCompleteAnim = <PNXGE.TextSprite>scene.getAnim('levelcomplete');
    this.levelCompleteAnim.visible = false;

    if (!this.scene.app.demo) {
      this.anim.attachTouchHandler('hudTouchEvent', this.eventManager);
      this.eventID = this.eventManager.addEventHandler('hudTouchEvent', (anim: PNXGE.Anim) => {
        if (!this.gameoverAnim.visible) {
          this.hudUp = !this.hudUp;
          this.hudVisible(this.hudUp);
        }
      });
    }
    this.anim.attachController(this);
    this.hudVisible(this.hudUp);
  }

  /**
   * @name hudVisible
   * @description show or hide hud
   */
  hudVisible(state: boolean): void {
    this.anim.setFrame((state) ? 0 : 4);
    this.titleAnim.visible = state;
    this.scoreAnim.visible = state;
    this.healthAnim.visible = state;
  }

  /**
   * @name hitBy
   * @description hit by anim (collision event handler)
   * @param {Anim} anim
   * @return {void}
   */
  hitBy(anim: PNXGE.Anim): void {
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
    this.hudVisible(true);
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
        this.hudVisible(true);
        this.scene.end('gameover');
        this.anim.setFrame(3);
        this.gameoverAnim.visible = true;
        this.levelCompleteAnim.visible = false;
        this.destructionDelay = -1;
        this.destructionSequence = false;
      }
    }

    // console.log(`score: ${this.scene.app.score}`);
    this.scoreAnim.text = PNXGE.zeroPad(this.scene.app.score, 5);

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
