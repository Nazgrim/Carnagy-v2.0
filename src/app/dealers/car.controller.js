'use strict';
class CarCtrl {
    constructor($scope, highchartsNG) {
        $scope.cars = [
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
        $scope.$on("addToCompareUpEvent", function (event, data) {
            console.log("вверх");
            $scope.$broadcast('addToCompareDownEvent', data);
        });
        $scope.$on("removeToCompareUpEvent", function (event, data) {
            console.log("вверх");
            $scope.$broadcast('removeToCompareDownEvent', data);
        });
    }
}

CarCtrl.$inject = ['$scope', 'highchartsNG'];

export default CarCtrl;