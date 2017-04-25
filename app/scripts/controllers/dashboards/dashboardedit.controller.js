(function() {
  'use strict';

  angular
    .module('FST2015PM.controllers')
    .controller('EditDashboardCtrl', EditDashboardCtrl);

  EditDashboardCtrl.$inject = ["$state","$stateParams", "$Datasource", "uuid", "$timeout"];
  function EditDashboardCtrl($state, $stateParams, $Datasource, uuid, $timeout) {
    var cnt = this;
    var maps = [];
    cnt.widgets = [];
    cnt.formTitle = "Agregar tablero";
    cnt.dashboardData = {};
    cnt.gridsterOptions = {
      columns: 6,
      pushing: true,
      margins: [5, 5],
      mobileModeEnabled: true,
      defaultSizeX:2,
      defaultSizeY:2,
      minSizeX: 2,
      minSizeY: 2,
      resizable: {
        enabled: true,
        stop: function(event, $element, widget) {
          var m;
          maps.forEach(function(item) {
            if (widget.id === item.id) {
              m = item.map;
            }
          });

          if (m) {
            m.invalidateSize();
          }
        }
      },
      draggable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw']
      }
    };

    if($stateParams.id && $stateParams.id.length) {
      cnt.formTitle = "Editar tablero";
      $Datasource.getObject($stateParams.id, "Dashboard").then(function(ds) {
        cnt.dashboardData = ds.data;
        cnt.widgets = ds.data.widgets;

        $timeout(function() {
          cnt.widgets.forEach(function(item) {
            if (item.type === "map") {
              maps.push({id: item.id, map: dataviz.mapsFactory.createMap(item.id, ENGINE_LEAFLET, [40.46, -100.715], 3)});
            }
          });
        }, 500);
      });
    }

    cnt.addWidget = function(type) {
      var wid = uuid.v4().replace(/-/g, '');
      var minSize = 2;

      if ("map" === type) minSize = 3;
      cnt.widgets.push({
        id: wid,
        name:type,
        type:type,
      	minSizeY: minSize,
      	minSizeX: minSize
      });
    };

    cnt.removeWidget = function(widgetId) {
      cnt.widgets = cnt.widgets.filter(function(item) {
        return item.id !== widgetId;
      });
    };

    cnt.configWidget = function(wid) {
      $state.go('admin.editmapdwidget', {id: $stateParams.id, wid: wid});
    };

    cnt.clear = function() {
      cnt.widgets = [];
    };

    cnt.submitForm = function(form) {
      if (form.$valid) {
        cnt.dashboardData.widgets = cnt.widgets;
        if (!cnt.dashboardData._id) {
          $Datasource.addObject(cnt.dashboardData, "Dashboard")
          .then(function(response) {
            $state.go('admin.dashboards', {});
          })
        } else {
          $Datasource.updateObject(cnt.dashboardData, "Dashboard")
          .then(function(response) {
            $state.go('admin.dashboards', {});
          })
        }
      }
    };

  };

})();
