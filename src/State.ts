import {Utils} from './Utils';

/**
 * @name State
 * @description State management
 */
export class State {
  private _state: {};
  private utils: Utils;

  /**
   * @name constructor
   * @description state initializer
   */
  constructor() {
    this._state = {};
    this.utils = new Utils();
  }

  /**
   * @name state
   * @description state getter
   * @return {object}
   */
  get state(): any {
    return this._state;
  }

  /**
   * @name state
   * @description state setter
   * @param {any} data - object to be merged with state
   */
  set state(data: any) {
    this._state = data;
  }

  /**
   * @name setState
   * @description merges object entries in to application state
   * @param {object} data - object to be merged with state
   * @return {object} new application state
   */
  setState(data: any): any {
    let newState = this.utils.mergeObjects(this._state, data);
    this._state = newState;
    return this._state;
  }
}
