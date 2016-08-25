angular
    .module("dealerCompetitorsModule", ['carModule'])
    .directive('dealerCompetitors', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/dealer-competitors/dealer-competitors.html',
            controller: ['$scope', 'carService', function ($scope, carService) {
                carService
                $scope.dealers = carService.getDealerCompetitors().$promise.then(function (dealerCompetitors) {
                    $scope.dealers = dealerCompetitors;
                });
            }]
        }
    })