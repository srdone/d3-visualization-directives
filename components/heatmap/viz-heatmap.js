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
		debugger;

		var svg = d3.select(element[0]).append('svg')
			.attr('height', height)
			.attr('width', width);

		function redrawGraph () {
			var boxes, enteredBoxes, exitedBoxes;
			
			boxes = svg.selectAll('rect').data(dataset);
			enteredBoxes = boxes.enter();
			exitedBoxes = boxes.exit();

			enteredBoxes.append('rect')
				.attr('x', 0)
				.attr('y', 0)
				.attr('height', 10)
				.attr('width', 20)
				.style('fill', 'green');
		}

	}

})();