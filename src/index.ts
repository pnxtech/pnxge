import * as PIXI from 'pixi.js';
import PNXApplication from './PNXApplication';
import PNXGameLoader from './PNXGameLoader';
import TestScene from './testScene';

let SCENEWIDTH: number = 360;
let SCENEHEIGHT: number = 360;

export default class GameApp extends PNXApplication {
  private gameLoader: PNXGameLoader;
  private scene: TestScene;
  private LEFTKEY: number = 37;
  private RIGHTKEY: number = 39;

  constructor() {
    super(SCENEWIDTH, SCENEHEIGHT);
    this.scene = new TestScene(this);

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

new GameApp();
