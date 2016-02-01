'use strict';

angular.module('edGalaxyMap')
  .factory('loginFactory', function ($http) {
      class LoginFactory {
            login(user){
                return $http.post(`/api/login`, user)
                    .then(x => {return x.data;});
            }
        }
        return new LoginFactory;
  });
