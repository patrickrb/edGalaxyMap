'use strict';

angular.module('edGalaxyMap')
  .factory('systemsFactory', function ($http) {
      class SystemsFactory {
            find() {
                return $http.get('/api/systems')
                    .then(x => {
                      return x.data;
                    });
            }
        }
        return new SystemsFactory();
  });
