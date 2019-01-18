import * as PIXI from 'pixi.js';
import {IAnimCompatible} from './AnimCompatible';
import {Scene} from './Scene';
import {EventManager} from './EventManager';
import {Rect} from './Math';
import {Utils} from './Utils';
import {Attribs} from './Attribs';


/**
 * @name Image
 * @description  image sprite
 */
export class Image extends PIXI.Sprite implements IAnimCompatible {
  public id: string = (new Utils).createID();
  public attributes: Attribs;
  public collisionDetection: boolean = false;
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
    this.attributes = new Attribs();
    this.attributes.add('image');
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
   * @name get attribs
   * @description get attributes
   * @return {Attribs} attributes
   */
  get attribs(): Attribs {
    return this.attributes;
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
