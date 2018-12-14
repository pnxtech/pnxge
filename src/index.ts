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
    this.ticker.add((deltaTime) => this.update(deltaTime));

    let timer = setTimeout(() => {
      clearTimeout(timer);
      this.scene.destroy();
    }, 5000);
  }

  update(deltaTime: number) {
    this.scene.update(deltaTime);
  }
}

new PixiBoot();
