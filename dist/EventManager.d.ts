interface IEventCallback {
    (eventData: any): void;
}
/**
 * @name EventManager
 * @description Event system - allows for adding, removing and triggering system wide events
 */
export declare class EventManager {
    private callBackData;
    /**
     * @name addEventHandler
     * @description add an event handler for a named event
     * @param {string} name - named event
     * @param {IEventCallback} callback - function handler
     * @return {string} ID of newly added event handler
     */
    addEventHandler(name: string, callback: IEventCallback): string;
    /**
     * @name removeEventHandler
     * @description removes an event handler by ID
     * @param {string} eventID - ID returned by the addEventHandler method
     * @return {void}
     */
    removeEventHandler(eventID: string): void;
    /**
     * @name triggerEvent
     * @description trigger all handlers for named event
     * @param {string} name - named event
     * @param {any} eventData - data to pass to event handlers
     * @return {void}
     */
    triggerEvent(name: string, eventData: any): void;
}
export {};
//# sourceMappingURL=EventManager.d.ts.map