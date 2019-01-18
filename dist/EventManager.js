"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
;
;
/**
 * @name EventManager
 * @description Event system - allows for adding, removing and triggering system wide events
 */
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.callBackData = {};
    }
    /**
     * @name addEventHandler
     * @description add an event handler for a named event
     * @param {string} name - named event
     * @param {IEventCallback} callback - function handler
     * @return {string} ID of newly added event handler
     */
    EventManager.prototype.addEventHandler = function (name, callback) {
        var _a;
        var newID = (new Utils_1.Utils).createID();
        if (!this.callBackData[name]) {
            this.callBackData[name] = (_a = {},
                _a[newID] = callback,
                _a);
        }
        else {
            this.callBackData[name][newID] = callback;
        }
        return newID;
    };
    /**
     * @name removeEventHandler
     * @description removes an event handler by ID
     * @param {string} eventID - ID returned by the addEventHandler method
     * @return {void}
     */
    EventManager.prototype.removeEventHandler = function (eventID) {
        var _this = this;
        Object.keys(this.callBackData).forEach(function (name) {
            Object.keys(_this.callBackData[name]).forEach(function (id) {
                if (id === eventID) {
                    delete _this.callBackData[name][id];
                }
            });
        });
    };
    /**
     * @name triggerEvent
     * @description trigger all handlers for named event
     * @param {string} name - named event
     * @param {any} eventData - data to pass to event handlers
     * @return {void}
     */
    EventManager.prototype.triggerEvent = function (name, eventData) {
        var _this = this;
        if (this.callBackData[name]) {
            Object.keys(this.callBackData[name]).forEach(function (id) {
                _this.callBackData[name][id](eventData);
            });
        }
    };
    return EventManager;
}());
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map