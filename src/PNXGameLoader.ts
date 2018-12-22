import * as PIXI from 'pixi.js';

interface ICallback { (resources: {}): void };

export default class PNXGameLoader {
  private loader: PIXI.loaders.Loader;
  private gameConfig: any = {};

  /**
   * @name constructor
   * @description initialize game loader
   */
  constructor() {
    this.loader = new PIXI.loaders.Loader();
  }

  /**
   * @name load
   * @description load game assets
   * @param {string} filename - game file name
   * @param {ICallback} postLoaderHandler - handler to call on post load
   */
  load(filename: string, postLoaderHandler: ICallback): void {
    this.loader.add(filename);
    this.loader.load((_loader: PIXI.loaders.Loader, resources: {}) => {
      this.gameConfig = resources[filename].data;
      for (let asset of this.gameConfig.assets) {
        this.loader.add(asset);
      }
      this.loader.load((_loader: PIXI.loaders.Loader, resources: {}) => {
        // TODO: process game.json here
        // then call postLoaderHandler
        postLoaderHandler(resources);
      });
    });
  }
}
