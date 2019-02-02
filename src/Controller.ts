import {Anim} from './Anim';
import {Scene} from './Scene';

/**
 * @name Controller
 * @description  Controller base class
 */
export class Controller {
  protected anim: Anim | undefined;
  private pathCache: any = {};
  private currentPath: string = '';
  private currentPathIndex: number = 0;
  private isPathComplete: boolean = true;

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
  moveLeft(): void {
  }

  /**
   * @name moveRight
   * @description handle movement right
   * @return {void}
   */
  moveRight(): void {
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
   * @name addPath
   * @description register a path
   * @param {string} pathName - name of path
   * @param {string} pathString - path data in string form
   * @return {void}
   */
  public addPath(pathName: string, pathString: string): void {
    let pathArray = pathString.split('|');
    this.pathCache[pathName] = [];
    for (let i = 0; i < pathArray.length; i += 3) {
      this.pathCache[pathName].push({
        x: Number(pathArray[i]),
        y: Number(pathArray[i+1]),
        r: Number(pathArray[i+2])
      });
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
  get pathIndex(): number {
    return (!this.isPathComplete) ? this.currentPathIndex : -1;
  }

  /***
   * @name pathComplete
   * @description Returns true of path traversal is complete
   * @return {boolean} is path complete?
   */
  get pathComplete(): boolean {
    return this.isPathComplete;
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
        if (this.currentPathIndex + 1 === this.pathCache.length) {
          this.currentPathIndex = 0;
        } else {
          this.currentPathIndex++;
        }
      }
      if (this.currentPathIndex++ === this.pathCache[this.currentPath].length) {
        this.currentPath = ''
        this.currentPathIndex = 0;
        this.isPathComplete = true;
        return;
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
