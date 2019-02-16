import {Anim} from './Anim';
import {Scene} from './Scene';

/**
 * @name Controller
 * @description  Controller base class
 */
export class Controller {
  //#region variables
  protected anim: Anim | undefined;
  private pathCache: any = {};
  private currentPath: string = '';
  private currentPathIndex: number = 0;
  private isPathComplete: boolean = true;
  //#endregion

  /**
   * @name constructor
   * @description class contructor
   * @param {string} name - of anim which will be controlled
   * @param {Scene} scene - where anim was loaded
   */
  constructor(name: string, scene: Scene) {
    this.anim = <Anim>scene.getAnim(name);
    this.anim.attachController(this);
  }

  /**
   * @name moveLeft
   * @description handle movement left
   * @return {void}
   */
  public moveLeft(): void {
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  public moveRight(): void {
  }

  /**
   * @name hitBy
   * @description handle when this anim controller is hit by an anim
   * @param {Anim} anim - which hit this controller
   */
  public hitBy(anim: Anim): void {
  }

  /**
   * @name fire
   * @description handler to fire a projectile
   * @return {void}
   */
  public fire(): void {
  }

  /**
   * @name addPathString
   * @description register a path
   * @param {string} pathName - name of path
   * @param {string} pathString - path data in string form
   * @param {number} rotationCorrection - optional correction in radian
   * @return {void}
   */
  public addPathString(pathName: string, pathString: string, rotationCorrection: number = 0): void {
    let pathArray = pathString.split('|');
    this.pathCache[pathName] = [];
    for (let i = 0; i < pathArray.length; i += 3) {
      this.pathCache[pathName].push({
        x: Number(pathArray[i]),
        y: Number(pathArray[i+1]),
        r: Number(pathArray[i+2] + rotationCorrection)
      });
    }
  }

  /**
   * @name addPathArray
   * @description register a path
   * @param {string} pathName - name of path
   * @param {[]} pathArray - path data in array form
   * @param {number} rotationCorrection - optional correction in radian
   * @return {void}
   */
  public addPathArray(pathName: string, pathArray: [], rotationCorrection: number = 0): void {
    this.pathCache[pathName] = pathArray.slice();
    for (let i = 0; i < pathArray.length; i++) {
      this.pathCache[pathName][i].r += rotationCorrection;
    }
  }

  /**
   * @name triggerPath
   * @description trigger the execution of a path
   * @param {string} pathName - path to execute
   */
  public triggerPath(pathName: string): void {
    this.currentPath = pathName;
    this.currentPathIndex = 0;
    this.isPathComplete = false;
  }

  /**
   * @name pathIndex
   * @description index within path
   * @return {number} index - will return -1 if a path isn't active
   */
  public get pathIndex(): number {
    return (!this.isPathComplete) ? this.currentPathIndex : -1;
  }

  /***
   * @name pathComplete
   * @description Returns true of path traversal is complete
   * @return {boolean} is path complete?
   */
  public get pathComplete(): boolean {
    return this.isPathComplete;
  }

  /**
   * @name pathCompleted
   * @description called when path is completed
   * @return {void}
   */
  protected pathCompleted(): void {
  }

  /**
   * @name update
   * @description update anim based on path
   * @param {number} deltaTime - delta time offset
   * @return {void}
   */
  public update(deltaTime: number): void {
    if (this.currentPath !== '') {
      if (this.anim) {
        this.anim.x = this.pathCache[this.currentPath][this.currentPathIndex].x;
        this.anim.y = this.pathCache[this.currentPath][this.currentPathIndex].y;
        this.anim.rotation = this.pathCache[this.currentPath][this.currentPathIndex].r;
        if (this.currentPathIndex + 1 === this.pathCache[this.currentPath].length) {
          this.currentPath = ''
          this.currentPathIndex = 0;
          this.isPathComplete = true;
          this.pathCompleted();
        } else {
          this.currentPathIndex++;
        }
      }
    }
  }

  /**
   * @name destroy
   * @description cleanup
   * @return {void}
   */
  public destroy(): void {
  }
}
