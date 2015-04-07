(function () {
	
	angular.module('dataViz')
		.controller('ExamplesController', ExamplesController);

	function ExamplesController () {
		var vm = this;

		vm.scatterplotData = [
			{x: 10, y: 50, radius: 5},
			{x: 100, y: 250, radius: 15},
			{x: 220, y: 75, radius: 25},
			{x: 300, y: 150, radius: 35}
		];

		vm.addDatapoint = function () {
			vm.scatterplotData.push({
				x: vm.newData.x,
				y: vm.newData.y,
				radius: vm.newData.radius
			});

			vm.newData = {};
		};
	};

})();