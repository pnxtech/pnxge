import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';
import PNXAnim from './PNXAnim';
import PNXBackgroundTile from './PNXBackgroundTile';
import PNXTextSprite from './PNXTextSprite';
import { PNXPoint, PNXCurve } from './PNXMath';

import { setInterval } from 'timers';

enum SceneLevel {
  Low = 0,
  Medium = 5000,
  High = 10000
};

/**
 * @name TestScene
 * @description Sample test scene using the PNX Game Engine
 */
export default class TestScene extends PNXScene {
  private background: PNXBackgroundTile;
  private bitmapText: PNXTextSprite;
  private turetAnim: PNXAnim;
  private explosionAnim: PNXAnim;
  private curve: PNXCurve;
  private path: Array<PNXPoint>;
  private timer: any;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application) {
    super(app);

    this.curve = new PNXCurve(new PNXPoint(400, 0), new PNXPoint(0,800), new PNXPoint(400, 400), 100);
    this.path = this.curve.getPoints();
    // for (let i=0; i<this.path.length; i++) {
    //   console.log(`point: ${i} ${this.path[i].x}, ${this.path[i].y}`);
    // }
    this.background = new PNXBackgroundTile(this, 'tile.png');
    this.turetAnim = new PNXAnim(this);
    this.explosionAnim = new PNXAnim(this);

    this.assetLoader([
      'turet.json',
      'explode.json',
      'title60pt.fnt'
    ], (_loader, resources) => {
      this.bitmapText = new PNXTextSprite(this, 'PNXGameEngine', {font: '72px title60pt', align: 'left'});
      this.bitmapText.x = 150;
      this.bitmapText.y = 40;
      this.bitmapText.zOrder = SceneLevel.High;
      this.bitmapText.tint = 0x00bb00;

      this.explosionAnim.loadSequence('explode', resources);
      this.turetAnim.loadSequence('turet', resources);

      this.turetAnim.x = 400;
      this.turetAnim.y = 650;
      this.turetAnim.z = SceneLevel.Medium;
      this.turetAnim.vx = 0;
      this.turetAnim.vy = 0;
      this.turetAnim.type = 'hero';
      this.turetAnim.collisionDetection = true;
      this.turetAnim.play('turet', false);

      this.explosionAnim.x = 0;
      this.explosionAnim.y = 0;
      this.explosionAnim.z = SceneLevel.High - 1000;
      this.explosionAnim.vx = 10;
      this.explosionAnim.vy = 10;
      this.explosionAnim.type = 'bullet';
      this.explosionAnim.animationSpeed = 0.8;
      this.explosionAnim.collisionDetection = true;
      this.explosionAnim.play('explode', true);

      this.sortAnims();

      // this.timer = setInterval(() => {
      //   this.explosionAnim.z = 100;
      //   this.explosionAnim.play('explode', false);
      // }, 1000);
    });
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    this.turetAnim.update();

    if (this.path.length) {
      let loc = <any>this.path.shift();
      this.explosionAnim.x = loc.x;
      this.explosionAnim.y = loc.y;
    }

    this.explosionAnim.update();
    this.turetAnim.rotation = this.turetAnim.rotation + (0.02 * deltaTime);
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
    this.bitmapText.destroy();
    this.background.destroy();
    this.turetAnim.destroy();
    this.explosionAnim.destroy();
  }
}
