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
export declare function pcap(value: number | string): number;
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
     * @see https://stackoverflow.com/questions/21483999/using-atan2-to-find-angle-between-two-vectors
     * @param {Vector} v1 - from (source) vector
     * @param {Vector} v2 - to (target) vector
     * @return {number} angle - in radians
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
    /**
     * @name inflate
     * @description increase a rect by adding padding
     * @param {padding} padding to increase rect
     * @return {Rect} new inflated Rect
     */
    inflate(padding: number): Rect;
    /**
     * @name deflate
     * @description decrease a rect by removing padding
     * @param {padding} padding to decrease rect
     * @return {Rect} new deflated Rect
     */
    deflate(padding: number): Rect;
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
    * @summary Returns a random integer between min (included) and max (excluded). If min and max are zero then a random int is chosen
    * @return {number} num - number
    */
    getRandomInt(min?: number, max?: number): number;
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
    /**
     * @name getRandomIntFromCenter
     * @description return a random number (integer) within a centered range
     * @param {number} value - number to center range
     * @param {number} width - number to determine width from center
     * @return {number} random number
     */
    getRandomIntFromCenter(value: number, width: number): number;
}
export declare class Curve {
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
    generatePathPoints(points: any, tension: number, numOfSeg: number, close: boolean): Array<Point>;
}
//# sourceMappingURL=Math.d.ts.map