angular
    .module("carInformationModule", [])
    .directive('carInformation', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/car-information/car-information.html'
        }
    })