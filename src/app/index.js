'use strict';

import SidebarCtrl from '../components/sidebar/sidebar.controller';
import DealerCtrl from './dealers/dealer.controller';
import CarCtrl from './dealers/car.controller';
import ModalSimilarCarCtrl from './dealers/modalSimilarCar.controller';

angular.module('carnagy', ['ui.router','ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.select', 'highcharts-ng',
    'dealerModule', 'similarCarModule', 
    'competitorsModule', 'carChartModule', 
    'carWidgetsPanelModule','carInformationModule', 
    'carModule'])
    .controller('SidebarCtrl', SidebarCtrl)
    .controller('DealerCtrl', DealerCtrl)
    .controller('CarCtrl', CarCtrl)
    .controller('ModalSimilarCarCtrl', ModalSimilarCarCtrl)   
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
