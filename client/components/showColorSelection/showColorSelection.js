'use strict';

angular.module('edGalaxyMap')
    .directive('showColorSelection', function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'components/showColorSelection/showColorSelection.html',
            link: function($scope) {

                $scope.showColorSelection = function() {
                    $rootScope.colorSelectionHidden = false;
                };
            }
        };
    });
