(function() {
  'use strict'

  angular
    .module("FST2015PM.controllers")
    .controller("EndpointCtrl", EndpointCtrl);

  EndpointCtrl.$inject = ["$Datasource"];
  function EndpointCtrl($Datasource) {
    var cnt = this;
    cnt.dsList = [];

    $Datasource.listObjects("DSEndpoint")
    .then(function(res) {
      if (res.data.data && res.data.data.length) {
        cnt.dsList = res.data.data;
      }
    });

    cnt.deleteEndPoint = function(id) {
      bootbox.confirm("<h3>Este endpoint será eliminado permanentemente. \n ¿Deseas continuar?</h3>",
      function(result) {
        if (result) {
          $Datasource.removeObject(id, "DSEndpoint")
          .then(function(result) {
            cnt.dsList.filter(function(elem, i) {
              if (elem._id === id) {
                cnt.dsList.splice(i, 1);
              }
            });
          });
        }
      });
    };

  }

})();
