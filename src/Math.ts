/**
 * @name Math
 * @description math library: a collection of math related classes
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
  return Number(num.toFixed(4));
}

/**
 * @name Angle
 * @description Angle functions
 */
export class Angle {
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
   * @return {Vector} angleVector
   */
  vectorAngleFromDegrees(degrees: number): Vector {
    let radians: number = this.d2r(degrees);
    return new Vector(pcap(Math.sin(radians)), pcap(Math.cos(radians)));
  }

  /**
   * @name vectorAngleFromRadians
   * @description return a new angle vector based on radians
   * @param {number} radians
   * @return {Angle} angleVector
   */
  vectorAngleFromRadians(radians: number): Vector {
    return new Vector(pcap(Math.sin(radians)), pcap(Math.cos(radians)));
  }

  /**
   * @name angleFromVectors
   * @description compute angle from v1 vector to v2 vector
   * @see https://stackoverflow.com/questions/21483999/using-atan2-to-find-angle-between-two-vectors
   * @param {Vector} v1 - from (source) vector
   * @param {Vector} v2 - to (target) vector
   * @return {number} angle - in radians
   */
  angleFromVectors(v1: Vector, v2: Vector): number {
    let angle = Math.atan2((v2.x - v1.x), (v2.y - v1.y));
    // return pcap(Math.atan2((v1.x - v2.x), (v1.y - v2.y)));
    //atan2(vector2.y, vector2.x) - atan2(vector1.y, vector1.x)
    // let angle = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
    // if (angle > Math.PI) {
    //   angle -= 2 * Math.PI;
    // } else if (angle <= -Math.PI) {
    //   angle += 2 * Math.PI;
    // }
    return pcap(angle);
  }

  /**
   * @name randomAngleTop
   * @description get random top facing angle
   * @return {number} random angle
   */
  randomAngleTop(): number {
    let random = new Random();
    return pcap(random.getRandomInclusive(0, Math.PI) + this.HalfPI);
  }

  /**
   * @name randomAngleBottom
   * @description get random bottom facing angle
   * @return {number} random angle
   */
  randomAngleBottom(): number {
    let random = new Random();
    return pcap(random.getRandomInclusive(0, Math.PI) - this.HalfPI);
  }
}

/**
 * @name Point
 * @description Represent a point
 */
export class Point {
  public x: number;
  public y: number;

  constructor(x: number = 0, y:number = 0) {
    this.x = x;
    this.y = y;
  }
}

/**
 * @name Rect
 * @description Rect class
 */
export class Rect {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  /**
   * @name constructor
   * @description init class
   */
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * @name intersect
   * @description check whether this rect intersects with target rect
   * @note this algorithm relies on the fact that sprites are by default setup with an anchor of 0.5
   * @param {Rect} targetRect
   * @return {boolean} bool - true if collision else false
   */
  intersect(targetRect: Rect): boolean {
    // Find the half-widths and half-heights of each sprite
    let a1_halfWidth = 0;
    let a1_halfHeight = 0;
    let a2_halfWidth = 0;
    let a2_halfHeight = 0;

    a1_halfWidth = this.width * 0.5;
    a1_halfHeight = this.height * 0.5;
    a2_halfWidth = targetRect.width * 0.5;
    a2_halfHeight = targetRect.height * 0.5;

    // Calculate the distance vector between the sprites
    let dx = Math.abs(this.x - targetRect.x) * 2;
    let dy = Math.abs(this.y - targetRect.y) * 2;

    // Figure out the combined half-widths and half-heights
    let combinedHalfWidths = a1_halfWidth + a2_halfWidth;
    let combinedHalfHeights = a1_halfHeight + a2_halfHeight;

    return ((Math.abs(dx) < combinedHalfWidths) && (Math.abs(dy) < combinedHalfHeights)) ? true : false;
  }

  /**
   * @name inflate
   * @description increase a rect by adding padding
   * @param {padding} padding to increase rect
   * @return {Rect} new inflated Rect
   */
  inflate(padding: number): Rect {
    this.x = this.x - padding;
    this.y = this.y - padding;
    this.width = this.width + padding;
    this.height = this.height + padding;
    return this;
  }

