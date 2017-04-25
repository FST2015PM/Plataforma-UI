(function() {
  'use strict';

  angular
    .module('FST2015PM.services')
    .service('$Extractor', ExtractorService);

  ExtractorService.$inject = ['$http', '$q'];
  function ExtractorService($http, $q) {
    var service = {},
        apiVersion = 1,
        gatewayPath = '/api/v'+apiVersion+'/services/extractor/';

    service.loadExtractor = loadExtractor;
    service.startExtractor = startExtractor;
    service.stopExtractor = stopExtractor;
    service.getStatus = getStatus;
    service.getEncodingList = getEncodingList;
    service.downloadPreview = downloadPreview;

    return service;

    function getEncodingList() {
      var deferred = $q.defer();

      var theUrl = '/api/v'+apiVersion+'/services/encoding/';
      var request = $http({
        url: theUrl,
        method: "GET"
      }).then(function(response) {
        deferred.resolve(response.data);
      })
      .catch(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    function loadExtractor(id) {
      var deferred = $q.defer();

      if (id === undefined) return;
      var theUrl = gatewayPath + "load/" + id;
      var request = $http({
        url: theUrl,
        method: "POST"
      }).then(function(response) {
        deferred.resolve(response);
      })
      .catch(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    function startExtractor(id) {
      var deferred = $q.defer();

      if (id === undefined) return;
      var theUrl = gatewayPath + "start/" + id;
      var request = $http({
        url: theUrl,
        method: "POST"
      }).then(function(response) {
        deferred.resolve(response);
      })
      .catch(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    function stopExtractor(id) {
      if (id === undefined) return;
      var theUrl = gatewayPath + "stop/" + id;
      var request = $http({
        url: theUrl,
        method: "POST"
      });
      return request;
    };

    function getStatus(id) {
      var deferred = $q.defer();

      if (id === undefined) return;
      var theUrl = gatewayPath + "status/" + id;
      var request = $http({
        url: theUrl,
        method: "GET"
      }).then(function(response) {
        if (response.status === 200) {
            deferred.resolve(response.data.status);
        } else {
          deferred.reject();
        }
      }).catch(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    function downloadPreview(fileLocation, zipped, charset, relPath) {
      var opts = {};
      opts.zipped = zipped || false;
      opts.charset = charset || "UTF-8";
      var deferred = $q.defer();

      if (fileLocation === undefined) return;
      var _url = '/api/v'+apiVersion+'/services/csvpreview'
      var request = $http({
        url: _url,
        data: {fileLocation: fileLocation, zipped: opts.zipped, charset: opts.charset, zipPath: relPath},
        method: "POST"
      }).then(function(response) {
        deferred.resolve(response);
      })
      .catch(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };
  };

})();
