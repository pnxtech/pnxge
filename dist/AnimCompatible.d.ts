import { Anim } from './Anim';
import { Image } from './Image';
import { Attribs } from './Attribs';
export interface IAnimCompatible {
    anim?: Anim | Image | undefined;
    attributes: Attribs;
    id: string;
    x: number;
    y: number;
    z: number;
    visible: boolean;
}
//# sourceMappingURL=AnimCompatible.d.ts.map