import * as PIXI from 'pixi.js';
import {EventManager} from './EventManager';

/**
 * @name Application
 * @description  Application - top level game object
 */
export class Application extends PIXI.Application {
  private appWidth: number = 0;
  private appHeight: number = 0;
  private gameScore: number = 0;
  private appEventManager: EventManager = new EventManager();
  private isDemo: boolean = false;

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
   * @name score
   * @description score getter
   * @return {number} score
   */
  get score(): number {
    return this.gameScore;
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
   * @description score setter
   */
  set score(value: number) {
    this.gameScore = value;
  }

  /**
   * @name levelEnd
   * @description level end handler
   * @param {string} outcome - result of level ending
   */
  levelEnd(outcome: string): void {
  }
}

