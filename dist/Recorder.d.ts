export interface IRecorderHash {
    [name: number]: string;
}
/**
 * @name Recorder
 * @description event recorder. Uses the app update() to record events.
 * @notes Stores recording in Window.localstorage under the recording key.
 */
export declare class Recorder {
    protected tick: number;
    protected recording: IRecorderHash;
    /**
     * @name start
     * @description starts a recording
     * @return {void}
     */
    start(): void;
    /**
     * @name stop
     * @description stops a recording. stores recording in localstorage
     * @return {void}
     */
    stop(): void;
    /**
     * @name record
     * @description records an event
     * @param {string} action - name of event
     * @return {void}
     */
    record(action: string): void;
    /**
     * @name update
     * @description updates internal ticker. Must be called by application update()
     * @return {void}
     */
    update(): void;
}
//# sourceMappingURL=Recorder.d.ts.map