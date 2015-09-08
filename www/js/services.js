angular.module('starter.services', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    addService: function(service) {

      var services = JSON.parse($window.localStorage['services'] || '{}');
      console.log(services);
      if (!services)
        services = [];
      
      services.push(service);
      $window.localStorage['services'] = JSON.stringify(services);
    },
    getServices: function() {
      return JSON.parse($window.localStorage['services'] || '{}');
    }
  }
}])
