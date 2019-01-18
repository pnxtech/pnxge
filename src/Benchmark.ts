/**
 * @name Benchmark
 * @description Performance Timer
 */
export class Benchmark {
  private start: number = 0;

  /**
   * @name constructor
   * @description Inits MSTimer. As a convenience start() is called. But may be later re-called to set a later start.
   */
  constructor() {
    this.begin();
  }

  /**
   * @name begin
   * @description begin high resolution timer
   * @return {void}
   */
  begin(): void {
    this.start = window.performance.now();
  }

  /**
   * @name elapsed
   * @description return elapsed time in millisconds since last start(), number after decimal is microseconds
   * @return {number} ms - milliseconds
   */
  elapsed(): number {
    return window.performance.now() - this.start;
  }
}
