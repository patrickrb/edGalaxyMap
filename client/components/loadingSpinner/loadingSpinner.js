angular.module('edGalaxyMap')
	.directive('loadingSpinner',function ($rootScope, $q, systemsService) {
			return {
				restrict: 'E',
				templateUrl: 'components/loadingSpinner/loadingSpinner.html',
				link: function ($scope, elem, attr) {
            $scope.user = {
              email: 'patrick@burnsforce.com'
            }

						$scope.changeSystem = function($item, $model, $label, $event){
							$rootScope.$broadcast('selectedSystem:update', $item);
						}

        }
      }
    });
