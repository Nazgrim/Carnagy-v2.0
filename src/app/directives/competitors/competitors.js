angular
    .module("competitorsModule", [])
    .directive('competitors', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/competitors/competitors.html'
        }
    })