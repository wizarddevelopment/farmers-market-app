angular.module('starter.services', [])

/**
 * Example Farm Data
 */
.factory('Markets', function() {

  var markets = [
    {
      "id": 1,
      "name": "Staten Island Mall Greenmarket",
      "latitude": 40.581994,
      "longitude": -74.16607,
      "location_description": "Richmond Ave. entrance, in parking lot",
      "address": {
        "street": "2655 Richmond Ave",
        "zipcode": 10314,
        "city": "Staten Island",
        "state": "NY"
      },
      "links": {
        "web": "http://www.grownyc.org",
        "twitter": "http://www.twitter.com/NYC"
      },
      "schedule_hours_description": "Saturday 8am-3pm",
      "schedule_season_description": "June 7 - November 22"
    },
    {
      "id": 2,
      "name": "Saint George Greenmarket",
      "latitude": 40.581994,
      "longitude": -74.07791,
      "location_description": "St. Mark's Pl., Hyatt St., Theater parking lot",
      "address": {
        "street": "St Marks Pl and Hyatt St",
        "zipcode": 10301,
        "city": "Staten Island",
        "state": "NY"
      },
      "links": {
        "web": "http://www.grownyc.org",
        "twitter": "http://www.twitter.com/NYC"
      },
      "schedule_hours_description": "Friday 9am-3pm",
      "schedule_season_description": "May 2 - June 9"
    },
    {
      "id": 3,
      "name": "Forest Hills Greenmarket",
      "latitude": 40.58199,
      "longitude": -73.84639,
      "location_description": "South side of Queens Blvd at 70th Ave.",
      "address": {
        "street": "Queens Blvd and 70th Ave",
        "zipcode": 11375,
        "city": "Queens",
        "state": "NY"
      },
      "links": {
        "web": "http://www.grownyc.org",
        "twitter": "http://www.twitter.com/NYC"
      },
      "schedule_hours_description": "Monday 1pm-3pm",
      "schedule_season_description": "Year-round"
      }
    ];

  return {
    sortByDistance: function(postion) {
      markets.forEach(function(market){
        var distanceMeters = geolib.getDistance(market, postion);
        var distanceMiles = distanceMeters * 0.00062137;
        distanceMiles = Math.round(distanceMiles * 100) / 100
        market.distance = distanceMiles;
        console.log(market);
      });
      return markets.sort(function(a, b){
        //return -1 if a is closer than b
        //return +1 if b is closer than a
        //return 0 if the same
        return a.distance - b.distance;
      });
    },
    all: function() {
      return markets;
    },
    get: function(farmId) {
      return markets[farmId - 1];
    },
    remove: function(farmId) {
      markets.splice(farmId - 1, 1);
    }
  }
});
