interface IRecorderHash {
  [name: number]: string
}

/**
 * @name Recorder
 * @description event recorder. Uses the app update() to record events.
 * @notes Stores recording in Window.localstorage under the recording key.
 */
export class Recorder {
  protected tick: number = 0;
  protected recording: IRecorderHash = {};

  /**
   * @name start
   * @description starts a recording
   * @return {void}
   */
  start(): void {
    this.tick = 0;
  }

  /**
   * @name stop
   * @description stops a recording. stores recording in localstorage
   * @return {void}
   */
  stop(): void {
    window.localStorage.setItem('recording', JSON.stringify(this.recording));
  }

  /**
   * @name record
   * @description records an event
   * @param {string} action - name of event
   * @return {void}
   */
  record(action: string): void {
    this.recording[this.tick] = action;
  }

  /**
   * @name update
   * @description updates internal ticker. Must be called by application update()
   * @return {void}
   */
  update(): void {
    this.tick++;
  }
}
