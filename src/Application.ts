import * as PIXI from 'pixi.js';
import {EventManager} from './EventManager';

/**
 * @name Application
 * @description  Application - top level game object
 */
export class Application extends PIXI.Application {
  protected appWidth: number = 0;
  protected appHeight: number = 0;
  protected gameScore: number = 0;
  protected gameVolume: number = 0;
  protected appEventManager: EventManager = new EventManager();
  protected isDemo: boolean = false;

  /**
   * @name constructor
   * @description class constructor
   * @param {number} width - screen width
   * @param {number} height - screen height
   */
  constructor(width: number, height: number) {
    super({
      view: <HTMLCanvasElement>document.getElementById('canvas'),
      width,
      height,
      backgroundColor: 0x000000
    });
    document.body.appendChild(this.view);
    this.appWidth = width;
    this.appHeight = height;
    this.ticker.add((deltaTime) => {
      this.update(deltaTime);
    });
  }

  /**
   * @name demo
   * @description demo flag getter
   * @return {boolean} true if demo
   */
  get demo(): boolean {
    return this.isDemo;
  }

  /**
   * @name demo
   * @description demo setter
   * @param {boolean} value if demo
   */
  set demo(value: boolean) {
    this.isDemo = value;
  }

  /**
   * @name width
   * @description width getter
   * @return {number} width
   */
  get width(): number {
    return this.appWidth;
  }

  /**
   * @name height
   * @description height getter
   * @return {number} height
   */
  get height(): number {
    return this.appHeight;
  }

  /**
   * @name volume
   * @description volume getter
   * @return {number} current sound volume
   */
  get volume(): number {
    return this.gameVolume;
  }

  /**
   * @name volume
   * @description volume setter
   * @param {number} sound volume
   */
  set volume(value: number) {
    this.gameVolume = value;
  }

  /**
   * @name getEventManager
   * @description get event manager instance
   * @return {EventManager}
   */
  getEventManager(): EventManager {
    return this.appEventManager;
  }

  /**
   * @name score
   * @description score getter
   * @return {number} score
   */
  get score(): number {
    return this.gameScore;
  }

  /**
   * @name score
   * @description score setter
   */
  set score(value: number) {
    this.gameScore = value;
  }

  /**
   * @name startTimer
   * @description start timer loop
   * @return {void}
   */
  startTimer(): void {
    this.ticker.start();
  }

  /**
   * @name stopTimer
   * @description stop timer loop
   * @return {void}
   */
  stopTimer(): void {
    this.ticker.stop();
  }

  /**
   * @name sceneEnd
   * @description scene end handler
   * @param {string} outcome - result of level ending
   */
  sceneEnd(outcome: string): void {
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
  }

  /**
   * @name destroy
   * @description application cleanup
   */
  destroy() {
    for (let texture in PIXI.utils.TextureCache) {
      PIXI.utils.TextureCache[texture].destroy(true);
    };
    PIXI.loader.reset();
    this.ticker.stop();
  }
}

