import * as PIXI from 'pixi.js';
import TestScene from './testScene';
import PNXGameLoader from './PNXGameLoader';

export default class PixiBoot extends PIXI.Application {
  private gameLoader: PNXGameLoader;
  private scene: TestScene;
  private LEFTKEY: number = 37;
  private RIGHTKEY: number = 39;

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('canvas'),
      backgroundColor: 0x000000,
      width: 360,
      height: 360
    });
    document.body.appendChild(this.view);

    this.scene = new TestScene(this);

    this.gameLoader = new PNXGameLoader(this.scene, 'level1');
    this.gameLoader.load('game.json', (resources: {}) => {
      this.scene.sortAnims();
      this.scene.start();
      document.addEventListener('keydown', (event) => {
        if(event.keyCode === this.LEFTKEY) {
          this.scene.moveLeft();
        }
        else if(event.keyCode === this.RIGHTKEY) {
          this.scene.moveRight();
        }
      });
    });

    // let timer = setTimeout(() => {
    //   clearTimeout(timer);
    //   this.scene.destroy();
    // }, 15000);
  }
}

new PixiBoot();
