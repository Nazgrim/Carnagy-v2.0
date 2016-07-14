'use strict';
class CarCtrl {
    constructor($scope, highchartsNG) {
        $scope.car = {
            price: 60000,
            marketPrice: 70000,
            different: 10000
        };
    }
}

CarCtrl.$inject = ['$scope', 'highchartsNG'];

export default CarCtrl;