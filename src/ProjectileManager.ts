import {Anim} from "./Anim";
import {Scene} from "./Scene";
import {Utils} from './Utils';
import {Attribs} from './Attribs';

interface IProjectileCacheObject {
  active: boolean,
  anim: Anim,
  type: string,
  rotationType: string, // cw, ccw
  rotationAmount: number
};
interface IProjectileObject {
  active?: boolean,
  anim?: Anim,
  animSpeed?: number,
  name: string,
  type: string,
  subType: string,
  attribs: Attribs,
  strength: number,
  frame?: number,
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

export interface ICollisionResolutionCallback { (projectileAnim: Anim, collisionAnim: Anim): boolean };

/**
 * @name ProjectileManager
 * @description Create and manages projectiles
 */
export class ProjectileManager {
  private projectiles: IProjectileCacheObject[] = [];
  private scene: Scene;
  private atlas: string;
  private resources: {};
  private utils: Utils;
  private collisionResolutionHandler: ICollisionResolutionCallback | undefined;

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(scene: Scene, atlas: string, resources: {}) {
    this.scene = scene;
    this.atlas = atlas;
    this.resources = resources;
    this.utils = new Utils();
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
    let anim: Anim | undefined = undefined;
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].active === false && (this.projectiles[i].type === projectileInfo.type)) {
        this.projectiles[i].active = true;
        this.projectiles[i].rotationType = projectileInfo.rotationType || '';
        this.projectiles[i].rotationAmount = projectileInfo.rotationAmount || 0;
        anim = this.projectiles[i].anim;
        break;
      }
    }
    if (!anim) {
      anim = new Anim(this.scene);
      projectileInfo.anim = anim;
      projectileInfo.active = true;
      this.projectiles.push(<IProjectileCacheObject>{
        active: projectileInfo.active,
        anim: projectileInfo.anim,
        type: projectileInfo.type,
        rotationType: projectileInfo.rotationType || '',
        rotationAmount: projectileInfo.rotationAmount || 0
      });
      anim.loadSequence(projectileInfo.name, this.atlas, this.resources);
      anim.setCacheAsBitmap(projectileInfo.cacheFrame);
      this.scene.addAnim(this.utils.createID(), anim);
    }
    if (anim) {
      anim.visible = true;
      anim.attribs.clone(projectileInfo.attribs),
      anim.strength = projectileInfo.strength,
      anim.subType = projectileInfo.subType;
      anim.x = projectileInfo.x;
      anim.y = projectileInfo.y;
      anim.z = projectileInfo.z;
      anim.dx = projectileInfo.dx;
      anim.dy = projectileInfo.dy;
      anim.vx = projectileInfo.vx;
      anim.vy = projectileInfo.vy;
      anim.animationSpeed = (projectileInfo.animSpeed) ? projectileInfo.animSpeed : 1;
      anim.rotation = projectileInfo.rotation;
      anim.sx = projectileInfo.scale;
      anim.sy = projectileInfo.scale;
      anim.collisionDetection = projectileInfo.collisionDetection;
      if (projectileInfo.frame !== undefined) {
        anim.setFrame(projectileInfo.frame);
      } else {
        anim.play(projectileInfo.name);
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
      if (this.projectiles[i].active) {
        let anim = this.projectiles[i].anim;
        if (anim) {
          if (this.projectiles[i].rotationType && this.projectiles[i].rotationType !== '') {
            let rotAmount = 0;
            let rotSpeedAmount = this.projectiles[i].rotationAmount || 0.01;
            switch (this.projectiles[i].rotationType) {
              case 'cw':
                rotAmount = anim.rotation;
                rotAmount += rotSpeedAmount;
                if (rotAmount > 6.28) {
                  rotAmount = 0;
                }
                anim.rotation = rotAmount;
                break;
              case 'ccw':
                rotAmount = anim.rotation;
                rotAmount -= rotSpeedAmount;
                if (rotAmount < 0) {
                  rotAmount = 6.28;
                }
                anim.rotation = rotAmount;
                break;
            }
          }
          let hide = false;
          if ((anim.x + anim.width) < 0 ||
              (anim.y + anim.height) < 0 ||
              (anim.x - anim.width) > this.scene.width ||
              (anim.y - anim.height) > this.scene.height) {
              hide = true;
          }
          let cwith = anim.collisionWith();
          if (!hide && cwith && cwith.id !== anim.id) {
            if (this.collisionResolutionHandler) {
              hide = this.collisionResolutionHandler(anim, cwith);
            } else {
              hide = true;
            }
          }
          if (hide) {
            this.projectiles[i].active = false;
            anim.visible = false;
            // anim.clearCollision();
            // anim.reset();
          }
        }
      }
    }
  }
}

