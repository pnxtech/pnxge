import * as PNXGE from './PNXGE';
import TimedSplashScene from './timedSplashScene';
import TitleScene from './titleScene';
import Level1Scene from './level1Scene';

let SCENEWIDTH: number = 360;
let SCENEHEIGHT: number = 360;
let DEMO: boolean = true;

export default class GameApp extends PNXGE.Application {
  private assetManager: PNXGE.AssetManager;
  private scene: PNXGE.Scene | undefined;
  private LEFTKEY: number = 37;
  private RIGHTKEY: number = 39;

  constructor() {
    super(SCENEWIDTH, SCENEHEIGHT);
    this.demo = DEMO;

    this.assetManager = new PNXGE.AssetManager();
    this.assetManager.init('game.json', (resources: {}) => {
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
   * @description scene end handler
   * @param {string} outcome - result of scene ending
   * @return {void}
   */
  sceneEnd(outcome: string): void {
    if (this.scene) {
      this.scene.destroy();
      this.scene = undefined;
    }
    switch (outcome) {
      case 'titleSceneEnd':
        this.loadTimedScene('loading', 'loadingEnd', 2);
        break;
      case 'loadingEnd':
        this.loadLevel1Scene();
        break;
      case 'gameover':
        this.loadTimedScene('gameover', 'gameOverSceneEnd', 2);
        break;
      case 'gameOverSceneEnd':
        this.loadTitleScene();
        break;
      case 'level1SceneEnd':
        this.loadTimedScene('level1Complete', 'level1CompleteSceneEnd', 2);
        break;
      case 'level1CompleteSceneEnd':
        this.loadTitleScene();
        break;
    }
    this.rebindControls();
  }

  /**
   * @name loadTimedScene
   * @description load timed scene
   * @param {string} sceneName - name of scene
   * @param {string} exitMessage - message to send on exit
   * @param {number} delay - delay in seconds
   * @return {void}
   */
  loadTimedScene(sceneName: string, exitMessage: string, delay: number): void {
    this.scene = new TimedSplashScene(this, delay, exitMessage);
    this.assetManager.populateScene(this.scene, sceneName, (resources: {}) => {
      if (this.scene) {
        this.scene.start(resources);
      }
    });
  }

  /**
   * @name loadTitleScene
   * @description load title scene
   * @return {void}
   */
  loadTitleScene(): void {
    this.scene = new TitleScene(this);
    this.assetManager.populateScene(this.scene, 'title', (resources: {}) => {
      if (this.scene) {
        this.scene.start(resources);
      }
    });
  }

  /**
   * @name loadLevel1Scene
   * @description load level 1 scene
   * @return {void}
   */
  loadLevel1Scene(): void {
    this.scene = new Level1Scene(this);
    this.assetManager.populateScene(this.scene, 'level1', (resources: {}) => {
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

