// Market Service
// A singleton to serve market data to the rest of the app

var Markets = function($http) {
  this.$http = $http;
  this.api = 'http://api.farmersmarketapp.nyc/api/markets/';

  $http.defaults.transformResponse.push(function(response, headers, status){
    return response.markets;
  });

  $http.defaults.cache = true;
};

Markets.prototype.all = function(){
  return this.$http.get(this.api).then(function(response){
    return response.data;
  });
};

Markets.prototype.sortByDistance = function(postion){
  return this.$http.get(this.api).then(function(response){
    response.data.forEach(function(market){
      var distanceMeters = geolib.getDistance(market, postion);
      var distanceMiles = distanceMeters * 0.00062137;
      distanceMiles = Math.round(distanceMiles * 100) / 100
      market.distance = distanceMiles;
    });

    return response.data.sort(function(a, b){
      //return -1 if a is closer than b
      //return +1 if b is closer than a
      //return 0 if the same
      return a.distance - b.distance;
    });
  });
};

Markets.prototype.get = function(farmId){
  return this.$http.get(this.api + farmId).then(function(response){
    return response.data;
  });
};

Markets.prototype.remove = function(farmId){
  alert("Not removing farm " + farmId);
};

angular.module('starter.services', [])
  .service('Markets',['$http', Markets]);
