import PNXApplication from './PNXApplication';
import PNXGameLoader from './PNXGameLoader';
import Level1Scene from './level1Scene';

let SCENEWIDTH: number = 360;
let SCENEHEIGHT: number = 360;

export default class GameApp extends PNXApplication {
  private gameLoader: PNXGameLoader;
  private scene: Level1Scene;
  private LEFTKEY: number = 37;
  private RIGHTKEY: number = 39;

  constructor() {
    super(SCENEWIDTH, SCENEHEIGHT);
    this.scene = new Level1Scene(this);

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
