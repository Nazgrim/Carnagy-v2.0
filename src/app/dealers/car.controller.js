'use strict';
class CarCtrl {
    constructor($scope, carService, carId, stockCarId, highchartsNG) {
        console.log(carId);
        console.log(stockCarId);
        $scope.carId = carId;
        $scope.stockCarId = stockCarId;
        carService.getInformationById($scope.carId)
            .$promise
            .then(function (carInformation) {
                $scope.carInformation = carInformation;
            });

        $scope.$on('selectSeriesUp', function (event, data) {
            console.log('on');
            console.log('broadcast');
            $scope.$broadcast('selectSeriesDown', data);
        });
    }
}

CarCtrl.$inject = ['$scope', 'carService', 'carId', 'stockCarId', 'highchartsNG'];

export default CarCtrl;