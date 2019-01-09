/**
 * @name SoundManager
 * @description sound manager
 */
export declare class SoundManager {
    private soundPlayer;
    private soundData;
    private globalVolume;
    /**
     * @name constructor
     * @description class constructor
     * @note remaps audiosprite generated sound sprite data to the format that howler.js requires
     */
    constructor(soundObj: any);
    /**
     * @name play
     * @description play sound
     * @param {string} name - name of sound
     * @return {void}
     */
    play(name: string): void;
    /**
     * @name stop
     * @description stop sound
     * @param {string} name - name of sound
     * @return {void}
     */
    stop(name: string): void;
    /**
     * @name volume
     * @description set global volume
     * @param {number} value - volume level 0 - 1
     */
    /**
    * @name volume
    * @description set global volume
    * @param {number} value - volume level 0 - 1
    */
    volume: number;
}
//# sourceMappingURL=SoundManager.d.ts.map