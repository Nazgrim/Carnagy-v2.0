angular.module('carnagy')
    .directive('DealerCtrl', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/cargroup.html',
            controller: 'myCtrl',
        };
    });