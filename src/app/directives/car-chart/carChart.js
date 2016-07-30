angular
    .module("carChartModule", ['highcharts-ng'])
    .directive('carChart', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/car-chart/car-chart.html',
            controller: function ($scope) {

                var chartConfig = getchartConfig1();
                chartConfig.xAxis.plotBands = [
                    {
                        chartValue: 'below',
                        color: '#FCFFC5',
                        from: -1.5,
                        to: 1.5,
                        label: {
                            text: '<div><b>Exceptional Price</b></div><div>Less than 16,200$</div>',
                            align: 'left',
                            useHTML: true,
                        },
                        events: {
                            mouseover: function (e) {
                                $scope.selectedLegend.currentBandSelected = this.options.chartValue;
                                $scope.$apply();
                            },
                            mouseout: function (e) {
                                $scope.selectedLegend.currentBandSelected = $scope.selectedLegend.bandSelected;
                                $scope.$apply();
                            }
                        }
                    }, {
                        chartValue: 'great',
                        color: '#c4c336',
                        from: 1.5,
                        to: 4.5,
                        label: {
                            text: '<div><b>Great Price</b></div><div>Less than 21,200$</div>',
                            align: 'left',
                            useHTML: true,
                        },
                        events: {
                            mouseover: function (e) {
                                $scope.selectedLegend.currentBandSelected = this.options.chartValue;
                                $scope.$apply();
                            },
                            mouseout: function (e) {
                                $scope.selectedLegend.currentBandSelected = $scope.selectedLegend.bandSelected;
                                $scope.$apply();
                            }
                        }
                    }, {
                        chartValue: 'good',
                        color: '#CCFFC5',
                        from: 4.5,
                        to: 7.5,
                        label: {
                            text: '<div><b>Good price</b></div><div>Less than 21,200$</div>',
                            align: 'left',
                            useHTML: true,
                        },
                        events: {
                            mouseover: function (e) {
                                $scope.selectedLegend.currentBandSelected = this.options.chartValue;
                                $scope.$apply();
                            },
                            mouseout: function (e) {
                                $scope.selectedLegend.currentBandSelected = $scope.selectedLegend.bandSelected;
                                $scope.$apply();
                            }
                        }
                    }, {
                        chartValue: 'above',
                        color: '#4ac336',
                        from: 7.5,
                        to: 11.5,
                        label: {
                            text: '<div><b>Above Market</b></div><div>Less than 21,200$ or more</div>',
                            align: 'left',
                            useHTML: true,
                        },
                        events: {
                            mouseover: function (e) {
                                $scope.selectedLegend.currentBandSelected = this.options.chartValue;
                                $scope.$apply();
                            },
                            mouseout: function (e) {
                                $scope.selectedLegend.currentBandSelected = $scope.selectedLegend.bandSelected;
                                $scope.$apply();
                            }
                        }
                    },
                ];

                chartConfig.options.plotOptions.series.point = {
                    events: {
                        mouseOver: function (e) {
                            //e.stopPropagation();
                            $scope.selectedLegend.currentSelected = 'series';
                            $scope.$apply();
                        },
                        mouseOut: function (e) {
                            //e.stopPropagation();
                            $scope.selectedLegend.currentSelected = $scope.selectedLegend.selected;
                            $scope.$apply();
                        }
                    }
                };
                chartConfig.series = [
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
                            {
                                x: 6,
                                y: 150

                            },
                            { x: 7, "y": 148.5 },
                            { x: 8, "y": 216.4 },
                            { x: 9, "y": 194.1 },
                            { x: 10, "y": 95.6 },
                            { x: 11, "y": 54.4 }
                        ],
                        tooltip: {
                            valueSuffix: ' count'
                        }
                    }
                ];
                $scope.chartConfig = chartConfig;
                //{ x: 6, "y": 135.6 },
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
        function getchartConfig1() {
            return {
                "options": {
                    plotOptions: {
                        bar: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: false,
                                allowOverlap: false,
                            }
                        },
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: false
                            },
                            allowPointSelect: true,
                            cursor: 'pointer',
                            // point: {
                            //     events: {
                            //         click: function () {
                            //             $("#selectedSeries").text('Category: ' + this.category + ', value: ' + this.y);
                            //         },
                            //         mouseOver: function () {
                            //             $("#focusedSeries").text('Category: ' + this.category + ', value: ' + this.y);
                            //         },
                            //         mouseOut: function () {
                            //             $("#focusedSeries").text('');
                            //         }
                            //     }
                            // }
                        },
                        column: {
                            states: {
                                hover: {
                                    color: '#000000'
                                }
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

                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                series: [],
                yAxis: {
                    title: {
                        text: '',
                        style: 'display:none'
                    }
                },
                xAxis: {
                    plotLines: [
                        {
                            color: '#FF0000',
                            width: 2,
                            value: 5.5,
                            label: {
                                text: 'Your price',
                                verticalAlign: 'middle',
                                textAlign: 'center'
                            },
                            zIndex: 5
                        },
                        {
                            color: '#00FF00',
                            width: 2,
                            value: 5.0,
                            label: {
                                text: 'Avr. price',
                                verticalAlign: 'middle',
                                textAlign: 'center'
                            },
                            zIndex: 5
                        },
                        {
                            color: '#0000FF',
                            width: 2,
                            value: 0.5,
                            label: {
                                text: 'MSRP price',
                                verticalAlign: 'middle',
                                textAlign: 'center'
                            },
                            zIndex: 5
                        }
                    ],

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