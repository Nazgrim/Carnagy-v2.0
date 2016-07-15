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
                scope.$on("addToCompareDownEvent", function (event, data) {
                    scope.chartConfig.series.push(data);
                })
                var series = [];
                var dealer = {
                    name: 'Dealer',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                };

                series.push(dealer);
                scope.chartConfig = {
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
                    series: series
                };
            }
        }
    })