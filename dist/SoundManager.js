"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var howler_1 = require("howler");
/**
 * @name SoundManager
 * @description sound manager
 */
var SoundManager = /** @class */ (function () {
    /**
     * @name constructor
     * @description class constructor
     * @note remaps audiosprite generated sound sprite data to the format that howler.js requires
     */
    function SoundManager(soundObj) {
        this.soundData = {};
        this.globalVolume = 0;
        this.soundData = {
            src: soundObj.resources,
            preload: true,
            autoplay: false,
            sprite: soundObj.spritemap
        };
        var spritemap = this.soundData.sprite;
        Object.keys(spritemap).forEach(function (item) {
            spritemap[item] = [
                spritemap[item].start * 1000,
                spritemap[item].end * 1000,
                spritemap[item].loop
            ];
        });
        this.soundPlayer = new howler_1.Howl(this.soundData);
    }
    /**
     * @name play
     * @description play sound
     * @param {string} name - name of sound
     * @return {number} soundID to be used with .stop()
     */
    SoundManager.prototype.play = function (name) {
        return this.soundPlayer.play(name);
    };
    /**
     * @name stop
     * @description stop sound
     * @param {number} id - of sound abtained from the play method
     * @return {void}
     */
    SoundManager.prototype.stop = function (id) {
        this.soundPlayer.stop(id);
    };
    Object.defineProperty(SoundManager.prototype, "volume", {
        /**
         * @name volume
         * @description set global volume
         * @param {number} value - volume level 0 - 1
         */
        get: function () {
            return this.globalVolume;
        },
        /**
         * @name volume
         * @description set global volume
         * @param {number} value - volume level 0 - 1
         */
        set: function (value) {
            this.globalVolume = value;
            howler_1.Howler.volume(value);
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}());
exports.SoundManager = SoundManager;
//# sourceMappingURL=SoundManager.js.map