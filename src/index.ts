import * as PIXI from 'pixi.js';
import TestScene from './TestScene';

export default class PixiBoot extends PIXI.Application {
  private scene: TestScene;

  constructor() {
    super({
      view: <HTMLCanvasElement>document.getElementById('canvas'),
      backgroundColor: 0x000000,
      width: 800,
      height: 800
    });
    document.body.appendChild(this.view);

    this.scene = new TestScene(this);
    this.scene.start();

    // let timer = setTimeout(() => {
    //   clearTimeout(timer);
    //   this.scene.destroy();
    // }, 15000);
  }
}

new PixiBoot();
