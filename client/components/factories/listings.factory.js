'use strict'

angular.module('edGalaxy2App')
  .factory('listingsFactory', function ($http) {
      class ListingsFactory {
            find() {
                return $http.get('/api/listings')
                    .then(x => {
                      return x.data;
                    });
            }

            findListingsByStationId(stationId){
                return $http.get(`/api/listings/station/${stationId}`)
                    .then(x => { return x.data;});
            }
        }
        return new ListingsFactory;
  });
