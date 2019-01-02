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
    this.scene.loadSplashScreen('tyros-loading.png');

    this.gameLoader = new PNXGameLoader(this.scene, 'level1');
    this.gameLoader.preload('game.json', (resources: {}) => {
      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.gameLoader.load((resources: {}) => {
          this.scene.closeSplashScreen();
          this.scene.start(resources);
        });
      }, 2000);
    });

    document.addEventListener('keydown', (event) => {
      if(event.keyCode === this.LEFTKEY) {
        this.scene.moveLeft();
      }
      else if(event.keyCode === this.RIGHTKEY) {
        this.scene.moveRight();
      }
    });

    // let timer = setTimeout(() => {
    //   clearTimeout(timer);
    //   this.scene.destroy();
    // }, 15000);
  }

  /**
   * @name levelEnd
   * @description level end handler
   * @param {string} outcome - result of level ending
   */
  levelEnd(outcome: string): void {
  }

}

new GameApp();

