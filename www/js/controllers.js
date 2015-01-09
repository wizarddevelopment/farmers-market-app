angular.module('starter.controllers', [])

.controller('FarmsCtrl', function($scope, Farms) {
  $scope.farms = Farms.all();
  $scope.remove = function(farm) {
    Farms.remove(farm);
  }
})

.controller('FarmDetailCtrl', function($scope, $stateParams, Farms) {
  $scope.farm = Farms.get($stateParams.farmId);
})

.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
