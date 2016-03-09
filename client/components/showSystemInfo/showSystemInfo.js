'use strict';

angular.module('edGalaxyMap')
    .directive('showSystemInfo', function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'components/showSystemInfo/showSystemInfo.html',
            link: function($scope) {
                $scope.showSystemInfo = function() {
                    $rootScope.systemInfoHidden = false;
                };
            }
        };
    });
