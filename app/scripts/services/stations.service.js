'use strict';

angular.module('edGalaxyMap')
  .service('stationsService', function ($q, stationsFactory) {
    class StationsService {
            constructor() {
                this.stations = [];
                this.selectedStation;
                // this.loading = false;
                // this.errors = false;
            }

            findStationsBySystemId(systemId) {
                return new $q(function(resolve, reject){
                    this.loading = true;
                    //this service is now trying to load data
                    stationsFactory.findStationsBySystemId(systemId)
                        .then(function(stationsData){
                            //assign the response to the service
                            this.stations = stationsData;
                            this.selectedStation = stationsData[0]
                            console.log('found stations: ', this.stations);
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

            findAllStations() {
                return new $q(function(resolve, reject){
                    this.loading = true;
                    //this service is now trying to load data
                    stationsFactory.find()
                        .then(function(stationsData){
                            //assign the response to the service
                            this.stations = stationsData;
                            this.selectedStation = stationsData[0]
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

            setSelectedStation(systemData){
              this.selectedStation = systemData;
              console.log(this.selectedStation);
            }
        }
        return new StationsService;
  });
