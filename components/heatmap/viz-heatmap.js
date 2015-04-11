(function () {

	angular.module('dataViz')
		.directive('vizHeatmap', vizHeatmap);

	function vizHeatmap () {

		return {
			restrict: 'E',
			scope: {
				data: '=',
				dimensions: '='
			},
			link: vizHeatmapLink
		}

	}

	function vizHeatmapLink (scope, element, attributes) {

		var dataset = scope.data;
		var height = scope.dimensions.height;
		var width = scope.dimensions.width;

		var svg = d3.select(element[0]).append('svg')
			.attr('height', height)
			.attr('width', width);

		var redrawGraph = function () {
			var boxes, enteredBoxes, exitedBoxes;
			var heatMapScale = boxScale().dimensions({height: height, width: width});

			heatMapScale.rawArea(dataset.reduce(function addArea (previous, current) {
				return previous + current.area;
			}, 0));
			
			boxes = svg.selectAll('rect').data(dataset);
			enteredBoxes = boxes.enter();
			exitedBoxes = boxes.exit();

			enteredBoxes.append('rect')
				.attr('x', function (d) {
					return heatMapScale.getNextCoord(d.area).x;
				})
				.attr('y', function (d) {
					return heatMapScale.getNextCoord(d.area).y;
				})
				.attr('height', function (d) {
					return heatMapScale.getNextSideLengths(d.area).height;
				})
				.attr('width', function (d) {
					return heatMapScale.getNextSideLengths(d.area).width;
				})
				.style('fill', 'green');
		}

		var boxScale = function () {
			var boxScaleObject = function () {
				var startingCoord = {x: 0, y: 0};
				var nextCoord = {x: 0, y: 0};
				var startingDimensions = {};
				var remainingDimensions = {};
				var svgArea, totalRawArea;
				var lastDimension = 'width';

				this.dimensions = function (dimension) {
					remainingDimensions = dimension;
					startingDimensions.width = dimension.width;
					startingDimensions.height = dimension.height;
					svgArea = startingDimensions.width * startingDimensions.height;

					return this;
				};

				this.rawArea = function (area) {
					totalRawArea = area;

					return this;
				};

				this.getNextCoord = function (rawArea) {
					var boxVolume = calculateBoxVolume(rawArea);
					var sideLengths = this.getNextSideLengths(rawArea);
					var x = nextCoord.x
					var y = nextCoord.y

					nextCoord.x = nextCoord.x + sideLengths.width;
					nextCoord.y = nextCoord.y + sideLengths.height;

					if (nextCoord.x === startingDimensions.width &&
						(nextCoord.y === startingDimensions.height || nextCoord.y === 0)) {
							nextCoord.x = startingCoord.x;
							nextCoord.y = startingCoord.y;
					}

					return {
						x: x,
						y: y
					}
				};

				this.getNextSideLengths = function (rawArea) {
					var boxVolume = calculateBoxVolume(rawArea);
					var height = remainingDimensions[lastDimension === 'width' ? 'height' : 'width'];
					var width = boxVolume / height;
					lastDimension = lastDimension === 'width' ? 'height' : 'width';

					console.log(height);
					console.log(width);
					console.log(remainingDimensions);

					remainingDimensions.width = remainingDimensions.width - width;
					remainingDimensions.height = remainingDimensions.height - height;

					// reset once we've used everything
					if (remainingDimensions.width === 0) {
						remainingDimensions.height = startingDimensions.height;
						remainingDimensions.width = startingDimensions.width;
					}

					return {
						height: height,
						width: width
					}
				};

				var calculateBoxVolume = function (rawArea) {
					var boxPercentArea = rawArea / totalRawArea;
					var boxArea = svgArea * boxPercentArea;
					return boxArea;
				}

				var calculateSideLength = function (givenSideLength, boxArea) {
					return boxArea / givenSideLength;
				}
			}

			return new boxScaleObject();
		}

		redrawGraph();

	}

})();