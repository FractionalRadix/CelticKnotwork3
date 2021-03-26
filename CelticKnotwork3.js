
var svg;
var svgHelper = new SvgHelper();
var xOffset, yOffset, xScale, yScale;

let width = 5; //TODO!+ Add a control...

function main() {

	// Initialize
	svg = document.getElementById('svg1');
	// Get the number of rows and the number of columns.
initRowControl();
initColumnControl();
//initWidthControl();

	let numRows = 21; //TODO!~ Figure out how to make this return an INT not a STRING: initRowControl();
	let numCols = 21; //TODO!~ Figure out how to make this return an INT not a STRING: initColumnControl();
	width = 3; //TODO!~ Figure out how to make this return an INT not a STRING: initWidth(); 


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

	draw(svg, numRows, numCols, width);
}

function draw(svg, numRows, numCols, width) {
	clearSvg();
	drawDots(svg, numRows, numCols);
	drawFirstSetLeftAndRight(numRows, numCols, width);
	drawSecondSetLeftAndRight(numRows, numCols, width);
	drawFirstSetTopAndBottom(numRows, numCols, width);
	drawSecondSetTopAndBottom(numRows, numCols, width);

	//TODO?~ How did numCols change into a string here?
	drawOutsideVerticalArcs(svg, numRows, Number(numCols));
	drawInsideVerticalArcs(svg, Number(numRows), Number(numCols), Number(width));
	drawOutsideHorizontalArcs(svg, Number(numRows), Number(numCols));
	drawInsideHorizontalArcs(svg, Number(numRows), Number(numCols), Number(width));

	drawConnectionsBetweenBorders(svg, Number(numRows), Number(numCols), Number(width));
}

function drawConnectionsBetweenBorders(svg, numRows, numCols) {
	for (let i = 0; i < width; i++) {
		// Connect the left border to the top border.
		let ptA1 = rowAndColToPoint(i + 3, i + 2);
		let ptA2 = rowAndColToPoint(i + 2, i + 3);
		svgHelper.addLine(svg, ptA1.x, ptA1.y, ptA2.x, ptA2.y, "yellow", 1);

		// Connect the top border to the right border.
		let ptB1 = rowAndColToPoint(i + 3, numCols - 1 - i);
		let ptB2 = rowAndColToPoint(i + 2, numCols - 2 - i);
		svgHelper.addLine(svg, ptB1.x, ptB1.y, ptB2.x, ptB2.y, "yellow", 1);

		// Connect the left border to the bottom border.
		let ptC1 = rowAndColToPoint(numRows - 1 - i, i + 3);
		let ptC2 = rowAndColToPoint(numRows - 2 - i, i + 2);
		svgHelper.addLine(svg, ptC1.x, ptC1.y, ptC2.x, ptC2.y, "yellow", 1);

		// Connect the bottom border to the right border.
		let ptD1 = rowAndColToPoint(numRows - 1 - i, numCols - 2 - i);
		let ptD2 = rowAndColToPoint(numRows - 2 - i, numCols - 1 - i);
		svgHelper.addLine(svg, ptD1.x, ptD1.y, ptD2.x, ptD2.y, "yellow", 1);
	}
}

function drawOutsideVerticalArcs(svg, numRows, numCols) {
	for (let row = 2; row < numRows - 1; row += 2) {
		// Left border
		let ptA = rowAndColToPoint(row, 1);
		let ptB = rowAndColToPoint(row + 2, 1);
		let ptCtrl1 = rowAndColToPoint(row + 1, 0);
		svgHelper.addQuadraticBezierCurve(svg, ptA, ptCtrl1, ptB, "yellow", 1);

		// Right border
		let ptC = rowAndColToPoint(row, numCols);
		let ptD = rowAndColToPoint(row + 2, numCols);
		let ptCtrl2 = rowAndColToPoint(row + 1, numCols + 1);
		svgHelper.addQuadraticBezierCurve(svg, ptC, ptCtrl2, ptD, "yellow", 1);
	}
}

