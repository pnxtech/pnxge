import * as PIXI from 'pixi.js';
import PNXGameLoader from './PNXGameLoader';
import PNXScene from './PNXScene';
import PNXAnim, { AnimType } from './PNXAnim';
import PNXBackgroundTile from './PNXBackgroundTile';
import PNXTextSprite from './PNXTextSprite';
import { PNXPoint, PNXCurve, PNXVector, PNXAngle } from './PNXMath';

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
  private gameLoader: PNXGameLoader;
  private background: PNXBackgroundTile;
  private bitmapText: PNXTextSprite;
  private movementVector: PNXVector;
  private tankAnim: PNXAnim;
  private explosionAnim: PNXAnim;
  private bulletAnim: PNXAnim;
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

    this.movementVector = new PNXVector();
    // this.curve = new PNXCurve(new PNXPoint(400, 0), new PNXPoint(0,800), new PNXPoint(400, 400), 100);
    // this.path = this.curve.getPoints();
    // for (let i=0; i<this.path.length; i++) {
    //   console.log(`point: ${i} ${this.path[i].x}, ${this.path[i].y}`);
    // }
    this.background = new PNXBackgroundTile(this, 'tile.png');
    this.tankAnim = new PNXAnim(this);
    this.bulletAnim = new PNXAnim(this);
    this.explosionAnim = new PNXAnim(this);

    this.gameLoader = new PNXGameLoader()
    this.gameLoader.load('game.json', (resources: {}) => {
      this.bitmapText = new PNXTextSprite(this, 'Battle\nfor\nTyros', {font: '60px title60pt', align: 'center'});
      this.bitmapText.x = 110;
      this.bitmapText.y = 30;
      this.bitmapText.zOrder = SceneLevel.High;

      this.explosionAnim.loadSequence('explode', 'sprites.json', resources);
      this.bulletAnim.loadSequence('bullet', 'sprites.json', resources);
      this.tankAnim.loadSequence('tank', 'sprites.json', resources);

      this.tankAnim.x = 180;
      this.tankAnim.y = 310;
      this.tankAnim.z = SceneLevel.Medium;
      this.tankAnim.vx = 0;
      this.tankAnim.vy = 0;
      this.tankAnim.type = AnimType.HERO;
      this.tankAnim.collisionDetection = true;
      this.tankAnim.animationSpeed = 0.02;
      this.tankAnim.play('tank', true);

      this.explosionAnim.x = 180;
      this.explosionAnim.y = 280;
      this.explosionAnim.z = SceneLevel.High - 1000;
      // this.explosionAnim.vx = 4;
      // this.explosionAnim.vy = 4;
      this.explosionAnim.type = AnimType.EXPLOSION;
      this.explosionAnim.animationSpeed = 0.33;
      this.explosionAnim.collisionDetection = false;
      this.explosionAnim.play('explode', false);

      this.bulletAnim.x = 180;
      this.bulletAnim.y = 310;
      this.bulletAnim.z = SceneLevel.High - 1000;
      this.bulletAnim.vx = 0;
      this.bulletAnim.vy = -2;
      this.bulletAnim.type = AnimType.BULLET;
      this.bulletAnim.collisionDetection = true;
      this.bulletAnim.play('bullet', false);
      this.bulletAnim.setFrame(0);

      let angle: PNXAngle = new PNXAngle();
      let radians = angle.angleFromVectors(
        new PNXVector(this.explosionAnim.x, this.explosionAnim.y),
        new PNXVector(this.tankAnim.x, this.tankAnim.y)
      );
      this.movementVector = angle.vectorAngleFromRadians(radians);
      this.explosionAnim.dx = this.movementVector.x;
      this.explosionAnim.dy = this.movementVector.y;

      this.bulletAnim.dx = this.movementVector.x;
      this.bulletAnim.dy = this.movementVector.y;

      let tAngle = angle.vectorAngleFromDegrees(359);
      this.tankAnim.dx = tAngle.x;
      this.tankAnim.dy = tAngle.y;

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
    // if (this.path.length) {
    //   let loc = <any>this.path.shift();
    //   this.explosionAnim.x = loc.x;
    //   this.explosionAnim.y = loc.y;
    // }

    this.tankAnim.update(deltaTime);
    // this.tankAnim.rotation = this.tankAnim.rotation + (0.02 * deltaTime);
    this.bulletAnim.update(deltaTime);
    this.explosionAnim.update(deltaTime);
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
    this.tankAnim.destroy();
    this.explosionAnim.destroy();
  }
}
