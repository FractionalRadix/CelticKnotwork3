
var svg;
var svgHelper = new SvgHelper();
var xOffset, yOffset, xScale, yScale;

function main() {

	// Initialize
	svg = document.getElementById('svg1');
	// Get the number of rows and the number of columns.
	let numRows = 21; //TODO!~ Figure out how to make this return an INT not a STRING: initRowControl();
	let numCols = 21; //TODO!~ Figure out how to make this return an INT not a STRING: initColumnControl();

	let width = 6; //TODO!+ Add a control...

	//TODO!+ Note that rows >= 2*width, cols >= 2*width. Our controls should add those checks, and uphold them whenever any of these three values is changed.
	//	Also, width has a minimum of 1.

	// Automatically scale the grid to the size of the SVG.
	var bBox = svg1.getBBox();

	xOffset = 10;
	yOffset = 10;
	const widthWithoutPadding  = bBox.width  - 2 * xOffset;
	const heightWithoutPadding = bBox.height - 2 * yOffset;
	xScale = widthWithoutPadding / (numCols + 1);
	yScale = heightWithoutPadding / (numRows + 1);

	drawDots(svg, numRows, numCols);

	// Draw the first set of lines on the left and right side.
	// Start at row=2,col=1 / row = 2, col=numCols
	for (row = 2; row < numRows; row += 2) {
		// Diagonal, down-going lines on the lefthand side of the screen. Drawn from left to right, down-going.
		let ptA = rowAndColToPoint(row, 1);
		let ptB = rowAndColToPoint(width + row, width  + 1);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);

		// Their mirror image: diagonal lines on the righthand side of the screen. Drawn from right to left, down-going.
		let ptC = rowAndColToPoint(row, numCols);
		let ptD = rowAndColToPoint(width + row, numCols - width);
		svgHelper.addLine(svg, ptC.x, ptC.y, ptD.x, ptD.y, "yellow", 1);
	}

	// Draw the first set of lines at the top and bottom.
	for (col = 2; col < numCols; col += 2) {
		if (col + width > numCols)
			break;
		let ptA = rowAndColToPoint(1, col);
		let ptB = rowAndColToPoint(width + 1, col + width);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);		
	}

}

function initRowControl() {
	let rowSelector = document.getElementById("nrOfRows");
	if (rowSelector !== undefined && rowSelector !== null) {
		rowSelector.addEventListener('input', getRowsFromInput);
	}
	function getRowsFromInput() {
		let rowInput = document.getElementById("nrOfRows");
		if (rowInput === undefined || rowInput === null) {
			nrOfRows = 21
		} else {
			nrOfRows = rowInput.value;
		}
		return nrOfRows;
	}
	return getRowsFromInput();
}

function initColumnControl() {
	let colSelector = document.getElementById("nrOfCols");
	if (colSelector !== undefined && colSelector !== null) {
		colSelector.addEventListener('input', getColumnsFromInput);
	}
	function getColumnsFromInput() {
		let colInput = document.getElementById("nrOfCols");
		if (colInput === undefined || colInput === null) {
			nrOfCols = 21;
		} else {
			nrOfCols = colInput.value;
		}
		return nrOfCols;
	}
	return getColumnsFromInput();
}


function rowAndColToPoint(row,col) {
	var xVal = xOffset + col * xScale;
	var yVal = yOffset + row * yScale;
	return { x : xOffset + col * xScale, y : yOffset + row * yScale };
}

function pointToRowAndCol(point) {
	var colCoor = ( point.x - xOffset ) / xScale;
	var rowCoor = ( point.y - yOffset ) / yScale;
	return { row : Math.round(rowCoor), col: Math.round(colCoor) };
}

function drawDots(svg, numRows, numCols) {
	for (let row = 1; row <= numRows; row++) {
		for (let col = 1; col <= numCols; col++) {
			const point = rowAndColToPoint(row, col);
			svgHelper.drawDot(svg, point.x, point.y, 2, "white");
		}
	}
}