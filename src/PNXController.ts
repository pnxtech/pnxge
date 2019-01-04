import PNXAnim from './PNXAnim';

export default interface IPNXController {
  hitBy(anim: PNXAnim): void;
  update(deltaTime: number): void;
  destroy(): void;
}
