(function() {
  'use strict';

  angular
    .module('FST2015PM')
    .config(config)
    .run(run);

  config.$inject = ["$stateProvider", "$urlRouterProvider"];
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('pminfo', {
        url: "/pminfo/:id",
        templateUrl: 'views/magictowns/pmInfo.html',
        controller: 'PMInformation',
        controllerAs: "pm"
      })
      .state('admin.endpoints', {
        url: '/endpoints',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/endpoints/endpoints.html',
            controller: 'EndpointCtrl',
            controllerAs: "endpoint"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin', {
        abstract: true,
        url: "/admin",
        templateUrl: "views/container.html"
      })
      .state('admin.dashboards', {
        url: '/dashboard',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/dashboards/dashboards.html',
            controller: 'DashboardCtrl',
            controllerAs: "dashboards"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.editdashboard', {
        url: '/dashboard/edit/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/dashboards/editDashboard.html',
            controller: 'EditDashboardCtrl',
            controllerAs: "ds"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.editmapdwidget', {
        url: '/dashboard/edit/:id/map/:wid',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/dashboards/mapWidgetEditForm.html',
            controller: 'MapEditWidgetCtrl',
            controllerAs: "widget"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.previewdashboard', {
        url: '/dashboard/preview/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/dashboards/previewDashboard.html',
            controller: 'PreviewDashboardCtrl',
            controllerAs: "ds"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.main', {
        url: "/",
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/admin.html'
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.pmcatalog', {
        url: "/pm",
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/magictowns/pmcatalog.html',
            controller: "PMCatalog",
            controllerAs: "mtown"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.addpm', {
        url: "/pm/add",
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/magictowns/pmEdit.html',
            controller: "PMEditCatalog",
            controllerAs: "mtown"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.editpm', {
        url: "/pm/edit/:id",
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/magictowns/pmEdit.html',
            controller: "PMEditCatalog",
            controllerAs: "mtown"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.datasources', {
        url: "/datasources",
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/datasources/datasources.html',
            controller: 'DSCtrl',
            controllerAs: "ds"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  //serie: true,
                  files: [
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.adddatasource', {
        url: "/datasources/add",
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/datasources/datasourceEdit.html',
            controller: 'DSEditCtrl',
            controllerAs: "ds"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.datasourceedit', {
        url: "/datasources/:id",
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/datasources/datasourceEdit.html',
            controller: 'DSEditCtrl',
            controllerAs: "ds"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.previewdatasource', {
        url: '/datasources/preview/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/datasources/datasourcePreview.html',
            controller: 'DSPreviewCtrl',
            controllerAs: "ds"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    'lib/spin.js/spin.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/datatables.net-bs/js/dataTables.bootstrap.min.js',
                    'js/dataviz/constants.js',
                    'js/dataviz/datatables.js',
                    'js/dataviz/dataviz.js',
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/bootbox/bootbox.js',
                    'lib/datatables.net-bs/css/dataTables.bootstrap.min.css',
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.users', {
        url: '/users',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/users/users.html',
            controller: 'UsersCtrl',
            controllerAs: "users"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.adduser', {
        url: '/users/add',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/users/userEdit.html',
            controller: 'UsersEditCtrl',
            controllerAs: 'users'
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      }).state('admin.edituser', {
        url: '/users/edit/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
            'content': {
            templateUrl: 'views/users/userEdit.html',
            controller: 'UsersEditCtrl',
            controllerAs: 'users'
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          }
        }
      })
      .state('admin.extractors', {
        url: '/extractors',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/extractors/extractors.html',
            controller: 'ExtractorCtrl',
            controllerAs: "extractors"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.editextractor', {
        url: '/extractors/edit/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/extractors/extractorEdit.html',
            controller: 'ExtractorEditCtrl',
            controllerAs: "extractors"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.previewextractor', {
        url: '/extractors/preview',
        params: {
          extractordef: null
        },
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/extractors/extractorPreview.html',
            controller: 'ExtractorEditCtrl',
            controllerAs: "extractors"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    'lib/papaparse/papaparse.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/datatables.net-bs/js/dataTables.bootstrap.min.js',
                    'js/dataviz/constants.js',
                    'js/dataviz/datatables.js',
                    'js/dataviz/dataviz.js',
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/bootbox/bootbox.js',
                    'lib/datatables.net-bs/css/dataTables.bootstrap.min.css',
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.addextractor', {
        url: '/extractors/add',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/extractors/extractorEdit.html',
            controller: 'ExtractorEditCtrl',
            controllerAs: "extractors"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.roles', {
        url: '/roles',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/roles/roles.html',
            controller: 'RolesCtrl',
            controllerAs: "roles"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.addrole', {
        url: '/roles/add',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/roles/roleEdit.html',
            controller: 'RolesEditCtrl',
            controllerAs: "roles"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js'
                  ]
              }
            ]);
          }
        }
      }).state('admin.editrole', {
        url: '/roles/edit/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/roles/roleEdit.html',
            controller: 'RolesEditCtrl',
            controllerAs: "roles"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.addendpoint', {
        url: '/endpoints/add',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/endpoints/endpointEdit.html',
            controller: 'EndpointEditCtrl',
            controllerAs: "endpoint"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    //'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.editendpoint', {
        url: '/endpoints/edit/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/endpoints/endpointEdit.html',
            controller: 'EndpointEditCtrl',
            controllerAs: "endpoint"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    //'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.geolayers', {
        url: '/geolayers',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/geolayers/geolayers.html',
            controller: 'GeolayerCtrl',
            controllerAs: "geo"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    //'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.editgeolayer', {
        url: '/geolayers/edit/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/geolayers/geolayerEdit.html',
            controller: 'GeolayerEditCtrl',
            controllerAs: "geo"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    //'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.addgeolayer', {
        url: '/geolayers/add',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/geolayers/geolayerEdit.html',
            controller: 'GeolayerEditCtrl',
            controllerAs: "geo"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    //'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.previewgeolayer', {
        url: '/geolayers/preview/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/geolayers/geolayerPreview.html',
            controller: 'GeolayerPreviewCtrl',
            controllerAs: "geo"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                serie: true,
                //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                files: [
                  'lib/leaflet-markercluster/dist/MarkerCluster.css',
                  'lib/leaflet-markercluster/dist/MarkerCluster.Default.css',
                  'lib/leaflet/dist/leaflet.css',
                  'lib/leaflet/dist/leaflet.js',
                  'lib/leaflet-markercluster/dist/leaflet.markercluster.js',
                  'lib/spin.js/spin.min.js',
                  'lib/leaflet-spin/leaflet.spin.min.js',
                  'lib/google-maps/lib/Google.min.js',
                  'lib/togeojson/togeojson.js',
                  'js/dataviz/constants.js',
                  'js/dataviz/charts.js',
                  'js/dataviz/maps.js',
                  'js/dataviz/datatables.js',
                  'js/dataviz/dataviz.js',
                ]
              }
            ]);
          }
        }
      })
      .state('admin.apikeys', {
        url: '/apikeys',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/endpoints/apikeys.html',
            controller: 'ApiKeyCtrl',
            controllerAs: "apis"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.addapikey', {
        url: '/apikeys/add',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/endpoints/apikeyEdit.html',
            controller: 'ApiKeyEditCtrl',
            controllerAs: "apis"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      })
      .state('admin.editapikey', {
        url: '/apikeys/edit/:id',
        views: {
          'sidenav': {
            templateUrl: 'views/includes/sidenav.html',
            controller: 'SideNavCtrl'
          },
          'content': {
            templateUrl: 'views/endpoints/apikeyEdit.html',
            controller: 'ApiKeyEditCtrl',
            controllerAs: "apis"
          }
        },
        resolve: {
          menuItems: function() {
            return adminMenuItems;
          },
          loadDependencies: function($ocLazyLoad, $stateParams) {
            return $ocLazyLoad.load([
              {
                  serie: true,
                  //insertBefore: "#mainStyles", //Otherwise app styles will be overridem
                  files: [
                    //'lib/AngularJS-Toaster/toaster.min.css',
                    //'lib/AngularJS-Toaster/toaster.min.js',
                    'lib/datatables.net/js/jquery.dataTables.min.js',
                    'lib/bootbox/bootbox.js'
                  ]
              }
            ]);
          }
        }
      });

    $urlRouterProvider.otherwise("/admin/");

    var adminMenuItems = [
      {
        label: "Usuarios y permisos",
        roles: ["Admin"],
        menuItems: [
          {
            label:"Usuarios",
            stateLink: 'admin.users'
          },
          {
            label:"Roles",
            stateLink: 'admin.roles'
          }
        ]
      },
      {
        label: "Fuentes de datos",
        menuItems: [
          {
            label:"Extractores",
            stateLink: 'admin.extractors'
          },
          {
            label:"Conjuntos",
            stateLink: 'admin.datasources'
          },
          {
            label:"Capas",
            stateLink: 'admin.geolayers'
          }
        ]
      },
      {
        label: "Pueblos Mágicos",
        stateLink: 'admin.pmcatalog'
      },
      {
        label: "Tableros",
        stateLink: 'admin.dashboards'
      },
      {
        label: "Puntos de acceso",
        roles: ["Admin"],
        menuItems: [
          {
            label:"End Points",
            stateLink: "admin.endpoints"
          },
          {
            label:"Llaves API",
            stateLink:"admin.apikeys"
          }
        ]
      },
      {
        label: "Bitácora",
        link: '#'
      },
    ];

    var dashboardMenuItems = [
      {
        label: "Visualizaciones",
        link: "#",
        menuItems: [
          {
            label: "Mapas",
            stateLink: 'dashboard.maps'
          },
          {
            label: "Gráficas dinámicas",
            stateLink: 'dashboard.charts'
          }
        ]
      },
      {
        label: "Estadísticas",
        link: "#",
        stateLink: 'dashboard.datatables'
      },
      {
        label: "Consultas",
        link: "#",
        menuItems: [
          {
            label:"Desagregada",
            link:"#"
          },
          {
            label:"Predefinida",
            link:"#"
          }
        ]
      },
      {
        label: "Indicadores",
        link: "#",
        menuItems: [
          {
            label:"Ambientales",
            link:"#"
          },
          {
            label:"Culturales",
            link:"#"
          },
          {
            label:"Demográficos",
            link:"#"
          }
        ]
      }
    ];
  };

  run.$inject = ["$rootScope", "$state", "$stateParams", "$templateCache", "$http", "$window", 'ENV'];
  function run($rootScope, $state, $stateParams, $templateCache, $http, $window, ENV) {
    var apiVersion = 1;
    if("production" === ENV.envName) {
      $http({
        url: '/api/v'+apiVersion+'/services/login/me',
        method: "GET"
      }).then(function(response) {
        $rootScope.userInfo = response.data;
      }).catch(function(error) {
        $window.location.href = "/"
      });
    }

    console.log(ENV);
    //$rootScope.$state = $state;
  };

})();
