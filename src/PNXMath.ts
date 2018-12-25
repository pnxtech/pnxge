/**
 * @name PNXMath
 * @description PNX math library: a collection of math related classes
 */

/**
 * @name pcap
 * @description precision cap - reduces number precision to avoid rounding errors
 * @note: see https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript/3644302#3644302
 * @param {number | string} value - input number
 * @return {number} capped value
 */
export function pcap(value: number | string): number {
  let num: number = parseFloat(`${value}`);
  return Number(num.toPrecision(7));
}

/**
 * @name createID
 * @description create a unique ID
 * @return {string} unique ID
 */
export function createID(): string {
  return (Math.floor(Math.random() * (new Date()).getTime()).toString(36));
}

/**
 * @name PNXAngle
 * @description Angle functions
 */
export class PNXAngle {
  public HalfPI: number = Math.PI * 0.5;

  /**
   * @name d2r
   * @description degrees to radians
   * @param {number} degree - 360 degree type
   * @return {number} radian
   */
  d2r(degree: number): number {
    return pcap(degree * Math.PI / 180.0);
  }

  /**
   * @name r2d
   * @description radians to degrees
   * @param {number} radians
   * @return {number} degree
   */
  r2d(radians: number): number {
    return pcap(radians * (180.0 / Math.PI));
  }

  /**
   * @name vectorAngleFromDegrees
   * @description return a new angle vector based on degrees
   * @param {number} degrees
   * @return {PNXVector} angleVector
   */
  vectorAngleFromDegrees(degrees: number): PNXVector {
    let radians: number = this.d2r(degrees);
    return new PNXVector(pcap(Math.sin(radians)), pcap(Math.cos(radians)));
  }

  /**
   * @name vectorAngleFromRadians
   * @description return a new angle vector based on radians
   * @param {number} radians
   * @return {PNXAngle} angleVector
   */
  vectorAngleFromRadians(radians: number): PNXVector {
    return new PNXVector(pcap(Math.sin(radians)), pcap(Math.cos(radians)));
  }

  /**
   * @name angleFromVectors
   * @description compute angle from v1 vector to v2 vector
   * @param {PNXVector} v1 - from (source) vector
   * @param {PNXVector} v2 - to (target) vector
   * @return {number} angle - in radians
   * note:
   *  let angle: PNXAngle = new PNXAngle();
   *  let radians = angle.angleFromVectors(
   *    new PNXVector(this.explosionAnim.x, this.explosionAnim.y),
   *    new PNXVector(this.turetAnim.x, this.turetAnim.y)
   *  );
   *  this.movementVector = angle.vectorAngleFromRadians(radians);
   */
  angleFromVectors(v1: PNXVector, v2: PNXVector): number {
    return pcap(Math.atan2((v2.x - v1.x), (v2.y - v1.y)));
  }

  /**
   * @name randomAngleTop
   * @description get random top facing angle
   * @return {number} random angle
   */
  randomAngleTop(): number {
    let random = new PNXRandom();
    return pcap(random.getRandomInclusive(0, Math.PI) + this.HalfPI);
  }

