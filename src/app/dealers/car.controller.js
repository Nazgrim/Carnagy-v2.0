'use strict';
class CarCtrl {
    constructor($scope, carService, id, highchartsNG) {
        $scope.car = carService.getCarById(id);
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
        $scope.chartConfig1 = getPriceTrendChart();

        function getPriceTrendChart() {
            return {
                options: {
                    chart: {
                        type: 'line',
                        height: 300
                    },
                    legend: {
                        enabled: true
                    },
                    exporting: {
                        enabled: false
                    }
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                subtitle: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                series: [
                    {
                        name: 'Ford Fusion',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    }
                ],
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: '',
                        style: {
                            display: 'none'
                        }
                    }
                },

            };
        }
    }
}

CarCtrl.$inject = ['$scope', 'carService', 'id', 'highchartsNG'];

export default CarCtrl;