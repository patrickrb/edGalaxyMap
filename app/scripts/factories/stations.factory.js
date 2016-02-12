'use strict';

angular.module('edGalaxyMap')
  .factory('stationsFactory', function ($http) {
      class StationsFactory {
            find() {
                return $http.get('/api/stations')
                    .then(x => {
                      return x.data;
                    });
            }

            findStationsBySystemId(systemId){
                return $http.get(`/api/stations/${systemId}`)
                    .then(x => { return x.data;});
            }
        }
        return new StationsFactory;
  });
