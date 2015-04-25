(function () {

  angular
    .module('viz')
    .controller('VizBarChartController', VizBarChartController);

  VizBarChartController.$inject = ['$element', '$scope'];

  /* @ngInject */
  function VizBarChartController($element, $scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'VizBarChartController';

    var padding = 30;

    var svg = d3.select($element[0])
      .append('svg')
      .attr('height', +vm.height + padding)
      .attr('width', +vm.width + padding);

    var xScale = d3.scale.ordinal()
      .rangeRoundBands([padding, vm.width], 0.3);

    var yScale = d3.scale.linear()
      .range([vm.height, padding]);

    var yAxis = d3.svg.axis().scale(yScale).orient('left');

    var yAxisContainer = svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)');

    var line = d3.svg.line();

    var path = svg.append('path');

    var redrawGraph = function () {
      var ma = d3.movingAverage(vm.data.map(function (current) { return current.value}), vm.maPeriod);

      xScale.domain(d3.range(vm.data.length));
      yScale.domain([0, d3.max(vm.data, function (d) { return d.value; })]);

      yAxis.scale(yScale);

      yAxisContainer.call(yAxis);

      line
        .x(function (d, i) {
          return (xScale(i + vm.maPeriod - 1) + xScale.rangeBand() / 2);
        })
        .y(function (d) {
          return  yScale(d);
        });

      var bars = svg.selectAll('rect').data(vm.data);

      //update existing
      bars.transition()
        .attr('height', function (d) {
          return vm.height - yScale(d.value);
        })
        .attr('width', xScale.rangeBand())
        .attr('x', function (d, i) {
          return xScale(i);
        })
        .attr('y', function (d) {
          return yScale(d.value)
        });

      //add new bars
      bars.enter()
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

      bars.exit().remove();

      if (vm.cbBar) {
        bars.on('mouseenter', function (d) {
          vm.cbBar(d);
        });
      }

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

    $scope.$watch('vm.data', redrawGraph, true);

    $scope.$watch('vm.maPeriod', redrawGraph, true);

  }

}());