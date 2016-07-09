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
                    dealer: function ($stateParams, dealerService) {
                        return dealerService.getDealerById($stateParams.id);
                    },
                },
                templateUrl: 'app/dealers/dealer.html',
                controller: 'DealerCtrl',
            });
        $urlRouterProvider.otherwise('/dealers');
    });
