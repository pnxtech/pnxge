import * as PIXI from 'pixi.js';
import {Attribs} from './Attribs';
import {Controller} from './Controller';

/**
 * @name ISprite
 * @description Sprite object interface
 */
export interface ISprite{
  subType: string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  vx: number;
  vy: number;
  dx: number;
  dy: number;
  z: number;
  scale: PIXI.Point,
  cacheAsBitmap: boolean;
  collisionDetection: boolean;
  collisionWith: ISprite | undefined;
  visible: boolean;
  health: number;
  strength: number;
  attribs: Attribs;
  animationSpeed?: number;
  attachController(controller: Controller): void;
  update(deltaTime: number): void;
  onCollision(sprite: ISprite): void;
  clearCollision(): void;
  destroy(): void;
};
