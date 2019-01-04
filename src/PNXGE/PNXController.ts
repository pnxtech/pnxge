import PNXAnim from './PNXAnim';

/**
 * @name IPNXController
 * @description PNX Controller interface
 */
export default interface IPNXController {
  hitBy(anim: PNXAnim): void;
  update(deltaTime: number): void;
  destroy(): void;
}
