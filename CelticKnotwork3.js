
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

	// Start at row=2,col=1
	for (row = 2; row < numRows; row += 2) {
		for (let i = 0; i < width; i++) {
			let pt1 = rowAndColToPoint(i + row, i + 1);
			let pt2 = rowAndColToPoint(i + row + 1, i + 2);
			svgHelper.addLine(svg, pt1.x, pt1.y, pt2.x, pt2.y, "white", 1);
		}
	}

	/*
	for (let row = 2; row < numRows - 1; row ++) {
		for (let i = 1; i <= width; i++) {
			let col = i;
			// If the column is even, go down. If the column is odd, go up.
			var pt1, pt2;
			if (col % 2 === 1) {
				pt1 = rowAndColToPoint(row, i);
				pt2 = rowAndColToPoint(row + 1, i + 1);
			} else {
				pt1 = rowAndColToPoint(row + 1, i);
				pt2 = rowAndColToPoint(row, i + 1);
				//TODO!+
			}
			svgHelper.addLine(svg, pt1.x, pt1.y, pt2.x, pt2.y, "white", 1);
		}
	}
	*/
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