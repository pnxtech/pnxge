/**
 * @name SoundManager
 * @description sound manager
 * @note: Uses: https://github.com/goldfire/howler.js/
 */
export declare class SoundManager {
    private soundPlayer;
    private soundData;
    private globalVolume;
    private disabled;
    /**
     * @name constructor
     * @description class constructor
     * @note remaps audiosprite generated sound sprite data to the format that howler.js requires
     */
    constructor(soundObj: any);
    /**
     * @name disableSoundEngine
     * @description disable the sound engine (done when the underlying hardware doesn't support audio.)
     * @param {boolean} value - true to disable, else false
     */
    disableSoundEngine: boolean;
    /**
     * @name play
     * @description play sound
     * @param {string} name of sound
     * @return {void}
     */
    play(name: string): void;
    /**
     * @name stop
     * @description stop sound
     * @param {string} name of sound
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
    * @note: 0 = muted 10 = max volume
    * @param {number} value - volume level 0 - 10
    */
    volume: number;
    /**
     * @name mute
     * @description mute or unmute all sounds
     * @param {boolean} value - true to mute, false to unmute
     */
    mute: boolean;
    /**
     * @name unload
     * @description stop all sounds and unload sound cache
     * @return {void}
     */
    unload(): void;
}
//# sourceMappingURL=SoundManager.d.ts.map