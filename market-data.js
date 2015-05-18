'use strict';
var geolib = require('geolib');

module.exports = class MarketData {
  constructor(opt) {
    opt = opt || {};
    this.url = opt.url || 'http://api.farmersmarketapp.nyc/api/markets';
  }

  fetch() {
    return fetch(this.url).then(parseJson);
  }

  data() {
    this.fetchedData = this.fetchedData || this.fetch();
    return this.fetchedData;
  }

  sortBy(field) {
    return this.data().then(sortBy(field));
  }
  sortByLocation(location) {
    return this.data()
      .then(addLocation(location))
      .then(sortBy('distanceMeters'));
  }
}

function parseJson(res) {
  var contentType = res.headers.get("content-type") || ""
  if(!contentType.match("application/json")) {
    throw new TypeError("Error Fetching Data");
  }
  return res.json().then(data => data.markets);
}

function sortBy(field) {
  return (data) => {
    return data.sort((aMarket, bMarket) => {
      if (typeof aMarket[field] === 'string' ){
        return aMarket[field].localeCompare(bMarket[field]);
      } else {
        return aMarket[field] - bMarket[field];
      }
    })
  };
}

function addLocation(location) {
  return (data) => {
    return data.map(market => {
      var distanceMeters = geolib.getDistance(market, location);
      var distanceMiles = distanceMeters * 0.00062137;
      distanceMiles = Math.round(distanceMiles * 100) / 10;
      market.distanceMiles = distanceMiles;
      market.distanceMeters = distanceMeters;
      return market;
    });
  };
}
