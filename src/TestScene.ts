import * as PIXI from 'pixi.js';
import PNXScene from './PNXScene';
import {PNXProjectileManager} from './PNXProjectileManager';
import HeroController from './heroController';
import SquidController from './squidController';
import SeekerController from './seekerController';
import BeetleController from './beetleController';


/**
 * @name TestScene
 * @description Sample test scene using the PNX Game Engine
 */
export default class TestScene extends PNXScene {
  protected projectileManager: PNXProjectileManager | undefined;
  private heroController: HeroController | undefined;

  /**
   * @name constructor
   * @description initialize scene
   * @param {PIXI.Container} stage
   */
  constructor(app: PIXI.Application, width: number, height: number) {
    super(app, width, height);
    this.app = app;
  }

  /**
   * @name start
   * @description start scene updates
   * @param {object} resources - loaded asset resources
   * @return {void}
   */
  start(resources: {}): void {
    this.projectileManager = new PNXProjectileManager(this, 'sprites.json', resources);
    this.attachProjectileManager(this.projectileManager);
    this.heroController = new HeroController('hero', this);
    new SquidController('squid1', this);
    new SeekerController('seeker1', this);
    new BeetleController('beetle1', this);
    super.start(resources);
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  moveLeft(): void {
    super.moveLeft();
    if (this.heroController) {
      this.heroController.moveLeft();
    }
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
    super.moveRight();
    if (this.heroController) {
      this.heroController.moveRight();
    }
  }

  /**
   * @name update
   * @description update the scene
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    super.update(deltaTime);
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  destroy(): void {
    super.destroy();
  }
}
