angular
    .module("carModule", []);
angular
    .module("carModule")
    .service("carService", function ($resource) {
        var baseUrl = 'http://localhost/WepApi/api/dealercar';
        return {
            getInformationById: function (dealerCarId) {
                var DealerCar = $resource(baseUrl + '/information/:delearId', { dealerCarId: '@id' });
                return DealerCar.get({ dealerCarId: 123 });
            },
            getCarById: function (dealerCarId) {
                var DealerCar = $resource(baseUrl + '/:delearId', { dealerCarId: '@id' });
                return DealerCar.get({ dealerCarId: 123 });
            },
            getChartConfig: function ($scope) {
                var DealerCar = $resource(baseUrl + '/chartData/:delearId', { dealerCarId: '@id' });
                return DealerCar.get({ dealerCarId: 123 })
                    .$promise
                    .then(function (chartData) {
                        var xAxisPlotBands = [];
                        var xAxisPlotBandsColors = ['#FCFFC5', '#c4c336', '#CCFFC5', '#4ac336'];
                        chartData.xAxisPlotBands.forEach(function (item, i) {
                            var xAxisPlotBand = {
                                events: {
                                    mouseover: function (e) {
                                        $scope.selectedLegend.currentBandSelected = this.options.chartValue;
                                        $scope.$apply();
                                    },
                                    mouseout: function (e) {
                                        $scope.selectedLegend.currentBandSelected = $scope.selectedLegend.bandSelected;
                                        $scope.$apply();
                                    }
                                },
                                color: xAxisPlotBandsColors[i],
                                from: item.from,
                                to: item.to,
                                chartValue: item.chartValue,
                                label: {
                                    text: '<div><b>' + item.labelBtext + '</b></div><div>' + item.labeltext + '</div>',
                                    align: 'left',
                                    useHTML: true,
                                }
                            };
                            xAxisPlotBands.push(xAxisPlotBand);
                        });
                        var xAxisPlotLinesColors = ['#FF0000', '#00FF00', '#0000FF'];
                        var xAxisplotLines = [];
                        chartData.xAxisPlotLines.forEach(function (item, i) {
                            var xAxisplotLine = {
                                color: xAxisPlotLinesColors[i],
                                width: item.width,
                                value: item.value,
                                label: {
                                    text: item.labelText,
                                    verticalAlign: 'middle',
                                    textAlign: 'center'
                                },
                                zIndex: 5
                            };
                            xAxisplotLines.push(xAxisplotLine);
                        });
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
                                        point: {
                                            events: {
                                                mouseOver: function (e) {
                                                    $scope.selectedLegend.currentSelected = 'series';
                                                    $scope.$apply();
                                                },
                                                mouseOut: function (e) {
                                                    $scope.selectedLegend.currentSelected = $scope.selectedLegend.selected;
                                                    $scope.$apply();
                                                }
                                            }
                                        }
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
                            yAxis: {
                                title: {
                                    text: '',
                                    style: 'display:none'
                                }
                            },
                            xAxis: {
                                type: 'category',
                                plotLines: xAxisplotLines,
                                plotBands: xAxisPlotBands,
                                categories: chartData.xAxisCategories
                            },
                            series: [
                                {
                                    name: 'Market',
                                    type: 'column',
                                    data: chartData.seriesData,
                                    tooltip: {
                                        valueSuffix: ' count'
                                    }
                                }
                            ]
                        };
                    });
            },
            getSimilarCars:function(){
                var DealerCar = $resource(baseUrl + '/similarcars/:delearId', { dealerCarId: '@id' });
                return DealerCar.query({ dealerCarId: 123 });
            }
        };
    })