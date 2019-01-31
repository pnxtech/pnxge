"use strict";
/**
 * @name Math
 * @description math library: a collection of math related classes
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name pcap
 * @description precision cap - reduces number precision to avoid rounding errors
 * @note: see https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript/3644302#3644302
 * @param {number | string} value - input number
 * @return {number} capped value
 */
function pcap(value) {
    var num = parseFloat("" + value);
    return Number(num.toFixed(7));
}
exports.pcap = pcap;
/**
 * @name Angle
 * @description Angle functions
 */
var Angle = /** @class */ (function () {
    function Angle() {
        this.HalfPI = Math.PI * 0.5;
    }
    /**
     * @name d2r
     * @description degrees to radians
     * @param {number} degree - 360 degree type
     * @return {number} radian
     */
    Angle.prototype.d2r = function (degree) {
        return pcap(degree * Math.PI / 180.0);
    };
    /**
     * @name r2d
     * @description radians to degrees
     * @param {number} radians
     * @return {number} degree
     */
    Angle.prototype.r2d = function (radians) {
        return pcap(radians * (180.0 / Math.PI));
    };
    /**
     * @name vectorAngleFromDegrees
     * @description return a new angle vector based on degrees
     * @param {number} degrees
     * @return {Vector} angleVector
     */
    Angle.prototype.vectorAngleFromDegrees = function (degrees) {
        var radians = this.d2r(degrees);
        return new Vector(pcap(Math.sin(radians)), pcap(Math.cos(radians)));
    };
    /**
     * @name vectorAngleFromRadians
     * @description return a new angle vector based on radians
     * @param {number} radians
     * @return {Angle} angleVector
     */
    Angle.prototype.vectorAngleFromRadians = function (radians) {
        return new Vector(pcap(Math.sin(radians)), pcap(Math.cos(radians)));
    };
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
    Angle.prototype.angleFromVectors = function (v1, v2) {
        return pcap(Math.atan2((v2.x - v1.x), (v2.y - v1.y)));
    };
    /**
     * @name randomAngleTop
     * @description get random top facing angle
     * @return {number} random angle
     */
    Angle.prototype.randomAngleTop = function () {
        var random = new Random();
        return pcap(random.getRandomInclusive(0, Math.PI) + this.HalfPI);
    };
    /**
     * @name randomAngleBottom
     * @description get random bottom facing angle
     * @return {number} random angle
     */
    Angle.prototype.randomAngleBottom = function () {
        var random = new Random();
        return pcap(random.getRandomInclusive(0, Math.PI) - this.HalfPI);
    };
    return Angle;
}());
exports.Angle = Angle;
/**
 * @name Point
 * @description Represent a point
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
/**
 * @name Rect
 * @description Rect class
 */
