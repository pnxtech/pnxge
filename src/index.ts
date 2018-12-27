import * as PIXI from 'pixi.js';
import TestScene from './testScene';
import PNXGameLoader from './PNXGameLoader';

export default class PixiBoot extends PIXI.Application {
  private gameLoader: PNXGameLoader;
  private scene: TestScene;
  private LEFTKEY: number = 37;
  private RIGHTKEY: number = 39;
  private SCENEWIDTH: number = 360;
  private SCENEHEIGHT: number = 360;

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('canvas'),
      backgroundColor: 0x000000,
      width: 360,
      height: 360
    });
    document.body.appendChild(this.view);

    this.scene = new TestScene(this, this.SCENEWIDTH, this.SCENEHEIGHT);

    this.gameLoader = new PNXGameLoader(this.scene, 'level1');
    this.gameLoader.load('game.json', (resources: {}) => {
      this.scene.start(resources);
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
