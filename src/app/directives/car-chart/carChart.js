angular
    .module("carChartModule", ['highcharts-ng'])
    .directive('carChart', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/car-chart/car-chart.html',
            controller: function ($scope) {
                $scope.chartConfig = getchartConfig1();
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
                })
            },
            // link: function (scope, element, attrs) {


            // }
        }
        function getchartConfig1() {
            return {
                "options": {
                    plotOptions: {
                        bar: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                allowOverlap: true,
                            }
                        },
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    chart: {
                        type: 'column',
                        height: 300
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    // plotOptions: {
                    //     column: {
                    //         states: {
                    //             hover: {
                    //                 color: '#000000'
                    //             }
                    //         }
                    //     },
                    //     series: {
                    //         allowPointSelect: true,
                    //         cursor: 'pointer',
                    //         point: {
                    //             events: {
                    //                 click: function () {
                    //                     $("#selectedSeries").text('Category: ' + this.category + ', value: ' + this.y);
                    //                 },
                    //                 mouseOver: function () {
                    //                     $("#focusedSeries").text('Category: ' + this.category + ', value: ' + this.y);
                    //                 },
                    //                 mouseOut: function () {
                    //                     $("#focusedSeries").text('');
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                series: [
                    {
                        name: 'Market',
                        type: 'column',
                        data: [
                            { x: 0, "y": 49.9 },
                            { x: 1, "y": 71.5 },
                            { x: 2, "y": 106.4 },
                            { x: 3, "y": 129.2 },
                            { x: 4, "y": 144 },
                            { x: 5, "y": 176 },
                            { x: 6, "y": 135.6, color: "#00ff00" },
                            { x: 7, "y": 148.5 },
                            { x: 8, "y": 216.4 },
                            { x: 9, "y": 194.1 },
                            { x: 10, "y": 95.6 },
                            { x: 11, "y": 54.4 }
                        ],
                        tooltip: {
                            valueSuffix: ' count'
                        }
                        // ,
                        // zoneAxis: 'x',
                        // zones: [{
                        //     value: 2.5,
                        //     color: '#f7a35c'
                        // }, {
                        //         value: 5,
                        //         color: '#7cb5ec'
                        //     }, {
                        //         value: 10,
                        //         color: '#90ed7d'
                        //     }, {
                        //         color: '#f7a35c'
                        //     }]
                    }
                    //Variant 2
                    ,
                    {
                        name: 'Delaer',
                        type: 'column',
                        color: '#ff0000',
                        data:
                        [
                            { x: 6, "y": 135.6 }
                        ]
                    }
                ],
                yAxis: {
                    title: {
                        text: '',
                        style: 'display:none'
                    }
                },
                xAxis: {

                    type: 'category',
                    categories: [
                        '12.200 $',
                        '13.200 $',
                        '14.200 $',
                        '15.200 $',
                        '16.200 $',
                        '17.200 $',
                        '18.200 $',
                        '19.200 $',
                        '20.200 $',
                        '21.200 $',
                        '22.200 $',
                        '23.200 $'
                    ]
                },
                subtitle: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }

            };
        }
    })