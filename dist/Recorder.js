"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name Recorder
 * @description event recorder. Uses the app update() to record events.
 * @notes Stores recording in Window.localstorage under the recording key.
 */
var Recorder = /** @class */ (function () {
    function Recorder() {
        this.tick = 0;
        this.recording = {};
    }
    /**
     * @name start
     * @description starts a recording
     * @return {void}
     */
    Recorder.prototype.start = function () {
        this.tick = 0;
    };
    /**
     * @name stop
     * @description stops a recording. stores recording in localstorage
     * @return {void}
     */
    Recorder.prototype.stop = function () {
        window.localStorage.setItem('recording', JSON.stringify(this.recording));
    };
    /**
     * @name record
     * @description records an event
     * @param {string} action - name of event
     * @return {void}
     */
    Recorder.prototype.record = function (action) {
        this.recording[this.tick] = action;
    };
    /**
     * @name update
     * @description updates internal ticker. Must be called by application update()
     * @return {void}
     */
    Recorder.prototype.update = function () {
        this.tick++;
    };
    return Recorder;
}());
exports.Recorder = Recorder;
//# sourceMappingURL=Recorder.js.map