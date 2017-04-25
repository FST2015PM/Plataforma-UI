(function() {
  'use strict';

  angular
    .module('FST2015PMMocked', ['FST2015PM', 'ngMockE2E', 'angular-uuid'])
    .run(run);

  run.$inject = ['ENV', '$httpBackend', 'uuid'];
  function run(ENV, $httpBackend, uuid) {
    //Mock services
    var users = [];
    var roles = [];
    var pm = [{"_id" : "58a9fffe77c8b55e6ce59bb7",
      "CVE_MUN" : "003",
      "CVE_ENT" : "06",
      "name" : "Comala",
      "description" : "Pueblo Mágico que se caracteriza por las bellas plazas, jardines y calles ideales para pasear y comer en sus restaurantes botaneros de comida regional.​​ Ideal para transitar por sus orillas montando a caballo, acampar y pescar especies como lobina negra. Ubicado en el estado de Colima también conocido como el “Pueblo Blanco de América”.",
      "CVE_LOC" : "0001",
      "inclusion_date" : "2017-02-19"
    }];

    if ("development" === ENV.envName) {
      $httpBackend.whenGET('/api/v1/datasources/User')
      .respond({data:users});

      $httpBackend.whenGET('/api/v1/datasources/Role')
      .respond({data:roles});

      $httpBackend.whenGET('/api/v1/datasources/MagicTown')
      .respond({data:pm});

      $httpBackend.whenPOST('/api/v1/datasources/User').respond(function(method, url, data) {
        var user = angular.fromJson(data);
        user._id = uuid.v4().replace(/-/g, '');
        users.push(user);
        return [200, user, {}];
      });

      $httpBackend.whenGET(/\/api\/v1\/datasources\/User\/\d+/).respond(function(method, url, data) {
          var userid = url.split('/')[2];
          var ret = users.filter(function(usr) {
            return usr._id === userid;
          });
          if (ret.length) {

          } else {

          }

          return [201, game, { Location: '/games/' + gameid }];
      });

      $httpBackend.whenGET(/views\/.*/).passThrough();
      //$httpBackend.whenGET(/admin\/.*/).passThrough();
    }
  };

})();
