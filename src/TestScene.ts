import * as PIXI from 'pixi.js';
import PNXGameLoader from './PNXGameLoader';
import PNXScene from './PNXScene';

/**
 * @name TestScene
 * @description Sample test scene using the PNX Game Engine
 */
export default class TestScene extends PNXScene {
  private gameLoader: PNXGameLoader;
  private sceneName: string = 'level1';
  private timer: any;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    super(app);

    this.gameLoader = new PNXGameLoader(this, this.sceneName);
    this.gameLoader.load('game.json', (resources: {}) => {
      this.sortAnims();
    });
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    super.update(deltaTime);
    this.collisionDetection();
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  destroy(): void {
    super.destroy();
    clearInterval(this.timer);
  }
}
