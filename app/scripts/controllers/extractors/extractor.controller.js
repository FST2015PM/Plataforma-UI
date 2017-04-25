(function() {
  'use strict'

  angular
    .module("FST2015PM.controllers")
    .controller("ExtractorCtrl", ExtractorCtrl);

  ExtractorCtrl.$inject = ["$Datasource", "$interval", "$Extractor", "$scope"];
  function ExtractorCtrl($Datasource, $interval, $Extractor, $scope) {
    var cnt = this;
    var extractorsLoaded = false;
    cnt.interval = undefined,

    cnt.extractorList = [];

    $Datasource.listObjects("Extractor")
    .then(function(res) {
      if (res.data.data && res.data.data.length) {
        cnt.extractorList = res.data.data.map(function(item) {
          item.status = "DESCONOCIDO";

          return item;
        });
        extractorsLoaded = true;

        cnt.interval = $interval(function () {
          if (extractorsLoaded) {
            cnt.extractorList.forEach(function(item) {
              $Extractor.getStatus(item._id)
              .then(function(res) {
                item.status = res;
              })
              .catch(function(error) {
                item.status = "DESCONOCIDO";
              });
            });
          }
        }, 3000);
      }
    });

    cnt.startExtractor = function (extractor) {
      $Extractor.startExtractor(extractor._id);
    };

    cnt.canStart = function(extractor) {
      return !extractor.periodic && extractor.status && (extractor.status === "LOADED" || extractor.status === "STARTED");
    };

    cnt.deleteExtractor = function(id) {
      bootbox.confirm("<h3>Este extractor será eliminado permanentemente. \n ¿Deseas continuar?</h3>",
      function(result) {
        if (result) {
          $Datasource.removeObject(id, "Extractor")
          .then(function(result) {
            cnt.extractorList.filter(function(elem, i) {
              if (elem._id === id) {
                cnt.extractorList.splice(i, 1);
              }
            });
          });
        }
      });
    };

    $scope.$on('$destroy', function() {
      if (angular.isDefined(cnt.interval)) {
        $interval.cancel(cnt.interval);
        cnt.interval = undefined;
      }
    });

  }

})();
