import {Utils} from './Utils';

/**
 * @name State
 * @description State management
 */
export class State {
  private _state: {};

  /**
   * @name constructor
   * @description state initializer
   */
  constructor() {
    this._state = {};
  }

  /**
   * @name state
   * @description state getter
   * @return {object}
   */
  public get state(): any {
    return this._state;
  }

  /**
   * @name state
   * @description state setter
   * @param {any} data - object to be merged with state
   */
  public set state(data: any) {
    this._state = data;
  }

  /**
   * @name setState
   * @description merges object entries in to application state
   * @param {object} data - object to be merged with state
   * @return {object} new application state
   */
  public setState(data: any): any {
    let newState = Utils.mergeObjects(this._state, data);
    this._state = newState;
    return this._state;
  }
}
