angular
  .module("similarCarModule", [])
  .directive('similarCar', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/directives/similar-car/similar-car.html',
    };
  });;