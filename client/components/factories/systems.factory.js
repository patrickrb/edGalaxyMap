'use strict';

angular.module('edGalaxyMap')
    .factory('systemsFactory', function($http) {
        class SystemsFactory {
            find() {
                return $http.get('assets/models/systems.json')
                    .then(x => {
                        return x.data;
                    });
            }
        }
        return new SystemsFactory();
    });