function drawInsideVerticalArcs(svg, numRows, numCols, width) {
	for (let row = 2 + width; row < numRows - 1 - width; row += 2) {
		// Left inside border
		let ptA = rowAndColToPoint(row, width + 1);
		let ptB = rowAndColToPoint(row + 2, width + 1);
		let ptCtrl1 = rowAndColToPoint(row + 1, width + 2);
		svgHelper.addQuadraticBezierCurve(svg, ptA, ptCtrl1, ptB, "yellow", 1);	

		// Right inside border
		let ptC = rowAndColToPoint(row, numCols - width);
		let ptD = rowAndColToPoint(row + 2, numCols - width);
		let ptCtrl2 = rowAndColToPoint(row + 1, numCols - width - 1);
		svgHelper.addQuadraticBezierCurve(svg, ptC, ptCtrl2, ptD, "yellow", 1);	
	}
}

function drawInsideHorizontalArcs(svg, numRows, numCols, width) {
	for (let col = 2 + width; col < numCols - 1 - width; col += 2) {
		// Top inside border
		let ptA = rowAndColToPoint(width + 1, col);
		let ptB = rowAndColToPoint(width + 1, col + 2);
		let ptCtrl1 = rowAndColToPoint(width + 2, col + 1);
		svgHelper.addQuadraticBezierCurve(svg, ptA, ptCtrl1, ptB, "yellow", 1);	

		// Bottom inside border
		let ptC = rowAndColToPoint(numRows - width, col);
		let ptD = rowAndColToPoint(numRows - width, col + 2);
		let ptCtrl2 = rowAndColToPoint(numRows - width - 1, col + 1);
		svgHelper.addQuadraticBezierCurve(svg, ptC, ptCtrl2, ptD, "yellow", 1);	
		
	}
}

function drawOutsideHorizontalArcs(svg, numRows, numCols) {
	for (let col = 2; col < numCols - 1; col += 2) {
		let ptA = rowAndColToPoint(1, col);
		let ptB = rowAndColToPoint(1, col + 2);
		let ptCtrl1 = rowAndColToPoint(0, col + 1);
		svgHelper.addQuadraticBezierCurve(svg, ptA, ptCtrl1, ptB, "yellow", 1);

		let ptC = rowAndColToPoint(numRows, col);
		let ptD = rowAndColToPoint(numRows, col + 2);
		let ptCtrl2 = rowAndColToPoint(numRows + 1, col + 1);
		svgHelper.addQuadraticBezierCurve(svg, ptC, ptCtrl2, ptD, "yellow", 1);
	}
}

function drawFirstSetLeftAndRight(numRows, numCols, width) {
	// Draw the first set of lines on the left and right side.
	// Start at row=2,col=1 / row = 2, col=numCols
	for (let row = 2; row < numRows; row += 2) {

		let actualWidth = width;
		if (row + width >= numRows - width) {
			let delta = (numRows-row-1);
			actualWidth = Math.max(0, delta / 2);
		}

		// Diagonal, down-going lines on the lefthand side of the screen. Drawn from left to right, down-going.
		let ptA = rowAndColToPoint(row, 1);
		let ptB = rowAndColToPoint(actualWidth + row, actualWidth  + 1);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);

		// Their mirror image: diagonal lines on the righthand side of the screen. Drawn from right to left, down-going.
		let ptC = rowAndColToPoint(row, numCols);
		let ptD = rowAndColToPoint(actualWidth + row, numCols - actualWidth);
		svgHelper.addLine(svg, ptC.x, ptC.y, ptD.x, ptD.y, "yellow", 1);
	}
}

