import * as PNXGE from './PNXGE';

/**
 * @name TimedSplashScene
 * @description Timed Splash scene
 */
export default class TimedSplashScene extends PNXGE.Scene {
  private delay: number;
  private delayTimer: any;
  private exitMessage: string;

  /**
   * @name constructor
   * @description initialize scene
   * @param {Application} app
   * @param {number} delay - display delay in seconds
   * @param {string} exitMessage - message to send on exit
   */
  constructor(app: PNXGE.Application, delay: number, exitMessage: string) {
    super(app);
    this.app = app;
    this.delay = delay * 1000;
    this.exitMessage = exitMessage;
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

    this.delayTimer = setTimeout(() => {
      clearTimeout(this.delayTimer);
      this.end(this.exitMessage);
    }, this.delay);

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
