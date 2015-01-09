angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Markets) {
  console.log('SearchCtrl');

  // shit to search with
})
.controller('MarketsCtrl', function($scope, $stateParams, Markets) {
  console.log('MarketsCtrl');
  $scope.markets = Markets.all();
  $scope.favorite = function(market) {
    // haha
    Markets.remove(market.id);
  };
})
.controller('MarketCtrl', function($scope, $stateParams, Markets) {
  console.log('MarketCtrl');
  $scope.market = Markets.get($stateParams.marketId);
})

.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
