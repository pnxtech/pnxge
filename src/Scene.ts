import * as PIXI from 'pixi.js';

export default class Scene {
  public stage: PIXI.Container;
  public ticker: PIXI.ticker.Ticker;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    this.stage = app.stage;
    this.ticker = app.ticker;
  }

  /**
   * @name update
   * @description update the scene
   *
   */
  update(deltaTime: number): void {}

  /**
   * @name destroy
   * @description remove Anim objects from scene and stage container
   * @return {void}
   */
  destroy(): void {
    this.ticker.stop();

    for (let child of this.stage.children) {
      child.visible = false;
      this.stage.removeChild(child);
    }

    for (let texture in PIXI.utils.TextureCache) {
      PIXI.utils.TextureCache[texture].destroy(true);
    };

    // clear internal PIXI texture cache
    PIXI.loader.reset();
  }
}


