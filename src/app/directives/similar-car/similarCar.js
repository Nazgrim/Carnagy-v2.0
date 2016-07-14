angular
  .module("similarCarModule", [])
  .directive('similarCar', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/directives/similar-car/similar-car.html',
      link: function (scope, element, attrs) {
        scope.cars = [
          {
            name: "Car 1",
            imgUrl: "../app/img/car1.png",
            maker: "Audi",
            model: "TT",
            drivetrain: "RWD",
            price: 21000,
          }, {
            name: "Car 2",
            imgUrl: "../app/img/car2.png",
            maker: "Audi",
            model: "TT",
            drivetrain: "RWD",
            price: 21000,
          }, {
            name: "Car 3",
            imgUrl: "../app/img/car3.png",
            maker: "Audi",
            model: "TT",
            drivetrain: "RWD",
            price: 21000,
          }
        ];
      }
    };
  });;