var Rect = /** @class */ (function () {
    /**
     * @name constructor
     * @description init class
     */
    function Rect(x, y, width, height) {
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
    Rect.prototype.intersect = function (targetRect) {
        // Find the half-widths and half-heights of each sprite
        var a1_halfWidth = 0;
        var a1_halfHeight = 0;
        var a2_halfWidth = 0;
        var a2_halfHeight = 0;
        a1_halfWidth = this.width * 0.5;
        a1_halfHeight = this.height * 0.5;
        a2_halfWidth = targetRect.width * 0.5;
        a2_halfHeight = targetRect.height * 0.5;
        // Calculate the distance vector between the sprites
        var dx = Math.abs(this.x - targetRect.x) * 2;
        var dy = Math.abs(this.y - targetRect.y) * 2;
        // Figure out the combined half-widths and half-heights
        var combinedHalfWidths = a1_halfWidth + a2_halfWidth;
        var combinedHalfHeights = a1_halfHeight + a2_halfHeight;
        return ((Math.abs(dx) < combinedHalfWidths) && (Math.abs(dy) < combinedHalfHeights)) ? true : false;
    };
    /**
     * @name inflate
     * @description increase a rect by adding padding
     * @param {padding} padding to increase rect
     * @return {Rect} new inflated Rect
     */
    Rect.prototype.inflate = function (padding) {
        this.x = this.x - padding;
        this.y = this.y - padding;
        this.width = this.width + padding;
        this.height = this.height + padding;
        return this;
    };
    /**
     * @name deflate
     * @description decrease a rect by removing padding
     * @param {padding} padding to decrease rect
     * @return {Rect} new deflated Rect
     */
    Rect.prototype.deflate = function (padding) {
        this.x = this.x + padding;
        this.y = this.y + padding;
        this.width = this.width - padding;
        this.height = this.height - padding;
        return this;
    };
    return Rect;
}());
exports.Rect = Rect;
/**
 * @name Vector
 * @description Represent a line (connection between to points)
 */
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    /**
     * @name constructor
     * @description constructor
     */
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return _super.call(this, x, y) || this;
    }
    /**
     * @name length
     * @description returns the vector length
     * @returns returns the vector length
     */
    Vector.prototype.length = function () {
        return pcap(Math.sqrt(this.x * this.x + this.y * this.y));
    };
    /**
     * @name distance
     * @description returns the distance between this and another vector
     * @returns {number} distance
     */
    Vector.prototype.distance = function (otherVector) {
        var vx = this.x - otherVector.x;
        var vy = this.y - otherVector.y;
        return pcap(Math.sqrt(vx * vx + vy * vy));
    };
    /**
     * @name negate
     * @description negates the current vector
     * @return {Vector} returns a new negated vector
     */
    Vector.prototype.negate = function () {
        return new Vector(-this.x, -this.y);
    };
    /**
     * @name add
     * @description adds vector to current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    Vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return new Vector(this.x, this.y);
    };
    /**
     * @name substract
     * @description substracts vector from current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    Vector.prototype.substract = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return new Vector(this.x, this.y);
    };
    /**
     * @name multiply
     * @description multiplies vector with current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    Vector.prototype.multiply = function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return new Vector(this.x, this.y);
    };
    /**
     * @name divide
     * @description divides vector with current vector
     * @param {Vector} vector - to use in operation
     * @return {Vector} returns a new vector
     */
    Vector.prototype.divide = function (vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return new Vector(pcap(this.x), pcap(this.y));
    };
    /**
     * @name equals
     * @description determines whether current and other vector are "realtively" equal while avoiding rounding errors
     * @return {boolan} true if equal / false if not
     */
    Vector.prototype.equals = function (vector) {
        return (pcap(Math.abs(this.x)) === pcap(Math.abs(vector.x)) &&
            pcap(Math.abs(this.y)) === pcap(Math.abs(vector.y)));
    };
    return Vector;
}(Point));
exports.Vector = Vector;
/**
 * @name Line
 * @description Represent a line (connection between to points)
 */
