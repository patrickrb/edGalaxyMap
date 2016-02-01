'use strict';

angular.module('edGalaxyMap')
  .service('loginService', function ($q, loginFactory) {
    class LoginService {
            constructor() {
                this.user = {};
                // this.loading = false;
                // this.errors = false;
            }

            login(user) {
                return new $q(function(resolve, reject){
                    this.loading = true;
                    loginFactory.login(user)
                        .then(function(returnUser){
                            //assign the response to the service
                            this.user = returnUser;
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
        return new LoginService;
  });
