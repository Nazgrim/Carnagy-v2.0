'use strict';

class DealerCtrl {
  constructor($scope, highchartsNG, dealerService) {
    dealerService.getDealerById().then(function (dealer) {
      var categories = dealerService.getCategories();
      var cars = dealer.cars;
      $scope.toogleGropPanel = function (flag) {
        $scope.groupPanel = flag;
      };
      $scope.deleteFilters = [];
      $scope.categoryList = [{ name: "All", id: 0 }];
      $scope.currentCategory = 0;
      $scope.filters = dealerService.getFilters();
      $scope.cars = garajModule.getDealers(cars, categories, $scope.currentCategory);
      $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);

      $scope.closeFilter = function (index) {
        if ($scope.filters.length == 1) return

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

      $scope.goBack = function (c) {
        for (var i = $scope.categoryList.length - 1; i > -1; i--) {
          if ($scope.categoryList[i].id == c.id) {
            $scope.currentCategory = c.id;
            $scope.cars = garajModule.getDealers(cars, categories, $scope.currentCategory);
            $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);
            hightChartCreatorModule.setChart($scope.options, c.id);
            break;
          }
          else {
            $scope.categoryList.pop();
          }
        }
      }

      var options = hightChartCreatorModule.getOptions(0);
      options.options.plotOptions.series.events = {
        click: function (e) {
          var selectedSeries = this.userOptions.category;
          if (selectedSeries && selectedSeries.hasSubCategories) {
            $scope.currentCategory = selectedSeries.dealerId;
            $scope.categoryList.push(selectedSeries);
            $scope.cars = garajModule.getDealers(cars, categories, $scope.currentCategory);
            $scope.groups = garajModule.createGropus($scope.cars, $scope.filters);
            hightChartCreatorModule.setChart($scope.options, selectedSeries.dealerId);
            $scope.$apply();
          }
        }
      }
      $scope.options = options;

    });
    highchartsNG.ready(function () {
      hightChartCreatorModule.overrideHightChart();
    }, this);
  }
}

DealerCtrl.$inject = ['$scope', 'highchartsNG', 'dealerService'];

export default DealerCtrl;

