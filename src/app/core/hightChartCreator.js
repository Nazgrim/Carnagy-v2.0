// $(function () {
//     (function (H) {

//         var each = H.each,
//             pick = H.pick,
//             mathAbs = Math.abs,
//             mathMax = Math.max,
//             mathMin = Math.min,
//             mathCeil = Math.ceil;

//         H.wrap(Highcharts.seriesTypes.column.prototype, 'getColumnMetrics', function (proceed, pointX) {
//             var series = this,
//                 options = series.options,
//                 xAxis = series.xAxis,
//                 yAxis = series.yAxis,
//                 reversedXAxis = xAxis.reversed,
//                 stackKey,
//                 stackGroups = {},
//                 columnIndex,
//                 columnCount = 0;

//             // Get the total number of column type series.
//             // This is called on every series. Consider moving this logic to a
//             // chart.orderStacks() function and call it on init, addSeries and removeSeries
//             if (options.grouping === false) {
//                 columnCount = 1;
//             } else {
//                 H.each(series.chart.series, function (otherSeries) {
//                     var otherOptions = otherSeries.options,
//                         otherYAxis = otherSeries.yAxis;
//                     if (otherSeries.type === series.type && otherSeries.visible &&
//                         yAxis.len === otherYAxis.len && yAxis.pos === otherYAxis.pos) {

//                         var hasPointInX = false;
//                         H.each(otherSeries.userOptions.data, function (point) {
//                             if (point[0] === pointX) hasPointInX = true;
//                         });
//                         if (hasPointInX) {

//                             // #642, #2086
//                             if (otherOptions.stacking) {
//                                 stackKey = otherSeries.stackKey;
//                                 if (stackGroups[stackKey] === UNDEFINED) {
//                                     stackGroups[stackKey] = columnCount++;
//                                 }
//                                 columnIndex = stackGroups[stackKey];
//                             } else if (otherOptions.grouping !== false) { // #1162
//                                 columnIndex = columnCount++;
//                             }
//                             otherSeries.columnIndex = columnIndex;
//                         }
//                     }
//                 });
//             }

//             var categoryWidth = mathMin(
//                 mathAbs(xAxis.transA) * (xAxis.ordinalSlope || options.pointRange || xAxis.closestPointRange || xAxis.tickInterval || 1), // #2610
//                 xAxis.len // #1535
//             ),
//                 groupPadding = categoryWidth * options.groupPadding,
//                 groupWidth = categoryWidth - 2 * groupPadding,
//                 pointOffsetWidth = groupWidth / columnCount,
//                 pointWidth = mathMin(
//                     options.maxPointWidth || xAxis.len,
//                     pick(options.pointWidth, pointOffsetWidth * (1 - 2 * options.pointPadding))
//                 ),
//                 pointPadding = (pointOffsetWidth - pointWidth) / 2,
//                 colIndex = (reversedXAxis ?
//                     columnCount - (series.columnIndex || 0) : // #1251
//                     series.columnIndex) || 0,
//                 pointXOffset = pointPadding + (groupPadding + colIndex *
//                     pointOffsetWidth - (categoryWidth / 2)) *
//                     (reversedXAxis ? -1 : 1);

//             // Save it for reading in linked series (Error bars particularly)
//             return (series.columnMetrics = {
//                 width: pointWidth,
//                 offset: pointXOffset
//             });
//         });


//         H.wrap(Highcharts.seriesTypes.column.prototype, 'translate', function (proceed) {
//             var series = this,
//                 chart = series.chart,
//                 options = series.options,
//                 borderWidth = series.borderWidth = pick(
//                     options.borderWidth,
//                     series.closestPointRange * series.xAxis.transA < 2 ? 0 : 1 // #3635
//                 ),
//                 yAxis = series.yAxis,
//                 threshold = options.threshold,
//                 translatedThreshold = series.translatedThreshold = yAxis.getThreshold(threshold),
//                 minPointLength = pick(options.minPointLength, 5),
//                 metrics, // = series.getColumnMetrics(1),
//                 pointWidth, // = metrics.width,
//                 seriesBarW, // = series.barW = mathMax(pointWidth, 1 + 2 * borderWidth), // postprocessed for border width
//                 pointXOffset; // = series.pointXOffset = metrics.offset;

//             if (chart.inverted) {
//                 translatedThreshold -= 0.5; // #3355
//             }

//             H.Series.prototype.translate.apply(series);

//             // Record the new values
//             each(series.points, function (point) {
//                 metrics = series.getColumnMetrics(point.x);
//                 pointWidth = metrics.width;
//                 seriesBarW = series.barW = mathMax(pointWidth, 1 + 2 * borderWidth); // postprocessed for border width
//                 pointXOffset = series.pointXOffset = metrics.offset;

