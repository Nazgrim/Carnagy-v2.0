'use strict';
class CarCtrl {
    constructor($scope, carService, id, highchartsNG) {
        $scope.carInformation=carService.getInformationById();
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

CarCtrl.$inject = ['$scope', 'carService', 'id', 'highchartsNG'];

export default CarCtrl;