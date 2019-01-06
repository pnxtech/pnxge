import * as PNXGE from './PNXGE';

/**
 * @name Level1CompleteScene
 * @description Level1 Complete Scene
 */
export default class Level1CompleteScene extends PNXGE.Scene {
  /**
   * @name constructor
   * @description initialize scene
   * @param {Application} app
   */
  constructor(app: PNXGE.Application) {
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
    let anim = <PNXGE.Image>this.getAnim('demo-overlay.png');
    anim.visible = this.app.demo;

    let timeOutID = setInterval(() => {
      clearInterval(timeOutID);
      this.end('level1CompleteSceneEnd');
    }, 3000);

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
}
