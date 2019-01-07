import { Anim } from './Anim';
import { Image } from './Image';
export interface IAnimCompatible {
    anim?: Anim | Image | undefined;
    id: string;
    x: number;
    y: number;
    z: number;
    type: string;
    visible: boolean;
}
