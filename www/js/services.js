angular.module('starter.services', [])

/**
 * Example Farm Data
 */
.factory('Farms', function() {
  // Might use a resource here that returns a JSON array
  var farms = [
    {
      id: 0,
      name: "Maggies Farm"
    }
  ];

  return {
    all: function() {
      return farms;
    },
    get: function(farmId) {
      // Simple index lookup
      return farms[farmId];
    }
  }
});
