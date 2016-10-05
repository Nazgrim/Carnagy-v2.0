angular
    .module("carModule", []);
angular
    .module("carModule")
    .service("carService", function ($resource) {
        var baseUrl = 'http://localhost/WepApi/api/dealercar';
        function getXaxisPlotLines(msrpPrice, avrPrice, dealerPrice) {
            return [
                {
                    value: msrpPrice,
                    width: 2,
                    color: '#FF0000',
                    label: {
                        text: 'MSRP price',
                        verticalAlign: 'middle',
                        textAlign: 'center'
                    },
                    zIndex: 5
                },
                {
                    value: avrPrice,
                    width: 2,
                    color: '#00FF00',
                    label: {
                        text: 'Avr. price',
                        verticalAlign: 'middle',
                        textAlign: 'center'
                    },
                    zIndex: 5
                },
                {
                    value: dealerPrice,
                    width: 2,
                    color: '#0000FF',
                    label: {
                        text: 'Your price',
                        verticalAlign: 'middle',
                        textAlign: 'center'
                    },
                    zIndex: 5
                }
            ]
        }
        function getXaxisPlotBands(seriesDataLength, $scope, min, max) {
            var xAxisPlotBands = [];
            var xAxisPlotBandsDefault = [
                {
                    chartValue: 'below',
                    labelBtext: 'Exceptional Price',
                    color: '#FCFFC5',
                },
                {
                    chartValue: 'great',
                    labelBtext: 'Great Price',
                    color: '#c4c336',
                },
                {
                    chartValue: 'good',
                    labelBtext: 'Good price',
                    color: '#CCFFC5',
                },
                {
                    chartValue: 'above',
                    labelBtext: 'Above Market',
                    color: '#4ac336'
                },
            ];
            var from = min;
            var step = Math.round((max - min) / xAxisPlotBandsDefault.length);
            for (var i = 0; i < xAxisPlotBandsDefault.length; i++) {
                var to = from + step;
                var xAxisPlotBandDefault = xAxisPlotBandsDefault[i];
                var labelText = '<div><b>' + xAxisPlotBandDefault.labelBtext + '</b></div><div>Less than ' + Math.round(to) + '$';
                if (i == xAxisPlotBandsDefault.length - 1) {
                    labelText += ' or more';
                }
                labelText += '</div>';
                xAxisPlotBands.push({
                    from: from,
                    to: to,
                    color: xAxisPlotBandDefault.color,
                    events: {
                        mouseover: function (e) {
                            $scope.selectedLegend.currentBandSelected = this.options.chartValue;
                            $scope.$apply();
                        },
                        mouseout: function (e) {
                            $scope.selectedLegend.currentBandSelected = $scope.selectedLegend.bandSelected;
                            $scope.$apply();
                        },
                    },
                    label: {
                        text: labelText,
                        align: 'left',
                        useHTML: true,
                    }
                });
                from = to;
            }
            return xAxisPlotBands;
        }
        return {
            getInformationById: function (carId) {
                var DealerCar = $resource(baseUrl + '/information?carId=:carId', { carId: '@carId' });
                return DealerCar.get({ carId: carId });
            },
            getChartConfig: function ($scope) {
                var DealerCar = $resource(baseUrl + '/chartData?carId=:carId', { carId: '@carId' });
                return DealerCar.get({ carId: $scope.stockCarId })
                    .$promise
                    .then(function (chartData) {
                        var max = Math.ceil(chartData.max / 1000) * 1000;
                        var min = Math.floor(chartData.min / 1000) * 1000;
                        var step = (max - min) / 20;
                        var xAxisplotLines = getXaxisPlotLines(chartData.msrpPrice, chartData.avrPrice, chartData.dealerPrice);
                        var xAxisPlotBands = getXaxisPlotBands(chartData.seriesData.length, $scope, min, max);

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
                                plotLines: xAxisplotLines,
                                plotBands: xAxisPlotBands,
                                startOnTick: true,
                                minPadding: 0,
                                min: min,
                                max: max,
                                tickInterval: step,
                            },
                            series: [
                                {
                                    name: 'Market',
                                    type: 'column',
                                    data: chartData.seriesData,
                                    tooltip: {
                                        valueSuffix: ' count'
                                    },
                                    pointStart: min,
                                    pointInterval: step,
                                }
                            ]
                        };
                    });
            },
            getSimilarCars: function () {
                var DealerCar = $resource(baseUrl + '/similarcars/:delearId', { dealerCarId: '@id' });
                return DealerCar.query({ dealerCarId: 123 });
            },
            getPriceTrend: function (stockCarId) {
                var DealerCar = $resource(baseUrl + '/chartSeries?stockCarId=:stockCarId', { stockCarId: '@stockCarId' });
                return DealerCar.get({ stockCarId: stockCarId })
                    .$promise
                    .then(function (chartSeries) {
                        var result = {
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
                            series: [{
                                name: chartSeries.name,
                                data: chartSeries.data,
                                carId: chartSeries.carId
                            }],
                            xAxis: { type: 'datetime' },
                            yAxis: {
                                title: {
                                    text: '',
                                    style: {
                                        display: 'none'
                                    }
                                }
                            }
                        };
                        return result;
                    });
            },
            getDealerCompetitors: function (stockCarId) {
                var DealerCar = $resource(baseUrl + '/dealercompetitors?stockCarId=:stockCarId', { stockCarId: '@id' });
                return DealerCar.query({ stockCarId: stockCarId })
            }
        };
    })