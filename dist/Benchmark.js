"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name Benchmark
 * @description Performance Timer
 */
var Benchmark = /** @class */ (function () {
    /**
     * @name constructor
     * @description Inits MSTimer. As a convenience start() is called. But may be later re-called to set a later start.
     */
    function Benchmark() {
        this.start = 0;
        this.begin();
    }
    /**
     * @name begin
     * @description begin high resolution timer
     * @return {void}
     */
    Benchmark.prototype.begin = function () {
        this.start = window.performance.now();
    };
    /**
     * @name elapsed
     * @description return elapsed time in millisconds since last start(), number after decimal is microseconds
     * @return {number} ms - milliseconds
     */
    Benchmark.prototype.elapsed = function () {
        return window.performance.now() - this.start;
    };
    return Benchmark;
}());
exports.Benchmark = Benchmark;
//# sourceMappingURL=Benchmark.js.map