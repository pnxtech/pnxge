import * as PNXGE from './PNXGE';
import TitleScene from './titleScene';
import Level1Scene from './level1Scene';
import Level1CompleteScene from './level1CompleteScene';
import GameoverScene from './gameoverScene';

let SCENEWIDTH: number = 360;
let SCENEHEIGHT: number = 360;
let DEMO: boolean = true;

export default class GameApp extends PNXGE.Application {
  private gameLoader: PNXGE.GameLoader;
  private scene: PNXGE.Scene | undefined;
  private LEFTKEY: number = 37;
  private RIGHTKEY: number = 39;

  constructor() {
    super(SCENEWIDTH, SCENEHEIGHT);
    this.demo = DEMO;

    this.gameLoader = new PNXGE.GameLoader();
    this.gameLoader.init('game.json', (resources: {}) => {
      // this.gameOverScene();
      this.loadTitleScene();
      this.rebindControls();
    });
  }

  /**
   * @name rebindControls
   * @description rebind keyboard controls
   * @return {void}
   */
  rebindControls(): void {
    document.addEventListener('keydown', (event) => {
      if(event.keyCode === this.LEFTKEY) {
        if (this.scene) {
          this.scene.moveLeft();
        }
      }
      else if(event.keyCode === this.RIGHTKEY) {
        if (this.scene) {
          this.scene.moveRight();
        }
      }
    });
  }

  /**
   * @name sceneEnd
   * @description scenne end handler
   * @param {string} outcome - result of level ending
   */
  sceneEnd(outcome: string): void {
    if (this.scene) {
      this.scene.destroy();
      this.scene = undefined;
    }
    switch (outcome) {
      case 'titleSceneEnd':
        this.loadLevel1Scene();
        break;
      case 'gameover':
        this.gameOverScene();
        break;
      case 'gameOverSceneEnd':
        this.loadTitleScene();
        break;
      case 'level1SceneEnd':
        this.loadLevel1CompleteScene();
        break;
      case 'level1CompleteSceneEnd':
        this.loadTitleScene();
        break;
    }
    this.rebindControls();
  }

  loadTitleScene() {
    this.scene = new TitleScene(this);
    this.gameLoader.populateScene(this.scene, 'title', (resources: {}) => {
      if (this.scene) {
        this.scene.start(resources);
      }
    });
  }

  loadLevel1Scene() {
    this.scene = new Level1Scene(this);
    this.gameLoader.populateScene(this.scene, 'level1', (resources: {}) => {
      if (this.scene) {
        this.scene.start(resources);
      }
    });
  }

  loadLevel1CompleteScene() {
    this.scene = new Level1CompleteScene(this);
    this.gameLoader.populateScene(this.scene, 'level1Complete', (resources: {}) => {
      if (this.scene) {
        this.scene.start(resources);
      }
    });
  }

  gameOverScene() {
    this.scene = new GameoverScene(this);
    this.gameLoader.populateScene(this.scene, 'gameover', (resources: {}) => {
      if (this.scene) {
        this.scene.start(resources);
      }
    });
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    if (this.scene) {
      this.scene.update(deltaTime);
    }
  }
}

new GameApp();

