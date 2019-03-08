import {SpriteAnim} from './ISprite';
import {AnimatedSprite} from './AnimatedSprite';
import {Scene} from "./Scene";
import {Attribs} from './Attribs';
import {Utils} from './Utils';

interface IProjectileCacheObject {
  active: boolean,
  animatedSprite: AnimatedSprite,
  type: string,
  rotationType: string, // cw, ccw
  rotationAmount: number
};
interface IProjectileObject {
  active?: boolean,
  animatedSprite?: AnimatedSprite,
  animSpeed?: number,
  name: string,
  type: string,
  subType: string,
  attribs: Attribs,
  strength: number,
  frame?: number,
  loop?: boolean,
  cacheFrame: boolean,
  rotation: number,
  rotationType?: string, // cw, ccw
  rotationAmount?: number,
  scale: number,
  collisionDetection: boolean,
  x: number,
  y: number,
  z: number,
  dx: number,
  dy: number,
  vx: number,
  vy: number
};

export interface ICollisionResolutionCallback { (projectileSprite: SpriteAnim | undefined, collisionSprite: SpriteAnim | undefined): boolean };

/**
 * @name ProjectileManager
 * @description Create and manages projectiles
 */
export class ProjectileManager {
  private projectiles: IProjectileCacheObject[] = [];
  private scene: Scene;
  private atlas: string;
  private resources: {};
  private collisionResolutionHandler: ICollisionResolutionCallback | undefined;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(scene: Scene, atlas: string, resources: {}) {
    this.scene = scene;
    this.atlas = atlas;
    this.resources = resources;
    this.collisionResolutionHandler = undefined;
  }

  /**
   * @name registerCollisionResolutionHandler
   * @description register a collision resolution callback handler
   * @param {ICollisionResolutionCallback} callback
   * @return {void}
   */
  public registerCollisionResolutionHandler(callback: ICollisionResolutionCallback): void {
    this.collisionResolutionHandler = callback;
  }

  /**
   * @name createProjectile
   * @description creates a projectile
   * @note projectile.name is the same name as the anim sequence, projectile.type is a generic type
   * @param {IProjectileObject} projectile - data
   * @return {void}
   */
  public createProjectile(projectileInfo: IProjectileObject): void {
    let animatedSprite: AnimatedSprite | undefined = undefined;
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].active === false && (this.projectiles[i].type === projectileInfo.type)) {
        this.projectiles[i].active = true;
        this.projectiles[i].rotationType = projectileInfo.rotationType || '';
        this.projectiles[i].rotationAmount = projectileInfo.rotationAmount || 0;
        animatedSprite = this.projectiles[i].animatedSprite;
        break;
      }
    }
    if (!animatedSprite) {
      animatedSprite = new AnimatedSprite(this.scene, projectileInfo.name, this.atlas, this.resources);
      projectileInfo.animatedSprite = animatedSprite;
      projectileInfo.active = true;
      this.projectiles.push(<IProjectileCacheObject>{
        active: projectileInfo.active,
        animatedSprite: projectileInfo.animatedSprite,
        type: projectileInfo.type,
        rotationType: projectileInfo.rotationType || '',
        rotationAmount: projectileInfo.rotationAmount || 0
      });
      animatedSprite.cacheAsBitmap = projectileInfo.cacheFrame;
      this.scene.addSpriteAnim(Utils.createID(), animatedSprite);
    }
    if (animatedSprite) {
      animatedSprite.visible = true;
      animatedSprite.attribs.clone(projectileInfo.attribs),
      animatedSprite.strength = projectileInfo.strength,
      animatedSprite.subType = projectileInfo.subType;
      animatedSprite.x = projectileInfo.x;
      animatedSprite.y = projectileInfo.y;
      animatedSprite.z = projectileInfo.z;
      animatedSprite.dx = projectileInfo.dx;
      animatedSprite.dy = projectileInfo.dy;
      animatedSprite.vx = projectileInfo.vx;
      animatedSprite.vy = projectileInfo.vy;
      animatedSprite.loop = (projectileInfo.loop !== undefined) ? projectileInfo.loop : false;
      animatedSprite.animationSpeed = (projectileInfo.animSpeed) ? projectileInfo.animSpeed : 1;
      animatedSprite.rotation = projectileInfo.rotation;
      animatedSprite.anchor.x = 0.5;
      animatedSprite.anchor.y = 0.5;
      animatedSprite.scale.x = projectileInfo.scale;
      animatedSprite.scale.y = projectileInfo.scale;
      animatedSprite.collisionDetection = projectileInfo.collisionDetection;
      if (projectileInfo.frame !== undefined) {
        animatedSprite.gotoAndStop(projectileInfo.frame);
      } else {
        animatedSprite.gotoAndPlay(0);
      }
    }
  }

  /**
   * @name update
   * @description update projectiles
   * @param {number} deltaTime
   * @return {void}
   */
  public update(deltaTime: number): void {
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].active === false) {
        continue;
      }
      let animatedSprite = this.projectiles[i].animatedSprite;
      if (animatedSprite) {
        if (this.projectiles[i].rotationType && this.projectiles[i].rotationType !== '') {
          let rotAmount = 0;
          let rotSpeedAmount = this.projectiles[i].rotationAmount || 0.01;
          switch (this.projectiles[i].rotationType) {
            case 'cw':
              rotAmount = animatedSprite.rotation;
              rotAmount += rotSpeedAmount;
              if (rotAmount > 6.28) {
                rotAmount = 0;
              }
              animatedSprite.rotation = rotAmount;
              break;
            case 'ccw':
              rotAmount = animatedSprite.rotation;
              rotAmount -= rotSpeedAmount;
              if (rotAmount < 0) {
                rotAmount = 6.28;
              }
              animatedSprite.rotation = rotAmount;
              break;
          }
        }
        let hide = false;
        if ((animatedSprite.x + animatedSprite.width) < 0 ||
            (animatedSprite.y + animatedSprite.height) < 0 ||
            (animatedSprite.x - animatedSprite.width) > this.scene.width ||
            (animatedSprite.y - animatedSprite.height) > this.scene.height) {
            hide = true;
        }
        if (animatedSprite.loop === true &&
            animatedSprite.currentFrame === animatedSprite.totalFrames - 1) {
          hide = true;
        }
        let cwith = animatedSprite.collisionWith;
        if (!hide && cwith && cwith.id !== animatedSprite.id) {
          if (this.collisionResolutionHandler) {
            hide = this.collisionResolutionHandler(animatedSprite, cwith);
          } else {
            hide = true;
          }
        }
        if (hide) {
          this.projectiles[i].active = false;
          animatedSprite.visible = false;
          animatedSprite.clearCollision();
        }
      }
    }
  }
}

