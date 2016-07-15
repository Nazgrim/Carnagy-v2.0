angular
  .module("similarCarModule", [])
  .directive('similarCar', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/directives/similar-car/similar-car.html',
      link: function (scope, element, attrs) {
        scope.removeToCompare = function (car, index) {
          car.isAdd = false;
          scope.$emit("removeToCompareUpEvent", index);
        };
        scope.addToCompare = function (car, index) {
          car.isAdd = true;
          var data;
          switch (index) {
            case 0:
              data = {
                name: 'Car 1',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
              };
              break;
            case 1:
              data = {
                name: 'Car 2',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
              };
              break;
            case 2:
              data = {
                name: 'Car 3',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
              }
              break;
          }
          scope.$emit("addToCompareUpEvent", data);
          
        }
      }
    };
  });;