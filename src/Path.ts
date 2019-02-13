import {Angle, Curve, Point, Vector, pcap} from './Math';

export class PathElement {
  public point: Point = new Point(0,0);
  public rotation: number = 0;
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
   * @param {[]]} points - reference points
   * @param {number} tension - between points
   * @param {number} numOfSeg - number of segments in curve
   * @param {boolean} close - should close?
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
      if (xAxis) {
        x += (amplitude * Math.sin(period * (Math.PI * (i / 180))));
      } else {
        y += (amplitude * Math.sin(period * (Math.PI * (i / 180))));
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

    // build path element array
    this.pathPoints.forEach((point) => {
      point.x = pcap(point.x);
      point.y = pcap(point.y);
      vectorSrc.x = x;
      vectorSrc.y = y;
      vectorDst.x = point.x;
      vectorDst.y = point.y;
      pathElements.push({
        point,
        rotation: angle.angleFromVectors(vectorSrc, vectorDst)
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
      condenced.push(`${element.point.x}|${element.point.y}|${element.rotation}`);
    });
    return condenced.join('|');
  }
}
