
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

	let numRows = 21; //TODO!~ Figure out how to make this return an INT not a STRING: initRowControl();
	let numCols = 21; //TODO!~ Figure out how to make this return an INT not a STRING: initColumnControl();


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
	drawFirstSetTopAndBottom(numRows, numCols, width);

	//TODO?~ How did numCols change into a string here?
	drawOutsideVerticalArcs(svg, numRows, Number(numCols));
	drawInsideVerticalArcs(svg, Number(numRows), Number(numCols), width);
	drawOutsideHorizontalArcs(svg, Number(numRows), Number(numCols));
	drawInsideHorizontalArcs(svg, Number(numRows), Number(numCols), width);
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
		// Diagonal, down-going lines on the lefthand side of the screen. Drawn from left to right, down-going.
		let ptA = rowAndColToPoint(row, 1);
		let ptB = rowAndColToPoint(width + row, width  + 1);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);

		// Their mirror image: diagonal lines on the righthand side of the screen. Drawn from right to left, down-going.
		let ptC = rowAndColToPoint(row, numCols);
		let ptD = rowAndColToPoint(width + row, numCols - width);
		svgHelper.addLine(svg, ptC.x, ptC.y, ptD.x, ptD.y, "yellow", 1);
	}
}

function drawFirstSetTopAndBottom(numRows, numCols, width) {
	for (let col = 2; col < numCols; col += 2) {
		//if (col + width > numCols)
		//	break;
		let actualWidth = Math.min(width, numCols - col - 1); // Should be -2 but you get negatives...
console.log(actualWidth);

		let ptA = rowAndColToPoint(1, col);
		let ptB = rowAndColToPoint(actualWidth + 1, col + actualWidth);
		svgHelper.addLine(svg, ptA.x, ptA.y, ptB.x, ptB.y, "yellow", 1);

		// Corresponding line at the bottom.
		let ptC = rowAndColToPoint(numRows, col);
		let ptD = rowAndColToPoint(numRows - actualWidth, col + actualWidth);
		svgHelper.addLine(svg, ptC.x, ptC.y, ptD.x, ptD.y, "yellow", 1);
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
	console.log("In initRowControl()");
	let rowSelector = document.getElementById("nrOfRows");
	if (rowSelector !== undefined && rowSelector !== null) {
		rowSelector.addEventListener('input', getRowsFromInput);
	}
	function getRowsFromInput() {
		console.log("In getRowsFromInput()");
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
	console.log("In initColumnControl()");
	let colSelector = document.getElementById("nrOfCols");
	if (colSelector !== undefined && colSelector !== null) {
		colSelector.addEventListener('input', getColumnsFromInput);
	}
	function getColumnsFromInput() {
		console.log("In getColumnsFromInput()");
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

function drawDots(svg, numRows, numCols) {
	for (let row = 1; row <= numRows; row++) {
		for (let col = 1; col <= numCols; col++) {
			const point = rowAndColToPoint(row, col);
			svgHelper.drawDot(svg, point.x, point.y, 2, "white");
		}
	}
}