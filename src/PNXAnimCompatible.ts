import PNXAnim from './PNXAnim';
import PNXImage from './PNXImage';

export default interface IPNXAnimCompatible {
  anim?: PNXAnim | PNXImage | undefined,
  id: string,
  x: number,
  y: number,
  z: number,
  type: string,
  visible: boolean
};
