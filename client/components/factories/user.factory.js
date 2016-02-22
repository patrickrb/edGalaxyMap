'use strict';

angular.module('edGalaxyMap')
  .factory('userFactory', function ($http, $q, $cookieStore) {
      class userFactory {
            login(user, callback){
              var cb = callback || angular.noop;
              var deferred = $q.defer();

              $http.post('/auth/local', {
                email: user.email,
                password: user.password
              }).
              success(function(data) {
                $cookieStore.put('token', data.token);
                $cookieStore.put('user', data.user);
                deferred.resolve(data);
                return cb();
              }).
              error(function(err) {
                this.logout();
                deferred.reject(err);
                return cb(err);
              }.bind(this));

              return deferred.promise;
            }

            register(user, callback){
              var cb = callback || angular.noop;
              var deferred = $q.defer();

              $http.post('/api/user', {
                name: user.name,
                email: user.email,
                password: user.password
              }).
              success(function(data) {
                $cookieStore.put('token', data.token);
                $cookieStore.put('user', data.user);
                deferred.resolve(data);
                return cb();
              }).
              error(function(err) {
                this.logout();
                deferred.reject(err);
                return cb(err);
              }.bind(this));

              return deferred.promise;
            }

            logout(){
              $cookieStore.remove('token');
              $cookieStore.remove('user');
            }
        }
        return new userFactory;
  });
