(function () {

	angular.module('dataViz')
		.controller('VizScatterplotController', VizScatterplotController);

	VizScatterplotController.$inject = ['$scope', '$element'];

	function VizScatterplotController ($scope, $element) {

		var vm = this;
		var svg, datapoints;

		activate();

		function activate () {
			svg = d3.select($element[0])
				.append('svg')
				.attr('width', 500)
				.attr('height', 300);

			graphData();
		};

		function graphData () {	
			datapoints = svg.selectAll('circle')
				.data(vm.data);
			
			datapoints.enter()
				.append('circle')
				.attr('cx', function (d) {
					return d.x;
				})
				.attr('cy', function (d) {
					return d.y;
				})
				.attr('r', function (d) {
					return d.radius;
				});

			datapoints.exit().remove();
		};

		$scope.$watch('vm.data', graphData, true);

	};

})();