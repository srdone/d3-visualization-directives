(function () {

	angular.module('viz')
		.directive('vizScatterplot', vizScatterplot);

	function vizScatterplot () {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			bindToController: true,
			controller: 'VizScatterplotController',
			controllerAs: 'vm',
			template: '<div></div>'
		}
	};

})();