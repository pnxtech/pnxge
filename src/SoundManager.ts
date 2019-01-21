import {Howl, Howler} from 'howler';

/**
 * @name SoundManager
 * @description sound manager
 * @note: Uses: https://github.com/goldfire/howler.js/
 */
export class SoundManager {
  private soundPlayer: any;
  private soundData: any = {};
  private globalVolume: number = 0;
  private disabled: boolean = false;

  /**
   * @name constructor
   * @description class constructor
   * @note remaps audiosprite generated sound sprite data to the format that howler.js requires
   */
  constructor(soundObj: any) {
    this.soundData = {
      src: soundObj.resources,
      preload: true,
      autoplay: false,
      pool: 10,
      sprite: soundObj.spritemap
    }
    let spritemap = this.soundData.sprite;
    Object.keys(spritemap).forEach((item: any) => {
      spritemap[item] = [
        spritemap[item].start * 1000,
        spritemap[item].end * 1000,
        spritemap[item].loop
      ];
    });
    this.soundPlayer = new Howl(this.soundData);
  }

  /**
   * @name disableSoundEngine
   * @description disable the sound engine (done when the underlying hardware doesn't support audio.)
   * @param {boolean} value - true to disable, else false
   */
  set disableSoundEngine(value: boolean) {
    this.disabled = value;
  }

  /**
   * @name play
   * @description play sound
   * @param {string} name of sound
   * @return {void}
   */
  play(name: string): void {
    if (this.disabled) {
      return;
    }
    this.stop(name);
    this.soundData.sprite[name].id = this.soundPlayer.play(name);
    return
  }

  /**
   * @name stop
   * @description stop sound
   * @param {string} name of sound
   * @return {void}
   */
  stop(name: string): void {
    if (this.disabled) {
      return;
    }
    if (this.soundData.sprite[name].id) {
      this.soundPlayer.stop(this.soundData.sprite[name].id);
    }
  }

  /**
   * @name volume
   * @description set global volume
   * @param {number} value - volume level 0 - 1
   */
  get volume(): number {
    return this.globalVolume;
  }

  /**
   * @name volume
   * @description set global volume
   * @note: 0 = muted 10 = max volume
   * @param {number} value - volume level 0 - 10
   */
  set volume(value: number) {
    this.globalVolume = value / 10;
    Howler.volume(this.globalVolume);
  }

  /**
   * @name mute
   * @description mute or unmute all sounds
   * @param {boolean} value - true to mute, false to unmute
   */
  set mute(value: boolean) {
    Howler.mute(value);
  }

  /**
   * @name unload
   * @description stop all sounds and unload sound cache
   * @return {void}
   */
  unload(): void {
    Howler.unload();
  }
}
