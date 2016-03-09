'use strict';

angular.module('edGalaxyMap')
    .directive('systemInfo', function($q, systemsService, $rootScope, stationsService, $uibModal) {
        return {
            restrict: 'E',
            templateUrl: 'components/systemInfo/systemInfo.html',
            link: function($scope) {
                $scope.$on('selectedSystem:update', function(event, data) {
                    $scope.selectedSystem = data;
                });

                $scope.$watch(function() {
                    return stationsService.loading;
                }, function() {
                    if (stationsService.loading) {
                        $scope.isLoading = true;
                    } else {
                        $scope.isLoading = false;
                    }
                });

                $scope.hideSystemInfo = function() {
                    $rootScope.systemInfoHidden = true;
                };

                $scope.open = function(station) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'components/stationModal/stationModal.html',
                        controller: 'StationModalCtrl',
                        size: 'lg',
                        resolve: {
                            station: function() {
                                return station;
                            },
                            system: function() {
                                return $scope.selectedSystem;
                            }
                        }
                    });

                    modalInstance.result.then(function() {}, function() {});
                };
            }
        };
    });
