/**
 * @name Math
 * @description math library: a collection of math related classes
 */

export const PI: number = Math.PI;
export const HalfPI: number = Math.PI * 0.5;

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
  /**
   * @name d2r
   * @description degrees to radians
   * @param {number} degree - 360 degree type
   * @return {number} radian
   */
  static d2r(degree: number): number {
    return degree * PI / 180.0;
  }

  /**
   * @name r2d
   * @description radians to degrees
   * @param {number} radians
   * @return {number} degree
   */
  static r2d(radians: number): number {
    return radians * (180.0 / PI);
  }

  /**
   * @name vectorAngleFromDegrees
   * @description return a new angle vector based on degrees
   * @param {number} degrees
   * @return {Vector} angleVector
   */
  static vectorAngleFromDegrees(degrees: number): Vector {
    let radians: number = Angle.d2r(degrees);
    return new Vector(Math.sin(radians), Math.cos(radians));
  }

  /**
   * @name vectorAngleFromRadians
   * @description return a new angle vector based on radians
   * @param {number} radians
   * @return {Angle} angleVector
   */
  static vectorAngleFromRadians(radians: number): Vector {
    return new Vector(Math.sin(radians), Math.cos(radians));
  }

  /**
   * @name angleFromVectors
   * @description compute angle from v1 vector to v2 vector
   * @param {Vector} anchor - from (source) vector
   * @param {Vector} point - to (target) vector
   * @return {number} angle - in radians
   */
  static angleFromVectors(anchor: Vector, point: Vector): number {
    return Math.atan2(anchor.y - point.y, anchor.x - point.x);
  }

  /**
   * @name randomAngle
   * @description get randomangle
   * @return {number} random angle
   */
  static randomAngle(): number {
    return Random.getRandomInclusive(0, PI);
  }

  /**
   * @name randomAngleTop
   * @description get random top facing angle
   * @return {number} random angle
   */
  static randomAngleTop(): number {
    return Random.getRandomInclusive(0, PI) + HalfPI;
  }

  /**
   * @name randomAngleBottom
   * @description get random bottom facing angle
   * @return {number} random angle
   */
  static randomAngleBottom(): number {
    return Random.getRandomInclusive(0, PI) - HalfPI;
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
  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
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
  public intersect(targetRect: Rect): boolean {
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
   * @name pointInRect
   * @description is a point within this rect?
   * @param {any} param1 - first param, number or point
   * @param {any} param2 - second param, number or point
   * @return {boolean} true if point is within rect else false
   */
  pointInRect(param1: any, param2: any): boolean {
    let bool: boolean = false;
    if (typeof param1 === 'number') {
      bool = (param1 >= this.x && param1 <= this.width &&
              param2 >= this.y && param2 <= this.height);
    } else {
      bool = (param1.x >= this.x && param1.x <= this.width &&
              param2.y >= this.y && param2.y <= this.height);
    }
    return bool;
  }

  /**
   * @name inflate
   * @description increase a rect by adding padding
   * @param {padding} padding to increase rect
   * @return {Rect} new inflated Rect
   */
  public inflate(padding: number): Rect {
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
  public deflate(padding: number): Rect {
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
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * @name distance
   * @description returns the distance between this and another vector
   * @returns {number} distance
   */
  public distance(otherVector: Vector): number {
    let vx = this.x - otherVector.x;
    let vy = this.y - otherVector.y;
    return Math.sqrt(vx * vx + vy * vy);
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
    return new Vector(this.x, this.y);
  }

  /**
   * @name equals
   * @description determines whether current and other vector are "realtively" equal while avoiding rounding errors
   * @return {boolan} true if equal / false if not
   */
  public equals(vector: Vector): boolean {
    return (Math.abs(this.x) === Math.abs(vector.x) &&
            Math.abs(this.y) === Math.abs(vector.y));
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
 static getRandom(): number {
    return Math.random();
  }

  /**
  * @name getRandomArbitrary
  * @summary Returns a random number between min (inclusive) and max (exclusive)
  * @return {number} num - number
  */
 static getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
  * @name getRandomInt
  * @summary Returns a random integer between min (included) and max (excluded). If min and max are zero then a random int is chosen
  * @return {number} num - number
  */
 static getRandomInt(min: number = 0, max: number = 0): number {
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
 static getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
  * @name getRandomInclusive
  * @summary Returns a random number (real not int) between min (included) and max (included)
  * @return {number} num - number
  */
 static getRandomInclusive(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * @name getRandomBoolean
   * @description get a random true or false
   * @return {boolean} boolean - true or false
   */
  static getRandomBoolean(): boolean {
    return (Math.random() * 10 > 5);
  }

  /**
   * @name getRandomFromCenter
   * @description return a random number within a centered range
   * @param {number} value - number to center range
   * @param {number} width - number to determine width from center
   * @return {number} random number
   */
  static getRandomFromCenter(value: number, width: number): number {
    let midWidth = width * 0.5;
    let low = value - midWidth;
    let high = value + midWidth;
    return Random.getRandomInclusive(low, high);
  }

  /**
   * @name getRandomIntFromCenter
   * @description return a random number (integer) within a centered range
   * @param {number} value - number to center range
   * @param {number} width - number to determine width from center
   * @return {number} random number
   */
  static getRandomIntFromCenter(value: number, width: number): number {
    let midWidth = (width * 0.5) | 0;
    let low = value - midWidth;
    let high = value + midWidth;
    return Random.getRandomIntInclusive(low, high);
  }
}

/**
 * @name Curve
 * @description Generates curves points between two points and a control point
 */
export class Curve {
  protected totalSegments: number;
  protected segmentList: Point[];

  /**
   * @name constructor
   * @description class contructor
   */
  constructor(starting: Point, ending: Point, control: Point, segments: number) {
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
   * @return {Array<Point>} array of points
   */
  public getPoints(): Array<Point> {
    let newArray = new Array();
    for (let pt of this.segmentList) {
      newArray.push(new Point(pt.x, pt.y));
    }
    return newArray;
  }

  /**
   * @name distanceX
   * @description distance between two x components of a line
   * @param {Line} l - line
   * @return {number} distance
   */
  protected distanceX(l: Line): number {
    return l.pt2.x - l.pt1.x;
  }

  /**
   * @name distanceY
   * @description distance between two y components of a line
   * @param {Line} l - line
   * @return {number} distance
   */
  protected distanceY(l: Line): number {
    return l.pt2.y - l.pt1.y;
  }

  /**
   * @name intersect
   * @description identify the intersection point between two lines
   * @param {Line} l1 - line 1
   * @param {Line} l2 - line 2
   * @return {Point} intersection point
   */
  protected intersect(l1: Line, l2: Line): Point {
    let m1: number;
    let b1: number;
    let m2: number;
    let b2: number;
    let p: Point = new Point();

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

    p.x = p.x;
    p.y = p.y;
    return p;
  }

  /**
   * @name generatePoints
   * @description generate curve points
   * @param {Point} p1 - starting point
   * @param {Point} p2 - end point
   * @param {Point} p3 - control point
   * @return {void}
   */
  protected generatePoints(p1: Point, p2: Point, p3: Point): void {
    let l1: Line = new Line(p1.x, p1.y, p3.x, p3.y);
    let l2: Line = new Line(p3.x, p3.y, p2.x, p2.y);
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

    let ls1: Line = new Line();
    let ls2: Line = new Line();
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
