import { Point, Vector } from './Math';
export declare class PathElement {
    x: number;
    y: number;
    r: number;
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
    addCurve(starting: Point, ending: Point, control: Point, segments: number): void;
    /**
     * @name addSine
     * @description add points along a sine wave
     * @param {boolean} xAxis - apply to xAxis if true, else apply to yAxis
     * @param {Point} location - starting location on screen
     * @param {Vector} directionVector - direction of movement
     * @param {number} amplitude - amplitude of wave
     * @param {number} period - number of wave periods
     * @param {number} count - number of points to add
     * @param {number} velocity - speed to move through path
     * @return {void}
     */
    addSine(xAxis: boolean, location: Point, directionVector: Vector, amplitude: number, period: number, count: number, velocity: number): void;
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
    /**
     * @name getPathJSON
     * @description get a json string containing path data
     * @return {string} JSON - output
     */
    getPathJSON(): string;
}
//# sourceMappingURL=Path.d.ts.map