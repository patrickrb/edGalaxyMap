'use strict';

angular.module('edGalaxyMap')
    .directive('footer', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/footer/footer.html',
            link: function($scope) {
                $scope.projectUrl = 'https://github.com/patrickrb/edGalaxyMap';
            }
        };
    });