  /**
   * @name deflate
   * @description decrease a rect by removing padding
   * @param {padding} padding to decrease rect
   * @return {Rect} new deflated Rect
   */
  deflate(padding: number): Rect {
    this.x = this.x + padding;
    this.y = this.y + padding;
    this.width = this.width - padding;
    this.height = this.height - padding;
    return this;
  }
}

/**
 * @name Vector
 * @description Represent a line (connection between to points)
 */
export class Vector extends Point {
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
   * @name distance
   * @description returns the distance between this and another vector
   * @returns {number} distance
   */
  public distance(otherVector: Vector): number {
    let vx = this.x - otherVector.x;
    let vy = this.y - otherVector.y;
    return pcap(Math.sqrt(vx * vx + vy * vy));
  }

  /**
   * @name negate
   * @description negates the current vector
   * @return {Vector} returns a new negated vector
   */
  public negate(): Vector {
    return new Vector(-this.x, -this.y);
  }

  /**
   * @name add
   * @description adds vector to current vector
   * @param {Vector} vector - to use in operation
   * @return {Vector} returns a new vector
   */
  public add(vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;
    return new Vector(this.x, this.y);
  }

  /**
   * @name substract
   * @description substracts vector from current vector
   * @param {Vector} vector - to use in operation
   * @return {Vector} returns a new vector
   */
  public substract(vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;
    return new Vector(this.x, this.y);
  }

  /**
   * @name multiply
   * @description multiplies vector with current vector
   * @param {Vector} vector - to use in operation
   * @return {Vector} returns a new vector
   */
  public multiply(vector: Vector): Vector {
    this.x *= vector.x;
    this.y *= vector.y;
    return new Vector(this.x, this.y);
  }

  /**
   * @name divide
   * @description divides vector with current vector
   * @param {Vector} vector - to use in operation
   * @return {Vector} returns a new vector
   */
  public divide(vector: Vector): Vector {
    this.x /= vector.x;
    this.y /= vector.y;
    return new Vector(pcap(this.x), pcap(this.y));
  }

  /**
   * @name equals
   * @description determines whether current and other vector are "realtively" equal while avoiding rounding errors
   * @return {boolan} true if equal / false if not
   */
  public equals(vector: Vector): boolean {
    return (pcap(Math.abs(this.x)) === pcap(Math.abs(vector.x)) &&
            pcap(Math.abs(this.y)) === pcap(Math.abs(vector.y)));
  }
}

/**
 * @name Line
 * @description Represent a line (connection between to points)
 */
export class Line {
  public pt1: Point;
  public pt2: Point;
  constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
    this.pt1 = new Point(x1, y1);
    this.pt2 = new Point(x2, y2);
  }
}

/**
* @name Random
* @description Random number functions. Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
export class Random {
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
  * @summary Returns a random integer between min (included) and max (excluded). If min and max are zero then a random int is chosen
  * @return {number} num - number
  */
  getRandomInt(min: number = 0, max: number = 0): number {
    if (min === 0 && max === 0) {
      return ~~(Math.random() * 1e6);
    }
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

  /**
   * @name getRandomBoolean
   * @description get a random true or false
   * @return {boolean} boolean - true or false
   */
  getRandomBoolean(): boolean {
    return (Math.random() * 10 > 5);
  }

  /**
   * @name getRandomFromCenter
   * @description return a random number within a centered range
   * @param {number} value - number to center range
   * @param {number} width - number to determine width from center
   * @return {number} random number
   */
  getRandomFromCenter(value: number, width: number): number {
    let midWidth = width * 0.5;
    let low = value - midWidth;
    let high = value + midWidth;
    return this.getRandomInclusive(low, high);
  }

  /**
   * @name getRandomIntFromCenter
   * @description return a random number (integer) within a centered range
   * @param {number} value - number to center range
   * @param {number} width - number to determine width from center
   * @return {number} random number
   */
  getRandomIntFromCenter(value: number, width: number): number {
    let midWidth = (width * 0.5) | 0;
    let low = value - midWidth;
    let high = value + midWidth;
    return this.getRandomIntInclusive(low, high);
  }
}

