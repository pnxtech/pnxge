import {Utils} from './Utils';

interface IEventCallback { (eventData: any): void };
interface IEventHash {
  [name: string]: {
    [id: string]: IEventCallback
  }
};

/**
 * @name EventManager
 * @description Event system - allows for adding, removing and triggering system wide events
 */
export class EventManager {
  private callBackData: IEventHash = {};

  /**
   * @name addEventHandler
   * @description add an event handler for a named event
   * @param {string} name - named event
   * @param {IEventCallback} callback - function handler
   * @return {string} ID of newly added event handler
   */
  addEventHandler(name: string, callback: IEventCallback): string {
    let newID = (new Utils).createID();
    if (!this.callBackData[name]) {
      this.callBackData[name] = {
        [newID]: callback
      };
    } else {
      this.callBackData[name][newID] = callback;
    }
    return newID;
  }

  /**
   * @name removeEventHandler
   * @description removes an event handler by ID
   * @param {string} eventID - ID returned by the addEventHandler method
   * @return {void}
   */
  removeEventHandler(eventID: string): void {
    Object.keys(this.callBackData).forEach((name) => {
        Object.keys(this.callBackData[name]).forEach((id) => {
          if (id === eventID) {
            delete this.callBackData[name][id];
          }
        });
    });
  }

  /**
   * @name triggerEvent
   * @description trigger all handlers for named event
   * @param {string} name - named event
   * @param {any} eventData - data to pass to event handlers
   * @return {void}
   */
  triggerEvent(name: string, eventData: any): void {
    if (this.callBackData[name]) {
      Object.keys(this.callBackData[name]).forEach((id) => {
        this.callBackData[name][id](eventData);
      });
    }
  }
}
