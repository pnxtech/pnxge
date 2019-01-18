/**
 * @name Benchmark
 * @description Performance Timer
 */
export declare class Benchmark {
    private start;
    /**
     * @name constructor
     * @description Inits MSTimer. As a convenience start() is called. But may be later re-called to set a later start.
     */
    constructor();
    /**
     * @name begin
     * @description begin high resolution timer
     * @return {void}
     */
    begin(): void;
    /**
     * @name elapsed
     * @description return elapsed time in millisconds since last start(), number after decimal is microseconds
     * @return {number} ms - milliseconds
     */
    elapsed(): number;
}
//# sourceMappingURL=Benchmark.d.ts.map