export class Curve {
  /*!	Curve calc function for canvas 2.3.8
  *	(c) Epistemex 2013-2018
  *	www.epistemex.com
  *	License: MIT
  * Note: Code below has been converted to Typescript and differs from the author's original version - cjus
  */
  /**
   * Calculates an array containing points representing a cardinal spline through given point array.
   * Points must be arranged as: [x1, y1, x2, y2, ..., xn, yn].
   *
   * There must be a minimum of two points in the input array but the function
   * is only useful where there are three points or more.
   *
   * The points for the cardinal spline are returned as a new array.
   * @param {any} points - point array
   * @param {number} [tension=0.5] - tension. Typically between [0.0, 1.0] but can be exceeded
   * @param {number} [numOfSeg=25] - number of segments between two points (line resolution)
   * @param {boolean} [close=false] - Close the ends making the line continuous
   * @returns {Array<Point>} New array with the calculated points that was added to the path
   */
  generatePathPoints(points: any, tension: number, numOfSeg: number, close: boolean): Array<Point> {
    if (typeof points === "undefined" || points.length < 2) {
      return [];
    }
    // options or defaults
    tension = typeof tension === "number" ? tension : 0.5;
    numOfSeg = typeof numOfSeg === "number" ? numOfSeg : 25;

    let pts; // for cloning point array
    let i = 1;
    let l = points.length;
    let rPos = 0;
    let rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0);
    let res = new Array(rLen);
    let cache = new Array((numOfSeg + 2) << 2);
    let cachePtr = 4;

    pts = points.slice(0);

    if (close) {
      pts.unshift(points[l - 1]); // insert end point as first point
      pts.unshift(points[l - 2]);
      pts.push(points[0], points[1]); // first point as last point
    }
    else {
      pts.unshift(points[1]); // copy 1. point and insert at beginning
      pts.unshift(points[0]);
      pts.push(points[l - 2], points[l - 1]); // duplicate end-points
    }

    // cache inner-loop calculations as they are based on t alone
    cache[0] = 1; // 1,0,0,0

    for (; i < numOfSeg; i++) {
      let st = i / numOfSeg;
      let st2 = st * st;
      let st3 = st2 * st;
      let st23 = st3 * 2;
      let st32 = st2 * 3;

      cache[cachePtr++] = st23 - st32 + 1; // c1
      cache[cachePtr++] = st32 - st23; // c2
      cache[cachePtr++] = st3 - 2 * st2 + st; // c3
      cache[cachePtr++] = st3 - st2;  // c4
    }

    cache[++cachePtr] = 1; // 0,1,0,0

    let parse = (pts: any, cache: any, l: any, tension: any) => {
      for (let i = 2, t; i < l; i += 2) {
        let pt1 = pts[i]; // x1
        let pt2 = pts[i + 1]; // y1
        let pt3 = pts[i + 2]; // x2
        let pt4 = pts[i + 3]; // y2
        let t1x = (pt3 - pts[i - 2]) * tension; // x2-x0
        let t1y = (pt4 - pts[i - 1]) * tension; // y2-y0
        let t2x = (pts[i + 4] - pt1) * tension; // x3-x1
        let t2y = (pts[i + 5] - pt2) * tension; // y3-y1
        let c = 0, c1, c2, c3, c4;
        for (t = 0; t < numOfSeg; t++) {
          c1 = cache[c++];
          c2 = cache[c++];
          c3 = cache[c++];
          c4 = cache[c++];
          res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x;
          res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y;
        }
      }
    }

    // calc. points
    parse(pts, cache, l, tension);

    if (close) {
      pts = [];
      pts.push(points[l - 4], points[l - 3],
        points[l - 2], points[l - 1], // second last and last
        points[0], points[1],
        points[2], points[3]); // first and second
      parse(pts, cache, 4, tension);
    }

    // add last point
    l = close ? 0 : points.length - 2;
    res[rPos++] = points[l++];
    res[rPos] = points[l];

    res[0] = points[0];
    res[1] = points[1];

    let newPoints: Array<Point> = [];
    for (let i = 0; i < res.length; i += 2) {
      let x = res[i] | 0;
      let y = res[i + 1] | 0;
      if (x !== 0 && y !== 0) {
        newPoints.push(new Point(x, y));
      }
    }
    return newPoints;
  }
}
