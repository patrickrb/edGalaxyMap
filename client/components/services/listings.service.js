'use strict';

angular.module('edGalaxyMap')
  .service('listingsService', function ($q, listingsFactory) {
    class ListingsService {
            constructor() {
                this.listings = [];
                this.loading = false;
                // this.loading = false;
                // this.errors = false;
            }

            findListingsByStationId(stationId) {
                return new $q(function(resolve, reject){
                    this.loading = true;
                    this.listings.length = 0;
                    //this service is now trying to load data
                    listingsFactory.findListingsByStationId(stationId)
                        .then(function(listingsData){
                            //assign the response to the service
                            this.listings = listingsData;
                            //done loading
                            this.loading = false;
                            this.errors = false;
                        }.bind(this))
                        .then(resolve)
                        .catch(function(e){
                            this.loading = false;
                            this.errors = true;
                            return reject(e);
                        }.bind(this));
                }.bind(this));
            }
        }
        return new ListingsService;
  });
