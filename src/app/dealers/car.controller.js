'use strict';
class CarCtrl {
    constructor($scope, carService, carId, stockCarId ,highchartsNG) {
        console.log(carId);
        console.log(stockCarId);
        $scope.carId=carId;
        $scope.stockCarId=stockCarId;
        carService.getInformationById($scope.carId)
            .$promise
            .then(function (carInformation) {
                $scope.carInformation = carInformation;
            });
        $scope.$on("addToCompareUpEvent", function (event, data) {
            console.log("вверх");
            //$scope.$broadcast('addToCompareDownEvent', data);
            $scope.chartConfig1.series.push(data);
        });
        $scope.$on("removeToCompareUpEvent", function (event, data) {
            console.log("вверх");
            for (var i = 0; i < $scope.chartConfig1.series.length; i++) {
                if ($scope.chartConfig1.series[i].carId == data) {
                    $scope.chartConfig1.series.splice(i, 1);
                    break;
                }
            }
            //$scope.$broadcast('removeToCompareDownEvent', data);
        });
    }
}

CarCtrl.$inject = ['$scope', 'carService', 'carId', 'stockCarId', 'highchartsNG'];

export default CarCtrl;