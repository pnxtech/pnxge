/**
 * @name PNXMath
 * @description PNX math library: a collection of math related classes
 */

/**
 * @name PNXPoint
 * @description Represent a point
 */
export class PNXPoint {
  public x: number;
  public y: number;

  constructor(x: number = 0, y:number = 0) {
    this.x = x;
    this.y = y;
  }
}

/**
 * @name PNXVector
 * @description Represent a line (connection between to points)
 */
export class PNXVector extends PNXPoint {
  constructor(x: number = 0, y:number = 0) {
    super(x, y);
  }
  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

/**
 * @name PNXLine
 * @description Represent a line (connection between to points)
 */
export class PNXLine {
  public pt1: PNXPoint;
  public pt2: PNXPoint;
  constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
    this.pt1 = new PNXPoint(x1, y1);
    this.pt2 = new PNXPoint(x2, y2);
  }
}

/**
 * @name PNXCurve
 * @description Generates curves points between two points and a control point
 */
export class PNXCurve {
  protected totalSegments: number;
  protected segmentList: PNXPoint[];

  /**
   * @name constructor
   * @description class contructor
   */
  constructor(starting: PNXPoint, ending: PNXPoint, control: PNXPoint, segments: number) {
    this.totalSegments = segments;
    this.segmentList = new Array(this.totalSegments);
    this.generatePoints(starting, ending, control);
  }

  /**
   * @name getTotalSegments
   * @description get total segments in curve
   * @return {number} total segments
   *
   */
  public getTotalSegments(): number {
    return this.totalSegments;
  }

  /**
   * @name getPoints
   * @description get curve points
   * @return {Array<PNXPoint>} array of points
   */
  public getPoints(): Array<PNXPoint> {
    let newArray = new Array();
    for (let pt of this.segmentList) {
      newArray.push(new PNXPoint(pt.x, pt.y));
    }
    return newArray;
  }

  /**
   * @name distanceX
   * @description distance between two x components of a line
   * @param {PNXLine} l - line
   * @return {number} distance
   */
  protected distanceX(l: PNXLine): number {
    return (l.pt2.x - l.pt1.x);
  }

  /**
   * @name distanceY
   * @description distance between two y components of a line
   * @param {PNXLine} l - line
   * @return {number} distance
   */
  protected distanceY(l: PNXLine): number {
    return (l.pt2.y - l.pt1.y);
  }

  /**
   * @name intersect
   * @description determine point at which lines intersect
   * @param {PNXLine} l1 - first line
   * @param {PNXLine} l2 - second line
   * @return {PNXPoint} - intersection point
   */
  protected intersect(l1: PNXLine, l2: PNXLine): PNXPoint {
    let m1: number;
    let b1: number;
    let m2: number;
    let b2: number;
    let p: PNXPoint = new PNXPoint();

    if (this.distanceX(l1) === 0) {
      p.x = l1.pt1.x;
      m1 = (l2.pt1.y - l2.pt2.y) / (l2.pt1.x - l2.pt2.x);
      b1 = l2.pt1.y - m1 * l2.pt1.x;
    }
    else if (this.distanceX(l2) === 0) {
      p.x = l2.pt1.x;
      m1 = (l1.pt1.y - l1.pt2.y) / (l1.pt1.x - l1.pt2.x);
      b1 = l1.pt1.y - m1 * l1.pt1.x;
    }
    else {
      m1 = (l1.pt1.y - l1.pt2.y) / (l1.pt1.x - l1.pt2.x);
      b1 = l1.pt1.y - m1 * l1.pt1.x;
      m2 = (l2.pt1.y - l2.pt2.y) / (l2.pt1.x - l2.pt2.x);
      b2 = l2.pt1.y - m2 * l2.pt1.x;
      p.x = (b1 - b2) / (m2 - m1);
    }
    p.y = m1 * p.x + b1;
    return p;
  }

  /**
   * @name generatePoints
   * @description generate curve points
   * @param {PNXPoint} p1 - starting point
   * @param {PNXPoint} p2 - end point
   * @param {PNXPoint} p3 - control point
   * @return {void}
   */
  protected generatePoints(p1: PNXPoint, p2: PNXPoint, p3: PNXPoint): void {
    let l1: PNXLine = new PNXLine(p1.x, p1.y, p3.x, p3.y);
    let l2: PNXLine = new PNXLine(p3.x, p3.y, p2.x, p2.y);
    let dx1: number = this.distanceX(l1) / (this.totalSegments + 1);
    let dx2: number = this.distanceX(l2) / (this.totalSegments + 1);

    let m1: number = 0;
    let m2: number = 0;
    let dy1: number = 0;
    let dy2: number = 0;
    let b1: number = 0;
    let b2: number = 0;

    if (dx1 !== 0) {
      m1 = (l1.pt1.y - l1.pt2.y) / (l1.pt1.x - l1.pt2.x);
      b1 = l1.pt1.y - m1 * l1.pt1.x;
    }
    else {
      dy1 = this.distanceY(l1) / (this.totalSegments + 1);
    }

    if (dx2 !== 0) {
      m2 = (l2.pt1.y - l2.pt2.y) / (l2.pt1.x - l2.pt2.x);
      b2 = l2.pt1.y - m2 * l2.pt1.x;
    }
    else {
      dy2 = this.distanceY(l2) / (this.totalSegments + 1);
    }

    let ls1: PNXLine = new PNXLine();
    let ls2: PNXLine = new PNXLine();
    for (let i = 0; i < this.totalSegments; i++) {
      ls1.pt1.x = l1.pt1.x + (dx1 * i);
      ls1.pt2.x = l2.pt1.x + (dx2 * (i + 1));
      ls2.pt1.x = l1.pt1.x + (dx1 * (i + 1));
      ls2.pt2.x = l2.pt1.x + (dx2 * (i + 2));
      if (dx1 !== 0) {
        ls1.pt1.y = m1 * ls1.pt1.x + b1;
        ls2.pt1.y = m1 * ls2.pt1.x + b1;
      } else {
        ls1.pt1.y = l1.pt1.y + (dy1 * i);
        ls2.pt1.y = l1.pt1.y + (dy1 * (i + 1));
      }
      if (dx2 != 0) {
        ls1.pt2.y = m2 * ls1.pt2.x + b2;
        ls2.pt2.y = m2 * ls2.pt2.x + b2;
      } else {
        ls1.pt2.y = l2.pt1.y + (dy2 * (i + 1));
        ls2.pt2.y = l2.pt1.y + (dy2 * (i + 2));
      }
      this.segmentList[i] = this.intersect(ls1, ls2);
    }
  }
}
