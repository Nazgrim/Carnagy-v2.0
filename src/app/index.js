'use strict';

import MainCtrl from './main/main.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';
import SidebarCtrl from '../components/sidebar/sidebar.controller';
import DealersCtrl from './dealers/dealers.controller';
import DealerCtrl from './dealers/dealer.controller';
import CarCtrl from './dealers/car.controller';

angular.module('carnagy', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 
'ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps', 'ui.select', 'ngSanitize', 'highcharts-ng', 'hightChartService', 'dealerModule'])
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl)
    .controller('SidebarCtrl', SidebarCtrl)
    .controller('DealersCtrl', DealersCtrl)
    .controller('DealerCtrl', DealerCtrl)
    .controller('CarCtrl', CarCtrl)
    .directive('carGroup', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/cargroup.html',
        };
    })
    .directive('myHightChart', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/myHightChart.html',
            link: function (scope, element, attrs) {
                var categories = garajModule.getCategories();
                function setChart(chart) {
                    var len = chart.series.length;
                    //chart.xAxis[0].setCategories(categories);
                    for (var i = 0; i < len; i++) {
                        console.log(chart.series.length);
                        chart.series[0].remove();
                    }
                    var series2 = hightChartCreatorModule.getSeries2();
                    for (var i = 0; i < series2.length; i++) {
                        chart.addSeries(series2[i]);
                    }
                }
                function setChart2(chart) {
                    var abc2 = hightChartCreatorModule.getSeries1();
                    var len = chart.series.length;
                    chart.series = [];
                    var series1 = hightChartCreatorModule.getSeries1();
                    for (var i = 0; i < series1.length; i++) {
                        chart.series.push(series1[i]);
                    }
                    for (var i = 0; i < len; i++) {
                        console.log(series1[i]);
                    }
                }
                scope.goBack = function (c) {
                    for (var i = scope.categoryList.length - 1; i > -1; i--) {
                        if (scope.categoryList[i].id == c.id) {
                            scope.currentCategory = c.id;
                            scope.cars = garajModule.getDealers(cars, categories, scope.currentCategory);
                            scope.groups = garajModule.createGropus(scope.cars, scope.filters);
                            setChart2(scope.options1);
                            break;
                        }
                        else {
                            scope.categoryList.pop();
                        }
                    }
                }

                var options1 = hightChartCreatorModule.getOprtions(categories, 0);
                options1.options.plotOptions.series.events = {
                    click: function (e) {
                        if (this.data[0].options.category) {
                            scope.currentCategory = this.data[0].options.category.id;
                            scope.categoryList.push(this.data[0].options.category);
                            scope.cars = garajModule.getDealers(cars, categories, scope.currentCategory);
                            scope.groups = garajModule.createGropus(scope.cars, scope.filters);
                            scope.$apply();
                            setChart(this.chart);
                        }

                    }
                }
                scope.options1 = options1;
            }
        };
    })
    .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            })
            .state('car', {
                url: '/car',
                templateUrl: 'app/dealers/car.html',
                controller: 'CarCtrl',
            })
            .state('dealers', {
                url: '/dealers',
                resolve: {
                    dealers: function (dealerService) {
                        return dealerService.getDealers();
                    },
                    provinces: function (dealerService) {
                        return dealerService.getProvinces();
                    }
                },
                templateUrl: 'app/dealers/dealers.html',
                controller: 'DealersCtrl',
            })
            .state('dealer', {
                url: '/dealer/:id',
                resolve: {
                    dealer: function ($stateParams,dealerService) {
                        return dealerService.getDealerById($stateParams.id);
                    },
                },
                templateUrl: 'app/dealers/dealer.html',
                controller: 'DealerCtrl',
            });

        $urlRouterProvider.otherwise('/dealers');
    });
    //import carGroup from './directives/cargroup';