"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var howler_1 = require("howler");
/**
 * @name SoundManager
 * @description sound manager
 * @note: Uses: https://github.com/goldfire/howler.js/
 */
var SoundManager = /** @class */ (function () {
    //#endregion
    /**
     * @name constructor
     * @description class constructor
     * @note remaps audiosprite generated sound sprite data to the format that howler.js requires
     */
    function SoundManager(soundObj) {
        this.soundData = {};
        this.globalVolume = 0;
        this.disabled = false;
        this.soundData = {
            src: soundObj.resources,
            preload: true,
            autoplay: false,
            pool: 5,
            sprite: soundObj.spritemap
        };
        var spritemap = this.soundData.sprite;
        Object.keys(spritemap).forEach(function (item) {
            spritemap[item] = [
                (spritemap[item].start * 1000) | 0,
                (spritemap[item].end * 1000) | 0,
                spritemap[item].loop
            ];
        });
        this.soundPlayer = new howler_1.Howl(this.soundData);
    }
    Object.defineProperty(SoundManager.prototype, "disableSoundEngine", {
        /**
         * @name disableSoundEngine
         * @description disable the sound engine (done when the underlying hardware doesn't support audio.)
         * @param {boolean} value - true to disable, else false
         */
        set: function (value) {
            this.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name play
     * @description play sound
     * @param {string} name of sound
     * @return {void}
     */
    SoundManager.prototype.play = function (name) {
        console.log("playing " + name + " sound");
        if (this.disabled || !this.globalVolume) {
            return;
        }
        this.stop(name);
        this.soundData.sprite[name].id = this.soundPlayer.play(name);
    };
    /**
     * @name stop
     * @description stop sound
     * @param {string} name of sound
     * @return {void}
     */
    SoundManager.prototype.stop = function (name) {
        if (this.disabled) {
            return;
        }
        console.log("stopping " + name + " sound, id = " + this.soundData.sprite[name].id);
        if (this.soundData.sprite[name].id) {
            this.soundPlayer.stop(this.soundData.sprite[name].id);
        }
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
         * @note: 0 = muted 10 = max volume
         * @param {number} value - volume level 0 - 10
         */
        set: function (value) {
            this.globalVolume = value / 10;
            howler_1.Howler.volume(this.globalVolume);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "mute", {
        /**
         * @name mute
         * @description mute or unmute all sounds
         * @param {boolean} value - true to mute, false to unmute
         */
        set: function (value) {
            howler_1.Howler.mute(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name unload
     * @description stop all sounds and unload sound cache
     * @return {void}
     */
    SoundManager.prototype.unload = function () {
        howler_1.Howler.unload();
    };
    return SoundManager;
}());
exports.SoundManager = SoundManager;
//# sourceMappingURL=SoundManager.js.map