/**
 * @name Threshold
 * @description threshold tracking and management
 */
export declare class Threshold {
    private _count;
    private _threshold;
    private _triggered;
    private _disabled;
    /**
     * @name construtor
     * @description initialize threshold
     * @param {number} max - maximum threshold value
     */
    constructor(max: number);
    /**
     * @name threshold
     * @description threshold getter
     * @return {number} value of threshold
     */
    /**
    * @name threshold
    * @description threshold setter. used if there's a need to change the threshold after construction
    * @param {number} value - value to set threshold
    * @return {void}
    */
    threshold: number;
    /**
     * @name disabled
     * @description disabled getter
     * @return {boolean} is disabled?
     */
    /**
    * @name disabled
    * @description disabled setter
    * @param {boolean} value - true to disable / false to enable
    * @return {void}
    */
    disabled: boolean;
    /**
     * @name triggered
     * @description triggered getter
     * @return {number} value of trigger
     */
    readonly triggered: boolean;
    /**
     * @name increment
     * @description increment the internal count towards eventual threshold
     * @return {boolean} is triggered?
     */
    increment(): boolean;
    /**
     * @name reset
     * @description reset threshold
     * @return {void}
     */
    reset(): void;
}
//# sourceMappingURL=Threshold.d.ts.map