/**
 * @name State
 * @description State management
 */
export declare class State {
    private _state;
    private utils;
    /**
     * @name constructor
     * @description state initializer
     */
    constructor();
    /**
     * @name state
     * @description state getter
     * @return {object}
     */
    /**
    * @name state
    * @description state setter
    * @param {any} data - object to be merged with state
    */
    state: any;
    /**
     * @name setState
     * @description merges object entries in to application state
     * @param {object} data - object to be merged with state
     * @return {object} new application state
     */
    setState(data: any): any;
}
//# sourceMappingURL=State.d.ts.map