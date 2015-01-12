angular.module('starter.controllers', [])
.controller('SearchCtrl', ['$scope', '$state', '$ionicLoading', function($scope, $state, $ionicLoading) {
  console.log('SearchCtrl');
  var geoOptions = {
    timeout: 5000
  };

  var error = function() {
    $ionicLoading.hide();
    console.log('error!!!', arguments);
  };

  var search = function(position) {
    $ionicLoading.hide();
    $state.go("tab.results", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  $scope.geolocate = function() {
    $ionicLoading.show({
      template: "Finding Carmen Sandiego"
    });
    navigator.geolocation.getCurrentPosition(search,error,geoOptions);
  };

}])
.controller('MarketsCtrl', function($scope, $stateParams, Markets, $ionicLoading) {
  console.log('MarketsCtrl', $stateParams);
  $scope.markets = [];

  $ionicLoading.show({
    template: 'Calculating GeoDistance LollyGagging'
  });

  var data;
  if ($stateParams.latitude && $stateParams.longitude) {
    data = Markets.sortByDistance($stateParams);
  } else {
    data = Markets.all();
  }

  data.then(function(markets){
    $scope.markets = markets;
  });

  data.finally(function(){
    $ionicLoading.hide();
  });

  // $scope.favorite = function(market) {
  //   Markets.remove(market.id);
  // };
})
.controller('MarketCtrl', function($scope, $stateParams, Markets, $ionicLoading, uiGmapGoogleMapApi) {
  console.log('MarketCtrl');
  $scope.market = null;
  $ionicLoading.show({
    template: 'uncanny farms loading'
  });

  $scope.map = {
    zoom: 16,
    center: {
      latitude: 0,
      longitude: 0
    }
  };

  var updateMap = function(market){
    console.log('updateMap', market);
    $scope.map.center.latitude = market.latitude;
    $scope.map.center.longitude = market.longitude;
  };

  var data = Markets.get($stateParams.marketId);
  data.then(function(market){
    $scope.market = market;
    updateMap(market);
  })

  data.finally(function(){
    $ionicLoading.hide();
  });
})
.controller('AboutCtrl', function($scope, $ionicLoading) {

});

