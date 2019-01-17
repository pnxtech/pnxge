import * as PIXI from 'pixi.js';
import {IAnimCompatible} from './AnimCompatible';
import {AnimType} from './Anim';
import {Scene} from './Scene';
import {EventManager} from './EventManager';
import {createID, Rect} from './Math';


/**
 * @name Image
 * @description  image sprite
 */
export class Image extends PIXI.Sprite implements IAnimCompatible {
  public id: string = createID();
  public collisionDetection: boolean = false;
  public type: string = AnimType.IMAGE;
  public anim: Image | undefined;
  protected scene: Scene;
  private zOrder: number = 0;
  private internalRect: Rect;

  /**
   * @name constructor
   * @description constructor
   * @param {Scene} scene - reference to parent scene
   * @param {string} name - name of sequence
   * @param {object} resources - loaded resources
   */
  constructor(scene: Scene, name: string, resources: any) {
    super(resources.textures[name]);
    this.anim = this;
    this.scene = scene;
    scene.stage.addChild(this);
    this.internalRect = new Rect(this.x, this.y, this.width, this.height);
  }

  /**
   * @name z
   * @description z position getter
   * @return {number} z position
   */
  get z(): number {
    return this.zOrder;
  }

  /**
   * @name z
   * @description z position setter
   */
  set z(z: number) {
    this.zOrder = z;
  }

  /**
   * @name visible
   * @description get visibility
   * @return {boolean} true if visible
   */
  get visible(): boolean {
    return (this.anim) ? this.anim.visible : false;
  }

  /**
   * @name visible
   * @description set visibility
   */
  set visible(value: boolean) {
    if (this.anim) {
      this.anim.visible = value;
    }
  }

  /**
   * @name rect
   * @description rect getter
   * @return {Rect} rect object from anim
   */
  get rect(): Rect {
    this.internalRect.x = this.x;
    this.internalRect.y = this.y;
    this.internalRect.width = this.width;
    this.internalRect.height = this.height;
    return this.internalRect;
  }

  /**
   * @name attachTouchHandler
   * @description attach a touch (click, press, touch) handler for this anim
   * @param {string} name - name of event
   * @param {EventManager} - instance of event eventManager
   * @return {void}
   */
  attachTouchHandler(name: string, eventManager: EventManager): void {
    this.interactive = true;
    this.on('click', () => {
      eventManager.triggerEvent(name, this);
    });
    this.on('touchend', () => {
      eventManager.triggerEvent(name, this);
    });
  }

  /**
   * @name update
   * @description update handler
   * @param {number} deltaTime - delta time
   * @return {void}
   */
  update(deltaTime: number): void {
  }

  /**
   * @name destroy
   * @description cleanup
   */
  destroy() {
    this.scene.stage.removeChild(this);
  }
}
