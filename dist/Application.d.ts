import * as PIXI from 'pixi.js';
import { EventManager } from './EventManager';
/**
 * @name Application
 * @description  Application - top level game object
 */
export declare class Application extends PIXI.Application {
    private appWidth;
    private appHeight;
    private gameScore;
    private appEventManager;
    private isDemo;
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