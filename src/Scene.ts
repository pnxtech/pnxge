import * as PIXI from 'pixi.js';

interface ICallback { (loader: PIXI.loaders.Loader, resources: {}): void };

export default class Scene {
  public stage: PIXI.Container;
  public ticker: PIXI.ticker.Ticker;
  private loader: PIXI.loaders.Loader;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    this.stage = app.stage;
    this.ticker = app.ticker;
    this.loader = new PIXI.loaders.Loader();
  }

  /**
   * @name assetLoader
   * @description load game assets
   * @param {string[]} assets - array of asset files
   * @param {ICallback} postLoaderHandler - handler to call on post load
   */
  assetLoader(assets: string[], postLoaderHandler: ICallback): void {
    for (let asset of assets) {
      this.loader.add(asset);
    }
    this.loader.load(postLoaderHandler);
  }

  /**
   * @name start
   * @description start scene updates
   * @return {void}
   */
  start(): void {
    this.ticker.add((deltaTime) => this.update(deltaTime));
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {}


  /**
   * @name destroy
   * @description remove Anim objects from scene and stage container
   * @return {void}
   */
  destroy(): void {
    for (let child of this.stage.children) {
      child.renderable = false;
    }

    let interval = setInterval(() => {
      clearInterval(interval);

      this.ticker.stop();

      for (let child of this.stage.children) {
        this.stage.removeChild(child);
      }

      for (let texture in PIXI.utils.TextureCache) {
        PIXI.utils.TextureCache[texture].destroy(true);
      };

      PIXI.loader.reset();
    }, 2000);
  }
}


