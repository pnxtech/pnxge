/**
 * @name Math
 * @description  math library: a collection of math related classes
 */
/**
 * @name pcap
 * @description precision cap - reduces number precision to avoid rounding errors
 * @note: see https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript/3644302#3644302
 * @param {number | string} value - input number
 * @return {number} capped value
 */
export declare function pcap(value: number | string): number;
/**
 * @name createID
 * @description create a unique ID
 * @return {string} unique ID
 */
export declare function createID(): string;
/**
 * @name zeroPad
 * @description left zero pad a number
 * @param {number} num - number to format
 * @param {number} size - size of return string
 * @return {string} zero padded number string
 */
export declare function zeroPad(num: number, size: number): string;
/**
 * @name Angle
 * @description Angle functions
 */
export declare class Angle {
    HalfPI: number;
    /**
     * @name d2r
     * @description degrees to radians
     * @param {number} degree - 360 degree type
     * @return {number} radian
     */
    d2r(degree: number): number;
    /**
     * @name r2d
     * @description radians to degrees
     * @param {number} radians
     * @return {number} degree
     */
    r2d(radians: number): number;
    /**
     * @name vectorAngleFromDegrees
     * @description return a new angle vector based on degrees
     * @param {number} degrees
     * @return {Vector} angleVector
     */
    vectorAngleFromDegrees(degrees: number): Vector;
    /**
     * @name vectorAngleFromRadians
     * @description return a new angle vector based on radians
     * @param {number} radians
     * @return {Angle} angleVector
     */
    vectorAngleFromRadians(radians: number): Vector;
    /**
     * @name angleFromVectors
     * @description compute angle from v1 vector to v2 vector
     * @param {Vector} v1 - from (source) vector
     * @param {Vector} v2 - to (target) vector
     * @return {number} angle - in radians
     * @note
     *  let angle: Angle = new Angle();
     *  let radians = angle.angleFromVectors(
     *    new Vector(this.explosionAnim.x, this.explosionAnim.y),
     *    new Vector(this.turetAnim.x, this.turetAnim.y)
     *  );
     *  this.movementVector = angle.vectorAngleFromRadians(radians);
     */
    angleFromVectors(v1: Vector, v2: Vector): number;
    /**
     * @name randomAngleTop
     * @description get random top facing angle
     * @return {number} random angle
     */
    randomAngleTop(): number;
    /**
     * @name randomAngleBottom
     * @description get random bottom facing angle
     * @return {number} random angle
     */
    randomAngleBottom(): number;
}
/**
 * @name Point
 * @description Represent a point
 */
export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
}
/**
 * @name Rect
 * @description Rect class
 */
export declare class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    /**
     * @name constructor
     * @description init class
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * @name intersect
     * @description check whether this rect intersects with target rect
     * @note this algorithm relies on the fact that sprites are by default setup with an anchor of 0.5
     * @param {Rect} targetRect
     * @return {boolean} bool - true if collision else false
     */
    intersect(targetRect: Rect): boolean;
}
/**
 * @name Vector
 * @description Represent a line (connection between to points)
 */
export declare class Vector extends Point {
    /**
     * @name constructor
     * @description constructor
     */
    constructor(x?: number, y?: number);
    /**
     * @name length
     * @description returns the vector length
     * @returns returns the vector length
     */
    length(): number;
    /**
     * @name distance
     * @description returns the distance between this and another vector
     * @returns {number} distance
     */
    distance(otherVector: Vector): number;
    /**
     * @name negate
     * @description negates the current vector
     * @return {Vector} returns a new negated vector
     */
    negate(): Vector;
    /**
     * @name add
     * @description adds vector to current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    add(vector: Vector): Vector;
    /**
     * @name substract
     * @description substracts vector from current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    substract(vector: Vector): Vector;
    /**
     * @name multiply
     * @description multiplies vector with current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    multiply(vector: Vector): Vector;
    /**
     * @name divide
     * @description divides vector with current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    divide(vector: Vector): Vector;
    /**
     * @name equals
     * @description determines whether current and other vector are "realtively" equal while avoiding rounding errors
     * @return {boolan} true if equal / false if not
     */
    equals(vector: Vector): boolean;
}
/**
 * @name Line
 * @description Represent a line (connection between to points)
 */
export declare class Line {
    pt1: Point;
    pt2: Point;
    constructor(x1?: number, y1?: number, x2?: number, y2?: number);
}
/**
* @name Random
* @description Random number functions. Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
export declare class Random {
    /**
    * @name getRandom
    * @summary Returns a random number between 0 (inclusive) and 1 (exclusive)
    * @return {number} num - number
    */
    getRandom(): number;
    /**
    * @name getRandomArbitrary
    * @summary Returns a random number between min (inclusive) and max (exclusive)
    * @return {number} num - number
    */
    getRandomArbitrary(min: number, max: number): number;
    /**
    * @name getRandomInt
    * @summary Returns a random integer between min (included) and max (excluded)
    * @return {number} num - number
    */
    getRandomInt(min: number, max: number): number;
    /**
    * @name getRandomIntInclusive
    * @summary Returns a random integer between min (included) and max (included)
    * @return {number} num - number
    */
    getRandomIntInclusive(min: number, max: number): number;
    /**
    * @name getRandomInclusive
    * @summary Returns a random number (real not int) between min (included) and max (included)
    * @return {number} num - number
    */
    getRandomInclusive(min: number, max: number): number;
    /**
     * @name getRandomBoolean
     * @description get a random true or false
     * @return {boolean} boolean - true or false
     */
    getRandomBoolean(): boolean;
    /**
     * @name getRandomFromCenter
     * @description return a random number within a centered range
     * @param {number} value - number to center range
     * @param {number} width - number to determine width from center
     * @return {number} random number
     */
    getRandomFromCenter(value: number, width: number): number;
}
/**
 * @name Curve
 * @description Generates curves points between two points and a control point
 */
export declare class Curve {
    protected totalSegments: number;
    protected segmentList: Point[];
    /**
     * @name constructor
     * @description class contructor
     */
    constructor(starting: Point, ending: Point, control: Point, segments: number);
    /**
     * @name getTotalSegments
     * @description get total segments in curve
     * @return {number} total segments
     *
     */
    getTotalSegments(): number;
    /**
     * @name getPoints
     * @description get curve points
     * @return {Array<Point>} array of points
     */
    getPoints(): Array<Point>;
    /**
     * @name distanceX
     * @description distance between two x components of a line
     * @param {Line} l - line
     * @return {number} distance
     */
    protected distanceX(l: Line): number;
    /**
     * @name distanceY
     * @description distance between two y components of a line
     * @param {Line} l - line
     * @return {number} distance
     */
    protected distanceY(l: Line): number;
    /**
     * @name intersect
     * @description determine point at which lines intersect
     * @param {Line} l1 - first line
     * @param {Line} l2 - second line
     * @return {Point} - intersection point
     */
    protected intersect(l1: Line, l2: Line): Point;
    /**
     * @name generatePoints
     * @description generate curve points
     * @param {Point} p1 - starting point
     * @param {Point} p2 - end point
     * @param {Point} p3 - control point
     * @return {void}
     */
    protected generatePoints(p1: Point, p2: Point, p3: Point): void;
}
//# sourceMappingURL=Math.d.ts.map