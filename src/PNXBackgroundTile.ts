import * as PIXI from 'pixi.js';
import PNXAnim from './PNXAnim';
import PNXScene from './PNXScene';
import PNXTilingSprite from './PNXTilingSprite';

/**
 * @name PNXBackgroundTile
 * @description uses a texture to tile a background
 * @note: uses PIXI.extras.TilingSprite, image resource should
 * have an image size of a power of two for use with WebGL
 */
export default class PNXBackgroundTile extends PNXAnim {
  protected scene: PNXScene;
  protected texture: PIXI.Texture;
  protected tilingSprite: PNXTilingSprite;

  /**
   * @name constructor
   * @description init class
   * @param {PNXScene} parent scene
   * @param {string} assetPath - path to image resource
   * @note image resource should have an image size of a power of two for use with WebGL
   */
  constructor(scene: PNXScene, assetPath: string) {
    super(scene);
    this.scene = scene;
    this.texture = PIXI.Texture.fromImage(assetPath);
    this.tilingSprite = new PNXTilingSprite(
      this.texture,
      scene.app.screen.width,
      scene.app.screen.height
    );
    scene.stage.addChild(this.tilingSprite);
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  destroy():void {
    this.tilingSprite.visible = false;
    this.scene.stage.removeChild(this.tilingSprite);
    this.tilingSprite.destroy({
      children: true,
      texture: false,
      baseTexture: false
    });
  }
};