//                 var yBottom = mathMin(pick(point.yBottom, translatedThreshold), 9e4), // #3575
//                     safeDistance = 999 + mathAbs(yBottom),
//                     plotY = mathMin(mathMax(-safeDistance, point.plotY), yAxis.len + safeDistance), // Don't draw too far outside plot area (#1303, #2241, #4264)
//                     barX = point.plotX + pointXOffset,
//                     barW = seriesBarW,
//                     barY = mathMin(plotY, yBottom),
//                     up,
//                     barH = mathMax(plotY, yBottom) - barY;

//                 // When the pointPadding is 0, we want the columns to be packed tightly, so we allow individual
//                 // columns to have individual sizes. When pointPadding is greater, we strive for equal-width
//                 // columns (#2694).
//                 if (options.pointPadding) {
//                     seriesBarW = mathCeil(seriesBarW);
//                 }

//                 // Handle options.minPointLength
//                 if (mathAbs(barH) < minPointLength) {
//                     if (minPointLength) {
//                         barH = minPointLength;
//                         up = (!yAxis.reversed && !point.negative) || (yAxis.reversed && point.negative);
//                         barY = mathAbs(barY - translatedThreshold) > minPointLength ? // stacked
//                             yBottom - minPointLength : // keep position
//                             translatedThreshold - (up ? minPointLength : 0); // #1485, #4051
//                     }
//                 }

//                 // Cache for access in polar
//                 point.barX = barX;
//                 point.pointWidth = pointWidth;

//                 // Fix the tooltip on center of grouped columns (#1216, #424, #3648)
//                 point.tooltipPos = chart.inverted ? [yAxis.len + yAxis.pos - chart.plotLeft - plotY, series.xAxis.len - barX - barW / 2, barH] : [barX + barW / 2, plotY + yAxis.pos - chart.plotTop, barH];

//                 // Register shape type and arguments to be used in drawPoints
//                 point.shapeType = 'rect';
//                 point.shapeArgs = series.crispCol(barX, barY, barW, barH);
//             });
//         });
//     } (Highcharts));
// });
var hightChartCreatorModule = (function () {
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
                category: { id: 2, name: "Encore" },
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
                "name": "Dealer",
                "y": 50,
                "drilldown": "Enclave"
            }, {
                    "name": "Dealer",
                    "y": 50
                }, {
                    "name": "Dealer",
                    "y": 50
                }, {
                    "name": "Dealer",
                    "y": 50
                }, {
                    "name": "Dealer",
                    "y": 50
                }],
            "color": "#FF0000"
        }];
    var series2 = [
        {
            "name": "Enclave1",
            "data": [{
                "y": 51,
                "name": "Enclave1",
                "drilldown": "Enclave",
                "x": 0
            }]
        }, {
            "name": "Encore1",
            "data": [{
                "y": 49,
                "name": "Encore1",
                "x": 1
            }]
        }, {
            "name": "LaCrosse1",
            "data": [{
                "y": 52,
                "name": "LaCrosse1",
                "x": 2
            }]
        }, {
            "name": "Regal1",
            "data": [{
                "y": 52,
                "name": "Regal1",
                "x": 3
            }]
        }, {
            "name": "Verano1",
            "data": [{
                "y": 52,
                "name": "Verano1",
                "x": 4
            }]
        }, {
            "name": "Dealer1",
            "data": [{
                "y": 50,
                "drilldown": "Enclave1"
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

    var test123 = {
        "options": {
            chart: {
                type: "column",

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
            }, series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }

        },
        series: series.slice(0)
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
        getSeries1: function () {
            return [
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
                category: { id: 2, name: "Encore" },
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
                "name": "Dealer",
                "y": 50,
                "drilldown": "Enclave"
            }, {
                    "name": "Dealer",
                    "y": 50
                }, {
                    "name": "Dealer",
                    "y": 50
                }, {
                    "name": "Dealer",
                    "y": 50
                }, {
                    "name": "Dealer",
                    "y": 50
                }],
            "color": "#FF0000"
        }];
        },
        getSeries2: function () {
            return series2.slice(0);
        },
        getCategories: function () {
            return categories;
        },
        getOptions: function (categories, id, category) {

            // categories1=category;
            // var delaerSeris = { name: 'Dealer', data: [] };
            // var series = [];
            // var dealerSeries = { name: 'Dealer', data: [], color: '#FF0000' };
            // categories.forEach(function (category, index) {
            //     if (category.parentId == id) {
            //         //xAxis.categories.push(category.name);
            //         var data = [];
            //         data.push({ y: category.market, name: category.name, drilldown: category.name, x: index });
            //         dealerSeries.data.push({ y: category.dealer, drilldown: category.name });
            //         series.push({ name: category.name, data: data });
            //     }
            // });
            //series.push(dealerSeries);
            //test123.xAxis = xAxis;
            //test123.series = series;
            return test123;
        }
    }
} ());

