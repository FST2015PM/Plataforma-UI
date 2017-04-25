(function() {
  'use strict';

  angular
    .module('FST2015PM.services')
    .service('$APIKey', APIKey);

  APIKey.$inject = ['$http', '$q'];
  function APIKey($http, $q) {
    var apiVersion = 1; //TODO: Move to app config
    //Service definition
    var service = {};
    service.createAPIKey = createAPIKey;
    service.revokeAPIKey = revokeAPIKey;
    //service.disableAPIKey = disableAPIKey;

    return service;

    //Service iplementation

    /**
    Creates an API Key for a given app
    */
    function createAPIKey(appData) {
      var deferred = $q.defer();

      //TODO: Check for uniqueness in app name
      var theUrl = '/api/v'+apiVersion+'/services/apikey';
      var request = $http({
        url: theUrl,
        data: appData,
        method: "POST"
      }).then(function(response) {
        deferred.resolve(response);
      }).catch(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    /**
    Remove an API Key entry from datasource
    */
    function revokeAPIKey(keyEntryId) {
      var dsName = 'APIKey';
      var deferred = $q.defer();

      if (keyEntryId && keyEntryId.length) {
        var theUrl = '/api/v'+apiVersion+'/datasources/'+dsName+'/'+keyEntryId;

        $http({
          url: theUrl,
          method: "DELETE"
        }).then(function(response) {
          deferred.resolve(response);
        })
        .catch(function(error) {
          deferred.reject(error);
        });
      } else {
        deferred.reject("No object ID provided");
      }

      return deferred.promise;
    };

  };

})();
