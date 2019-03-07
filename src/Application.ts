import * as PIXI from 'pixi.js';
import {EventManager} from './EventManager';
import {Utils} from './Utils';
import {State} from './State';

PIXI.utils.skipHello();
PIXI.ticker.shared.autoStart = true;

/**
 * @name Application
 * @description  Application - top level game object
 */
export class Application extends PIXI.Application {
  //#region variables
  protected appWidth: number = 0;
  protected appHeight: number = 0;
  protected appEventManager: EventManager = new EventManager();
  protected _demo: boolean = false;
  protected _debug: boolean = false;
  protected _tickCount: number = 0;
  private frames: number = 0;
  private FPS: number = 0;
  private WebGL: boolean;
  private _state: State;
  //#endregion

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
      transparent: true,
      forceFXAA: false,
      antialias: false
    });
    this._state = new State();
    this.WebGL = PIXI.utils.isWebGLSupported();
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
  public get demo(): boolean {
    return this._demo;
  }

  /**
   * @name demo
   * @description demo setter
   * @param {boolean} value if demo
   */
  public set demo(value: boolean) {
    this._demo = value;
  }

  /**
   * @name debug
   * @description debug flag getter
   * @return {boolean} true if debug
   */
  public get debug(): boolean {
    return this._debug;
  }

  /**
   * @name debug
   * @description debug setter
   * @param {boolean} value if debug
   */
  public set debug(value: boolean) {
    this._debug = value;
    if (this._debug) {
      setInterval(() => {
        this.FPS = this.frames;
        this.frames = 0;
      }, 1000);
    }
  }

  /**
   * @name debugLog
   * @param {string} message - message to log
   * @return {void}
   */
  public debugLog(message: string): void {
    console.log(`${new Date().getTime()} (${Utils.zeroPad(this._tickCount, 6)}): ${message}`);
  }

  /**
   * @name tickCount
   * @description tickCount getter
   * @return {number} tickCount - internal application update counter
   */
  public get tickCount(): number {
    return this._tickCount;
  }

  /**
   * @name state
   * @description state getter
   * @return {object}
   */
  public get state(): any {
    return this._state.state;
  }

  /**
   * @name state
   * @description state setter
   * @param {any} data - object to be merged with state
   */
  public set state(data: any) {
    this._state.state = data;
  }

  /**
   * @name setState
   * @description merges object entries in to application state
   * @param {object} data - object to be merged with state
   * @return {object} new application state
   */
  public setState(data: any): any {
    this._state.setState(data);
    return this._state.state;
  }

  /**
   * @name usingWebGL
   * @description reports on whether WebGL is supported
   * @return {boolean} true if WebGL, else false
   */
  public get usingWebGL(): boolean {
    return this.WebGL;
  }

  /**
   * @name speed
   * @description get the underlying game speed. 1 = 60 FPS
   * @return {number} speed factor
   */
  public get speed(): number {
    return this.ticker.speed;
  }

  /**
   * @name speed
   * @description set the underlying game speed. 1 = 60 FPS, 2 = 120 FPS etc...
   * @note affects only the delta value sent to update()
   * @param {number} value - speed factor
   */
  public set speed(value: number) {
    this.ticker.speed = value;
  }

  /**
   * @name width
   * @description width getter
   * @return {number} width
   */
  public get width(): number {
    return this.appWidth;
  }

  /**
   * @name height
   * @description height getter
   * @return {number} height
   */
  public get height(): number {
    return this.appHeight;
  }

  /**
   * @name getEventManager
   * @description get event manager instance
   * @return {EventManager}
   */
  public getEventManager(): EventManager {
    return this.appEventManager;
  }

  /**
   * @name startTimer
   * @description start timer loop
   * @return {void}
   */
  public startTimer(): void {
    this.ticker.start();
  }

  /**
   * @name stopTimer
   * @description stop timer loop
   * @return {void}
   */
  public stopTimer(): void {
    this.ticker.stop();
  }

  /**
   * @name fps
   * @description get current frames per second. requires that the ftpTick() call be made after a frame update
   * @return {number} fps
   */
  public get fps(): number {
    return this.FPS;
  }

  /**
   * @name ftpTick
   * @description called to update the internal FPS. Should be called in top level application render loop
   * @return {void}
   */
  public fpsTick(): void {
    this.frames++;
  }

  /**
   * @name sceneEnd
   * @description scene end handler
   * @param {string} outcome - result of level ending
   */
  public sceneEnd(outcome: string): void {
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  public update(deltaTime: number): void {
    this._tickCount++;
  }

  /**
   * @name destroy
   * @description application cleanup
   */
  public destroy() {
    for (let texture in PIXI.utils.TextureCache) {
      PIXI.utils.TextureCache[texture].destroy(true);
    };
    PIXI.loader.reset();
    this.ticker.stop();
  }
}

