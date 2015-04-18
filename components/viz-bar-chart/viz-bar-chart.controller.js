(function () {

  angular
    .module('viz')
    .controller('VizBarChartController', VizBarChartController);

  VizBarChartController.$inject = ['$element'];

  /* @ngInject */
  function VizBarChartController($element) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'VizBarChartController';

    var svg = d3.select($element[0])
      .append('svg')
      .attr('height', vm.height)
      .attr('width', vm.width);

    var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, vm.width], 0.1);

    var yScale = d3.scale.linear()
      .range([vm.height, 0]);

    var redrawGraph = function () {

      xScale.domain(d3.range(vm.data.length));
      yScale.domain([0, d3.max(vm.data, function (d) { return d.value; })]);

      svg.selectAll('rect')
        .data(vm.data)
        .enter()
        .append('rect')
        .attr('height', function (d) {
          return vm.height - yScale(d.value);
        })
        .attr('width', xScale.rangeBand())
        .attr('x', function (d, i) {
          return xScale(i);
        })
        .attr('y', function (d) {
          return yScale(d.value)
        })
        .attr('class', 'bar');

    };

    activate();

    ////////////////

    function activate() {
      redrawGraph();
    }


  }

}());