  /**
   * @name randomAngleBottom
   * @description get random bottom facing angle
   * @return {number} random angle
   */
  randomAngleBottom(): number {
    let random = new PNXRandom();
    return pcap(random.getRandomInclusive(0, Math.PI) - this.HalfPI);
  }
}

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
  /**
   * @name constructor
   * @description constructor
   */
  constructor(x: number = 0, y:number = 0) {
    super(x, y);
  }

  /**
   * @name length
   * @description returns the vector length
   * @returns returns the vector length
   */
  public length(): number {
    return pcap(Math.sqrt(this.x * this.x + this.y * this.y));
  }

  /**
   * @name negate
   * @description negates the current vector
   * @return {PNXVector} returns a new negated vector
   */
  public negate(): PNXVector {
    return new PNXVector(-this.x, -this.y);
  }

  /**
   * @name add
   * @description adds vector to current vector
   * @param {PNXVector} vector - to use in operation
   * @return {PNXVector} returns a new vector
   */
  public add(vector: PNXVector): PNXVector {
    this.x += vector.x;
    this.y += vector.y;
    return new PNXVector(this.x, this.y);
  }

  /**
   * @name substract
   * @description substracts vector from current vector
   * @param {PNXVector} vector - to use in operation
   * @return {PNXVector} returns a new vector
   */
  public substract(vector: PNXVector): PNXVector {
    this.x -= vector.x;
    this.y -= vector.y;
    return new PNXVector(this.x, this.y);
  }

  /**
   * @name multiply
   * @description multiplies vector with current vector
   * @param {PNXVector} vector - to use in operation
   * @return {PNXVector} returns a new vector
   */
  public multiply(vector: PNXVector): PNXVector {
    this.x *= vector.x;
    this.y *= vector.y;
    return new PNXVector(this.x, this.y);
  }

  /**
   * @name divide
   * @description divides vector with current vector
   * @param {PNXVector} vector - to use in operation
   * @return {PNXVector} returns a new vector
   */
  public divide(vector: PNXVector): PNXVector {
    this.x /= vector.x;
    this.y /= vector.y;
    return new PNXVector(pcap(this.x), pcap(this.y));
  }

  /**
   * @name equals
   * @description determines whether current and other vector are "realtively" equal while avoiding rounding errors
   * @return {boolan} true if equal / false if not
   */
  public equals(vector: PNXVector): boolean {
    return (pcap(Math.abs(this.x)) === pcap(Math.abs(vector.x)) &&
            pcap(Math.abs(this.y)) === pcap(Math.abs(vector.y)));
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
* @name PNXRandom
* @description Random number functions. Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
export class PNXRandom {
  /**
  * @name getRandom
  * @summary Returns a random number between 0 (inclusive) and 1 (exclusive)
  * @return {number} num - number
  */
  getRandom(): number {
    return Math.random();
  }

  /**
  * @name getRandomArbitrary
  * @summary Returns a random number between min (inclusive) and max (exclusive)
  * @return {number} num - number
  */
  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
  * @name getRandomInt
  * @summary Returns a random integer between min (included) and max (excluded)
  * @return {number} num - number
  */
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
  * @name getRandomIntInclusive
  * @summary Returns a random integer between min (included) and max (included)
  * @return {number} num - number
  */
  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
  * @name getRandomInclusive
  * @summary Returns a random number (real not int) between min (included) and max (included)
  * @return {number} num - number
  */
  getRandomInclusive(min: number, max: number): number {
    return Math.random() * (max - min) + min;
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
    return pcap(l.pt2.x - l.pt1.x);
  }

  /**
   * @name distanceY
   * @description distance between two y components of a line
   * @param {PNXLine} l - line
   * @return {number} distance
   */
  protected distanceY(l: PNXLine): number {
    return pcap(l.pt2.y - l.pt1.y);
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
      m1 = pcap((l2.pt1.y - l2.pt2.y) / (l2.pt1.x - l2.pt2.x));
      b1 = pcap(l2.pt1.y - m1 * l2.pt1.x);
    }
    else if (this.distanceX(l2) === 0) {
      p.x = l2.pt1.x;
      m1 = pcap(l1.pt1.y - l1.pt2.y) / (l1.pt1.x - l1.pt2.x);
      b1 = pcap(l1.pt1.y - m1 * l1.pt1.x);
    }
    else {
      m1 = pcap((l1.pt1.y - l1.pt2.y) / (l1.pt1.x - l1.pt2.x));
      b1 = pcap(l1.pt1.y - m1 * l1.pt1.x);
      m2 = pcap((l2.pt1.y - l2.pt2.y) / (l2.pt1.x - l2.pt2.x));
      b2 = pcap(l2.pt1.y - m2 * l2.pt1.x);
      p.x = pcap((b1 - b2) / (m2 - m1));
    }
    p.y = pcap(m1 * p.x + b1);
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
    let dx1: number = pcap(this.distanceX(l1) / (this.totalSegments + 1));
    let dx2: number = pcap(this.distanceX(l2) / (this.totalSegments + 1));

    let m1: number = 0;
    let m2: number = 0;
    let dy1: number = 0;
    let dy2: number = 0;
    let b1: number = 0;
    let b2: number = 0;

    if (dx1 !== 0) {
      m1 = pcap((l1.pt1.y - l1.pt2.y) / (l1.pt1.x - l1.pt2.x));
      b1 = pcap(l1.pt1.y - m1 * l1.pt1.x);
    }
    else {
      dy1 = pcap(this.distanceY(l1) / (this.totalSegments + 1));
    }

    if (dx2 !== 0) {
      m2 = pcap((l2.pt1.y - l2.pt2.y) / (l2.pt1.x - l2.pt2.x));
      b2 = pcap(l2.pt1.y - m2 * l2.pt1.x);
    }
    else {
      dy2 = pcap(this.distanceY(l2) / (this.totalSegments + 1));
    }

    let ls1: PNXLine = new PNXLine();
    let ls2: PNXLine = new PNXLine();
    for (let i = 0; i < this.totalSegments; i++) {
      ls1.pt1.x = pcap(l1.pt1.x + (dx1 * i));
      ls1.pt2.x = pcap(l2.pt1.x + (dx2 * (i + 1)));
      ls2.pt1.x = pcap(l1.pt1.x + (dx1 * (i + 1)));
      ls2.pt2.x = pcap(l2.pt1.x + (dx2 * (i + 2)));
      if (dx1 !== 0) {
        ls1.pt1.y = pcap(m1 * ls1.pt1.x + b1);
        ls2.pt1.y = pcap(m1 * ls2.pt1.x + b1);
      } else {
        ls1.pt1.y = pcap(l1.pt1.y + (dy1 * i));
        ls2.pt1.y = pcap(l1.pt1.y + (dy1 * (i + 1)));
      }
      if (dx2 != 0) {
        ls1.pt2.y = pcap(m2 * ls1.pt2.x + b2);
        ls2.pt2.y = pcap(m2 * ls2.pt2.x + b2);
      } else {
        ls1.pt2.y = pcap(l2.pt1.y + (dy2 * (i + 1)));
        ls2.pt2.y = pcap(l2.pt1.y + (dy2 * (i + 2)));
      }
      this.segmentList[i] = this.intersect(ls1, ls2);
    }
  }
}
