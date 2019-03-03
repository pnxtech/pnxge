import {Angle, Curve, Point, Vector} from './Math';

export class PathElement {
  public x: number = 0;
  public y: number = 0;
  public r: number = 0;
}

/**
 * @name Path
 * @description Define a path using points and curves
 */
export class Path {
  protected pathPoints: Array<Point>;

  /**
   * @name constructor
   */
  constructor() {
    this.pathPoints = [];
  }

  /**
   * @name addCurve
   * @description add a curve
   * @param {Point} starting - start location
   * @param {Point} ending - ending location
   * @param {Point} control - control point for curve
   * @param {number} segments - total segments
   * @return {void}
   */
  public addCurve(starting: Point, ending: Point, control: Point, segments: number): void {
    let curve = new Curve(starting, ending, control, segments);
    this.pathPoints = this.pathPoints.concat(curve.getPoints());
  }

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
  public addSine(xAxis: boolean, location: Point,
                 directionVector: Vector, amplitude: number,
                 period: number, count: number,
                 velocity: number
                ) {
    let x = location.x;
    let y = location.y;
    let points: Point[] = [];
    for (let i = 0; i < count; i += velocity) {
      let r = (amplitude * Math.sin(period * (Math.PI * (i / 180))));
      if (xAxis) {
        x += r;
      } else {
        y += r;
      }
      x += directionVector.x * velocity;
      y += directionVector.y * velocity;
      points.push(new Point(x, y));
    }
    this.addPoints(points);
  }

  /**
   * @name addPoints
   * @description add points
   * @param {Array<Point>} points
   * @return {void}
   */
  public addPoints(points: Array<Point>): void {
    this.pathPoints = this.pathPoints.concat(points);
  }

  /**
   * @name getPoints
   * @description get path points
   * @return {Array<PathElement>} array of PathElement's
   */
  public getPathElements(): Array<PathElement> {
    let pathElements: Array<PathElement> = [];
    let x: number = 0;
    let y: number = 0;
    let angle: Angle = new Angle();
    let vectorSrc: Vector = new Vector(0,0);
    let vectorDst: Vector = new Vector(0,0);

    this.pathPoints.forEach((point) => {
      point.x = point.x;
      point.y = point.y;
      vectorSrc.x = x;
      vectorSrc.y = y;
      vectorDst.x = point.x;
      vectorDst.y = point.y;
      pathElements.push({
        x: point.x,
        y: point.y,
        r: Angle.angleFromVectors(vectorSrc, vectorDst)
      });
      x = point.x;
      y = point.y;
    });
    return pathElements;
  }

  /**
   * @name getPathJSON
   * @description get a json string containing path data
   * @return {string} JSON - output
   */
  public getPathJSON(): string {
    let arr: Array<PathElement> = this.getPathElements();
    let condenced: any = [];
    arr.forEach((element) => {
      condenced.push(`${element.x}|${element.y}|${element.r}`);
    });
    return condenced.join('|');
  }
}
