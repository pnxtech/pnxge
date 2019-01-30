import { Point } from './Math';
export declare class PathElement {
    point: Point;
    rotation: number;
}
/**
 * @name Path
 * @description Define a path using points and curves
 */
export declare class Path {
    protected pathPoints: Array<Point>;
    /**
     * @name constructor
     */
    constructor();
    /**
     * @name addCurve
     * @description add a curve
     * @param {[]]} points - reference points
     * @param {number} tension - between points
     * @param {number} numOfSeg - number of segments in curve
     * @param {boolean} close - should close?
     * @return {void}
     */
    addCurve(points: any, tension: number, numOfSeg: number, close: boolean): void;
    /**
     * @name addPoints
     * @description add points
     * @param {Array<Point>} points
     * @return {void}
     */
    addPoints(points: Array<Point>): void;
    /**
     * @name getPoints
     * @description get path points
     * @return {Array<PathElement>} array of PathElement's
     */
    getPathElements(): Array<PathElement>;
}
//# sourceMappingURL=Path.d.ts.map