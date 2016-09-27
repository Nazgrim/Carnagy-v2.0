angular
    .module("priceTrendModule", ['carModule'])
    .directive('priceTrend', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/price-trend/price-trend.html',
            controller: function ($scope, carService) {
                carService.getPriceTrend($scope.stockCarId).then(function (result) {
                    $scope.chartConfig1 = result;
                });
            }
        }
    })