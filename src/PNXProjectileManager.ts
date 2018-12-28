import PNXAnim from "./PNXAnim";
import PNXScene from "./PNXScene";
import {createID} from './PNXMath';

export interface IProjectileObject {
  active?: boolean,
  anim?: PNXAnim,
  animSpeed?: number,
  name: string,
  type: string,
  strength: number,
  frame?: number,
  rotation: number,
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

/**
 * @name PNXProjectileManager
 * @description Create and manages projectiles
 */
export class PNXProjectileManager {
  private projectiles: IProjectileObject[] = [];
  private scene: PNXScene;
  private atlas: string;
  private resources: {};

  /**
   * @name constructor
   * @description class constructor
   */
  constructor(scene: PNXScene, atlas: string, resources: {}) {
    this.scene = scene;
    this.atlas = atlas;
    this.resources = resources;
  }

  /**
   * @name createProjectile
   * @description creates a projectile
   * @note projectile.name is the same name as the anim sequence, projectile.type is a generic type
   * @param {IProjectileObject} projectile - data
   * @return {void}
   */
  createProjectile(projectileInfo: IProjectileObject): void {
    let projectile: IProjectileObject | undefined;
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].name === projectileInfo.name && !this.projectiles[i].active) {
        projectile = this.projectiles[i];
        break;
      }
    }
    if (!projectile) {
      let anim = new PNXAnim(this.scene);
      projectile = {
        active: true,
        anim,
        name: projectileInfo.name,
        type: projectileInfo.type,
        strength: projectileInfo.strength,
        x: projectileInfo.x,
        y: projectileInfo.y,
        z: projectileInfo.z,
        dx: projectileInfo.dx,
        dy: projectileInfo.dy,
        vx: projectileInfo.vx,
        vy: projectileInfo.vy,
        collisionDetection: projectileInfo.collisionDetection,
        animSpeed: (projectileInfo.animSpeed) ? projectileInfo.animSpeed : 1,
        frame: projectileInfo.frame,
        rotation: projectileInfo.rotation,
        scale: projectileInfo.scale
      };
      this.projectiles.push(<IProjectileObject>projectile);
      anim.loadSequence(projectile.name, this.atlas, this.resources);
      anim.play(projectile.name);
      this.scene.addAnim(createID(), anim);
    } else {
      projectile.active = true;
      projectile.name = projectileInfo.name;
      projectile.type = projectileInfo.type;
      projectile.strength = projectileInfo.strength;
      projectile.x = projectileInfo.x;
      projectile.y = projectileInfo.y;
      projectile.z = projectileInfo.z;
      projectile.dx = projectileInfo.dx;
      projectile.dy = projectileInfo.dy;
      projectile.vx = projectileInfo.vx;
      projectile.vy = projectileInfo.vy;
      projectile.collisionDetection = projectileInfo.collisionDetection;
      projectile.animSpeed = (projectileInfo.animSpeed) ? projectileInfo.animSpeed : 1;
      projectile.frame = projectileInfo.frame;
      projectile.rotation = projectileInfo.rotation;
      projectile.scale = projectileInfo.scale;
    }

    if (projectile && projectile.anim) {
      let anim = projectile.anim;
      anim.visible = true;
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

      if (projectile.frame) {
        anim.setFrame(projectile.frame);
      } else {
        anim.play(projectile.name);
      }
    }
  }

  /**
   * @name update
   * @description update projectiles
   * @param {number} deltaTime
   * @return {void}
   */
  update(deltaTime: number): void {
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i].active) {
        let anim = this.projectiles[i].anim;
        if (anim) {
          let hide = false;
          if ((anim.x + anim.width) < 0 ||
              (anim.y + anim.height) < 0 ||
              (anim.x - anim.width) > this.scene.width ||
              (anim.y - anim.height) > this.scene.height) {
              hide = true;
          }
          let cwith = anim.collisionWith();
          if (!hide && cwith && cwith.id !== anim.id) {
            hide = true;
          }
          if (hide) {
            this.projectiles[i].active = false;
            anim.reset();
            anim.visible = false;
          }
        }
      }
    }
  }
}

