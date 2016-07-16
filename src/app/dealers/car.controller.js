'use strict';
class CarCtrl {
    constructor($scope, carService, id) {
        $scope.car = carService.getCarById(id);
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

CarCtrl.$inject = ['$scope', 'carService', 'id'];

export default CarCtrl;