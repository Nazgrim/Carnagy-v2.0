'use strict';
function groupBy(ary, keyFunc) {
  var r = {};
  ary.forEach(function (x) {
    var y = keyFunc(x);
    r[y] = (r[y] || []).concat(x);
  });
  return Object.keys(r).map(function (y) {
    return r[y];
  });
}
function unique(value, index, self) {
  return self.indexOf(value) === index;
}
class DealerCtrl {
  constructor($scope, dealer, highchartsNG, hightChartService) {
    garajModule.loadDetails(dealer);
    var categories = garajModule.getCategories();
    var filters = garajModule.getFilters();

    var cars = dealer.cars;

    $scope.deleteFilters = [];
    $scope.categoryList = [{ name: "All", id: 0 }];
    $scope.currentCategory = 0;
    $scope.filters = filters;
    $scope.cars = garajModule.getDealers(cars, categories, $scope.currentCategory);
    $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);

    $scope.closeFilter = function (index) {
      var currentDeleteFilter = $scope.filters.splice(index, 1)[0];
      $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);
      $scope.deleteFilters.push(currentDeleteFilter);
      $scope.currentDeleteFilter = currentDeleteFilter;
    };
    $scope.addFilter = function () {
      $scope.filters.push($scope.currentDeleteFilter);
      $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);
      var index = $scope.deleteFilters.indexOf($scope.currentDeleteFilter);
      $scope.deleteFilters.splice(index, 1)[0];
      if ($scope.deleteFilters.length != 0) {
        $scope.currentDeleteFilter = $scope.deleteFilters[0];
      }
    };
    $scope.showDetailed = function (car) {
      if (car.isDetailed)
        car.isDetailed = false;
      else
        car.isDetailed = true;
    };
    $scope.years = $scope.cars
      .map(c => c.year)
      .filter(unique);

    $scope.makes = $scope.cars
      .map(c => c.make)
      .filter(unique);

    $scope.bodyTypes = $scope.cars
      .map(c => c.bodyType)
      .filter(unique);

    //prices filter
    // var prices = $scope.cars
    //   .map(c => c.dealerAdvertisedPrice)
    //   .filter(unique);

    // prices.sort();
    // var gropedPrices = groupBy(prices, function (x) {
    //   return Math.floor(x / 10000)
    // });

    // $scope.prices = gropedPrices.map(function (p) {
    //   return {
    //     text: '$' + Math.floor((p[0] / 10000)) * 10000 + '-$' + Math.ceil((p[p.length - 1] / 10000)) * 10000,
    //     min: +Math.floor((p[0] / 10000)) * 10000,
    //     max: +Math.ceil((p[p.length - 1] / 10000)) * 10000
    //   };
    // });

    $scope.getCars = function () {
      return $scope.cars.filter(function (c) {
        if ($scope.selectedYear && c.year !== $scope.selectedYear) return false;
        if ($scope.selectedMake && c.make !== $scope.selectedMake) return false;
        if ($scope.selectedBodyType && c.bodyType !== $scope.selectedBodyType) return false;
        if ($scope.selectedPrice && ($scope.selectedPrice.min >= c.dealerAdvertisedPrice || c.dealerAdvertisedPrice > $scope.selectedPrice.max)) return false;

        return true;
      });
    }

    function setChart(chart) {
      var len = chart.series.length;
      for (var i = 0; i < len; i++) {
        chart.series[0].remove();
      }
      var series2 = hightChartCreatorModule.getSeries2();
      for (var i = 0; i < series2.length; i++) {
        chart.addSeries(series2[i]);
      }
    }
    function setChart2(chart) {
      var abc2 = hightChartCreatorModule.getSeries1();
      var len = chart.series.length;
      chart.series = [];
      var series1 = hightChartCreatorModule.getSeries1();
      for (var i = 0; i < series1.length; i++) {
        chart.series.push(series1[i]);
      }
      for (var i = 0; i < len; i++) {
        console.log(series1[i]);
      }
    }

    $scope.goBack = function (c) {
      for (var i = $scope.categoryList.length - 1; i > -1; i--) {
        if ($scope.categoryList[i].id == c.id) {
          $scope.currentCategory = c.id;
          $scope.cars = garajModule.getDealers(cars, categories, $scope.currentCategory);
          $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);
          setChart2($scope.options);
          break;
        }
        else {
          $scope.categoryList.pop();
        }
      }
    }

    var options = hightChartCreatorModule.getOptions(categories, 0);
    options.options.plotOptions.series.events = {
      click: function (e) {
        var selectedSeries=this.data[0].options.category;
        if (selectedSeries) {
          $scope.currentCategory = selectedSeries.id;
          $scope.categoryList.push(selectedSeries);
          $scope.cars = garajModule.getDealers(cars, categories, $scope.currentCategory);
          $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);
          $scope.$apply();
          setChart(this.chart);
        }
      }
    }
    $scope.options = options;

  }
}

DealerCtrl.$inject = ['$scope', 'dealer', 'highchartsNG', 'hightChartService'];

export default DealerCtrl;