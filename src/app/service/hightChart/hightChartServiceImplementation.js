var hightChartService = function () {
    var categories1;
    var series = [
        {
            "name": "Enclave",
            "data": [{
                "y": 51,
                "name": "Enclave",
                "drilldown": "Enclave",
                "x": 0
            }]
        }, {
            "name": "Encore",
            "data": [{
                "y": 49,
                "name": "Encore",
                "x": 1
            }]
        }, {
            "name": "LaCrosse",
            "data": [{
                "y": 52,
                "name": "LaCrosse",
                "x": 2
            }]
        }, {
            "name": "Regal",
            "data": [{
                "y": 52,
                "name": "Regal",
                "x": 3
            }]
        }, {
            "name": "Verano",
            "data": [{
                "y": 52,
                "name": "Verano",
                "x": 4
            }]
        }, {
            "name": "Dealer",
            "data": [{
                "y": 50,
                "drilldown": "Enclave"
            }, {
                    "y": 50
                }, {
                    "y": 50
                }, {
                    "y": 50
                }, {
                    "y": 50
                }],
            "color": "#FF0000"
        }];
    var series2 = [
        {
            "name": "Enclave1",
            "data": [{
                "y": 51,
                "name": "Enclave",
                "drilldown": "Enclave",
                "x": 0
            }]
        }, {
            "name": "Encore1",
            "data": [{
                "y": 49,
                "name": "Encore",
                "x": 1
            }]
        }, {
            "name": "LaCrosse1",
            "data": [{
                "y": 52,
                "name": "LaCrosse",
                "x": 2
            }]
        }, {
            "name": "Regal1",
            "data": [{
                "y": 52,
                "name": "Regal",
                "x": 3
            }]
        }, {
            "name": "Verano1",
            "data": [{
                "y": 52,
                "name": "Verano",
                "x": 4
            }]
        }, {
            "name": "Dealer1",
            "data": [{
                "y": 50,
                "drilldown": "Enclave"
            }, {
                    "y": 50
                }, {
                    "y": 50
                }, {
                    "y": 50
                }, {
                    "y": 50
                }],
            "color": "#FF0000"
        }];
    var drilldown = {
        "series": [{
            id: 'Enclave',
            "name": "Enclave",
            data: [{
                name: 'Enclave01',
                y: 4,
                drilldown: 'Enclave1'
            }]
        }, {
                id: 'Enclave',
                "name": "Enclave2",
                data: [{
                    name: 'Enclave02',
                    y: 6,
                    drilldown: 'Enclave1'
                }]
            }, {
                id: 'Enclave1',
                "name": "Enclave1",
                data: [{
                    name: 'East',
                    y: 41,
                    drilldown: 'Enclave2'
                },
                    ['West', 21],
                    ['North', 11],
                    ['South', 41]
                ]
            }, {
                id: 'Enclave2',
                "name": "Enclave2",
                data: [{
                    name: 'East',
                    y: 412
                },
                    ['West', 212],
                    ['North', 112],
                    ['South', 412]
                ]
            }]
    };
    function setChart(chart) {
        categories1.value = 2;
        var len = chart.series.length;
        //chart.xAxis[0].setCategories(categories);
        for (var i = 0; i < len; i++) {
            console.log(chart.series.length);
            chart.series[0].remove();
        }
        for (var i = 0; i < series2.length; i++) {
            chart.addSeries(series2[i]);
        }

    }
    var test123 = {
        "options": {
            chart: {
                type: "column",
                events: {
                    drilldown: function (e) {
                        setChart(this);
                    }
                }
            },
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
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }

            }
        },
        chart: {
            type: 'column',
            zoomType: 'x'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            type: 'category'
        },
        // xAxis: {
        //     minRange: 0.1,
        //     categories: [
        //         'Jan',
        //         'Feb',
        //         'Mar'
        //     ],
        //     crosshair: true
        // },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            enabled: false,
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
        // series: [],
        // drilldown: {
        //     series:
        //     [
        //         {
        //             id: 'Enclave',
        //             data:
        //             [
        //                 { "name": "Enclave", "data": [[0, 21]] },
        //                 { "name": "Encore", "data": [[1, 29]] },
        //                 { "name": "LaCrosse", "data": [[2, 22]] },
        //                 { "name": "Regal", "data": [[3, 22]] },
        //                 { "name": "Verano", "data": [[4, 22]] },
        //                 { "name": "Dealer", "data": [[0, 20], [1, 20], [2, 20], [3, 20], [4, 20]], "color": "#FF0000" }
        //             ]
        //         }
        //     ]
        // }
    }


    var xAxis = {
        minRange: 0.1,
        categories: [],
        crosshair: true
    };

    return {

        getCategories: function () {
            return categories;
        },
        getOprtions: function (categories, id, category) {
            categories1=category;
            var delaerSeris = { name: 'Dealer', data: [] };
            var series = [];
            var dealerSeries = { name: 'Dealer', data: [], color: '#FF0000' };
            categories.forEach(function (category, index) {
                if (category.parentId == id) {
                    //xAxis.categories.push(category.name);
                    var data = [];
                    data.push({ y: category.market, name: category.name, drilldown: category.name, x: index });
                    dealerSeries.data.push({ y: category.dealer, drilldown: category.name });
                    series.push({ name: category.name, data: data });
                }
            });
            //series.push(dealerSeries);
            //test123.xAxis = xAxis;
            //test123.series = series;
            return test123;
        }
    }
};