(function () {

	angular.module('dataViz')
		.controller('VizScatterplotController', VizScatterplotController);

	VizScatterplotController.$inject = ['$scope', '$element'];

	function VizScatterplotController ($scope, $element) {

		var vm = this;
		var svg, datapoints;
		var xScale, yScale;
		var width = 500;
		var height = 300;

		activate();

		function activate () {
			svg = d3.select($element[0])
				.append('svg')
				.attr('width', width)
				.attr('height', height);

			xScale = d3.scale.linear().range([0, width]);
			yScale = d3.scale.linear().range([height, 0]);
			radiusScale = d3.scale.log().range([5, 20]);

			graphData();
		};

		function graphData () {
			setScaleDomains();

			datapoints = svg.selectAll('circle')
				.data(vm.data);

			// update existing points
			datapoints
				.attr('cx', function (d) {
					return xScale(d.x);
				})
				.attr('cy', function (d) {
					return yScale(d.y);
				});
			
			// add new points
			datapoints.enter()
				.append('circle')
				.attr('cx', function (d) {
					return xScale(d.x);
				})
				.attr('cy', function (d) {
					return yScale(d.y);
				})
				.attr('r', function (d) {
					return radiusScale(d.radius);
				});

			// remove old points
			datapoints.exit().remove();
		};

		function setScaleDomains () {
			var xValues, yValues;
			var xMin, xMax;
			var yMin, yMax;
			var radiusMin, radiusMax;

			xValues = vm.data.map(function (current) {
				return current.x;
			});

			yValues = vm.data.map(function (current) {
				return current.y;
			});

			radiusValues = vm.data.map(function (current) {
				return current.radius;
			});

			xMin = d3.min(xValues);
			xMax = d3.max(xValues);

			yMin = d3.min(yValues);
			yMax = d3.max(yValues);

			radiusMin = d3.min(radiusValues);
			radiusMax = d3.max(radiusValues);

			xScale.domain([xMin, xMax]);
			yScale.domain([yMin, yMax]);
			radiusScale.domain([radiusMin, radiusMax]);
		};

		$scope.$watch('vm.data', graphData, true);

	};

})();