var Line = /** @class */ (function () {
    function Line(x1, y1, x2, y2) {
        if (x1 === void 0) { x1 = 0; }
        if (y1 === void 0) { y1 = 0; }
        if (x2 === void 0) { x2 = 0; }
        if (y2 === void 0) { y2 = 0; }
        this.pt1 = new Point(x1, y1);
        this.pt2 = new Point(x2, y2);
    }
    return Line;
}());
exports.Line = Line;
/**
* @name Random
* @description Random number functions. Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
var Random = /** @class */ (function () {
    function Random() {
    }
    /**
    * @name getRandom
    * @summary Returns a random number between 0 (inclusive) and 1 (exclusive)
    * @return {number} num - number
    */
    Random.prototype.getRandom = function () {
        return Math.random();
    };
    /**
    * @name getRandomArbitrary
    * @summary Returns a random number between min (inclusive) and max (exclusive)
    * @return {number} num - number
    */
    Random.prototype.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    /**
    * @name getRandomInt
    * @summary Returns a random integer between min (included) and max (excluded). If min and max are zero then a random int is chosen
    * @return {number} num - number
    */
    Random.prototype.getRandomInt = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 0; }
        if (min === 0 && max === 0) {
            return ~~(Math.random() * 1e6);
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    /**
    * @name getRandomIntInclusive
    * @summary Returns a random integer between min (included) and max (included)
    * @return {number} num - number
    */
    Random.prototype.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
    * @name getRandomInclusive
    * @summary Returns a random number (real not int) between min (included) and max (included)
    * @return {number} num - number
    */
    Random.prototype.getRandomInclusive = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    /**
     * @name getRandomBoolean
     * @description get a random true or false
     * @return {boolean} boolean - true or false
     */
    Random.prototype.getRandomBoolean = function () {
        return (Math.random() * 10 > 5);
    };
    /**
     * @name getRandomFromCenter
     * @description return a random number within a centered range
     * @param {number} value - number to center range
     * @param {number} width - number to determine width from center
     * @return {number} random number
     */
    Random.prototype.getRandomFromCenter = function (value, width) {
        var midWidth = width * 0.5;
        var low = value - midWidth;
        var high = value + midWidth;
        return this.getRandomInclusive(low, high);
    };
    /**
     * @name getRandomIntFromCenter
     * @description return a random number (integer) within a centered range
     * @param {number} value - number to center range
     * @param {number} width - number to determine width from center
     * @return {number} random number
     */
    Random.prototype.getRandomIntFromCenter = function (value, width) {
        var midWidth = (width * 0.5) | 0;
        var low = value - midWidth;
        var high = value + midWidth;
        return this.getRandomIntInclusive(low, high);
    };
    return Random;
}());
exports.Random = Random;
var Curve = /** @class */ (function () {
    function Curve() {
    }
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
    Curve.prototype.generatePathPoints = function (points, tension, numOfSeg, close) {
        if (typeof points === "undefined" || points.length < 2) {
            return [];
        }
        // options or defaults
        tension = typeof tension === "number" ? tension : 0.5;
        numOfSeg = typeof numOfSeg === "number" ? numOfSeg : 25;
        var pts; // for cloning point array
        var i = 1;
        var l = points.length;
        var rPos = 0;
        var rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0);
        var res = new Array(rLen);
        var cache = new Array((numOfSeg + 2) << 2);
        var cachePtr = 4;
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
            var st = i / numOfSeg;
            var st2 = st * st;
            var st3 = st2 * st;
            var st23 = st3 * 2;
            var st32 = st2 * 3;
            cache[cachePtr++] = st23 - st32 + 1; // c1
            cache[cachePtr++] = st32 - st23; // c2
            cache[cachePtr++] = st3 - 2 * st2 + st; // c3
            cache[cachePtr++] = st3 - st2; // c4
        }
        cache[++cachePtr] = 1; // 0,1,0,0
        var parse = function (pts, cache, l, tension) {
            for (var i_1 = 2, t = void 0; i_1 < l; i_1 += 2) {
                var pt1 = pts[i_1]; // x1
                var pt2 = pts[i_1 + 1]; // y1
                var pt3 = pts[i_1 + 2]; // x2
                var pt4 = pts[i_1 + 3]; // y2
                var t1x = (pt3 - pts[i_1 - 2]) * tension; // x2-x0
                var t1y = (pt4 - pts[i_1 - 1]) * tension; // y2-y0
                var t2x = (pts[i_1 + 4] - pt1) * tension; // x3-x1
                var t2y = (pts[i_1 + 5] - pt2) * tension; // y3-y1
                var c = 0, c1 = void 0, c2 = void 0, c3 = void 0, c4 = void 0;
                for (t = 0; t < numOfSeg; t++) {
                    c1 = cache[c++];
                    c2 = cache[c++];
                    c3 = cache[c++];
                    c4 = cache[c++];
                    res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x;
                    res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y;
                }
            }
        };
        // calc. points
        parse(pts, cache, l, tension);
        if (close) {
            pts = [];
            pts.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1], // second last and last
            points[0], points[1], points[2], points[3]); // first and second
            parse(pts, cache, 4, tension);
        }
        // add last point
        l = close ? 0 : points.length - 2;
        res[rPos++] = points[l++];
        res[rPos] = points[l];
        res[0] = points[0];
        res[1] = points[1];
        var newPoints = [];
        for (var i_2 = 0; i_2 < res.length; i_2 += 2) {
            var x = res[i_2] | 0;
            var y = res[i_2 + 1] | 0;
            if (x !== 0 && y !== 0) {
                newPoints.push(new Point(x, y));
            }
        }
        return newPoints;
    };
    return Curve;
}());
exports.Curve = Curve;
//# sourceMappingURL=Math.js.map