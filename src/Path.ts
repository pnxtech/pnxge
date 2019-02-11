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

    pathElements[0].rotation = pcap(pathElements[0].rotation);
    for (let i = 1; i < pathElements.length; i++) {
      pathElements[i].rotation += pathElements[i-1].rotation;
      pathElements[i].rotation = pcap(pathElements[i].rotation);
    }
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
