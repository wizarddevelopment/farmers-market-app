angular.module('starter.controllers', [])

.controller('FarmsCtrl', function($scope, Farms) {
  console.log('Farmsctrl');

  // shit to search with
})
.controller('FarmResultsCtrl', function($scope, $stateParams, Farms) {
  $scope.farms = Farms.all();
  console.log('farmrst');
  $scope.favorite = function(farm) {
    // haha
    Farms.remove(farm.id);
  };
})
.controller('FarmDetailCtrl', function($scope, $stateParams, Farms) {
  console.log('FarmDetailCtrl');
  $scope.farm = Farms.get($stateParams.farmId);
})

.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
