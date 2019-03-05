import * as PIXI from 'pixi.js';
import {Attribs} from './Attribs';
import {Scene} from './Scene';
import {Sprite} from './Sprite';
import {AnimatedSprite} from './AnimatedSprite';
import {TextSprite} from './TextSprite';
import {Controller} from './Controller';
import {EventManager} from './EventManager';

/**
 * @name ISprite
 * @description Sprite object interface
 */
export interface ISprite{
  subType: string;
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  dx: number;
  dy: number;
  z: number;
  width: number;
  height: number;
  rotation: number;
  scale: PIXI.Point,
  cacheAsBitmap: boolean;
  collisionDetection: boolean;
  collisionWith: Sprite | AnimatedSprite | TextSprite | undefined;
  visible: boolean;
  health: number;
  strength: number;
  attribs: Attribs;
  animationSpeed?: number;
  scene: Scene;
  controller: Controller | undefined;
  text?: string;
  attachController(controller: Controller): void;
  attachTouchHandler(name: string, eventManager: EventManager): void;
  update(deltaTime: number): void;
  onCollision(sprite: Sprite | AnimatedSprite | TextSprite | undefined): void;
  clearCollision(): void;
  gotoAndStop?: (frame: number) => void;
  play?: () => void;
  destroy(): void;
};
