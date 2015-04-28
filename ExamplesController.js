(function () {
	
	angular.module('viz')
		.controller('ExamplesController', ExamplesController);

  ExamplesController.$inject = ['$interval'];

	function ExamplesController ($interval) {
		var vm = this;

    vm.periods = 3;

    vm.barHoveredValue = '';

    vm.alert = function (d) {
      alert(d);
    };

    var barHoveredValueSet = function (d) {
      vm.barHoveredValue = d.value;
    };

    vm.callbacks = {
      bars: {
        mouseenter: [barHoveredValueSet]
      }
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
      {label: 'b', value: 20},
      {label: 'c', value: 30},
      {label: 'd', value: 40}
    ];

    vm.generateNewBarChartData = function () {
      var alphabet = 'abcdefghijklmnopqrstuvwyxz';
      var numberOfBars = Math.floor(Math.random() * 20) + 5;
      var data = [];

      for (var i = 0; i < numberOfBars; i++) {
        data.push({label: alphabet[i], value: Math.random() * 100});
      }

      vm.barChartData = data;
    };

    vm.randomizeBarChartData = function () {
      for (var i = 0; i < vm.barChartData.length; i++) {
        vm.barChartData[i].value = Math.random() * 100;
      }
    };

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
		};

    vm.generateNewBarChartData();

    $interval(vm.randomizeBarChartData, 5000);
	}

})();