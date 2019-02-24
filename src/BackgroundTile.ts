import * as PIXI from 'pixi.js';
import {Anim} from './Anim';
import {Scene} from './Scene';
import {TilingSprite} from './TilingSprite';


/**
 * @name BackgroundTile
 * @description uses a texture to tile a background
 * @note: uses PIXI.extras.TilingSprite, image resource should
 * have an image size of a power of two for use with WebGL
 */
export class BackgroundTile extends Anim {
  protected scene: Scene;
  protected texture: PIXI.Texture;
  protected tilingSprite: TilingSprite;
  protected _subType: string = '';

  /**
   * @name constructor
   * @description init class
   * @param {Scene} parent scene
   * @param {string} assetPath - path to image resource
   * @note image resource should have an image size of a power of two for use with WebGL
   */
  constructor(scene: Scene, assetPath: string) {
    super(scene);
    this.scene = scene;
    this.texture = PIXI.Texture.fromImage(assetPath);
    this.tilingSprite = new TilingSprite(
      this.scene,
      this.texture,
      scene.app.screen.width,
      scene.app.screen.height
    );

    this.tilingSprite.anchor.x = 0.5;
    this.tilingSprite.anchor.y = 0.5;

    this.tilingSprite.x = this.tilingSprite.width / 2;
    this.tilingSprite.y = this.tilingSprite.height / 2;
    this.tilingSprite.cacheAsBitmap = true;
    scene.stage.addChild(this.tilingSprite);
  }

  /**
   * @name flip
   * @description flip tile
   * @param {state} boolean - true flip, else don't
   * @return {void}
   */
  public flip(state: boolean): void {
    this.tilingSprite.anchor.x = 0.5;
    this.tilingSprite.anchor.y = 0.5;
    if (state) {
      this.tilingSprite.scale.x *= -1;
    } else {
      this.tilingSprite.scale.y *= -1;
    }
  }

  /**
   * @name setTint
   * @description set tint
   * @param {number} color - color tint
   * @return {void}
   */
  public setTint(color: number): void {
    this.tilingSprite.tint = color;
  }

  /**
   * @name subType
   * @description subType getter
   * @return {string} subType
   */
  public get subType(): string {
    return this._subType;
  }

  /**
   * @name subType
   * @description subType setter
   * @return {void}
   */
  public set subType(value: string) {
    this._subType = value;
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  public destroy(): void {
    this.tilingSprite.visible = false;
    this.scene.stage.removeChild(this.tilingSprite);
    this.tilingSprite.destroy({
      children: true,
      texture: false,
      baseTexture: false
    });
  }
}

