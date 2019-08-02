"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * @name SoundManager2
 * @description sound manager2
 */
var SoundManager = /** @class */ (function () {
    //#endregion
    /**
     * @name constructor
     * @description class constructor
     * @param {array} soundList - list of sound paths
     */
    function SoundManager(soundList) {
        var _this = this;
        //#region variables
        this.globalVolume = 0;
        this.disabled = false;
        this.soundResources = {};
        soundList.forEach(function (filePath) {
            var name = filePath.split('.')[0];
            var sound = document.createElement('audio');
            sound.src = filePath;
            sound.setAttribute('preload', 'auto');
            sound.setAttribute('controls', 'none');
            sound.style.display = 'none';
            document.body.appendChild(sound);
            _this.soundResources[name] = {
                name: name,
                filePath: filePath,
                sound: sound,
            };
        });
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
        if (this.disabled || !this.globalVolume) {
            return;
        }
        this.soundResources[name].sound.play();
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
        this.soundResources[name].sound.pause();
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
            // todo look sounds and set .volume = value
            for (var name_1 in this.soundResources) {
                var item = this.soundResources[name_1];
                item.sound.volume = this.globalVolume;
            }
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
        for (var name_2 in this.soundResources) {
            var item = this.soundResources[name_2];
            document.body.removeChild(item.sound);
            delete this.soundResources[item.name];
        }
    };
    return SoundManager;
}());
exports.SoundManager = SoundManager;
//# sourceMappingURL=SoundManager2.js.map