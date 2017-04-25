(function() {
  'use strict'

  angular
    .module("FST2015PM.controllers")
    .controller("DSCtrl", DSCtrl);

  DSCtrl.$inject = ["$Datasource"];
  function DSCtrl($Datasource) {
    var cnt = this;
    cnt.dsList = [];

    $Datasource.listObjects("DBDataSource")
    .then(function(res) {
      if (res.data.data && res.data.data.length) {
        cnt.dsList = res.data.data;
      }
    });

    cnt.deleteDS = function(id) {
      bootbox.confirm("<h3>Este conjunto será eliminado permanentemente y los objetos asociados dejarán de funcionar. \n ¿Deseas continuar?</h3>",
      function(result) {
        if (result) {
          $Datasource.removeObject(id, "DBDataSource")
          .then(function(result) {
            cnt.dsList.filter(function(elem, i) {
              if (elem._id === id) {
                cnt.dsList.splice(i, 1);
              }
            });
            $Datasource.updateDBSources();
          });
        }
      });
    };

  }

})();
