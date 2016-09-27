angular
    .module("dealerCompetitorsModule", ['carModule'])
    .directive('dealerCompetitors', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/dealer-competitors/dealer-competitors.html',
            controller: ['$scope', 'carService', function ($scope, carService) {
                carService
                $scope.dealers = carService.getDealerCompetitors($scope.stockCarId).$promise.then(function (dealerCompetitors) {
                    $scope.dealers = dealerCompetitors;
                });
                $scope.showDetailed = function (dealer) {
                    if (dealer.isDetailed)
                        dealer.isDetailed = false;
                    else
                        dealer.isDetailed = true;
                };
            }]
        }
    })