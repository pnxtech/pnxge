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
     * @name mergeObjects
     * @description merge objects. used as an ES5 replacement for the unavailable Object.assign
     * @return {object} returns merged object
     */
    mergeObjects(arg1: {}, arg2: {}, arg3?: {}): object;
}
export {};
//# sourceMappingURL=AssetManager.d.ts.map