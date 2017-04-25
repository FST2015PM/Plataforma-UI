(function () {
  'use strict';

  angular
    .module('FST2015PM.controllers')
    .controller('PMCatalog', PMCatalog);

  PMCatalog.$inject = ['$Datasource', '$timeout'];
  function PMCatalog($Datasource, $timeout) {
    var cnt = this;
    cnt.pmList = [];

    angular.element(document).ready(function () {
      $timeout(function() {
        $(".sameheight").matchHeight();
      }, 2000);
    });

    $Datasource.listObjects("MagicTown")
    .then(function(response) {
      if (response.data.data && response.data.data.length) {
        cnt.pmList = response.data.data;
      }
    });

    cnt.deletePM = function (_id) {
      bootbox.confirm("<h3>Este pueblo mágico será eliminado permanentemente. \n ¿Deseas continuar?</h3>",
      function(result) {
        if (result) {
          $Datasource.removeObject(_id, "MagicTown")
          .then(function(result) {
            cnt.pmList.filter(function(elem, i) {
              if (elem._id === _id) {
                cnt.pmList.splice(i, 1);
              }
            });
          });
        }
      });
    };

  }

})();
