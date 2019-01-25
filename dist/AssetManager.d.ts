import { Scene } from './Scene';
import { SoundManager } from './SoundManager';
interface ICallback {
    (resources: {}): void;
}
export declare class AssetManager {
    private loader;
    private gameConfig;
    private resources;
    private soundManager;
    private utils;
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
     * @note see https://github.com/cjus/simple-json-pack#readme
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
     * @name populateScene
     * @description populate Scene with resources
     * @param {Scene} scene - scene reference
     * @param {string} sceneName - name of scene
     * @param {ICallback} postPopulateHandler - completion callback
     * @return {void}
     */
    populateScene(scene: Scene, sceneName: string, postPopulateHandler: ICallback): void;
    /**
     * @name createCharacter
     * @description create an anim character
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    createCharacter(scene: Scene, obj: any): void;
    /**
     * @name createImage
     * @description create an image
     * @param {Scene} scene
     * @param {object} obj
     * @return {void}
     */
    createImage(scene: Scene, obj: any): void;
}
export {};
//# sourceMappingURL=AssetManager.d.ts.map