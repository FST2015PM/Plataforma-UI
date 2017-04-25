(function() {
  'use strict';

  angular
    .module('FST2015PM.controllers')
    .controller('UsersCtrl', UsersCtrl);

  UsersCtrl.$inject = ["$scope", "$Datasource", "$timeout", "$stateParams", "$state", "$q"];
  function UsersCtrl($scope, $Datasource, $timeout, $stateParams, $state, $q) {
    var cnt = this;
    cnt.users = [];

    $Datasource.listObjects("User")
    .then(function(res) {
      if (res.data && res.data.data) {
        cnt.users = res.data.data;
      }
    });

    cnt.deleteUsr = function (_id) {
      bootbox.confirm("<h3>Este usuario será eliminado permanentemente. \n ¿Deseas continuar?</h3>",
      function(result) {
        if (result) {
          $Datasource.removeObject(_id, "User")
          .then(function(response) {
            cnt.users.filter(function(elem, i) {
              if (elem._id === _id) {
                cnt.users.splice(i, 1);
              }
            });
          })
        }
      });
    };

  };

})();
