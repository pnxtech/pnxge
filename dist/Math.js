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
    return Number(num.toFixed(4));
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
     * @see https://stackoverflow.com/questions/21483999/using-atan2-to-find-angle-between-two-vectors
     * @param {Vector} v1 - from (source) vector
     * @param {Vector} v2 - to (target) vector
     * @return {number} angle - in radians
     */
    Angle.prototype.angleFromVectors = function (v1, v2) {
        return pcap(Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x));
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
/**
 * @name Curve
 * @description Generates curves points between two points and a control point
 */
var Curve = /** @class */ (function () {
    /**
     * @name constructor
     * @description class contructor
     */
    function Curve(starting, ending, control, segments) {
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
    Curve.prototype.getTotalSegments = function () {
        return this.totalSegments;
    };
    /**
     * @name getPoints
     * @description get curve points
     * @return {Array<Point>} array of points
     */
    Curve.prototype.getPoints = function () {
        var newArray = new Array();
        for (var _i = 0, _a = this.segmentList; _i < _a.length; _i++) {
            var pt = _a[_i];
            newArray.push(new Point(pt.x, pt.y));
        }
        return newArray;
    };
    /**
     * @name distanceX
     * @description distance between two x components of a line
     * @param {Line} l - line
     * @return {number} distance
     */
    Curve.prototype.distanceX = function (l) {
        return l.pt2.x - l.pt1.x;
    };
    /**
     * @name distanceY
     * @description distance between two y components of a line
     * @param {Line} l - line
     * @return {number} distance
     */
    Curve.prototype.distanceY = function (l) {
        return l.pt2.y - l.pt1.y;
    };
    Curve.prototype.intersect = function (l1, l2) {
        var m1;
        var b1;
        var m2;
        var b2;
        var p = new Point();
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
        p.x = pcap(p.x);
        p.y = pcap(p.y);
        return p;
    };
    /**
     * @name generatePoints
     * @description generate curve points
     * @param {Point} p1 - starting point
     * @param {Point} p2 - end point
     * @param {Point} p3 - control point
     * @return {void}
     */
    Curve.prototype.generatePoints = function (p1, p2, p3) {
        var l1 = new Line(p1.x, p1.y, p3.x, p3.y);
        var l2 = new Line(p3.x, p3.y, p2.x, p2.y);
        var dx1 = this.distanceX(l1) / (this.totalSegments + 1);
        var dx2 = this.distanceX(l2) / (this.totalSegments + 1);
        var m1 = 0;
        var m2 = 0;
        var dy1 = 0;
        var dy2 = 0;
        var b1 = 0;
        var b2 = 0;
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
        var ls1 = new Line();
        var ls2 = new Line();
        for (var i = 0; i < this.totalSegments; i++) {
            ls1.pt1.x = l1.pt1.x + (dx1 * i);
            ls1.pt2.x = l2.pt1.x + (dx2 * (i + 1));
            ls2.pt1.x = l1.pt1.x + (dx1 * (i + 1));
            ls2.pt2.x = l2.pt1.x + (dx2 * (i + 2));
            if (dx1 !== 0) {
                ls1.pt1.y = m1 * ls1.pt1.x + b1;
                ls2.pt1.y = m1 * ls2.pt1.x + b1;
            }
            else {
                ls1.pt1.y = l1.pt1.y + (dy1 * i);
                ls2.pt1.y = l1.pt1.y + (dy1 * (i + 1));
            }
            if (dx2 != 0) {
                ls1.pt2.y = m2 * ls1.pt2.x + b2;
                ls2.pt2.y = m2 * ls2.pt2.x + b2;
            }
            else {
                ls1.pt2.y = l2.pt1.y + (dy2 * (i + 1));
                ls2.pt2.y = l2.pt1.y + (dy2 * (i + 2));
            }
            this.segmentList[i] = this.intersect(ls1, ls2);
        }
    };
    return Curve;
}());
exports.Curve = Curve;
//# sourceMappingURL=Math.js.map