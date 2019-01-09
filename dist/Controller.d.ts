import { Anim } from './Anim';
/**
 * @name IController
 * @description  Controller interface
 */
export interface IController {
    hitBy(anim: Anim): void;
    update(deltaTime: number): void;
    destroy(): void;
}
//# sourceMappingURL=Controller.d.ts.map