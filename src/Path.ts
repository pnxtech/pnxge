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
  public addCurve(points: any, tension: number, numOfSeg: number, close: boolean): void {
    let curve = new Curve();
    this.pathPoints = this.pathPoints.concat(curve.generatePathPoints(points, tension, numOfSeg, close));
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

    // smooth rotation values
    for (let i = 0; i < pathElements.length; i++) {
      if (pathElements[i].rotation === 0) {
        for (let j = i; j < pathElements.length; j++) {
          if (pathElements[j].rotation !== 0) {
            let totalZeros = j - i;
            let rollback = (i - 1 < 0) ? 0 : i - 1;
            let smoother = pcap((pathElements[j].rotation - pathElements[rollback].rotation) / totalZeros);
            if (smoother !== 0 && totalZeros === 1) {
              smoother = pcap(smoother / 2);
            }
            for (let step = 0, k = i; k < i + totalZeros; k++) {
              step += smoother;
              pathElements[k].rotation = pathElements[rollback].rotation + step;
            }
            i += totalZeros;
            break;
          }
        }
      }
    }
    return pathElements;
  }

  /**
   * @name getPathJSON
   * @description get a json string containing path data
   * @return {string} JSON - output
   */
  getPathJSON(): string {
    let arr: Array<PathElement> = this.getPathElements();
    let condenced: any = [];
    arr.forEach((element) => {
      condenced.push(`${element.point.x}|${element.point.y}|${element.rotation}`);
    });
    return condenced.join('|');
  }
}
