'use strict';

angular.module('edGalaxyMap')
  .service('systemsService', function ($q, systemsFactory) {
    class SystemsService {
            constructor() {
                this.systems = [];
                // this.loading = false;
                // this.errors = false;
            }

            init() {
                return new $q(function(resolve, reject){
                    this.loading = true;
                    //this service is now trying to load data
                    systemsFactory.find()
                        .then(function(systemsData){
                            //assign the response to the service
                            this.systems = systemsData;
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
        return new SystemsService;
  });
