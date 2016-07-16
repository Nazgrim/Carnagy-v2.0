angular
  .module("similarCarModule", [])
  .directive('similarCar', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/directives/similar-car/similar-car.html',
      link: function (scope, element, attrs) {
        scope.cars = scope.car.similarCars;
        scope.remove = function (car) {
          for (var i = 0; i < scope.cars.length; i++) {
            if (scope.cars[i].id == car.id) {
              if (car.isAdd) {
                scope.removeToCompare(car);
              }
              scope.cars[i] = { isEmpty: true, order: i };
              break;
            }
          }
        }
        scope.add = function (car) {

        }
        scope.removeToCompare = function (car) {
          car.isAdd = false;
          scope.$emit("removeToCompareUpEvent", car.id);
        };
        scope.addToCompare = function (car) {
          car.isAdd = true;
          scope.$emit("addToCompareUpEvent", car.chartSeries);

        }
      }
    };
  });