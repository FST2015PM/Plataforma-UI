(function() {
  'use strict'

  angular
    .module("FST2015PM.controllers")
    .controller("ApiKeyEditCtrl", ApiKeyEditCtrl);

  ApiKeyEditCtrl.$inject = ["$Datasource", "$APIKey", "$stateParams", "$state"];
  function ApiKeyEditCtrl($Datasource, $APIKey, $stateParams, $state) {
    var cnt = this;
    cnt.formTitle = "Agregar Llave API";
    cnt.apiKeyData = {};
    cnt.processing = false;

    if($stateParams.id && $stateParams.id.length) {
      cnt.formTitle = "Editar Llave API";
      $Datasource.getObject($stateParams.id, "APIKey").then(function(ds) {
        cnt.apiKeyData = ds.data;
      });
    }

    cnt.submitForm = function(form) {
      if (form.$valid) {
        cnt.processing = true;
        if (!cnt.apiKeyData._id) {
          $APIKey.createAPIKey(cnt.apiKeyData)
          .then(function(response) {
            $state.go('admin.apikeys', {});
          })
        }
      }
    };

  }

})();
