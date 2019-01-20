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
     * @name reload
     * @description reload sound data. useful after an unload()
     * @return {void}
     */
    reload(): void;
    /**
     * @name play
     * @description play sound
     * @param {string} name - name of sound
     * @return {number} soundID to be used with .stop()
     */
    play(name: string): number;
    /**
     * @name stop
     * @description stop sound
     * @param {number} id - of sound abtained from the play method
     * @return {void}
     */
    stop(id: number): void;
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