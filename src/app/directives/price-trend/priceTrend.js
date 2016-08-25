angular
    .module("priceTrendModule", ['carModule'])
    .directive('priceTrend', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/price-trend/price-trend.html',
            controller: ['$scope', 'carService', function ($scope, carService) {
                carService.getPriceTrend().then(function (result) {
                    $scope.chartConfig1 = result;
                });
            }]
        }
    })