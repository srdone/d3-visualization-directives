(function () {

  d3.movingAverage = function (array, period) {

    var sum = function (arrayToSum) {
      return arrayToSum.reduce(function (previous, current) {
        return previous + current;
      }, 0);
    };

    var avg = function (arrayToAverage) {
      return sum(arrayToAverage) / arrayToAverage.length;
    };

    var getIterator = function (array, period) {
      var currentPosition = 0;
      var endPosition = currentPosition + period;
      var copiedArray = array.slice();

      var next = function () {
        var result;
        if (copiedArray[endPosition - 1]) {
          result = copiedArray.slice(currentPosition, endPosition);
          currentPosition++;
          endPosition = currentPosition + period;
        } else {
          result = undefined;
        }
        return result;
      };

      return {
        next: next
      };

    };

    var iter = getIterator(array, period);
    var result = [];

    var nextArray = iter.next();
    while (nextArray) {
      result.push(avg(nextArray));
      nextArray = iter.next();
    }

    return result;
  }

}());