angular
    .module("dealerCompetitorsModule", ['ui.bootstrap', 'carModule', 'errSrcModule'])
    .directive('dealerCompetitors', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/dealer-competitors/dealer-competitors.html',
            controller: ['$scope', 'carService', function ($scope, carService) {
                $scope.filteredCars = [];
                $scope.cars = [];
                $scope.maxSize = 5;
                $scope.numPerPage = 5;
                carService.getDealerCompetitors($scope.stockCarId)
                    .$promise
                    .then(function (dealerCars) {
                        dealerCars.forEach(function (car) {
                            car.imagePath = "http://localhost/WepApi/image/cars/" + car.id + ".jpg";
                        })
                        $scope.totalItems = dealerCars.length;
                        $scope.cars = dealerCars;
                        $scope.currentPage = 1;

                    });
                $scope.$watch('currentPage + numPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;
                    $scope.filteredCars = $scope.cars.slice(begin, end);
                });
            }]
        }
    })