angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $state, $ionicLoading, Boroughs) {
  console.log('SearchCtrl');
  var geoOptions = {
    timeout: 10000
  };
  // $scope.boroughs = ['Brooklyn', 'Bronx', 'Manhattan', 'Staten Island', 'Queens']
  $scope.boroughs = Boroughs.all();
  console.log($scope.boroughs);
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
      template: "Finding Carmen Sandiego"
    });
    navigator.geolocation.getCurrentPosition(search,error,geoOptions);
  };
  $scope.choose_borough = function(borough) {
    $scope.borough = borough
    console.log(borough);
    // $state.go("tab.buroughs", {
    //   borough: borough
    // });
  };
})
.controller('MarketsCtrl', function($scope, $stateParams, Markets) {
  console.log('MarketsCtrl', $stateParams);
  if ($stateParams.latitude && $stateParams.longitude) {
    $scope.markets = Markets.sortByDistance($stateParams);
  } else {
    $scope.markets = Markets.all();
  }
  // if ($stateParams.borough) {
  //   var borough = $stateParams.borough;
  //   $scope.markets = [];
  //   console.log($scope.markets.push(1));
  //   Markets.forEach(function(market, borough){
  //     if($scope.markets.city == borough {
  //       $scope.markets.push(value.genre);
  //     }
  //   });
  //   console.log($scope.markets.push(2));
  // }
  $scope.favorite = function(market) {
    // haha
    Markets.remove(market.id);
  };
})
.controller('MarketCtrl', function($scope, $stateParams, Markets) {
  console.log('MarketCtrl');
  $scope.market = Markets.get($stateParams.marketId);
  console.log($scope.market)
  google.maps.event.addDomListener(window, 'load', function() {
      var myLat = $scope.market.latitude
      var myLng = $scope.market.longitude
      var myLatlng = new google.maps.LatLng(myLat, myLng);

      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(myLat, myLng));
          var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(myLat, myLng),
              map: map,
              title: "My Location"
          });
      });

      $scope.map = map;
  });

})

.controller('AboutCtrl', function($scope, $ionicLoading) {
});

