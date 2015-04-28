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

    var lineScale = d3.scale.ordinal()
      .rangeRoundBands([padding, vm.width], 0.3);

    var yScale = d3.scale.linear()
      .range([vm.height, padding]);


    var line = d3.svg.line();

    var barGroup = svg.append('g');

    var path = svg.append('path');

    var yAxis = d3.svg.axis().scale(yScale).orient('left');
    var xAxis = d3.svg.axis().scale(xScale).orient('bottom');

    var yAxisContainer = svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)');

    var xAxisContainer = svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + vm.height + ')');

    var redrawGraph = function () {
      var ma = d3.movingAverage(vm.data.map(function (d) { return d.value}), vm.maPeriod);

      xScale.domain(vm.data.map(function (d) { return d.label; }));
      lineScale.domain(d3.range(vm.data.length));
      yScale.domain([0, d3.max(vm.data, function (d) { return d.value; })]);

      yAxis.scale(yScale);
      xAxis.scale(xScale);

      line
        .x(function (d, i) {
          return (lineScale(i + vm.maPeriod - 1) + xScale.rangeBand() / 2);
        })
        .y(function (d) {
          return  yScale(d);
        });

      bars = barGroup.selectAll('rect').data(vm.data);

      //update existing
      bars.transition()
        .attr('height', function (d) {
          return vm.height - yScale(d.value);
        })
        .attr('width', xScale.rangeBand())
        .attr('x', function (d) {
          return xScale(d.label);
        })
        .attr('y', function (d) {
          return yScale(d.value);
        });

      //add new bars
      bars.enter()
        .append('rect')
        .attr('height', function (d) {
          return vm.height - yScale(d.value);
        })
        .attr('width', xScale.rangeBand())
        .attr('x', function (d) {
          return xScale(d.label);
        })
        .attr('y', function (d) {
          return yScale(d.value)
        })
        .attr('class', 'bar');

      bars.exit().remove();

      if (vm.cbBar) {
        bars.on('mouseenter', function (d) {
          vm.cbBar(d);
          $scope.$apply(); // added to make sure changes that are meant to happen outside the directive propogate
        });
      }

      path.datum(ma)
        .attr('class', 'ma-line')
        .transition()
        .attr('d', line);

      yAxisContainer.transition().call(yAxis);
      xAxisContainer.transition().call(xAxis);
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