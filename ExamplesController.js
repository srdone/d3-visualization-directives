(function () {
	
	angular.module('viz')
		.controller('ExamplesController', ExamplesController);

	function ExamplesController () {
		var vm = this;

    vm.alert = function (d) {
      alert(d);
    };

		vm.scatterplotData = [
			{x: 10, y: 50, radius: 5},
			{x: 100, y: 250, radius: 15},
			{x: 220, y: 75, radius: 25},
			{x: 300, y: 150, radius: 35}
		];

		vm.heatmapData = [
			{area: 200, intensity: 20, category: 'a'},
			{area: 250, intensity: 50, category: 'a'},
			{area: 300, intensity: 70, category: 'a'},
			{area: 350, intensity: 80, category: 'b'},
			{area: 100, intensity: 90, category: 'c'}
		];

    vm.barChartData = [
      {label: 'a', value: 10},
      {label: 'a', value: 20},
      {label: 'a', value: 30},
      {label: 'a', value: 40}
    ];

		vm.addDatapoint = function () {
			vm.scatterplotData.push({
				x: vm.newData.x,
				y: vm.newData.y,
				radius: vm.newData.radius
			});

			vm.newData = {};
		};

		vm.dimensions = {
			height: 500,
			width: 300
		}
	}

})();