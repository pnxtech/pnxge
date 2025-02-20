"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Math_1 = require("./Math");
var PathElement = /** @class */ (function () {
    function PathElement() {
        this.x = 0;
        this.y = 0;
        this.r = 0;
    }
    return PathElement;
}());
exports.PathElement = PathElement;
/**
 * @name Path
 * @description Define a path using points and curves
 */
var Path = /** @class */ (function () {
    /**
     * @name constructor
     */
    function Path() {
        this.pathPoints = [];
    }
    /**
     * @name addCurve
     * @description add a curve
     * @param {Point} starting - start location
     * @param {Point} ending - ending location
     * @param {Point} control - control point for curve
     * @param {number} segments - total segments
     * @return {void}
     */
    Path.prototype.addCurve = function (starting, ending, control, segments) {
        var curve = new Math_1.Curve(starting, ending, control, segments);
        this.pathPoints = this.pathPoints.concat(curve.getPoints());
    };
    /**
     * @name addSine
     * @description add points along a sine wave
     * @param {boolean} xAxis - apply to xAxis if true, else apply to yAxis
     * @param {Point} location - starting location on screen
     * @param {Vector} directionVector - direction of movement
     * @param {number} amplitude - amplitude of wave
     * @param {number} period - number of wave periods
     * @param {number} count - number of points to add
     * @param {number} velocity - speed to move through path
     * @return {void}
     */
    Path.prototype.addSine = function (xAxis, location, directionVector, amplitude, period, count, velocity) {
        var x = location.x;
        var y = location.y;
        var points = [];
        for (var i = 0; i < count; i += velocity) {
            var r = (amplitude * Math.sin(period * (Math.PI * (i / 180))));
            if (xAxis) {
                x += r;
            }
            else {
                y += r;
            }
            x += directionVector.x * velocity;
            y += directionVector.y * velocity;
            points.push(new Math_1.Point(x, y));
        }
        this.addPoints(points);
    };
    /**
     * @name addPoints
     * @description add points
     * @param {Array<Point>} points
     * @return {void}
     */
    Path.prototype.addPoints = function (points) {
        this.pathPoints = this.pathPoints.concat(points);
    };
    /**
     * @name getPoints
     * @description get path points
     * @return {Array<PathElement>} array of PathElement's
     */
    Path.prototype.getPathElements = function () {
        var pathElements = [];
        var x = 0;
        var y = 0;
        var angle = new Math_1.Angle();
        var vectorSrc = new Math_1.Vector(0, 0);
        var vectorDst = new Math_1.Vector(0, 0);
        this.pathPoints.forEach(function (point) {
            point.x = point.x;
            point.y = point.y;
            vectorSrc.x = x;
            vectorSrc.y = y;
            vectorDst.x = point.x;
            vectorDst.y = point.y;
            pathElements.push({
                x: point.x,
                y: point.y,
                r: Math_1.Angle.angleFromVectors(vectorSrc, vectorDst)
            });
            x = point.x;
            y = point.y;
        });
        return pathElements;
    };
    /**
     * @name getPathJSON
     * @description get a json string containing path data
     * @return {string} JSON - output
     */
    Path.prototype.getPathJSON = function () {
        var arr = this.getPathElements();
        var condenced = [];
        arr.forEach(function (element) {
            condenced.push(element.x + "|" + element.y + "|" + element.r);
        });
        return condenced.join('|');
    };
    return Path;
}());
exports.Path = Path;
//# sourceMappingURL=Path.js.map