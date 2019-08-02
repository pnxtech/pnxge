import { Scene } from './Scene';
import { SoundManager } from './SoundManager2';
interface ICallback {
    (resources: {}): void;
}
export declare class AssetManager {
    private loader;
    private gameConfig;
    private resources;
    private soundManager;
    /**
     * @name constructor
     * @description asset manager init
     */
    constructor();
    /**
     * @name init
     * @description initialize loader
     */
    init(filename: string, initComplete: ICallback): void;
    /**
     * @name unpack
     * @description uncompresses stringified JSON that was compressed with the compress method.
     * @note see https://github.com/cjus/simple-json-pack#readme string replace implementation
     * is faster than the array/split/join method: https://jsperf.com/fastest-string-replace
     * @param {any} data - JS object
     * @return {any} uncompressed JS object
     */
    unpack(data: any): any;
    /**
     * @name getSoundEngine
     * @description get sound engine
     * @return {SoundManager | undefined}
     */
    getSoundEngine(): SoundManager | undefined;
    /**
     * @name setValues
     * @description set multiple values on target object
     * @param {any} target - target object
     * @param {any} source - source object
     * @return {void}
     */
    protected setValues(target: any, source: any): void;
    /**
     * @name populateScene
     * @description populate Scene with resources
     * @param {Scene} scene - scene reference
     * @param {string} sceneName - name of scene
     * @param {ICallback} postPopulateHandler - completion callback
     * @return {void}
     */
    populateScene(scene: Scene, sceneName: string, postPopulateHandler: ICallback): void;
    /**
     * @name createAnimatedSprite
     * @description create an animated sprite character
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    createAnimatedSprite(scene: Scene, obj: any): void;
    /**
     * @name createSprite
     * @description create a sprite
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    createSprite(scene: Scene, obj: any): void;
}
export {};
//# sourceMappingURL=AssetManager.d.ts.map