'use strict';

angular.module('edGalaxyMap')
    .service('userService', function($q, userFactory, $cookieStore) {
        class LoginService {
            constructor() {
                this.isLoggedIn = false;
                // this.loading = false;
                // this.errors = false;
            }

            init() {
                if ($cookieStore.get('user')) {
                    this.user = $cookieStore.get('user');
                    this.isLoggedIn = true;
                } else {
                    this.user = {};
                    this.isLoggedIn = false;
                }
            }

            login(user) {
                return new $q(function(resolve, reject) {
                    this.loading = true;
                    userFactory.login(user)
                        .then(function(returnUser) {
                            //assign the response to the service
                            this.user = returnUser;

                            this.isLoggedIn = true;
                            //done loading
                            this.loading = false;
                            this.errors = false;
                        }.bind(this))
                        .then(resolve)
                        .catch(function(e) {
                            this.resetLoggedInState();
                            this.errors = true;
                            return reject(e);
                        }.bind(this));
                }.bind(this));
            }

            register(user) {
                return new $q(function(resolve, reject) {
                    this.loading = true;
                    userFactory.register(user)
                        .then(function(returnNewUser) {
                            this.user = returnNewUser;

                            this.isLoggedIn = true;
                            //done loading
                            this.loading = false;
                            this.errors = false;
                        }.bind(this))
                        .then(resolve)
                        .catch(function(e) {
                            this.resetLoggedInState();
                            this.errors = true;
                            return reject(e);
                        }.bind(this));
                }.bind(this));
            }

            resetLoggedInState(){
                this.user = {};
                this.isLoggedIn = false;
                this.loading = false;
            }

            logout() {
                this.resetLoggedInState();
                userFactory.logout();
            }
        }
        return new LoginService();
    });
