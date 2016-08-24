angular
    .module("carChartModule", ['highcharts-ng', 'carModule'])
    .directive('carChart', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/car-chart/car-chart.html',
            controller: function ($scope, carService) {
                $scope.chartConfig = carService.getChartConfig($scope).then(function (result) {
                    $scope.chartConfig = result;
                });
                $scope.$on("addToCompareDownEvent", function (event, data) {
                    $scope.chartConfig.series.push(data);
                })
                $scope.$on("removeToCompareDownEvent", function (event, data) {
                    for (var i = 0; i < $scope.chartConfig.series.length; i++) {
                        if ($scope.chartConfig.series[i].carId == data) {
                            $scope.chartConfig.series.splice(i, 1);
                            break;
                        }
                    }
                });
                $scope.selectedLegend = {
                    selected: "bands",
                    currentSelected: "bands",
                    bandSelected: "below",
                    currentBandSelected: "below",
                    people: 10,
                    from: '$30,936',
                    to: '$31,248'
                };
            }
        }
    })