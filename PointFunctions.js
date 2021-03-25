/**
 * Given an object with an x value and a y value, return a string that consists of the string representations of these values, separated by a space.
 * For example, if you ave han object { x : 3.5, y : 4.1, z: 2.11, w: 0.8 }, it will return "3.5 4.1"
 * @param Object p An object with an "x" attribute and a "y" attribute.
 * @return The textual representation of the x and y attribute, separated by a single space.
 */
function pointToString(p) {
	return p.x.toString() + " " + p.y.toString();
}

function rowAndColToPoint(row,col) {
	let xVal = xOffset + col * xScale;
	let yVal = yOffset + row * yScale;
	return { x : xOffset + col * xScale, y : yOffset + row * yScale };
}

function pointToRowAndCol(point) {
	var colCoor = ( point.x - xOffset ) / xScale;
	var rowCoor = ( point.y - yOffset ) / yScale;
	return { row : Math.round(rowCoor), col: Math.round(colCoor) };
}