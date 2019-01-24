import * as PIXI from 'pixi.js';
import { EventManager } from './EventManager';
/**
 * @name Application
 * @description  Application - top level game object
 */
export declare class Application extends PIXI.Application {
    protected appWidth: number;
    protected appHeight: number;
    protected appEventManager: EventManager;
    protected _demo: boolean;
    protected _debug: boolean;
    private frames;
    private FPS;
    private WebGL;
    private utils;
    private _state;
    /**
     * @name constructor
     * @description class constructor
     * @param {number} width - screen width
     * @param {number} height - screen height
     */
    constructor(width: number, height: number);
    /**
     * @name demo
     * @description demo flag getter
     * @return {boolean} true if demo
     */
    /**
    * @name demo
    * @description demo setter
    * @param {boolean} value if demo
    */
    demo: boolean;
    /**
     * @name debug
     * @description debug flag getter
     * @return {boolean} true if debug
     */
    /**
    * @name debug
    * @description debug setter
    * @param {boolean} value if debug
    */
    debug: boolean;
    /**
     * @name state
     * @description state getter
     * @return {object}
     */
    /**
    * @name state
    * @description state setter
    * @param {any} data - object to be merged with state
    */
    state: any;
    /**
     * @name setState
     * @description merges object entries in to application state
     * @param {object} data - object to be merged with state
     * @return {object} new application state
     */
    setState(data: any): any;
    /**
     * @name usingWebGL
     * @description reports on whether WebGL is supported
     * @return {boolean} true if WebGL, else false
     */
    readonly usingWebGL: boolean;
    /**
     * @name speed
     * @description get the underlying game speed. 1 = 60 FPS
     * @return {number} speed factor
     */
    /**
    * @name speed
    * @description set the underlying game speed. 1 = 60 FPS, 2 = 120 FPS etc...
    * @note affects only the delta value sent to update()
    * @param {number} value - speed factor
    */
    speed: number;
    /**
     * @name width
     * @description width getter
     * @return {number} width
     */
    readonly width: number;
    /**
     * @name height
     * @description height getter
     * @return {number} height
     */
    readonly height: number;
    /**
     * @name getEventManager
     * @description get event manager instance
     * @return {EventManager}
     */
    getEventManager(): EventManager;
    /**
     * @name startTimer
     * @description start timer loop
     * @return {void}
     */
    startTimer(): void;
    /**
     * @name stopTimer
     * @description stop timer loop
     * @return {void}
     */
    stopTimer(): void;
    /**
     * @name fps
     * @description get current frames per second. requires that the ftpTick() call be made after a frame update
     * @return {number} fps
     */
    readonly fps: number;
    /**
     * @name ftpTick
     * @description called to update the internal FPS. Should be called in top level application render loop
     * @return {void}
     */
    fpsTick(): void;
    /**
     * @name sceneEnd
     * @description scene end handler
     * @param {string} outcome - result of level ending
     */
    sceneEnd(outcome: string): void;
    /**
     * @name update
     * @description update the scene
     * @param {number} deltaTime
     * @return {void}
     */
    update(deltaTime: number): void;
    /**
     * @name destroy
     * @description application cleanup
     */
    destroy(): void;
}
//# sourceMappingURL=Application.d.ts.map