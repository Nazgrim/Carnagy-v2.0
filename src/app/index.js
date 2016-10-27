'use strict';

import SidebarCtrl from '../components/sidebar/sidebar.controller';
import TopMenuCtrl from '../components/topmenu/topmenu.controller';
import DealerCtrl from './dealers/dealer.controller';
import CarCtrl from './dealers/car.controller';
import ModalSimilarCarCtrl from './dealers/modalSimilarCar.controller';

angular.module('carnagy', ['ui.router', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.select', 'highcharts-ng',
    'dealerModule', 'similarCarModule',
    'carChartModule',
    'carWidgetsPanelModule', 'carInformationModule',
    'carModule', 'priceTrendModule', 'dealerCompetitorsModule', 'errSrcModule', 'ui.grid', 'ui.grid.edit',
    'smart-table', 'accountModule', 'dealerHeaderModule','cgBusy'])
    .controller('SidebarCtrl', SidebarCtrl)
    .controller('DealerCtrl', DealerCtrl)
    .controller('CarCtrl', CarCtrl)
    .controller('TopMenuCtrl', TopMenuCtrl)
    .controller('ModalSimilarCarCtrl', ModalSimilarCarCtrl)
    .filter('myStrictFilter', function ($filter) {
        return function (input, predicate) {
            return $filter('filter')(input, predicate, true);
        }
    })
    .filter('unique1', function () {
        return function (arr, field) {
            var o = {}, i, l = arr.length, r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('car', {
                url: '/car/:carId/:stockCarId',
                resolve: {
                    carId: function ($stateParams) {
                        return $stateParams.carId
                    },
                    stockCarId: function ($stateParams) {
                        return $stateParams.stockCarId
                    },
                },
                templateUrl: 'app/dealers/car.html',
                controller: 'CarCtrl',
            })
            .state('dealer', {
                url: '/dealer',
                // resolve: {
                //     dealer: function ($stateParams, dealerService) {
                //         return dealerService.getDealerById();
                //     },
                // },
                templateUrl: 'app/dealers/dealer.html',
                controller: 'DealerCtrl',
            });
        $urlRouterProvider.otherwise('/dealer');
    });
