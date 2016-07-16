'use strict';

import SidebarCtrl from '../components/sidebar/sidebar.controller';
import DealerCtrl from './dealers/dealer.controller';
import CarCtrl from './dealers/car.controller';

angular.module('carnagy', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource',
    'ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps', 'ui.select', 'ngSanitize', 'highcharts-ng',
    'dealerModule', 'similarCarModule', 'competitorsModule', 'carChartModule', 'carWidgetsPanelModule',
    'carInformationModule', 'carModule','angular-nicescroll'])
    .controller('SidebarCtrl', SidebarCtrl)
    .controller('DealerCtrl', DealerCtrl)
    .controller('CarCtrl', CarCtrl)
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('car', {
                url: '/car/:id',
                resolve: {
                    id: function ($stateParams) {
                        return $stateParams.id
                    },
                },
                templateUrl: 'app/dealers/car.html',
                controller: 'CarCtrl',
            })
            .state('dealer', {
                url: '/dealer',
                resolve: {
                    dealer: function ($stateParams, dealerService) {
                        return dealerService.getDealerById();
                    },
                },
                templateUrl: 'app/dealers/dealer.html',
                controller: 'DealerCtrl',
            });
        $urlRouterProvider.otherwise('/dealer');
    });
