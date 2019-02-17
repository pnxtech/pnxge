/**
 * @name Threshold
 * @description threshold tracking and management
 */
export class Threshold {
  //#region variables
  private _count: number;
  private _threshold: number;
  private _triggered: boolean;
  private _disabled: boolean;
  //#endregion

  /**
   * @name construtor
   * @description initialize threshold
   * @param {number} max - maximum threshold value
   */
  constructor(max: number) {
    this._count = 0;
    this._threshold = max;
    this._triggered = false;
    this._disabled = false;
  }

  /**
   * @name threshold
   * @description threshold getter
   * @return {number} value of threshold
   */
  public get threshold(): number {
    return this._threshold;
  }

  /**
   * @name threshold
   * @description threshold setter. used if there's a need to change the threshold after construction
   * @param {number} value - value to set threshold
   * @return {void}
   */
  public set threshold(value: number) {
    this._threshold = value;
  }

  /**
   * @name disabled
   * @description disabled getter
   * @return {boolean} is disabled?
   */
  public get disabled() {
    return this._disabled;
  }

  /**
   * @name disabled
   * @description disabled setter
   * @param {boolean} value - true to disable / false to enable
   * @return {void}
   */
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  /**
   * @name triggered
   * @description triggered getter
   * @return {number} value of trigger
   */
  public get triggered() {
    return this._triggered;
  }

  /**
   * @name increment
   * @description increment the internal count towards eventual threshold
   * @return {boolean} is triggered?
   */
  public increment(): boolean {
    if (!this._disabled) {
      this._count++;
      if (this._count === this._threshold) {
        this._triggered = true;
        this._count = 0;
      } else {
        this._triggered = false;
      }
      return this._triggered;
    }
    return false;
  }

  /**
   * @name reset
   * @description reset threshold
   * @return {void}
   */
  public reset(): void {
    this._triggered = false;
    this._count = 0;
    this._disabled = true;
  }
}
