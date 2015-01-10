angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $state, $ionicLoading) {
  console.log('SearchCtrl');
  var geoOptions = {
    timeout: 10000
  };

  var error = function() {
    $ionicLoading.hide();
    console.log('error!!!');
  };

  var search = function(position) {
    $ionicLoading.hide();
    console.log(position.coords.latitude, position.coords.longitude);
    $state.go("tab.results", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  $scope.geolocate = function() {
    $ionicLoading.show({
      template: "Finding Carmen San Diego"
    });
    navigator.geolocation.getCurrentPosition(search,error,geoOptions);
  };

})
.controller('MarketsCtrl', function($scope, $stateParams, Markets) {
  console.log('MarketsCtrl', $stateParams);
  if ($stateParams.latitude && $stateParams.longitude) {
    $scope.markets = Markets.sortByDistance($stateParams);
  } else {
    $scope.markets = Markets.all();
  }
  $scope.favorite = function(market) {
    // haha
    Markets.remove(market.id);
  };
})
.controller('MarketCtrl', function($scope, $stateParams, Markets) {
  console.log('MarketCtrl');
  $scope.market = Markets.get($stateParams.marketId);
})

.controller('AboutCtrl', function($scope, $ionicLoading) {

  google.maps.event.addDomListener(window, 'load', function() {
      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
              map: map,
              title: "My Location"
          });
      });

      $scope.map = map;
  });

});

