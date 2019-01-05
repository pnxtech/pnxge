import {Howl, Howler} from 'howler';

/**
 * @name SoundManager
 * @description sound manager
 */
export class SoundManager {
  private soundPlayer: any;
  private soundData: any = {};
  private globalVolume: number = 0;

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
   * @name play
   * @description play sound
   * @param {string} name - name of sound
   * @return {void}
   */
  play(name: string): void {
    this.soundPlayer.play(name);
  }

  /**
   * @name stop
   * @description stop sound
   * @param {string} name - name of sound
   * @return {void}
   */
  stop(name: string): void {
    this.soundPlayer.stop(name);
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
   * @param {number} value - volume level 0 - 1
   */
  set volume(value: number) {
    this.globalVolume = value;
    Howler.volume(value);
  }
}
