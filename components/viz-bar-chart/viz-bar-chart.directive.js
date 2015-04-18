(function () {

  angular
    .module('viz')
    .directive('vizBarChart', vizBarChart);

  vizBarChart.$inject = [];

  /* @ngInject */
  function vizBarChart() {

    return {
      scope: {
        data: '=',
        height: '@',
        width: '@'
      },
      bindToController: true,
      controller: 'VizBarChartController',
      controllerAs: 'vm'
    }


  }

}());