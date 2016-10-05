'use strict';
function unique(value, index, self) {
  return self.indexOf(value) === index;
}

class DealerCtrl {
  constructor($scope, highchartsNG, dealerService) {
    dealerService.getDealerById().then(function (dealerCars) {
      var categories = dealerService.getCategories();
      var cars = dealerCars;
      $scope.years = cars
        .map(c => c.year)
        .filter(unique);

      $scope.makes = cars
        .map(c => c.make)
        .filter(unique);

      $scope.models = cars
        .map(c => c.model)
        .filter(unique);

      $scope.bodyTypes = cars
        .map(c => c.bodyType)
        .filter(unique);

      $scope.styleTrims = cars
        .map(c => c.styleTrim)
        .filter(unique);

      $scope.drivetrains = cars
        .map(c => c.drivetrain)
        .filter(unique);

      $scope.toogleGropPanel = function (flag) {
        $scope.groupPanel = flag;
      };
      $scope.deleteFilters = [];
      $scope.categoryList = [{ name: "All", id: 0 }];
      $scope.currentCategory = 0;
      $scope.filters = dealerService.getFilters();
      $scope.cars = function () {
        return cars.filter(function (c) {
          if ($scope.selectedYear && c.year !== $scope.selectedYear) return false;
          if ($scope.selectedMake && c.make !== $scope.selectedMake) return false;
          if ($scope.selectedModel && c.model !== $scope.selectedModel) return false;
          if ($scope.selectedBodyType && c.bodyType !== $scope.selectedBodyType) return false;
          if ($scope.selectedDrivetrain && c.drivetrain !== $scope.selectedDrivetrain) return false;
          if ($scope.selectedStyleTrim && c.styleTrim !== $scope.selectedStyleTrim) return false;
          return true;
        });
      }
      $scope.groups = garajModule.createGropus($scope.cars(), $scope.filters);
      $scope.$watchGroup([
        'selectedYear',
        'selectedMake',
        'selectedModel',
        'selectedBodyType',
        'selectedDrivetrain',
        'selectedStyleTrim'],
        function () {
          console.log(231);
          $scope.groups = garajModule.createGropus($scope.cars(), $scope.filters);
        });
      $scope.closeFilter = function (index) {
        if ($scope.filters.length == 1) return

        var currentDeleteFilter = $scope.filters.splice(index, 1)[0];
        $scope.groups = garajModule.createGropus($scope.cars(), $scope.filters);
        $scope.deleteFilters.push(currentDeleteFilter);
        $scope.currentDeleteFilter = currentDeleteFilter;
      };
      $scope.addFilter = function () {
        $scope.filters.push($scope.currentDeleteFilter);
        $scope.groups = garajModule.createGropus($scope.cars(), $scope.filters);
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
            $scope.groups = garajModule.createGropus($scope.cars(), $scope.filters);
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
            $scope.groups = garajModule.createGropus($scope.cars(), $scope.filters);
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

