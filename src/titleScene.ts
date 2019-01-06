import * as PNXGE from './PNXGE';

/**
 * @name TitleScene
 * @description Title scene using the  Game Engine
 */
export default class TitleScene extends PNXGE.Scene {
  private eventManager: PNXGE.EventManager;
  private titleTouchEventID: string | undefined;

  /**
   * @name constructor
   * @description initialize scene
   * @param {Application} app
   */
  constructor(app: PNXGE.Application) {
    super(app);
    this.app = app;
    this.eventManager = this.app.getEventManager();
  }

  /**
   * @name start
   * @description start scene updates
   * @param {object} resources - loaded asset resources
   * @return {void}
   */
  start(resources: {}): void {
    let anim = <PNXGE.Image>this.getAnim('demo-overlay.png');
    anim.visible = this.app.demo;

    anim = <PNXGE.Image>this.getAnim('tyros-title.png');
    let eventManager = this.app.getEventManager();
    anim.attachTouchHandler('titleTouchEvent', eventManager);
    this.titleTouchEventID = eventManager.addEventHandler('titleTouchEvent', (anim: PNXGE.Anim) => {
      this.end('titleSceneEnd');
    });

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
    this.app.sceneEnd(outcome);
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  moveLeft(): void {
    super.moveLeft();
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    super.moveRight();
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    super.update(deltaTime);
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  destroy(): void {
    if (this.titleTouchEventID) {
      this.eventManager.removeEventHandler(this.titleTouchEventID);
    }
    super.destroy();
  }
}
