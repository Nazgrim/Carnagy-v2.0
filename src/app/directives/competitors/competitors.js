angular
    .module("competitorsModule", [])
    .directive('competitors', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/competitors/competitors.html',
            controller: ['$scope', 'dealerService', function ($scope, dealerService) {
                $scope.dealers = dealerService.getCompetitors($scope.dealerId, $scope.car.carId);
            }]
        }
    })