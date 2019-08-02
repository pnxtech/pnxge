
interface ISoundsHash {
  [name: string]: any
};

/**
 * @name SoundManager2
 * @description sound manager2
 */
export class SoundManager {
  //#region variables
  private globalVolume: number = 0;
  private disabled: boolean = false;
  private soundResources: ISoundsHash = {};
  //#endregion

  /**
   * @name constructor
   * @description class constructor
   * @param {array} soundList - list of sound paths
   */
  constructor(soundList: any) {
    soundList.forEach((filePath: any) => {
      let name = filePath.split('.')[0];
      let sound = document.createElement('audio');
      sound.src = filePath;
      sound.setAttribute('preload', 'auto');
      sound.setAttribute('controls', 'none');
      sound.style.display = 'none';
      document.body.appendChild(sound);
      this.soundResources[name] = {
        name,
        filePath,
        sound,
      };
    });
  }

  /**
   * @name disableSoundEngine
   * @description disable the sound engine (done when the underlying hardware doesn't support audio.)
   * @param {boolean} value - true to disable, else false
   */
  public set disableSoundEngine(value: boolean) {
    this.disabled = value;
  }

  /**
   * @name play
   * @description play sound
   * @param {string} name of sound
   * @return {void}
   */
  public play(name: string): void {
    if (this.disabled || !this.globalVolume) {
      return;
    }
    this.soundResources[name].sound.play();
  }

  /**
   * @name stop
   * @description stop sound
   * @param {string} name of sound
   * @return {void}
   */
  public stop(name: string): void {
    if (this.disabled) {
      return;
    }
    this.soundResources[name].sound.pause();
  }

  /**
   * @name volume
   * @description set global volume
   * @param {number} value - volume level 0 - 1
   */
  public get volume(): number {
    return this.globalVolume;
  }

  /**
   * @name volume
   * @description set global volume
   * @note: 0 = muted 10 = max volume
   * @param {number} value - volume level 0 - 10
   */
  public set volume(value: number) {
    this.globalVolume = value / 10;
    // todo look sounds and set .volume = value
    for (let name in this.soundResources) {
      let item = this.soundResources[name];
      item.sound.volume = this.globalVolume;
    }
  }

  /**
   * @name mute
   * @description mute or unmute all sounds
   * @param {boolean} value - true to mute, false to unmute
   */
  public set mute(value: boolean) {
  }

  /**
   * @name unload
   * @description stop all sounds and unload sound cache
   * @return {void}
   */
  public unload(): void {
    for (let name in this.soundResources) {
      let item = this.soundResources[name];
      document.body.removeChild(item.sound);
      delete this.soundResources[item.name];
    }
  }
}
