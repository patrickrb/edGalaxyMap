'use strict';

angular.module('edGalaxyMap')
    .directive('navbar', function($rootScope, systemsService, userService, colorService, $cookieStore, Auth) {
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',
            link: function($scope, elem, attr) {
                console.log('loaded navbar');

                $scope.isCollapsed = true;
                $scope.isLoggedIn = Auth.isLoggedIn;
                $scope.isAdmin = Auth.isAdmin;
                $scope.getCurrentUser = Auth.getCurrentUser;

                $scope.changeSystem = function($item) {
                    $rootScope.$broadcast('selectedSystem:update', $item);
                };

                $scope.changeColoring = function(name) {
                    colorService.setColoringType(name);
                    $rootScope.$broadcast('systemColoring:update', name);
                };

                //wait for systems data to load, then draw systems and animate
                $scope.$watch(function() {
                    return systemsService.systems.length;
                }, function() {
                    if (systemsService.systems.length >= 1) {
                        $scope.systems = systemsService.systems;
                    }
                });

                $scope.$watch(function() {
                    return userService.isLoggedIn;
                }, function() {
                    if (userService.isLoggedIn) {
                        $scope.user = $cookieStore.get('user');
                        $scope.isLoggedIn = true;
                    } else {
                        $scope.isLoggedIn = false;
                    }
                });

                $scope.logout = function() {
                    userService.logout();
                };
            }
        };
    });
