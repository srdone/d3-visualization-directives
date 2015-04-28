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
        maPeriod: '=',
        height: '@',
        width: '@',
        callbacks: '='
      },
      bindToController: true,
      controller: 'VizBarChartController',
      controllerAs: 'vm'
    }


  }

}());