import * as PIXI from 'pixi.js';

/**
 * @name PNXApplication
 * @description PNX Application - top level game object
 */
export default class PNXApplication extends PIXI.Application {
  private appWidth: number = 0;
  private appHeight: number = 0;
  private gameScore: number = 0;

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
      transparent: true
    });
    document.body.appendChild(this.view);
    this.appWidth = width;
    this.appHeight = height;
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
   * @name score
   * @description score setter
   */
  set score(value: number) {
    this.gameScore = value;
  }
}

