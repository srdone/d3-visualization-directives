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
      .rangeRoundBands([0, vm.width], 0.3);

    var yScale = d3.scale.linear()
      .range([vm.height, 0]);

    var line = d3.svg.line();

    var path = svg.append('path');

    var redrawGraph = function () {
      var ma = d3.movingAverage(vm.data.map(function (current) { return current.value}), vm.maPeriod);

      xScale.domain(d3.range(vm.data.length));
      yScale.domain([0, d3.max(vm.data, function (d) { return d.value; })]);

      line
        .x(function (d, i) {
          return (xScale(i + vm.maPeriod - 1) + xScale.rangeBand() / 2);
        })
        .y(function (d) {
          return  yScale(d);
        });

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

      path.remove();

      path = svg.append('path');

      path.datum(ma)
        .attr('class', 'ma-line')
        .attr('d', line);
    };

    activate();

    ////////////////

    function activate() {
      redrawGraph();
    }


  }

}());