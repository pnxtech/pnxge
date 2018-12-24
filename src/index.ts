import * as PIXI from 'pixi.js';
import TestScene from './TestScene';
import PNXGameLoader from './PNXGameLoader';

export default class PixiBoot extends PIXI.Application {
  private gameLoader: PNXGameLoader;
  private scene: TestScene;

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
    });

    // let timer = setTimeout(() => {
    //   clearTimeout(timer);
    //   this.scene.destroy();
    // }, 15000);
  }
}

new PixiBoot();