function drawSecondSetLeftAndRight(numRows, numCols, width) {
	for (row = numRows - 1; row > 1; row -= 2) {

		let actualWidth = Math.min(row / 2 - 1, width);

		// Diagonal, up-going lines on the lefthand side of the screen. Drawn from left to right, up-going.
		let ptA = rowAndColToPoint(row, 1);
		let ptB = rowAndColToPoint(row - actualWidth, 1 + actualWidth);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);

		// And on the other side, we draw the mirror images of these lines.
		let ptC = rowAndColToPoint(row, numCols);
		let ptD  = rowAndColToPoint(row - actualWidth, numCols - actualWidth);
		svgHelper.addLine(svg, ptC.x, ptC.y, ptD.x, ptD.y, "yellow", 1);
	}
}

function drawSecondSetTopAndBottom(numRows, numCols, width) {
	for (col = numCols - 1; col > 1; col -= 2) {
		let actualWidth = Math.min(col / 2 - 1, width);

		let ptA = rowAndColToPoint(1, col);
		let ptB = rowAndColToPoint(1 + actualWidth, col - actualWidth);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);

		let ptC = rowAndColToPoint(numRows, col);
		let ptD  = rowAndColToPoint(numRows - actualWidth, col - actualWidth);
		svgHelper.addLine(svg, ptC.x, ptC.y, ptD.x, ptD.y, "yellow", 1);
	}
}

function drawFirstSetTopAndBottom(numRows, numCols, width) {
	for (let col = 2; col < numCols; col += 2) {

		let actualWidth = width;
		if (col + width >= numCols - width) {
			let delta = (numCols-col-1);
			actualWidth = Math.max(0, delta / 2);
		}

		let ptA = rowAndColToPoint(1, col);
		let ptB = rowAndColToPoint(actualWidth + 1, col + actualWidth);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);

		// Corresponding line at the bottom.
		let ptC = rowAndColToPoint(numRows, col);
		let ptD = rowAndColToPoint(numRows - actualWidth, col + actualWidth);
		svgHelper.addLine(svg, ptC.x, ptC.y, ptD.x, ptD.y, "yellow", 1);
	}
}

function drawDots(svg, numRows, numCols) {
	for (let row = 1; row <= numRows; row++) {
		for (let col = 1; col <= numCols; col++) {
			const point = rowAndColToPoint(row, col);
			svgHelper.drawDot(svg, point.x, point.y, 2, "white");
		}
	}
}

function clearSvg() {

	//TODO!-
	// You can't remove a node from a Nodelist while iterating over it.
	// You have to do that iteration from the END... and it seems we don't have a backwardsForEach yet.
	/*
	let children = svg.childNodes; // children is a NodeList
	children.forEach( child => {
		if (child.nodeName == 'line' || child.nodeName == 'circle') {
			svg.removeChild(child);
		}
	});
	*/

	let children = svg.childNodes;
	let n = children.length;
	for (let i = n - 1; i >= 0; i--) {
		let child = children[i];
		if (child.nodeName == 'line' || child.nodeName == 'circle' || child.nodeName == 'path') {
			svg.removeChild(child);
		}
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

		//TODO?~ Not sure if this belongs here...
		if (xOffset !== undefined && yOffset !== undefined && xScale !== undefined && yScale !== undefined) {
			draw(svg, nrOfRows, nrOfCols, width);
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

		//TODO?~ Not sure if this belongs here...
		if (xOffset !== undefined && yOffset !== undefined && xScale !== undefined && yScale !== undefined) {
			draw(svg, nrOfRows, nrOfCols, width);
		}

		return nrOfCols;
	}
	return getColumnsFromInput();
}

function initWidthControl() {
	let widthSelector = document.getElementById("width");
	if (widthSelector !== undefined && widthSelector !== null) {
		widthSelector.addEventListener('width', getWidthFromInput);
	}
	function getWidthFromInput() {
		let widthInput = document.getElementById("width");
		if (widthInput === undefined || widthInput === null) {
			width = 3;
		} else {
			width = widthInput.value;
		}

		//TODO?~ Not sure if this belongs here...
		if (xOffset !== undefined && yOffset !== undefined && xScale !== undefined && yScale !== undefined) {
			draw(svg, nrOfRows, nrOfCols, width);
		}

		return width;
	}
	return getWidthFromInput();
}

