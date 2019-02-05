/**
 * @name Threshold
 * @description threshold tracking and management
 */
export class Threshold {
  private _count: number;
  private _threshold: number;
  private _triggered: boolean;

  /**
   * @name construtor
   * @description initialize threshold
   * @param {number} max - maximum threshold value
   */
  constructor(max: number) {
    this._count = 0;
    this._threshold = max;
    this._triggered = false;
  }

  /**
   * @name threshold
   * @description threshold getter
   * @return {number} value of threshold
   */
  get threshold(): number {
    return this._threshold;
  }

  /**
   * @name threshold
   * @description threshold setter. used if there's a need to change the threshold after construction
   * @param {number} value - value to set threshold
   * @return {void}
   */
  set threshold(value: number) {
    this._threshold = value;
  }

  /**
   * @name triggered
   * @description triggered getter
   * @return {number} value of trigger
   */
  get triggered() {
    return this._triggered;
  }

  /**
   * @name increment
   * @description increment the internal count towards eventual thresold
   * @return {void}
   */
  increment(): void {
    this._count++;
    if (this._count === this._threshold) {
      this._triggered = true;
      this._count = 0;
    } else {
      this._triggered = false;
    }
  }
}
