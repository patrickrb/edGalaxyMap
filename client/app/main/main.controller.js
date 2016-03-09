'use strict';
(function() {

    function MainController($scope, $rootScope) {
        this.awesomeThings = [];

        $scope.$watch(function() {
            return $rootScope.systemInfoHidden;
        }, function() {
            $scope.systemInfoHidden = $rootScope.systemInfoHidden;
        });

        $scope.$watch(function() {
            return $rootScope.colorSelectionHidden;
        }, function() {
            $scope.colorSelectionHidden = $rootScope.colorSelectionHidden;
        });
    }

    angular.module('edGalaxyMap')
        .controller('MainController', MainController);

})();
