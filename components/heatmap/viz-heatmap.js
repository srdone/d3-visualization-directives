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

		debugger;
		var data = attributes.data;
		var height = attributes.dimensions.height;
		var width = attributes.dimensions.width;

		var svg = d3.select(element[0]).append('svg')
			.attr('height', height)
			.attr('width', width)

	}

})();