angular
    .module("carChartModule", ['highcharts-ng'])
    .directive('carChart', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/car-chart/car-chart.html',
            link: function (scope, element, attrs) {
                scope.$on("addToCompareDownEvent", function (event, data) {
                    scope.chartConfig.series.push(data);
                })
                scope.$on("removeToCompareDownEvent", function (event, data) {
                    for (var i = 0; i < scope.chartConfig.series.length; i++) {
                        if (scope.chartConfig.series[i].carId == data) {
                            scope.chartConfig.series.splice(i, 1);
                            break;
                        }
                    }
                })
                scope.chartConfig = getchartConfig();
                scope.chartConfig.series = [scope.car.chartSeries];
            }
        }
        function getchartConfig() {
            return {
                options: {
                    chart: {
                        type: 'line',
                        height: 300
                    },
                    legend: {
                        enabled: false
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
    })