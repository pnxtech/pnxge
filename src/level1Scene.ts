import PNXApplication from './PNXApplication';
import PNXScene from './PNXScene';
import PNXAnim from './PNXAnim';
import {PNXProjectileManager} from './PNXProjectileManager';
import HeroController from './heroController';
import SquidController from './squidController';
import SeekerController from './seekerController';
import BeetleController from './beetleController';
import HudController from './hudController';


/**
 * @name Level1Scene
 * @description Level1 scene using the PNX Game Engine
 */
export default class Level1Scene extends PNXScene {
  protected projectileManager: PNXProjectileManager | undefined;
  private heroController: HeroController | undefined;
  private hudController: HudController | undefined;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PNXApplication} app
   */
  constructor(app: PNXApplication) {
    super(app);
    this.app = app;
  }

  /**
   * @name start
   * @description start scene updates
   * @param {object} resources - loaded asset resources
   * @return {void}
   */
  start(resources: {}): void {
    if (this.app.demo) {
      let anim = this.getAnim('demo-overlay.png');
      anim.visible = true;
    }
    this.projectileManager = new PNXProjectileManager(this, 'sprites.json', resources);
    this.attachProjectileManager(this.projectileManager);
    this.hudController = new HudController('hud', this);
    this.heroController = new HeroController('hero', this);
    for (let i = 0; i < 10; i++) {
      new BeetleController(`beetle${i}`, this);
    }
    for (let i = 0; i < 4; i++) {
      new SquidController(`squid${i}`, this);
    }
    for (let i = 0; i < 2; i++) {
      new SeekerController(`seeker${i}`, this);
    }
    super.start(resources);
  }

  /**
   * @name end
   * @description scene end handler
   * @param {string} outcome - result of scene ending
   * @return {void}
   */
  end(outcome: string): void {
    super.end(outcome);
    let soundManager = this.getSoundManager();
    if (soundManager) {
      soundManager.volume = 0;
    }
    this.forEachAnim((anim: PNXAnim) => {
      if (anim.type === 'enemy') {
        anim.visible = false;
      }
    }, () => {});
    if (this.hudController) {
      this.hudController.levelComplete();
    }
    this.app.levelEnd(outcome);
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  moveLeft(): void {
    super.moveLeft();
    if (this.heroController) {
      this.heroController.moveLeft();
    }
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    super.moveRight();
    if (this.heroController) {
      this.heroController.moveRight();
    }
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    let activeCount: number = 0;
    this.forEachAnim((anim: PNXAnim) => {
      if (anim.type === 'enemy' && anim.visible === true) {
        activeCount++;
      }
    }, () => {
      if (activeCount === 0) {
        this.end('complete');
        return;
      }
    });
    super.update(deltaTime);
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  destroy(): void {
    super.destroy();
  }
}
