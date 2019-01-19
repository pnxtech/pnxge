import * as PIXI from 'pixi.js';
import { EventManager } from './EventManager';
/**
 * @name Application
 * @description  Application - top level game object
 */
export declare class Application extends PIXI.Application {
    protected appWidth: number;
    protected appHeight: number;
    protected gameScore: number;
    protected gameVolume: number;
    protected appEventManager: EventManager;
    protected isDemo: boolean;
    private frames;
    private FPS;
    private WebGL;
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
     * @name volume
     * @description volume getter
     * @return {number} current sound volume
     */
    /**
    * @name volume
    * @description volume setter
    * @param {number} sound volume
    */
    volume: number;
    /**
     * @name getEventManager
     * @description get event manager instance
     * @return {EventManager}
     */
    getEventManager(): EventManager;
    /**
     * @name score
     * @description score getter
     * @return {number} score
     */
    /**
    * @name score
    * @description score setter
    */
    score: number;
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