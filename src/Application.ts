import * as PIXI from 'pixi.js';
import {EventManager} from './EventManager';
import {Utils} from './Utils';

PIXI.utils.skipHello();

/**
 * @name Application
 * @description  Application - top level game object
 */
export class Application extends PIXI.Application {
  protected appWidth: number = 0;
  protected appHeight: number = 0;
  protected appEventManager: EventManager = new EventManager();
  protected isDemo: boolean = false;
  protected isDebug: boolean = false;
  private frames: number = 0;
  private FPS: number = 0;
  private WebGL: boolean;
  private utils: Utils;
  private appState: {} = {};

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
      forceFXAA: true,
      antialias: true
    });
    this.utils = new Utils();
    this.WebGL = PIXI.utils.isWebGLSupported();
    document.body.appendChild(this.view);
    this.appWidth = width;
    this.appHeight = height;
    this.ticker.add((deltaTime) => {
      this.update(deltaTime);
    });
    setInterval(() => {
      this.FPS = this.frames;
      this.frames = 0;
    }, 1000);
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
   * @name debug
   * @description debug flag getter
   * @return {boolean} true if debug
   */
  get debug(): boolean {
    return this.isDebug;
  }

  /**
   * @name debug
   * @description debug setter
   * @param {boolean} value if debug
   */
  set debug(value: boolean) {
    this.isDebug = value;
  }

  /**
   * @name state
   * @description state getter
   * @return {object}
   */
  get state(): {} {
    return this.appState;
  }

  /**
   * @name state
   * @description state setter
   * @param {object} data - object to be merged with state
   */
  set state(data: {}) {
    this.appState = data;
  }

  /**
   * @name setState
   * @description merges object entries in to application state
   * @param {object} data - object to be merged with state
   * @return {object} new application state
   */
  setState(data: {}): {} {
    let newState = this.utils.mergeObjects(this.appState, data);
    this.appState = newState;
    return this.appState;
  }

  /**
   * @name usingWebGL
   * @description reports on whether WebGL is supported
   * @return {boolean} true if WebGL, else false
   */
  get usingWebGL(): boolean {
    return this.WebGL;
  }

  /**
   * @name speed
   * @description get the underlying game speed. 1 = 60 FPS
   * @return {number} speed factor
   */
  get speed(): number {
    return this.ticker.speed;
  }

  /**
   * @name speed
   * @description set the underlying game speed. 1 = 60 FPS, 2 = 120 FPS etc...
   * @note affects only the delta value sent to update()
   * @param {number} value - speed factor
   */
  set speed(value: number) {
    this.ticker.speed = value;
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
   * @name getEventManager
   * @description get event manager instance
   * @return {EventManager}
   */
  getEventManager(): EventManager {
    return this.appEventManager;
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
   * @name fps
   * @description get current frames per second. requires that the ftpTick() call be made after a frame update
   * @return {number} fps
   */
  get fps(): number {
    return this.FPS;
  }

  /**
   * @name ftpTick
   * @description called to update the internal FPS. Should be called in top level application render loop
   * @return {void}
   */
  fpsTick(): void {
    this.frames++;
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

