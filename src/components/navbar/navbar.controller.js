'use strict';

class NavbarCtrl {
  constructor ($scope) {
    //$scope.date = new Date();
    $scope.dealerName=window.selectedDealerName;
  }
}

NavbarCtrl.$inject = ['$scope'];

export default NavbarCtrl;
